// https://observablehq.com/@olgabelitskaya/recursive-frames@162
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Recursive Frames`
)});
  main.variable(observer("viewof n")).define("viewof n", ["html"], function(html){return(
html`<input type='number' id='n_frames' value=1
style='width:200px; font-size:120%; color:#363636;
background-color:whitesmoke; text-align:center;'>`
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer()).define(["frame","n"], function(frame,n){return(
frame(n)
)});
  main.variable(observer("frame")).define("frame", ["d3","DOM","size","line","recursive_curve"], function(d3,DOM,size,line,recursive_curve){return(
function(n) {
  const svg=d3.select(DOM.svg(size,size));
  let colors=['#3636ff','#ff3636','#ff36ff',
              '#ffff36','#36ff36','#36ffff'];
  svg.selectAll('.curve').data(colors).join('path')
     .attr('d',(_,i)=>line(recursive_curve(size,i+n))+'z')
     .style('fill',d=>d).style('fill-opacity',.01)
     .style('stroke',d=>d).style('stroke-width',1);
  return svg.node();}
)});
  main.variable(observer("recursive_curve")).define("recursive_curve", ["subdivpoly"], function(subdivpoly){return(
function(len, iterations) {
  const contour1=[[0,len],[0,0],[len,0]],
        contour2=[[len,0],[len,len],[0,len]]
  const half1=subdivpoly(contour1,iterations),
        half2=subdivpoly(contour2,iterations)
  return [...half1,...half2];}
)});
  main.variable(observer("subdivpoly")).define("subdivpoly", ["d3","subpoint"], function(d3,subpoint){return(
function subdivpoly(poly,iterations=1) {
  const [p1,p2,p3]=poly,points=[]
  const centroid=d3.polygonCentroid(poly)
  if (iterations===0) {points.push(centroid)} 
  else {const subset1=[p1,subpoint(p1,p3),p2],
              subset2=[p2,subpoint(p1,p3),p3];
        points.push(...subdivpoly(subset1,iterations-1))
        points.push(...subdivpoly(subset2,iterations-1))}
  return points}
)});
  main.variable(observer("size")).define("size", function(){return(
600
)});
  main.variable(observer("line")).define("line", ["d3"], function(d3){return(
d3.line()
)});
  main.variable(observer("subpoint")).define("subpoint", function(){return(
function subpoint(a,b) {
  return [7*(a[0]+b[0])/15,7*(a[1]+b[1])/15]}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
