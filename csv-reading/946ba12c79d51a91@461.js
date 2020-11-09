// https://observablehq.com/@olgabelitskaya/csv-reading@461
import define1 from "./8d5ef3030dfd3bad@259.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 CSV Reading`
)});
  main.variable(observer("url")).define("url", function(){return(
'https://olgabelitskaya.github.io/beethoven.csv'
)});
  main.variable(observer("dataBeethoven")).define("dataBeethoven", ["d3","url"], function(d3,url){return(
d3.csv(url,d3.autoType)
)});
  main.variable(observer("xcoord")).define("xcoord", ["dataBeethoven"], function(dataBeethoven){return(
dataBeethoven.map(d=>d.x)
)});
  const child1 = runtime.module(define1).derive([{name: "xcoord", alias: "data"}], main);
  main.import("chart", "xcoordHistogram", child1);
  main.variable(observer()).define(["xcoordHistogram"], function(xcoordHistogram){return(
xcoordHistogram
)});
  main.variable(observer("limits")).define("limits", ["d3","dataBeethoven"], function(d3,dataBeethoven){return(
{xmin:d3.min(dataBeethoven,function(d) {return d.x}),
         xmax:d3.max(dataBeethoven,function(d) {return d.x}),
         ymin:d3.min(dataBeethoven,function(d) {return d.y}),
         ymax:d3.max(dataBeethoven,function(d) {return d.y}),
         zmin:d3.min(dataBeethoven,function(d) {return d.z}),
         zmax:d3.max(dataBeethoven,function(d) {return d.z}),
         n:dataBeethoven.length,m:20}
)});
  main.variable(observer("margin")).define("margin", ["limits"], function(limits){return(
{top:limits.m,right:limits.m,
         bottom:limits.m,left:limits.m}
)});
  main.variable(observer("params")).define("params", ["margin"], function(margin){return(
{width:500-margin.left-margin.right,
         height:600-margin.top-margin.bottom,
         trans:'translate('+margin.left+','+margin.top+')'}
)});
  main.variable(observer("xScale")).define("xScale", ["d3","limits","params"], function(d3,limits,params){return(
d3.scaleLinear()
         .domain([1.1*limits.ymin,1.1*limits.ymax])
         .range([0,params.width])
)});
  main.variable(observer("yScale")).define("yScale", ["d3","limits","params"], function(d3,limits,params){return(
d3.scaleLinear()
         .domain([1.1*limits.zmin,1.1*limits.zmax])
         .range([params.height,0])
)});
  main.variable(observer("make_x_gridlines")).define("make_x_gridlines", ["d3","xScale","params"], function(d3,xScale,params){return(
function make_x_gridlines() {
  return d3.axisBottom(xScale).ticks(20)
           .tickSize(-params.height).tickFormat('')}
)});
  main.variable(observer("make_y_gridlines")).define("make_y_gridlines", ["d3","yScale","params"], function(d3,yScale,params){return(
function make_y_gridlines() {
  return d3.axisLeft(yScale).ticks(18)
           .tickSize(-params.width).tickFormat('')}
)});
  main.variable(observer("pointColor")).define("pointColor", ["d3","limits"], function(d3,limits){return(
d3.scaleSequential().domain([0,limits.n])
             .interpolator(d3.interpolateMagma)
)});
  main.variable(observer()).define(["d3","params","make_x_gridlines","make_y_gridlines","dataBeethoven","pointColor","xScale","yScale"], function(d3,params,make_x_gridlines,make_y_gridlines,dataBeethoven,pointColor,xScale,yScale)
{let svgPlot=d3.create('svg')
               .attr('width',params.width)
               .attr('height',params.height)
               .attr('transform',params.trans)
               .style('background-color','whitesmoke');
   svgPlot.append('g').attr('class','grid')
          .call(make_x_gridlines())
          .attr('transform','translate(0,'+params.height+')')
          .attr('stroke','white');
   svgPlot.append('g').attr('class','grid')
          .call(make_y_gridlines());
   svgPlot.selectAll('.point').data(dataBeethoven).enter()
          .append('circle').attr('class','point')
          .attr('fill',function(d,i){return pointColor(i)})
          .attr('r',1.2)
          .attr('stroke','steelblue').attr('stroke-width',.2)
          .attr('cx',function(d) {return xScale(d.y)})
          .attr('cy',function(d) {return yScale(d.z)})
  return svgPlot.node();}
);
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
.grid line,.grid path {stroke:steelblue; stroke-width:.5;}
</style>`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
