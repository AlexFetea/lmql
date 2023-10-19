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
[:replay]`,__animate:"true","animate-speed":"50",class:"promptdown promptdown-compiled",style:{opacity:"1"}},[a("h1",{"pd-shadow-id":"262",text:" "}," Model Output"),a("p",{"pd-shadow-id":"264",text:"","pd-insertion-point":"true"},[a("span",{"pd-shadow-id":"265","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"266",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Q: It is August 12th, 2020. What date was it 100 days ago?")]),a("span",{"pd-shadow-id":"269","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"270",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"274","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-yellow"},[a("span",{"pd-shadow-id":"275",text:"b",class:"promptdown-var-name",style:{display:"none"}},"begin"),s("incontext")]),a("p",{"pd-shadow-id":"279",id:"incontext",text:"","pd-ignore-whitespace":"true",class:"promptdown-container faded",style:{display:"inline"}},[a("span",{"pd-shadow-id":"280","pd-instant":"false",text:"",class:"promptdown-var color-red"},[a("span",{"pd-shadow-id":"281",text:"c",class:"promptdown-var-name"},"chain_of_thought"),s("A: Let's think step by step.")]),a("span",{"pd-shadow-id":"285","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"286",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"290","pd-instant":"false",text:"",class:"promptdown-var color-yellow"},[a("span",{"pd-shadow-id":"291",text:"R",class:"promptdown-var-name"},"REASONING"),s("100 days ago would be May 4th, 2020.")]),s(" Therefore the answer is "),a("span",{"pd-shadow-id":"296","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-orange"},[a("span",{"pd-shadow-id":"297",text:"e",class:"promptdown-var-name",style:{display:"none"}},"end"),s("incontext")])]),a("span",{"pd-shadow-id":"301","pd-instant":"false",text:"",class:"promptdown-var color-ochre"},[a("span",{"pd-shadow-id":"302",text:"A",class:"promptdown-var-name"},"ANSWER"),s("May 4th, 2020")]),a("span",{"pd-shadow-id":"306","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"307",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"311","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-red"},[a("span",{"pd-shadow-id":"312",text:"f",class:"promptdown-var-name",style:{display:"none"}},"fade"),s("incontext")]),a("span",{"pd-shadow-id":"316","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"317",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),s(`
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
![_|Q: What is the capital of France?][@wait|800][@begin|incontext][one_of|Among \\['Paris', 'London', 'Berlin'\\], what do you consider most likely?][@end|incontext][@wait|800][ANSWER|Paris][@wait|800][@fade|incontext][@wait|800][:replay]`,__animate:"true","animate-speed":"50",class:"promptdown promptdown-compiled",style:{opacity:"1"}},[a("h1",{"pd-shadow-id":"324",text:" "}," Model Output"),a("p",{"pd-shadow-id":"326",text:"","pd-ignore-whitespace":"true","pd-insertion-point":"true"},[a("span",{"pd-shadow-id":"327","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"328",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Q: What is the capital of France?")]),a("span",{"pd-shadow-id":"331","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"332",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"336","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-yellow"},[a("span",{"pd-shadow-id":"337",text:"b",class:"promptdown-var-name",style:{display:"none"}},"begin"),s("incontext")]),a("p",{"pd-shadow-id":"341",id:"incontext",text:"","pd-ignore-whitespace":"true",class:"promptdown-container faded",style:{display:"inline"}},[a("span",{"pd-shadow-id":"342","pd-instant":"false",text:"",class:"promptdown-var color-red"},[a("span",{"pd-shadow-id":"343",text:"o",class:"promptdown-var-name"},"one_of"),s("Among ['Paris', 'London', 'Berlin'], what do you consider most likely?")]),a("span",{"pd-shadow-id":"347","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-orange"},[a("span",{"pd-shadow-id":"348",text:"e",class:"promptdown-var-name",style:{display:"none"}},"end"),s("incontext")])]),a("span",{"pd-shadow-id":"352","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"353",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"357","pd-instant":"false",text:"",class:"promptdown-var color-ochre"},[a("span",{"pd-shadow-id":"358",text:"A",class:"promptdown-var-name"},"ANSWER"),s("Paris")]),a("span",{"pd-shadow-id":"362","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"363",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")]),a("span",{"pd-shadow-id":"367","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-red"},[a("span",{"pd-shadow-id":"368",text:"f",class:"promptdown-var-name",style:{display:"none"}},"fade"),s("incontext")]),a("span",{"pd-shadow-id":"372","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"373",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("800")])]),a("button",{onclick:"pd(this.parentElement)",class:"promptdown-button-replay"},"↺ Replay")])],-1),c=t(`<p>For instance, here we employ <code>one_of</code> to generate the answer to a multiple-choice question. The <code>choices</code> are passed as a parameter to the nested query, allowing us to reuse the same code for different questions.</p><h2 id="multi-part-programs" tabindex="-1">Multi-Part Programs <a class="header-anchor" href="#multi-part-programs" aria-label="Permalink to &quot;Multi-Part Programs&quot;">​</a></h2><p>You can also use multiple nested queries in sequence, allowing you to repeatedly inject instructions into your prompt without interfering with the overall flow:</p><div class="language-lmql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lmql</span><pre class="hljs"><code><span class="line"><span class="hljs-meta">@lmql.query</span>
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
[:replay]`,__animate:"true","animate-speed":"50",class:"promptdown promptdown-compiled",style:{opacity:"1"}},[a("h1",{"pd-shadow-id":"379",text:" "}," Model Output"),a("p",{"pd-shadow-id":"381",text:"","pd-insertion-point":"true"},[a("span",{"pd-shadow-id":"382","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"383",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Q: When was Obama born?")]),a("span",{"pd-shadow-id":"386","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"387",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"391","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-yellow"},[a("span",{"pd-shadow-id":"392",text:"b",class:"promptdown-var-name",style:{display:"none"}},"begin"),s("incontext")]),a("p",{"pd-shadow-id":"396",id:"incontext",text:"","pd-ignore-whitespace":"true",class:"promptdown-container faded",style:{display:"none"}},[a("span",{"pd-shadow-id":"397","pd-instant":"false",text:"",class:"promptdown-var color-yellow"},[a("span",{"pd-shadow-id":"398",text:"d",class:"promptdown-var-name"},"dateformat"),s("(respond in DD/MM/YYYY)")]),a("span",{"pd-shadow-id":"402","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-orange"},[a("span",{"pd-shadow-id":"403",text:"e",class:"promptdown-var-name",style:{display:"none"}},"end"),s("incontext")])]),a("span",{"pd-shadow-id":"407","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"408",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"412","pd-instant":"false",text:"",class:"promptdown-var color-ochre"},[a("span",{"pd-shadow-id":"413",text:"A",class:"promptdown-var-name"},"ANSWER"),s("04/08/1961")]),a("span",{"pd-shadow-id":"417","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"418",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"422","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-red"},[a("span",{"pd-shadow-id":"423",text:"f",class:"promptdown-var-name",style:{display:"none"}},"fade"),s("incontext")]),a("span",{"pd-shadow-id":"427","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"428",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"432","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-ochre"},[a("span",{"pd-shadow-id":"433",text:"h",class:"promptdown-var-name",style:{display:"none"}},"hide"),s("incontext")]),a("span",{"pd-shadow-id":"437","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"438",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),s(`
`),a("span",{"pd-shadow-id":"443","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"444",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Q: When was Bruno Mars born?")]),a("span",{"pd-shadow-id":"447","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"448",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"452","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-yellow"},[a("span",{"pd-shadow-id":"453",text:"b",class:"promptdown-var-name",style:{display:"none"}},"begin"),s("incontext1")]),a("p",{"pd-shadow-id":"457",id:"incontext1",text:"","pd-ignore-whitespace":"true",class:"promptdown-container faded",style:{display:"none"}},[a("span",{"pd-shadow-id":"458","pd-instant":"false",text:"",class:"promptdown-var color-yellow"},[a("span",{"pd-shadow-id":"459",text:"d",class:"promptdown-var-name"},"dateformat"),s("(respond in DD/MM/YYYY)")]),a("span",{"pd-shadow-id":"463","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-orange"},[a("span",{"pd-shadow-id":"464",text:"e",class:"promptdown-var-name",style:{display:"none"}},"end"),s("incontext1")])]),a("span",{"pd-shadow-id":"468","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"469",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"473","pd-instant":"false",text:"",class:"promptdown-var color-ochre"},[a("span",{"pd-shadow-id":"474",text:"A",class:"promptdown-var-name"},"ANSWER"),s("08/10/1985")]),a("span",{"pd-shadow-id":"478","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"479",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"483","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-red"},[a("span",{"pd-shadow-id":"484",text:"f",class:"promptdown-var-name",style:{display:"none"}},"fade"),s("incontext1")]),a("span",{"pd-shadow-id":"488","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"489",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"493","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-ochre"},[a("span",{"pd-shadow-id":"494",text:"h",class:"promptdown-var-name",style:{display:"none"}},"hide"),s("incontext1")]),a("span",{"pd-shadow-id":"498","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"499",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),s(`
`),a("span",{"pd-shadow-id":"504","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"505",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Q: When was Dua Lipa born?")]),a("span",{"pd-shadow-id":"508","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"509",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"513","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-yellow"},[a("span",{"pd-shadow-id":"514",text:"b",class:"promptdown-var-name",style:{display:"none"}},"begin"),s("incontext2")]),a("p",{"pd-shadow-id":"518",id:"incontext2",text:"","pd-ignore-whitespace":"true",class:"promptdown-container faded",style:{display:"none"}},[a("span",{"pd-shadow-id":"519","pd-instant":"false",text:"",class:"promptdown-var color-yellow"},[a("span",{"pd-shadow-id":"520",text:"d",class:"promptdown-var-name"},"dateformat"),s("(respond in DD/MM/YYYY)")]),a("span",{"pd-shadow-id":"524","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-orange"},[a("span",{"pd-shadow-id":"525",text:"e",class:"promptdown-var-name",style:{display:"none"}},"end"),s("incontext2")])]),a("span",{"pd-shadow-id":"529","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"530",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"534","pd-instant":"false",text:"",class:"promptdown-var color-ochre"},[a("span",{"pd-shadow-id":"535",text:"A",class:"promptdown-var-name"},"ANSWER"),s("22/08/1995")]),a("span",{"pd-shadow-id":"539","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"540",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"544","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-red"},[a("span",{"pd-shadow-id":"545",text:"f",class:"promptdown-var-name",style:{display:"none"}},"fade"),s("incontext2")]),a("span",{"pd-shadow-id":"549","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"550",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),a("span",{"pd-shadow-id":"554","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-ochre"},[a("span",{"pd-shadow-id":"555",text:"h",class:"promptdown-var-name",style:{display:"none"}},"hide"),s("incontext2")]),a("span",{"pd-shadow-id":"559","pd-instant":"false","pd-cmd":"true",text:"",class:"promptdown-var cmd color-pink"},[a("span",{"pd-shadow-id":"560",text:"w",class:"promptdown-var-name",style:{display:"none"}},"wait"),s("200")]),s(`

