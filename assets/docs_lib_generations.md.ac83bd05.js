import{_ as e,o as s,c as a,Q as n}from"./chunks/framework.4636910e.js";const g=JSON.parse('{"title":"Generations API NEW","description":"","frontmatter":{"outline":[2,3]},"headers":[],"relativePath":"docs/lib/generations.md","filePath":"docs/lib/generations.md"}'),o={name:"docs/lib/generations.md"},l=n(`<h1 id="generations-api-new" tabindex="-1">Generations API <span class="badge">NEW</span> <a class="header-anchor" href="#generations-api-new" aria-label="Permalink to &quot;Generations API &lt;span class=&quot;badge&quot;&gt;NEW&lt;/span&gt;&quot;">​</a></h1><div class="subtitle">A simple Python API for LMQL-based text generation and scoring.</div><p>The <em>Generations API</em> is a lightweight library with the goal of providing high-level access to LMQL features, such as its inference backends, (constrained) generation, and scoring. The API was designed to be easy to use and does not require users to write any LMQL themselves.</p><div style="margin-bottom:-10pt;"></div><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>To illustrate the Generations API, let&#39;s look at a simple example of generating and scoring text using the <code>openai/gpt-3.5-turbo-instruct</code> model:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="hljs"><code><span class="line"><span class="hljs-keyword">import</span> lmql

<span class="hljs-comment"># obtain a model instance</span>
m: lmql.LLM = lmql.model(<span class="hljs-string">&quot;openai/gpt-3.5-turbo-instruct&quot;</span>)

<span class="hljs-comment"># simple generation</span>
m.generate_sync(<span class="hljs-string">&quot;Hello&quot;</span>, max_tokens=<span class="hljs-number">10</span>)
<span class="hljs-comment"># -&gt; Hello, I am a 23 year old female.</span>

<span class="hljs-comment"># sequence scoring</span>
m.score_sync(<span class="hljs-string">&quot;Hello&quot;</span>, [<span class="hljs-string">&quot;World&quot;</span>, <span class="hljs-string">&quot;Apples&quot;</span>, <span class="hljs-string">&quot;Oranges&quot;</span>])
<span class="hljs-comment"># lmql.ScoringResult(model=&#39;openai/gpt-3.5-turbo-instruct&#39;)</span>
<span class="hljs-comment"># -World: -3.9417848587036133</span>
<span class="hljs-comment"># -Apples: -15.26676321029663</span>
<span class="hljs-comment"># -Oranges: -16.22640037536621</span>
</span></code></pre></div><p>The snippet above demonstrates the different components of the Generations API:</p><ul><li><p><strong><code>lmql.LLM</code></strong> At the core of the Generations API are <code>lmql.LLM</code> objects. Using the <code>lmql.model(...)</code> constructor, you can access a wide range of different models, as described in the <a href="./../models/">Models</a> chapter. This includes support for models running in the same process, in a separate worker process or cloud-based models available via a API endpoint.</p></li><li><p><a href="#lmql-generate"><strong><code>lmql.LLM.generate(...)</code></strong></a> is a simple function to generating text completions based on a given prompt. This can be helpful to quickly obtain single-step completions, or to generate a list of completions for a given prompt.</p></li><li><p><a href="#lmql-score"><strong><code>lmql.LLM.score(...)</code></strong></a> allows you to directly access the scores, your model assigns to the tokenized representation of your input prompt and continuations. This can be helpful for tasks such as classification or ranking.</p><p>The result is an <a href="https://github.com/eth-sri/lmql/blob/main/src/lmql/api/scoring.py" target="_blank" rel="noreferrer"><code>lmql.ScoringResult</code></a> object, which contains the scores for each continuation, as well as the prompt and continuations used for scoring. It provides a convenient interface for score aggregation, normalization and maximum selection.</p></li></ul><p><strong>Compatibility</strong> For more advanced use cases, the Generation API seamlessly blends with standard LMQL, allowing users to gradually adopt the full language runtime over time, if their use cases require it.</p><p><strong>Implementation</strong> Internally, the Generations API is implemented as a thin wrapper around LMQL, and thus benefits from all the features of LMQL, such as caching, parallelization, and more. The API is fully asynchronous, and should be used with <code>asyncio</code>. Alternatively, all API funcationality is also available synchronously, using the <code>*_sync</code> variants of the functions.</p><h2 id="lmql-llm-objects" tabindex="-1"><code>lmql.LLM</code> Objects <a class="header-anchor" href="#lmql-llm-objects" aria-label="Permalink to &quot;\`lmql.LLM\` Objects&quot;">​</a></h2><p>At the core, <code>lmql.LLM</code> objects represent a specific language model and provide methods for generation and scoring. An <code>lmql.LLM</code> is instantiated using <a href="./../models/"><code>lmql.model(...)</code></a> and can be passed <a href="./../models/#loading-models">as-is to LMQL query programs</a> or to the top-level <a href="#lmql-generate"><code>lmql.generate</code></a> and <a href="#lmql-score"><code>lmql.score</code></a> functions.</p><h3 id="llm-generate" tabindex="-1"><code>LLM.generate(...)</code> <a class="header-anchor" href="#llm-generate" aria-label="Permalink to &quot;\`LLM.generate(...)\`&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="hljs"><code><span class="line"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">generate</span>(<span class="hljs-params">
    self,
    prompt: <span class="hljs-built_in">str</span>, 
    max_tokens: <span class="hljs-type">Optional</span>[<span class="hljs-built_in">int</span>] = <span class="hljs-literal">None</span>, 
    decoder: <span class="hljs-built_in">str</span>,
    **kwargs
</span>) -&gt; <span class="hljs-type">Union</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]]
</span></code></pre></div><p>Generates a text completion based on a given prompt. Returns the full prompt + completion as one string.</p><p><strong>Arguments</strong></p><ul><li><code>prompt: str</code>: The prompt to generate from.</li><li><code>max_tokens: Optional[int]</code>: The maximum number of tokens to generate. If <code>None</code>, text is generated until the model returns an <em>end-of-sequence</em> token.</li><li><code>decoder: str</code>: The <a href="./../language/decoding.html">decoding algorithm</a> to use for generation. Defaults to <code>&quot;argmax&quot;</code>.</li><li><code>**kwargs</code>: Additional keyword arguments that are passed to the underlying LMQL query program. These can be useful to specify options like <code>chunksize</code>, decoder arguments like <code>n</code>, or any other model or decoder-specific arguments.</li></ul><p><strong>Return Value</strong> The function returns a string or a list of strings, depending on the decoder in use (<code>decoder=argmax</code> yields a single sequence, <code>decoder=&quot;sample&quot;, n=2</code> yields two sequences, etc.).</p><p><strong>Asynchronous</strong> The function is asynchronous and should be used with <a href="https://docs.python.org/3/library/asyncio.html" target="_blank" rel="noreferrer"><code>asyncio</code></a> and with <code>await</code>. When run in parallel, multiple generations will be batched and parallelized across multiple calls to the same model. For synchronous use, you can rely on <a href="#llm-generate_sync"><code>LLM.generate_sync</code></a>, note however, that in this case, the function will block the current thread until generation is complete.</p><h3 id="llm-generate-sync" tabindex="-1"><code>LLM.generate_sync(...)</code> <a class="header-anchor" href="#llm-generate-sync" aria-label="Permalink to &quot;\`LLM.generate_sync(...)\`&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="hljs"><code><span class="line"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_sync</span>(<span class="hljs-params">self, *args, **kwargs</span>):
</span></code></pre></div><p>Synchronous version of <a href="#llm-generate"><code>lmql.LLM.generate</code></a>.</p><h3 id="llm-score" tabindex="-1"><code>LLM.score(...)</code> <a class="header-anchor" href="#llm-score" aria-label="Permalink to &quot;\`LLM.score(...)\`&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="hljs"><code><span class="line"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">score</span>(<span class="hljs-params">
    self,
    prompt: <span class="hljs-built_in">str</span>,
    values: <span class="hljs-type">Union</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]]
</span>) -&gt; lmql.ScoringResult
</span></code></pre></div><p>Scores different continuation <code>values</code> for a given <code>prompt</code>.</p><p>For instance <code>await m.score(&quot;Hello&quot;, [&quot;World&quot;, &quot;Apples&quot;, &quot;Oranges&quot;])</code> would score the continuations <code>&quot;Hello World&quot;</code>, <code>&quot;Hello Apples&quot;</code> and <code>&quot;Hello Oranges&quot;</code>.</p><p><strong>Arguments</strong></p><ul><li><code>prompt</code>: The prompt to use as a common prefix for all continuations.</li><li><code>values</code>: The continuation values to score. This can be a single string or a list of strings.</li></ul><p><strong>Return Value</strong> The result is an <a href="https://github.com/eth-sri/lmql/blob/main/src/lmql/api/scoring.py" target="_blank" rel="noreferrer"><code>lmql.ScoringResult</code></a> object, which contains the scores for each continuation, as well as the prompt and continuations used for scoring. It provides a convenient interface for score aggregation, normalization and maximum selection.</p><p><strong>Asynchronous</strong> The function is asynchronous and should be used with <a href="https://docs.python.org/3/library/asyncio.html" target="_blank" rel="noreferrer"><code>asyncio</code></a> and with <code>await</code>. When run in parallel, multiple generations will be batched and parallelized across multiple calls to the same model. For synchronous use, you can rely on <a href="#llm-score-sync"><code>LLM.score_sync</code></a>.</p><h3 id="llm-score-sync" tabindex="-1"><code>LLM.score_sync(...)</code> <a class="header-anchor" href="#llm-score-sync" aria-label="Permalink to &quot;\`LLM.score_sync(...)\`&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="hljs"><code><span class="line"><span class="hljs-keyword">def</span> <span class="hljs-title function_">score_sync</span>(<span class="hljs-params">self, *args, **kwargs</span>)
</span></code></pre></div><p>Synchronous version of <a href="#llm-score"><code>lmql.LLM.score</code></a>.</p><h2 id="top-level-functions" tabindex="-1">Top-Level Functions <a class="header-anchor" href="#top-level-functions" aria-label="Permalink to &quot;Top-Level Functions&quot;">​</a></h2><p>The Generation API is also available directly in the top-level namespace of the <code>lmql</code> module. This allows for direct generation and scoring, without the need to instantiate an <code>lmql.LLM</code> object first.</p><h3 id="lmql-generate" tabindex="-1"><code>lmql.generate(...)</code> <a class="header-anchor" href="#lmql-generate" aria-label="Permalink to &quot;\`lmql.generate(...)\`&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="hljs"><code><span class="line"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">lmql</span>.generate(
    prompt: <span class="hljs-built_in">str</span>, 
    max_tokens: <span class="hljs-type">Optional</span>[<span class="hljs-built_in">int</span>] = <span class="hljs-literal">None</span>, 
    model: <span class="hljs-type">Optional</span>[<span class="hljs-type">Union</span>[LLM, <span class="hljs-built_in">str</span>]] = <span class="hljs-literal">None</span>, 
    **kwargs
) -&gt; <span class="hljs-type">Union</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]]
</span></code></pre></div><p><code>lmql.generate</code> generates text completions based on a given prompt and behaves just like <a href="#llm-generate"><code>LLM.generate</code></a>, with the provided <code>model</code> instance or model name.</p><p>If no <code>model</code> is provided, the default model is used. See <a href="#lmql-set_default_model"><code>lmql.set_default_model</code></a> for more information.</p><h3 id="lmql-generate-sync" tabindex="-1"><code>lmql.generate_sync(...)</code> <a class="header-anchor" href="#lmql-generate-sync" aria-label="Permalink to &quot;\`lmql.generate_sync(...)\`&quot;">​</a></h3><p>Synchronous version of <a href="#lmql-generate"><code>lmql.generate</code></a>.</p><h3 id="lmql-score" tabindex="-1"><code>lmql.score(...)</code> <a class="header-anchor" href="#lmql-score" aria-label="Permalink to &quot;\`lmql.score(...)\`&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="hljs"><code><span class="line"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">score</span>(<span class="hljs-params">
    prompt: <span class="hljs-built_in">str</span>,
    values: <span class="hljs-type">Union</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]],
    model: <span class="hljs-type">Optional</span>[<span class="hljs-type">Union</span>[<span class="hljs-built_in">str</span>, LLM]] = <span class="hljs-literal">None</span>, 
    **kwargs
</span>) -&gt; lmql.ScoringResult
</span></code></pre></div><p><code>lmql.score</code> scores different continuation <code>values</code> for a given <code>prompt</code> and behaves just like <a href="#llm-score"><code>LLM.score</code></a>, with the provided <code>model</code> instance or model name.</p><p>If no <code>model</code> is provided, the default model is used. See <a href="#lmql-set_default_model"><code>lmql.set_default_model</code></a> for more information.</p><h3 id="lmql-score-sync" tabindex="-1"><code>lmql.score_sync(...)</code> <a class="header-anchor" href="#lmql-score-sync" aria-label="Permalink to &quot;\`lmql.score_sync(...)\`&quot;">​</a></h3><p>Synchronous version of <a href="#lmql-score"><code>lmql.score</code></a>.</p><h3 id="lmql-set-default-model" tabindex="-1"><code>lmql.set_default_model(...)</code> <a class="header-anchor" href="#lmql-set-default-model" aria-label="Permalink to &quot;\`lmql.set_default_model(...)\`&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="hljs"><code><span class="line"><span class="hljs-keyword">def</span> <span class="hljs-title function_">set_default_model</span>(<span class="hljs-params">model: <span class="hljs-type">Union</span>[<span class="hljs-built_in">str</span>, LLM]</span>)
</span></code></pre></div><p>Sets the model to be used when no <code>from</code> clause or <code>@lmql.query(model=&lt;model&gt;)</code> are specified in LMQL. The default model applies globally in the current process and affects both LMQL queries and Generation API methods like <a href="#lmql-generate"><code>lmql.generate</code></a> and <a href="#lmql-score"><code>lmql.score</code></a> functions.</p><p>You can also specify the environment variable <code>LMQL_DEFAULT_MODEL</code> to set the default model.</p>`,52),t=[l];function c(r,i,p,d,h,m){return s(),a("div",null,t)}const f=e(o,[["render",c]]);export{g as __pageData,f as default};