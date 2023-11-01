"""
Runtime components for LMQL graph execution.

Function calling, graph execution context, deferred and branching calls.
"""

import contextvars
from lmql.runtime.query_function import LMQLQueryFunction
import inspect
import warnings
from typing import Dict

"""
Graph context available as context variable during call(...) and branch(...) calls,
allowing to pass control back to the graph execution engine.
"""
GraphContext = contextvars.ContextVar("GraphContext")

def ensure_graph_context():
    if GraphContext.get(None) is None:
        GraphContext.set([])
    
def push_graph_context(graph):
    ensure_graph_context()
    GraphContext.get().append(graph)

def pop_graph_context():
    ensure_graph_context()
    GraphContext.get().pop()

def get_graph_context():
    ensure_graph_context()
    if len(GraphContext.get()) == 0:
        return None
    return GraphContext.get()[-1]

def query_function(fct):
    """
    Given a wrapped @lmql.query(...) function, returns the internal LMQLQueryFunction object.

    Does nothing to LMQLQueryFunction objects.
    """
    if hasattr(fct, "__lmql_query_function__"):
        if fct.__lmql_query_function__ == True:
            return fct
        return fct.__lmql_query_function__
    return None

async def call(fct, *args, **kwargs):
    """
    Used by compiled LMQL query functions to evaluate call expressions like 'a()'.
    """
    if inference_call := get_graph_context():
        return await inference_call.graph.ainfer_call(fct, *args, **kwargs)
    return await call_raw(fct, *args, **kwargs)

async def call_raw(fct, *args, **kwargs):
    """
    Non-graph aware version of call(...).
    """
    if type(fct) is LMQLQueryFunction or (hasattr(fct, "__lmql_query_function__") and fct.__lmql_query_function__.is_async):
        result = await fct(*args, **kwargs)
        return result
    if inspect.iscoroutinefunction(fct):
        return await fct(*args, **kwargs)
    elif hasattr(fct, "__lmql_query_function__") and not fct.__lmql_query_function__.is_async:
        return await fct.__lmql_query_function__.__acall__(*args, **kwargs)
    else:
        return fct(*args, **kwargs)

async def branch(id: int, branching_call: Dict):
    """
    Used by compiled LMQL query functions to evaluate branching call expressions like 'a() | b()'
    """
    inference_call = get_graph_context()
    
    # handle case without a graph context (no branching possible)
    if inference_call is None:
        warnings.warn("An excuted query contains a branching query call (e.g. 'a() | b()') and is executed outside of graph context. Only the first branch will be executed. Use lmql.infer(...) to execute the query in a multi-branch context.")
    
        first = branching_call[0]
        result = await first()

        return result

    # use graph context for actual execution
    return await inference_call.graph.ainfer_branch(id, branching_call)

class defer_call:
    """
    Represents a deferred call to a query function (e.g. as used to defer branching calls in graphs).
    """
    def __init__(self, *args, **kwargs):
        self._args = args
        self.kwargs = kwargs

    @property
    def target(self):
        return self._args[0]

    @property
    def query_function(self):
        return query_function(self.target)

    @property
    def args(self):
        return self._args[1:]

    async def __call__(self):
        qfct = query_function(self.target)
        return await qfct.__acall__(*self.args, **self.kwargs)
    
    def __repr__(self):
        qfct = query_function(self.target)
        argstr = str(self.args)[1:-1]
        if len(self.kwargs) > 0:
            argstr += str(self.kwargs)[1:-1]
        argstr = argstr.rstrip(",")
        return f"deferred {qfct.name}({argstr})"

def annotate_score(result, score, additive_op=None, existing_score=None):
    """
    Annotates the provided 'result' with the provided 'score' in the current
    graph execution context and returns the 'result' as-is.

    Assignment happens on an instance level as tracked via `id(result)`.
    """

    if additive_op is not None:
        if additive_op == "*":
            score = score * existing_score
        elif additive_op == "+":
            score = score + existing_score
        elif additive_op == "-":
            score = score - existing_score
        elif additive_op == "/":
            score = score / existing_score
        else:
            raise TypeError(f"Compound scoring operation '@{additive_op}' is not supported.")
    
    context = get_graph_context()
    if context is not None:
        context.value_scores[id(result)] = score
    
    return result

def scorer(runtime_context):
    """
    Returns a callable that llows to score LMQL values (placeholder variables or scored query inputs)
    by variable name or by value.
    """
    def score(value=None, variable=None):
        if variable is not None:
            return runtime_context.logprobs(variable)
        else:
            context = get_graph_context()
            # if not in a graph context, score is always 0.0
            if context is None:
                return 0.0
            
            node = context.inputs_mapping.get(id(value))
            # in graph context, default score is 1.0
            # TODO: should we have different default scores for graph and non-graph contexts?
            if node is None:
                return 1.0
            return node.score

    return score