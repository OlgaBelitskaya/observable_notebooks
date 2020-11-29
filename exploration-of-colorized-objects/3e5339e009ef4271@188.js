// https://observablehq.com/@olgabelitskaya/exploration-of-colorized-objects@188
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Exploration of Colorized Objects`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## 🤖 Markdown Cells & HTML Elements`
)});
  main.variable(observer()).define(["md","colorized_text","canvas_text","animated_line","make_data"], function(md,colorized_text,canvas_text,animated_line,make_data){return(
md`### Graphics & Text Examples: 
* ${colorized_text('hello')} - a text row;
* ${canvas_text('color gradient')} - a canvas text;
* ${animated_line(make_data(60))} - a chart inline;
<br/><br/>`
)});
  main.variable(observer("make_data")).define("make_data", ["d3"], function(d3){return(
function make_data(n) {
  return d3.range(n).map(i=>Math.sin(i)*Math.random())}
)});
  main.variable(observer("colorized_text")).define("colorized_text", ["html","d3","now"], function(html,d3,now){return(
function colorized_text(string) {
  const t=html`<text style='font-family:Verdana; 
                 font-size:24px;'>${string}</text>`;
  t.style.color=d3.interpolateSinebow(now/3000);
  return t;}
)});
  main.variable(observer("canvas_text")).define("canvas_text", ["DOM"], function(DOM){return(
function canvas_text(string,width=170,height=50) {
  const context=DOM.context2d(width,height);
  context.font='24px Verdana';
  const gradient=context.createLinearGradient(0,0,width,0);
  gradient.addColorStop('0','#3636ff');
  gradient.addColorStop('.5','#ff36ff');
  gradient.addColorStop('1.','#ff3636');
  context.strokeStyle=gradient;
  context.strokeText(string,0,30);
  return context.canvas;}
)});
  main.variable(observer("animated_line")).define("animated_line", ["d3","DOM","now"], function(d3,DOM,now){return(
function animated_line(values,width=100,height=50) {
  const x=d3.scaleLinear().domain([0,values.length-1])
            .range([1,width-1]),
        y=d3.scaleLinear().domain(d3.extent(values))
            .range([height-1,1]);
  const context=DOM.context2d(width,height);
  const line=d3.line().x((d,i)=>x(i)).y(y).context(context);
  context.strokeStyle=d3.interpolateSinebow(now/6000);
  context.beginPath(),line(values),context.stroke(); 
  return context.canvas;}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
