// https://observablehq.com/@olgabelitskaya/exploration-of-colorized-objects@406
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Exploration of Colorized Objects`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## 🤖 Markdown Cells & HTML Elements`
)});
  main.variable(observer()).define(["md","colorized_text","highlighted_text","canvas_text","animated_line","sample_data","make_data","canvas_circle"], function(md,colorized_text,highlighted_text,canvas_text,animated_line,sample_data,make_data,canvas_circle){return(
md`### Graphics & Text Examples: 

* ${colorized_text('color interpolation')} - a text row;

* ${highlighted_text('highlight interpolation')} - another text row;

* ${canvas_text('color gradient')} - a canvas text;

* ${animated_line(sample_data)} - a chart inline;

* ${animated_line(make_data(60))} - an animated chart inline;

* ${canvas_circle(4,8)} - canvas drawing.
<br/><br/>`
)});
  main.variable(observer("make_data")).define("make_data", ["d3"], function(d3){return(
function make_data(n) {
  return d3.range(n).map(i=>Math.sin(i)*Math.random())}
)});
  main.variable(observer("sample_data")).define("sample_data", ["make_data"], function(make_data){return(
make_data(60)
)});
  main.variable(observer("highlighted_text")).define("highlighted_text", ["html","d3","now"], function(html,d3,now){return(
function highlighted_text(string) {
  const t=html`
    <style>
      .highlight {color:white; 
                  font-size:22px; font-family:Verdana;}
    </style>
    <text class='highlight'>${string}</text>`;
  t.style.background=d3.interpolateSinebow(now/3000);
  return t;}
)});
  main.variable(observer("colorized_text")).define("colorized_text", ["html","d3","now"], function(html,d3,now){return(
function colorized_text(string) {
  const t=html`<text style='font-family:Verdana; 
                 font-size:22px;'>${string}</text>`;
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
  main.variable(observer("canvas_circle")).define("canvas_circle", ["DOM","now","d3"], function(DOM,now,d3){return(
function canvas_circle(r,k) {
  const context=DOM.context2d(2*r*k,2*r*k);
  for (let radius=r; radius<r*k; radius+=r) {
    context.beginPath();
    context.arc(r*k,r*k,radius,0,2*Math.PI);
    context.stroke();
    const coef=radius/(2*r*k)+now/3000
    context.strokeStyle=d3.interpolateSinebow(coef);}
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
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
.emo {font-size:300%;}
.trans,.comb {margin:0; color:transparent;
              text-shadow:0 0 5px #3636ff; 
              font-size:300%; position:relative;}
.trans::before {content:attr(title); position:absolute; 
                text-shadow:0 0 0 white;}   
.comb::before {content:attr(title); position:absolute; 
               text-shadow:0 0 0 slategray;}
</style>
<emoji class='trans' title='&#x1F985'>&#x1F985</emoji>
&nbsp;<emoji class='comb' title='&#x1F985'>&#x1F3A1</emoji>
&nbsp;<text class='emo'>&#x1F985</text> &nbsp; &nbsp;
<emoji class='trans' title='&#x1F3A1'>&#x1F3A1</emoji>
&nbsp;<emoji class='comb' title='&#x1F3A1'>&#x1F3A1</emoji>
&nbsp;<text class='emo'>&#x1F3A1</text> &nbsp; &nbsp;
<emoji class='trans' title='&#x1F3A0'>&#x1F3A0</emoji>
&nbsp;<emoji class='comb' title='&#x1F3A0'>&#x1F3A1</emoji>
<text class='emo'>&#x1F3A0</text>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## 🤖 SVG Elements`
)});
  main.variable(observer("randl")).define("randl", ["d3","Promises"], async function*(d3,Promises)
{while (true) {
    yield d3.shuffle([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].slice())
      .slice(Math.floor(Math.random()*10)+1)
      .sort(d3.ascending);
    await Promises.delay(3000);};}
);
  main.variable(observer("letter_chart")).define("letter_chart", ["d3"], function(d3)
{
  const svg=d3.create('svg').attr('viewBox',[0,0,600,60])
              .attr('font-family','Verdana').attr('font-size',10)
              .style('display','block');
  let text=svg.selectAll('text');
  return Object.assign(svg.node(),{
    update(letters) {
      text=text.data(letters).join('text').text(d=>d)
               .attr('x',(d,i)=>i*20).attr('y',30)
               .style('fill',d3.interpolateTurbo(
                 letters.length/30))}});}
);
  main.variable(observer()).define(["letter_chart","randl"], function(letter_chart,randl){return(
letter_chart.update(randl)
)});
  main.variable(observer()).define(["d3","n"], function(d3,n){return(
d3.create('svg').attr('width',256).attr('height',256)
  .call(svg=>svg.selectAll('circle')
  .data(d3.range(128,0,-8)).join('circle')
  .attr('transform','translate(128,128)')
  .attr('fill',d3.scaleSequential(
      d3.interpolateTurbo).domain([0,128+n]))
  .attr('r',d =>d))
  .node()
)});
  main.variable(observer("n")).define("n", ["now"], function(now){return(
Math.abs(120-4*Math.floor((now%(1000*60))/1000))
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
