// https://observablehq.com/@olgabelitskaya/plotting-exercises@128
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Plotting Exercises <br/> 
## Syntax Exploration`
)});
  main.variable(observer("col")).define("col", function(){return(
'steelblue'
)});
  main.variable(observer()).define(["html","col"], function(html,col){return(
html`<p style="background:#ff355e; width:35%; text-align:center;">
The pleasant color for visualizations is</p>
<p style="background:${col}; width:35%; text-align:center;">${col}</p>.`
)});
  main.variable(observer("greet")).define("greet", ["html"], function(html){return(
function greet(subject) {
  return html`<h3 style="color:#ff355e;">Hello, ${subject}!</h3>`;}
)});
  main.variable(observer()).define(["greet"], function(greet){return(
greet('JavaScript')
)});
  main.variable(observer("cars")).define("cars", function(){return(
fetch('https://raw.githubusercontent.com/'
           .concat('vega/vega/v4.3.0/docs/data/cars.json'))
  .then(response=>response.json())
)});
  main.variable(observer()).define(["d3","cars"], function(d3,cars){return(
d3.max(cars,d=>d.Displacement)-d3.min(cars,d=>d.Displacement)
)});
  main.variable(observer("viewof v")).define("viewof v", ["html"], function(html){return(
html`<input type=text 
style="width:10%; text-align:center; font-size:150%;color:#ff355e;">`
)});
  main.variable(observer("v")).define("v", ["Generators", "viewof v"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","col","v"], function(html,col,v){return(
html`<p style="background:${col}; width:10%; 
font-size:150%; text-align:center; color:#ff355e;">${v}</p>.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## The First Steps`
)});
  main.variable(observer("interpolateRainbow")).define("interpolateRainbow", ["d3"], function(d3){return(
function interpolateRainbow(t) {
  return t=(t+.2)%1,
         d3.cubehelix(
             360*t-100,1.5-1.5*Math.abs(t-.5),.8-.9*Math.abs(t-.5));}
)});
  main.variable(observer("chartRgb")).define("chartRgb", ["d3","width","DOM"], function(d3,width,DOM){return(
function chartRgb(interpolate) {
  const height=200,margin=({top:20,right:20,bottom:20,left:40});
  const x=d3.scaleLinear()
            .range([margin.left,width-margin.right]);
  const y=d3.scaleLinear().domain([0,255])
            .range([height-margin.bottom,margin.top]);
  const xAxis=g=>g
      .attr("transform",`translate(0,${height-margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width/80).tickSizeOuter(0));
  const yAxis=g=>g
      .attr("transform",`translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(8))
      .call(g=>g.select(".domain").remove());
  const svg=d3.select(DOM.svg(width,height));
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  const g=svg.append("g")
      .datum(Array.from({length:width},(_,i)=>i/(width-1)))
      .attr("fill","none").attr("stroke-width",2)
      .attr("stroke-linejoin","round").attr("stroke-linecap","round");
  g.append("path").attr("stroke","#ff3636")
   .attr("fill","#ff3636").attr("fill-opacity",.1)
   .attr("d", d3.line().x(x).y(t=>y(d3.rgb(interpolate(t)).r)));
  g.append("path").attr("stroke","#36ff36")
   .attr("fill","#36ff36").attr("fill-opacity",.1)
   .attr("d",d3.line().x(x).y(t=>y(d3.rgb(interpolate(t)).g)));
  g.append("path").attr("stroke","#3636ff")
   .attr("fill","#3636ff").attr("fill-opacity",.1)
   .attr("d",d3.line().x(x).y(t=>y(d3.rgb(interpolate(t)).b)));
  return svg.node();}
)});
  main.variable(observer()).define(["chartRgb","interpolateRainbow"], function(chartRgb,interpolateRainbow){return(
chartRgb(interpolateRainbow)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
