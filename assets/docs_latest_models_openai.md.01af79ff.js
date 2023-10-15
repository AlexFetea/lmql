import{_ as e,o as a,c as s,Q as t}from"./chunks/framework.4636910e.js";const g=JSON.parse('{"title":"OpenAI","description":"","frontmatter":{"order":3},"headers":[],"relativePath":"docs/latest/models/openai.md","filePath":"docs/latest/models/openai.md"}'),n={name:"docs/latest/models/openai.md"},o=t(`<h1 id="openai" tabindex="-1">OpenAI <a class="header-anchor" href="#openai" aria-label="Permalink to &quot;OpenAI&quot;">​</a></h1><p>LMQL also supports models available via the OpenAI Completions or Chat API, e.g., GPT-3.5 variants, ChatGPT, and GPT-4. LMQL also supports Azure OpenAI models, discussed in more detail in <a href="./azure.html">Azure OpenAI</a>.</p><p>The following models were tested to work with LMQL, with the corresponding model identifier being used as <code>lmql.model(...)</code> or in the <code>from</code> clause of a query:</p><h3 id="completions-api" tabindex="-1">Completions API <a class="header-anchor" href="#completions-api" aria-label="Permalink to &quot;Completions API&quot;">​</a></h3><ul><li><code>openai/text-ada-001</code></li><li><code>openai/text-curie-001</code></li><li><code>openai/text-babbage-001</code></li><li><code>openai/text-davinci-00[1-3]</code></li><li><code>openai/gpt-3.5-turbo-instruct</code></li></ul><h3 id="chat-api-support" tabindex="-1">Chat API Support <a class="header-anchor" href="#chat-api-support" aria-label="Permalink to &quot;Chat API Support&quot;">​</a></h3><ul><li><code>openai/gpt-3.5-turbo</code> also available as <code>chatgpt</code></li><li><code>openai/gpt-4</code> also available as <code>gpt-4</code></li></ul><br><div class="info custom-block"><p class="custom-block-title">Chat API Limitations</p><p>Due to API limitations, <em>Chat API</em> models do not offer full support for LMQL constraints. The reason for this is that the Chat API in its current form is too restrictive. Nevertheless, simple constraints such as <code>STOPS_AT</code>, <code>STOPS_BEFORE</code>, and <code>len(TOKENS(...)) &lt; N</code> are still available, as well as LMQL&#39;s other features such as intermediate instructions and scripted prompting.</p><p>For more details on the limitations of the Chat API, please refer to the <a href="#openai-api-limitations">OpenAI API Limitations</a> section.</p></div><h2 id="configuring-openai-api-credentials" tabindex="-1">Configuring OpenAI API Credentials <a class="header-anchor" href="#configuring-openai-api-credentials" aria-label="Permalink to &quot;Configuring OpenAI API Credentials&quot;">​</a></h2><p>If you want to use OpenAI models, you have to configure your API credentials. To do so you can either define the <code>OPENAI_API_KEY</code> environment variable:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="hljs"><code><span class="line">export OPENAI_API_KEY=&lt;your key&gt;
</span></code></pre></div><p>or create a file <code>api.env</code> in the active working directory, with the following contents:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="hljs"><code><span class="line">openai-org: &lt;org identifier&gt;
openai-secret: &lt;api secret&gt;
</span></code></pre></div><p>For system-wide configuration, you can also create an <code>api.env</code> file at <code>$HOME/.lmql/api.env</code> or at the project root of your LMQL distribution (e.g. <code>src/</code> in a development copy).</p><p>Lastly, you can also use LMQL-specific environment variables <code>LMQL_OPENAI_SECRET</code> and <code>LMQL_OPENAI_ORG</code>, which take precedence over the <code>OPENAI_API_KEY</code> environment variable.</p><h2 id="monitoring-openai-api-use" tabindex="-1">Monitoring OpenAI API use <a class="header-anchor" href="#monitoring-openai-api-use" aria-label="Permalink to &quot;Monitoring OpenAI API use&quot;">​</a></h2><p>When working with OpenAI models, it is important to keep track of your API usage. LMQL offers a couple of ways to see what is happening internally and how many API calls are being made.</p><h3 id="playground" tabindex="-1">Playground <a class="header-anchor" href="#playground" aria-label="Permalink to &quot;Playground&quot;">​</a></h3><p>In the playground in the bottom right of the query editor, you can see real-time query statistics, including no. of requests, tokens and estimated cost when using OpenAI models:</p><img src="https://user-images.githubusercontent.com/17903049/233836413-7e8ac978-4038-4b8e-a690-7090d8695513.png" height="50"><p>This information is automatically updated as your query is being executed. If you want to see the same information in Python, you can use the following snippet.</p><h3 id="usage-statistics-in-python" tabindex="-1">Usage Statistics in Python <a class="header-anchor" href="#usage-statistics-in-python" aria-label="Permalink to &quot;Usage Statistics in Python&quot;">​</a></h3><p>To obtain the same information in Python, you can use the following snippet:</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="hljs"><code><span class="line"><span class="hljs-keyword">from</span> lmql.runtime.bopenai <span class="hljs-keyword">import</span> get_stats
<span class="hljs-built_in">print</span>(get_stats())
<span class="hljs-comment"># OpenAI API Stats: 1 requests, 0 errors, 9 tokens, 1.0 average batch size</span>
</span></code></pre></div><p>The <code>tokens</code> metric here refers to the number of tokens that were consumed and generated by the model.</p><h3 id="api-request-logging" tabindex="-1">API Request Logging <a class="header-anchor" href="#api-request-logging" aria-label="Permalink to &quot;API Request Logging&quot;">​</a></h3><p>Additionally, you may be interested in seeing the actual API requests that are made in the background. To show these, there is a decoder option <code>verbose=True</code>, which enables verbose logging and will print all OpenAI request payloads console, e.g. a query like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="hljs"><code><span class="line"><span class="hljs-keyword">argmax</span>(verbose=<span class="hljs-literal">True</span>) <span class="hljs-string">&quot;Hello<span class="hljs-placeholder">[WHO]</span>&quot;</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;openai/text-ada-001&quot;</span> <span class="hljs-keyword">where</span> STOPS_AT(WHO, <span class="hljs-string">&quot;\\n&quot;</span>)

model-output::
Completion <span class="hljs-keyword">with</span> {<span class="hljs-string">&#39;model&#39;</span>: <span class="hljs-string">&#39;text-ada-001&#39;</span>, <span class="hljs-string">&#39;prompt&#39;</span>: \\[<span class="hljs-number">550256</span>, <span class="hljs-number">15496</span>], <span class="hljs-string">&#39;max_tokens&#39;</span>: <span class="hljs-number">64</span>, <span class="hljs-string">&#39;temperature&#39;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&#39;logprobs&#39;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&#39;user&#39;</span>: <span class="hljs-string">&#39;lmql&#39;</span>, <span class="hljs-string">&#39;stream&#39;</span>: <span class="hljs-literal">True</span>, <span class="hljs-string">&#39;echo&#39;</span>: <span class="hljs-literal">True</span>}
</span></code></pre></div><h2 id="configuring-speculative-openai-api-use" tabindex="-1">Configuring Speculative OpenAI API Use <a class="header-anchor" href="#configuring-speculative-openai-api-use" aria-label="Permalink to &quot;Configuring Speculative OpenAI API Use&quot;">​</a></h2><p>To integrate the OpenAI API with LMQL, we rely on speculative prediction, where LMQL applies token masking and stopping conditions less eagerly, to save API calls.</p><p>To achieve this, output is generated in chunks, where each chunk is verified to satisfy the constraints before generation continues. The chunk size can be configured by passing <code>chunksize</code> parameter in the decoding clause like so:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="hljs"><code><span class="line"><span class="hljs-keyword">argmax</span>(chunksize=<span class="hljs-number">128</span>)
    <span class="hljs-string">&quot;The quick brown fox jumps over the<span class="hljs-placeholder">[COMPLETION]</span>&quot;</span>
<span class="hljs-keyword">from</span>
    <span class="hljs-string">&quot;openai/text-ada-001&quot;</span>
<span class="hljs-keyword">where</span>
    STOPS_AT(COMPLETION, <span class="hljs-string">&quot;.&quot;</span>)
</span></code></pre></div><p>By default, the chunk size is set to 32. This value is chosen based on the consideration, that a very large chunk size means that LMQL potentially has to discard many generated tokens (which is expensive), if a constraint is violated early on. However, if a query has few or only stopping phrase constraints, a larger chunk size may be beneficial for overall query cost. In general, if a query requires multiple long, uninterrupted sequences to be generated without imposing many constraints, a larger chunk size is recommended.</p><h2 id="openai-api-limitations" tabindex="-1">OpenAI API Limitations <a class="header-anchor" href="#openai-api-limitations" aria-label="Permalink to &quot;OpenAI API Limitations&quot;">​</a></h2><p>Unfortunately, the OpenAI API Completions and Chat API are severely limited in terms of token masking and the availability of the token distribution per predicted token. LMQL tries to leverage these APIs as much as possible, but there are some limitations that we have to work around and may affect users:</p><ul><li><p>The <strong>OpenAI Completion API limits the number of possible logit biases to 300</strong>. This means, if your constraints induce token masks that are larger than 300 tokens, LMQL will automatically truncate the token mask to the first 300 tokens. This may lead to unexpected behavior, e.g., model performance may be worse than expected as the masks are truncated to be more restrictive than necessary. In cases where the 300 biases limit is exceeded, LMQL prints a warning message to the console, indicating that the logit biases were truncated.</p></li><li><p>The <strong>OpenAI Completions API only provides the top-5 logprobs per predicted token</strong>. This means that decoding algorithms that explore e.g. the top-n probabilities to make decisions like beam search, are limited to a branching factor of 5.</p></li><li><p>The <strong>OpenAI Chat API does not provide a way to obtain token distributions or generate/continue partial responses (ChatGPT, GPT-4)</strong>. Simple constraints can still be enforced, as the LMQL runtime optimizes them to fit the OpenAI API. However, more complex constraints may not be enforceable. In these cases, LMQL will print a error message to the console. As a workaround users may then adjust their constraints to fit these API limitations or resort to post-processing and backtracking. Scripted prompting, intermediate instructions and simple constraints are still supported with Chat API models, nonetheless.</p></li></ul>`,37),i=[o];function r(l,p,c,h,d,u){return a(),s("div",null,i)}const b=e(n,[["render",r]]);export{g as __pageData,b as default};