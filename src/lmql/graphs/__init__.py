from .nodes import *
from .runtime import call, defer_call, branch, annotate_score, scorer
from lmql.graphs.graph import InferenceGraph, query_function, InferenceCall

def infer(fct, *args, samples=1, state=None, **kwargs):
    """
    Use the LMQL graph execution engine to infer the result of a 
    graph of LMQL query functions.
    """
    qfct = query_function(fct)
    graph, qnode = InferenceGraph.from_query(qfct)
    
    with open(state, "w") as f:
        f.write(graph.to_json())
    
    for _ in range(samples):
        graph.infer(qnode, *args, **kwargs)

        with open(state, "w") as f:
            f.write(graph.to_json())