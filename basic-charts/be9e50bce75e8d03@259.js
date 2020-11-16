// https://observablehq.com/@olgabelitskaya/basic-charts@259
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`<h1 class='font-effect-3d' style='color:#3636ff;'>📑 Basic Charts</h1>`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
@import 'https://fonts.googleapis.com/css?family=Orbitron|Akronim&effect=3d';
h1 {font-size:200%; font-family:Akronim;}
.svg1 {background:whitesmoke;}
.svg2 {background:whitesmoke;}
.svg1 text,.svg2 text {font-family:Orbitron; color:#3636ff;}
.svg3 {background:slategray; width:600px; height:600px;}
.svg3 text {font-family:Orbitron; color:#3636ff;}
</style>`
)});
  main.variable(observer("limits")).define("limits", function(){return(
{m:20,x1:0,x2:4,y1:-60,y2:90}
)});
  main.variable(observer("margin")).define("margin", ["limits"], function(limits){return(
{top:limits.m,right:limits.m,
         bottom:limits.m,left:limits.m}
)});
  main.variable(observer("params")).define("params", ["margin"], function(margin){return(
{width1:600-margin.left-margin.right,
         height1:200-margin.top-margin.bottom,
         width2:200-margin.left-margin.right,
         height2:600-margin.top-margin.bottom}
)});
  main.variable(observer("svg1")).define("svg1", ["d3","DOM","params"], function(d3,DOM,params){return(
d3.select(DOM.svg()).attr('class','svg1')
       .attr('width',params.width1)
       .attr('height',params.height1)
)});
  main.variable(observer("xScale")).define("xScale", ["d3","limits","margin","params"], function(d3,limits,margin,params){return(
d3.scaleLinear().domain([limits.x1,limits.x2])  
         .range([margin.left+margin.right,
                 params.width1-margin.left-margin.right])
)});
  main.variable(observer()).define(["svg1","params","margin","d3","xScale"], function(svg1,params,margin,d3,xScale){return(
svg1.append('g')
    .attr('transform','translate(0,'+
          (params.height1-margin.top-margin.bottom)+')')
    .call(d3.axisBottom(xScale))
)});
  main.variable(observer()).define(["svg1"], function(svg1){return(
svg1.node()
)});
  main.variable(observer("svg2")).define("svg2", ["d3","DOM","params"], function(d3,DOM,params){return(
d3.select(DOM.svg()).attr('class','svg2')
       .attr('width',params.width2)
       .attr('height',params.height2)
)});
  main.variable(observer("yScale")).define("yScale", ["d3","limits","params","margin"], function(d3,limits,params,margin){return(
d3.scaleLinear().domain([limits.y1,limits.y2])  
         .range([params.height2-margin.top-margin.bottom,
                 margin.top+margin.bottom])
)});
  main.variable(observer()).define(["svg2","margin","d3","yScale"], function(svg2,margin,d3,yScale){return(
svg2.append('g')
    .attr('transform','translate('+
          (margin.left+margin.right)+',0)')
    .call(d3.axisLeft(yScale))
)});
  main.variable(observer()).define(["svg2"], function(svg2){return(
svg2.node()
)});
  main.variable(observer("sumfunction")).define("sumfunction", function(){return(
function sumfunction(n,x) {
  var funsum=0;
  for (var i=1; i<n+1; i++) {
      funsum+=Math.sqrt(Math.pow(Math.E,-i*x)+
           Math.pow(x,i-1))/(Math.cos(i*x)+
           Math.sin(i*x));};
  return funsum*Math.log(n*x-1)}
)});
  main.variable(observer("xy")).define("xy", ["sumfunction"], function(sumfunction){return(
Array(42).fill(10).map(
  (r,x)=>({'x':.07*(x+r),'y':sumfunction(3,.075*(x+r))}))
)});
  main.variable(observer("xtrans")).define("xtrans", ["margin"], function(margin){return(
'translate(0,'+(600-margin.top-margin.bottom)+')'
)});
  main.variable(observer("ytrans")).define("ytrans", ["margin"], function(margin){return(
'translate('+(margin.left+margin.right)+
       ','+(margin.top+margin.bottom)+')'
)});
  main.variable(observer()).define(["svg3","xtrans","d3","xScale"], function(svg3,xtrans,d3,xScale){return(
svg3.append('g')
    .attr('transform',xtrans)
    .call(d3.axisBottom(xScale))
    .attr('class','font-effect-3d')
)});
  main.variable(observer()).define(["svg3","ytrans","d3","yScale"], function(svg3,ytrans,d3,yScale){return(
svg3.append('g')
    .attr('transform',ytrans)
    .call(d3.axisLeft(yScale))
    .attr('class','font-effect-3d')
)});
  main.variable(observer()).define(["svg3","xy","xScale","yScale"], function(svg3,xy,xScale,yScale){return(
svg3.selectAll('circle').data(xy).enter()
    .append('circle').attr('r',4)
    .attr('cx',d=>xScale(d.x))
    .attr('cy',d=>yScale(d.y))
    .attr('fill','#3636ff').attr('stroke','#fff')
)});
  main.variable(observer()).define(["svg3"], function(svg3){return(
svg3.node()
)});
  main.variable(observer("svg3")).define("svg3", ["d3","DOM"], function(d3,DOM){return(
d3.select(DOM.svg()).attr('class','svg3')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