`),a("span",{"pd-shadow-id":"565","pd-instant":"false",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"566",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("Out of these, who was born last?")]),a("span",{"pd-shadow-id":"569","pd-instant":"false",text:"",class:"promptdown-var color-pink"},[a("span",{"pd-shadow-id":"570",text:"L",class:"promptdown-var-name"},"LAST"),s("Dua Lipa")]),s(`
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
`,animate:"true",__animate:"true","animate-speed":"50",class:"promptdown promptdown-compiled",style:{opacity:"1"}},[a("p",{"pd-shadow-id":"576",text:"","pd-insertion-point":"true"},[a("span",{"pd-shadow-id":"577","pd-instant":"true",text:"",class:"promptdown-var color-none"},[a("span",{"pd-shadow-id":"578",text:"",class:"promptdown-var-name",style:{display:"none"}}),s("A list of things not to forget to pack for your next trip:")]),s(`
`),a("span",{"pd-shadow-id":"582","pd-instant":"true",text:"",class:"promptdown-var color-lightorange"},[a("span",{"pd-shadow-id":"583",text:"I",class:"promptdown-var-name"},"ITEM"),s("- Passport")]),s(`
`),a("span",{"pd-shadow-id":"588","pd-instant":"true",text:"",class:"promptdown-var color-lightorange"},[a("span",{"pd-shadow-id":"589",text:"I",class:"promptdown-var-name"},"ITEM"),s("- Toothbrush")]),s(`
`),a("span",{"pd-shadow-id":"594","pd-instant":"true",text:"",class:"promptdown-var color-lightorange"},[a("span",{"pd-shadow-id":"595",text:"I",class:"promptdown-var-name"},"ITEM"),s("- Phone charger")]),s(`
`),a("span",{"pd-shadow-id":"600","pd-instant":"true",text:"",class:"promptdown-var color-lightorange"},[a("span",{"pd-shadow-id":"601",text:"I",class:"promptdown-var-name"},"ITEM"),s("- Sunscreen")]),s(`
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