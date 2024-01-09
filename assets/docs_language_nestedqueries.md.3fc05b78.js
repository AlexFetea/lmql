import{_ as n,o as e,c as o,Q as t,k as a,a as s}from"./chunks/framework.980cae92.js";const A=JSON.parse('{"title":"Nested Queries NEW","description":"","frontmatter":{},"headers":[],"relativePath":"docs/language/nestedqueries.md","filePath":"docs/language/nestedqueries.md"}'),p={name:"docs/language/nestedqueries.md"},d=t(`<h1 id="nested-queries-new" tabindex="-1">Nested Queries <span class="badge">NEW</span> <a class="header-anchor" href="#nested-queries-new" aria-label="Permalink to &quot;Nested Queries &lt;span class=&quot;badge&quot;&gt;NEW&lt;/span&gt;&quot;">​</a></h1><div class="subtitle">Modularize your query code with nested prompting.</div><p><em>Nested Queries</em> allow you to execute a query function within the context of another. By nesting multiple query functions, you can build complex programs from smaller, reusable components. For this, LMQL applies the idea of <a href="https://en.wikipedia.org/wiki/Procedural_programming" target="_blank" rel="noreferrer">procedural programming</a> to prompting.</p><p>To better understand this concept, let&#39;s take a look at a simple example:</p><div class="language-lmql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lmql</span><pre class="hljs"><code><span class="line"><span class="hljs-meta">@lmql.query</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">chain_of_thought</span>():
    <span class="hljs-inline-lmql"><span class="inline-lmql-delim">&#39;&#39;&#39;lmql</span>
    <span class="hljs-string">&quot;A: Let&#39;s think step by step.\\n <span class="hljs-placeholder">[REASONING]</span>&quot;</span>
    <span class="hljs-string">&quot;Therefore the answer is<span class="hljs-placeholder">[ANSWER]</span>&quot;</span> <span class="hljs-keyword">where</span> STOPS_AT(ANSWER, <span class="hljs-string">&quot;.&quot;</span>)
    <span class="hljs-keyword">return</span> ANSWER.strip()
    <span class="inline-lmql-delim">&#39;&#39;&#39;</span></span>

<span class="hljs-string">&quot;Q: It is August 12th, 2020. What date was it &quot;</span>
<span class="hljs-string">&quot;100 days ago? <span class="hljs-placeholder">[ANSWER: chain_of_thought]</span>&quot;</span>
</span></code></pre></div><p>Here, the placeholder variable <code>ANSWER</code> is annotated with a reference to query function <code>chain_of_thought</code>. This means a nested instantiation of query function <code>chain_of_thought</code> will be used to generate the value for <code>ANSWER</code>.</p><p>To understand how this behaves at runtime, consider the execution trace of this program:</p>`,7),l=a("div",{class:"language-promptdown vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"},"promptdown"),a("pre",{animate:"true","pd-text":`# Model Output
![_|Q: It is August 12th, 2020. What date was it 100 days ago?][@wait|800][@begin|incontext][chain_of_thought|A: Let's think step by step.][@wait|800][REASONING|100 days ago would be May 4th, 2020.] Therefore the answer is [@end|incontext][ANSWER|May 4th, 2020][@wait|800][@fade|incontext][@wait|800]
[:replay]`,__animate:"true","animate-speed":"50",class:"promptdown promptdown-compiled",style:{opacity:"1"}},[a("h1",{"pd-shadow-id":"203",text:" "}," Model Output"),a("p",{"pd-shadow-id":"205",text:"","pd-insertion-point":"true"},[a("span",{"pd-shadow-id":"206","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"207",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Q: It is August 12th, 2020. What date was it 100 days ago?")]),a("span",{"pd-shadow-id":"210","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"211",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"215","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-yellow"},[a("span",{"pd-shadow-id":"216",text:"b",class:"promptdown-var-name",style:{display:"none"}},"begin"),s("incontext")]),a("p",{"pd-shadow-id":"220",id:"incontext",text:"","pd-ignore-whitespace":"true",class:"promptdown-container faded",style:{display:"inline"}},[a("span",{"pd-shadow-id":"221","pd-instant":"false",text:"",class:"promptdown-var color-red"},[a("span",{"pd-shadow-id":"222",text:"c",class:"promptdown-var-name"},"chain_of_thought"),s("A: Let's think step by step.")]),a("span",{"pd-shadow-id":"226","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"227",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"231","pd-instant":"false",text:"",class:"promptdown-var color-yellow"},[a("span",{"pd-shadow-id":"232",text:"R",class:"promptdown-var-name"},"REASONING"),s("100 days ago would be May 4th, 2020.")]),s(" Therefore the answer is "),a("span",{"pd-shadow-id":"237","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-orange"},[a("span",{"pd-shadow-id":"238",text:"e",class:"promptdown-var-name",style:{display:"none"}},"end"),s("incontext")])]),a("span",{"pd-shadow-id":"242","pd-instant":"false",text:"",class:"promptdown-var color-ochre"},[a("span",{"pd-shadow-id":"243",text:"A",class:"promptdown-var-name"},"ANSWER"),s("May 4th, 2020")]),a("span",{"pd-shadow-id":"247","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"248",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"252","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-red"},[a("span",{"pd-shadow-id":"253",text:"f",class:"promptdown-var-name",style:{display:"none"}},"fade"),s("incontext")]),a("span",{"pd-shadow-id":"257","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"258",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),s(`
`)]),a("button",{onclick:"pd(this.parentElement)",class:"promptdown-button-replay"},"↺ Replay")])],-1),r=t(`<blockquote><p>You can press <em>Replay</em> to re-run the animation.</p></blockquote><p>To generate <code>ANSWER</code>, the additional prompt and constraints defined by <code>chain_of_thought</code> are inserted into our main query context. However, after <code>ANSWER</code> has been generated, the additional instructions are removed from the trace, leaving only the return value of the nested query call. This mechanic is comparable to a function&#39;s stack frame in procedural programming.</p><p>Nesting allows you to use variable-specific instructions that are only locally relevant, without interfering with other parts of the program, encapsulating the logic of your prompts into reusable components.</p><h2 id="parameterized-queries" tabindex="-1">Parameterized Queries <a class="header-anchor" href="#parameterized-queries" aria-label="Permalink to &quot;Parameterized Queries&quot;">​</a></h2><p>You can also pass parameters to nested queries, allowing you to customize their behavior:</p><div class="language-lmql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lmql</span><pre class="hljs"><code><span class="line"><span class="hljs-meta">@lmql.query</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">one_of</span>(<span class="hljs-params">choices: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-inline-lmql"><span class="inline-lmql-delim">&#39;&#39;&#39;lmql</span>
    <span class="hljs-string">&quot;Among <span class="hljs-subst">{choices}</span>, what do you consider \\
    most likely? <span class="hljs-placeholder">[ANSWER]</span>&quot;</span> <span class="hljs-keyword">where</span> ANSWER <span class="hljs-keyword">in</span> choices
    <span class="hljs-keyword">return</span> ANSWER
    <span class="inline-lmql-delim">&#39;&#39;&#39;</span></span>

<span class="hljs-string">&quot;Q: What is the capital of France? \\
 <span class="hljs-placeholder">[ANSWER: one_of([<span class="hljs-string">&#39;Paris&#39;</span>, <span class="hljs-string">&#39;London&#39;</span>, <span class="hljs-string">&#39;Berlin&#39;</span>]</span>)]&quot;</span>
</span></code></pre></div>`,6),i=a("div",{class:"language-promptdown vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"},"promptdown"),a("pre",{animate:"true","pd-text":`# Model Output
![_|Q: What is the capital of France?][@wait|800][@begin|incontext][one_of|Among \\['Paris', 'London', 'Berlin'\\], what do you consider most likely?][@end|incontext][@wait|800][ANSWER|Paris][@wait|800][@fade|incontext][@wait|800][:replay]`,__animate:"true","animate-speed":"50",class:"promptdown promptdown-compiled",style:{opacity:"1"}},[a("h1",{"pd-shadow-id":"265",text:" "}," Model Output"),a("p",{"pd-shadow-id":"267",text:"","pd-ignore-whitespace":"true","pd-insertion-point":"true"},[a("span",{"pd-shadow-id":"268","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"269",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Q: What is the capital of France?")]),a("span",{"pd-shadow-id":"272","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"273",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"277","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-yellow"},[a("span",{"pd-shadow-id":"278",text:"b",class:"promptdown-var-name",style:{display:"none"}},"begin"),s("incontext")]),a("p",{"pd-shadow-id":"282",id:"incontext",text:"","pd-ignore-whitespace":"true",class:"promptdown-container faded",style:{display:"inline"}},[a("span",{"pd-shadow-id":"283","pd-instant":"false",text:"",class:"promptdown-var color-red"},[a("span",{"pd-shadow-id":"284",text:"o",class:"promptdown-var-name"},"one_of"),s("Among ['Paris', 'London', 'Berlin'], what do you consider most likely?")]),a("span",{"pd-shadow-id":"288","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-orange"},[a("span",{"pd-shadow-id":"289",text:"e",class:"promptdown-var-name",style:{display:"none"}},"end"),s("incontext")])]),a("span",{"pd-shadow-id":"293","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"294",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"298","pd-instant":"false",text:"",class:"promptdown-var color-ochre"},[a("span",{"pd-shadow-id":"299",text:"A",class:"promptdown-var-name"},"ANSWER"),s("Paris")]),a("span",{"pd-shadow-id":"303","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"304",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"308","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-red"},[a("span",{"pd-shadow-id":"309",text:"f",class:"promptdown-var-name",style:{display:"none"}},"fade"),s("incontext")]),a("span",{"pd-shadow-id":"313","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"314",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")])]),a("button",{onclick:"pd(this.parentElement)",class:"promptdown-button-replay"},"↺ Replay")])],-1),c=t(`<p>For instance, here we employ <code>one_of</code> to generate the answer to a multiple-choice question. The <code>choices</code> are passed as a parameter to the nested query, allowing us to reuse the same code for different questions.</p><h2 id="multi-part-programs" tabindex="-1">Multi-Part Programs <a class="header-anchor" href="#multi-part-programs" aria-label="Permalink to &quot;Multi-Part Programs&quot;">​</a></h2><p>You can also use multiple nested queries in sequence, allowing you to repeatedly inject instructions into your prompt without interfering with the overall flow:</p><div class="language-lmql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lmql</span><pre class="hljs"><code><span class="line"><span class="hljs-meta">@lmql.query</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">dateformat</span>():
    <span class="hljs-inline-lmql"><span class="inline-lmql-delim">&#39;&#39;&#39;lmql</span>
    <span class="hljs-string">&quot;(respond in DD/MM/YYYY) <span class="hljs-placeholder">[ANSWER]</span>&quot;</span>
    <span class="hljs-keyword">return</span> ANSWER.strip()
    <span class="inline-lmql-delim">&#39;&#39;&#39;</span></span>

<span class="hljs-string">&quot;Q: When was Obama born? <span class="hljs-placeholder">[ANSWER: dateformat]</span>\\n&quot;</span>
<span class="hljs-string">&quot;Q: When was Bruno Mars born? <span class="hljs-placeholder">[ANSWER: dateformat]</span>\\n&quot;</span>
<span class="hljs-string">&quot;Q: When was Dua Lipa born? <span class="hljs-placeholder">[ANSWER: dateformat]</span>\\n&quot;</span>

<span class="hljs-string">&quot;Out of these, who was born last?<span class="hljs-placeholder">[LAST]</span>&quot;</span>
</span></code></pre></div>`,4),m=a("div",{class:"language-promptdown vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"},"promptdown"),a("pre",{animate:"true","pd-text":`# Model Output
![_|Q: When was Obama born?][@wait|200][@begin|incontext][dateformat|(respond in DD/MM/YYYY)][@end|incontext][@wait|200][ANSWER|04/08/1961][@wait|200][@fade|incontext][@wait|200][@hide|incontext][@wait|200]
![_|Q: When was Bruno Mars born?][@wait|200][@begin|incontext1][dateformat|(respond in DD/MM/YYYY)][@end|incontext1][@wait|200][ANSWER|08/10/1985][@wait|200][@fade|incontext1][@wait|200][@hide|incontext1][@wait|200]
![_|Q: When was Dua Lipa born?][@wait|200][@begin|incontext2][dateformat|(respond in DD/MM/YYYY)][@end|incontext2][@wait|200][ANSWER|22/08/1995][@wait|200][@fade|incontext2][@wait|200][@hide|incontext2][@wait|200]

[_|Out of these, who was born last?][LAST|Dua Lipa]
[:replay]`,__animate:"true","animate-speed":"50",class:"promptdown promptdown-compiled",style:{opacity:"1"}},[a("h1",{"pd-shadow-id":"320",text:" "}," Model Output"),a("p",{"pd-shadow-id":"322",text:"","pd-insertion-point":"true"},[a("span",{"pd-shadow-id":"323","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"324",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Q: When was Obama born?")]),a("span",{"pd-shadow-id":"327","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"328",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"332","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-yellow"},[a("span",{"pd-shadow-id":"333",text:"b",class:"promptdown-var-name",style:{display:"none"}},"begin"),s("incontext")]),a("p",{"pd-shadow-id":"337",id:"incontext",text:"","pd-ignore-whitespace":"true",class:"promptdown-container faded",style:{display:"none"}},[a("span",{"pd-shadow-id":"338","pd-instant":"false",text:"",class:"promptdown-var color-yellow"},[a("span",{"pd-shadow-id":"339",text:"d",class:"promptdown-var-name"},"dateformat"),s("(respond in DD/MM/YYYY)")]),a("span",{"pd-shadow-id":"343","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-orange"},[a("span",{"pd-shadow-id":"344",text:"e",class:"promptdown-var-name",style:{display:"none"}},"end"),s("incontext")])]),a("span",{"pd-shadow-id":"348","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"349",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"353","pd-instant":"false",text:"",class:"promptdown-var color-ochre"},[a("span",{"pd-shadow-id":"354",text:"A",class:"promptdown-var-name"},"ANSWER"),s("04/08/1961")]),a("span",{"pd-shadow-id":"358","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"359",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"363","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-red"},[a("span",{"pd-shadow-id":"364",text:"f",class:"promptdown-var-name",style:{display:"none"}},"fade"),s("incontext")]),a("span",{"pd-shadow-id":"368","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"369",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"373","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-ochre"},[a("span",{"pd-shadow-id":"374",text:"h",class:"promptdown-var-name",style:{display:"none"}},"hide"),s("incontext")]),a("span",{"pd-shadow-id":"378","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"379",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),s(`
`),a("span",{"pd-shadow-id":"384","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"385",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Q: When was Bruno Mars born?")]),a("span",{"pd-shadow-id":"388","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"389",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"393","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-yellow"},[a("span",{"pd-shadow-id":"394",text:"b",class:"promptdown-var-name",style:{display:"none"}},"begin"),s("incontext1")]),a("p",{"pd-shadow-id":"398",id:"incontext1",text:"","pd-ignore-whitespace":"true",class:"promptdown-container faded",style:{display:"none"}},[a("span",{"pd-shadow-id":"399","pd-instant":"false",text:"",class:"promptdown-var color-yellow"},[a("span",{"pd-shadow-id":"400",text:"d",class:"promptdown-var-name"},"dateformat"),s("(respond in DD/MM/YYYY)")]),a("span",{"pd-shadow-id":"404","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-orange"},[a("span",{"pd-shadow-id":"405",text:"e",class:"promptdown-var-name",style:{display:"none"}},"end"),s("incontext1")])]),a("span",{"pd-shadow-id":"409","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"410",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"414","pd-instant":"false",text:"",class:"promptdown-var color-ochre"},[a("span",{"pd-shadow-id":"415",text:"A",class:"promptdown-var-name"},"ANSWER"),s("08/10/1985")]),a("span",{"pd-shadow-id":"419","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"420",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"424","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-red"},[a("span",{"pd-shadow-id":"425",text:"f",class:"promptdown-var-name",style:{display:"none"}},"fade"),s("incontext1")]),a("span",{"pd-shadow-id":"429","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"430",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"434","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-ochre"},[a("span",{"pd-shadow-id":"435",text:"h",class:"promptdown-var-name",style:{display:"none"}},"hide"),s("incontext1")]),a("span",{"pd-shadow-id":"439","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"440",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),s(`
`),a("span",{"pd-shadow-id":"445","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"446",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Q: When was Dua Lipa born?")]),a("span",{"pd-shadow-id":"449","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"450",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"454","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-yellow"},[a("span",{"pd-shadow-id":"455",text:"b",class:"promptdown-var-name",style:{display:"none"}},"begin"),s("incontext2")]),a("p",{"pd-shadow-id":"459",id:"incontext2",text:"","pd-ignore-whitespace":"true",class:"promptdown-container faded",style:{display:"none"}},[a("span",{"pd-shadow-id":"460","pd-instant":"false",text:"",class:"promptdown-var color-yellow"},[a("span",{"pd-shadow-id":"461",text:"d",class:"promptdown-var-name"},"dateformat"),s("(respond in DD/MM/YYYY)")]),a("span",{"pd-shadow-id":"465","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-orange"},[a("span",{"pd-shadow-id":"466",text:"e",class:"promptdown-var-name",style:{display:"none"}},"end"),s("incontext2")])]),a("span",{"pd-shadow-id":"470","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"471",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"475","pd-instant":"false",text:"",class:"promptdown-var color-ochre"},[a("span",{"pd-shadow-id":"476",text:"A",class:"promptdown-var-name"},"ANSWER"),s("22/08/1995")]),a("span",{"pd-shadow-id":"480","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"481",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"485","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-red"},[a("span",{"pd-shadow-id":"486",text:"f",class:"promptdown-var-name",style:{display:"none"}},"fade"),s("incontext2")]),a("span",{"pd-shadow-id":"490","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"491",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"495","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-ochre"},[a("span",{"pd-shadow-id":"496",text:"h",class:"promptdown-var-name",style:{display:"none"}},"hide"),s("incontext2")]),a("span",{"pd-shadow-id":"500","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"501",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),s(`

`),a("span",{"pd-shadow-id":"506","pd-instant":"false",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"507",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Out of these, who was born last?")]),a("span",{"pd-shadow-id":"510","pd-instant":"false",text:"",class:"promptdown-var color-pink"},[a("span",{"pd-shadow-id":"511",text:"L",class:"promptdown-var-name"},"LAST"),s("Dua Lipa")]),s(`
`)]),a("button",{onclick:"pd(this.parentElement)",class:"promptdown-button-replay"},"↺ Replay")])],-1),h=t(`<p>We instruct the model to use a specific date format when answering our initial questions. Because of the use of <code>dateformat</code> as a nested function, the instructions are only temporarily included, once per generated answer, and removed before moving on to the next question.</p><p>Once we have generated all intermediate answers, we query the LLM to compare the individual dates and determine the latest one, where this last query is not affected by the instructions of <code>dateformat</code>.</p><h2 id="return-values" tabindex="-1">Return Values <a class="header-anchor" href="#return-values" aria-label="Permalink to &quot;Return Values&quot;">​</a></h2><p>If a query function does <em>not</em> return a value, calling it as nested function does <em>not</em> remove the inserted instructions after execution. The effect of a nested function without return value therefore corresponds to a macro expansion, as shown below:</p><p>This can be helpful when you want to use a fixed template in several locations, e.g. for list items. Further, as shown below, a nested function can also be parameterized to customize its behavior.</p><div class="language-lmql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lmql</span><pre class="hljs"><code><span class="line"><span class="hljs-meta">@lmql.query</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">items_list</span>(<span class="hljs-params">n: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-inline-lmql"><span class="inline-lmql-delim">&#39;&#39;&#39;lmql</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n):
        <span class="hljs-string">&quot;-<span class="hljs-placeholder">[ITEM]</span>&quot;</span> <span class="hljs-keyword">where</span> STOPS_AT(ITEM, <span class="hljs-string">&quot;\\n&quot;</span>)
    <span class="inline-lmql-delim">&#39;&#39;&#39;</span></span>

<span class="hljs-string">&quot;A list of things not to forget to pack for your \\
 next trip:\\n<span class="hljs-placeholder">[ITEMS: items_list(<span class="hljs-number">4</span>)]</span>&quot;</span>
</span></code></pre></div>`,6),w=a("div",{class:"language-promptdown vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"},"promptdown"),a("pre",{"pd-text":`![_|A list of things not to forget to pack for your next trip:]
![ITEM|- Passport]
![ITEM|- Toothbrush]
![ITEM|- Phone charger]
![ITEM|- Sunscreen]
`,animate:"true",__animate:"true","animate-speed":"50",class:"promptdown promptdown-compiled",style:{opacity:"1"}},[a("p",{"pd-shadow-id":"517",text:"","pd-insertion-point":"true"},[a("span",{"pd-shadow-id":"518","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"519",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("A list of things not to forget to pack for your next trip:")]),s(`
`),a("span",{"pd-shadow-id":"523","pd-instant":"true",text:"",class:"promptdown-var color-lightorange"},[a("span",{"pd-shadow-id":"524",text:"I",class:"promptdown-var-name"},"ITEM"),s("- Passport")]),s(`
`),a("span",{"pd-shadow-id":"529","pd-instant":"true",text:"",class:"promptdown-var color-lightorange"},[a("span",{"pd-shadow-id":"530",text:"I",class:"promptdown-var-name"},"ITEM"),s("- Toothbrush")]),s(`
`),a("span",{"pd-shadow-id":"535","pd-instant":"true",text:"",class:"promptdown-var color-lightorange"},[a("span",{"pd-shadow-id":"536",text:"I",class:"promptdown-var-name"},"ITEM"),s("- Phone charger")]),s(`
`),a("span",{"pd-shadow-id":"541","pd-instant":"true",text:"",class:"promptdown-var color-lightorange"},[a("span",{"pd-shadow-id":"542",text:"I",class:"promptdown-var-name"},"ITEM"),s("- Sunscreen")]),s(`
`)])])],-1),u=t(`<h2 id="nested-queries-in-python" tabindex="-1">Nested Queries in Python <a class="header-anchor" href="#nested-queries-in-python" aria-label="Permalink to &quot;Nested Queries in Python&quot;">​</a></h2><p>To use nested queries from a Python context, you can just reference one <code>@lmql.query</code> function from another.</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="hljs"><code><span class="line"><span class="hljs-meta">@lmql.query</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">dateformat</span>():
    <span class="hljs-inline-lmql"><span style="opacity:0.4;">&#39;&#39;&#39;lmql</span>
    <span class="hljs-string">&quot;(respond in DD/MM/YYYY)<span class="hljs-placeholder">[ANSWER]</span>&quot;</span>
    <span class="hljs-keyword">return</span> ANSWER.strip()
    &#39;&#39;&#39;</span>

<span class="hljs-meta">@lmql.query</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">main_query</span>():
    <span class="hljs-inline-lmql">&#39;&#39;&#39;lmql
    <span class="hljs-string">&quot;Q: It is August 12th, 2020. What date was it \\
    100 days ago? <span class="hljs-placeholder">[ANSWER: dateformat]</span>&quot;</span>
    &#39;&#39;&#39;</span>
</span></code></pre></div><p>Here, <code>main_query</code> references <code>dateformat</code> as a nested query, where both functions are defined on the top level of the same file. However, you can also import and reuse query code from other files, as long as they are accessible from the scope of you main query function. Using this ability you can write libraries of reusable query functions to be used across your application or even by other users.</p>`,4),y=[d,l,r,i,c,m,h,w,u];function f(x,v,g,_,q,b){return e(),o("div",null,y)}const k=n(p,[["render",f]]);export{A as __pageData,k as default};