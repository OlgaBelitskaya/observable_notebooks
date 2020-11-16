// https://observablehq.com/@olgabelitskaya/interactive-bar-charts@69
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Interactive Bar Charts`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
@import 'https://fonts.googleapis.com/css?family=Orbitron|Akronim|Ewert';
h1 {color:#3636ff; font-size:200%; font-family:Ewert;}
#svg_bar {background:whitesmoke;}
#svg_bar text {fill:#3636ff; font-size:120%; font-family:Ewert;}
#circle_bar {fill:#3636ff; stroke:#fff; fill-opacity:.7}
</style>`
)});
  main.variable(observer()).define(["svg1"], function(svg1){return(
svg1.node()
)});
  main.variable(observer("data")).define("data", function(){return(
[1,5,14,16,8,22,7,11,13,4,26,2,30,19,3,
      2,4,8,6,17,1,4,5,2,3,23,18,14,11,5]
)});
  main.variable(observer("setups")).define("setups", ["d3","data"], function(d3,data){return(
{m:20,ymax:1.2*d3.max(data)}
)});
  main.variable(observer("margin")).define("margin", ["setups"], function(setups){return(
{top:setups.m,right:setups.m,
         bottom:setups.m,left:2*setups.m}
)});
  main.variable(observer("params")).define("params", ["margin"], function(margin){return(
{width1:800-margin.left-margin.right,
         height1:400-margin.top-margin.bottom}
)});
  main.variable(observer("xScale")).define("xScale", ["d3","data","params"], function(d3,data,params){return(
d3.scaleBand().domain(d3.range(data.length))
         .rangeRound([0,params.width1]).paddingInner(.1)
)});
  main.variable(observer("yScale")).define("yScale", ["d3","setups","params"], function(d3,setups,params){return(
d3.scaleLinear().domain([0,setups.ymax])
				 .range([0,params.height1])
)});
  main.variable(observer("newData")).define("newData", ["data"], function(data){return(
function newData() {
  while (data.length>0) {data.pop();}
  for (var i=0; i<30; i++) {
      data.push(Math.floor(Math.random()*30)+1);}
  return data}
)});
  main.variable(observer("updateBar")).define("updateBar", ["svg1","data","params","yScale","setups"], function(svg1,data,params,yScale,setups){return(
function updateBar() {
  svg1.selectAll('rect').data(data)
      .transition().duration(3000)
      .attr('y',function(d) {return params.height1-yScale(d);})
      .attr('height', function(d) {return yScale(d);})
      .attr('fill',function(d) {
          return 'rgb('+Math.round(d)+',0,'+
                 Math.round(d*255/setups.ymax)+')';}) 
  return svg1.node()}
)});
  main.variable(observer()).define(["svg1","data","xScale","params","yScale","setups"], function(svg1,data,xScale,params,yScale,setups){return(
svg1.selectAll('rect').data(data).enter().append('rect')
    .attr('x',function(d,i) {return xScale(i);})
    .attr('y',function(d) {return params.height1-yScale(d);})
    .attr('width',xScale.bandwidth())
    .attr('height',function(d) {return yScale(d);})
    .attr('fill',function(d) {
        return 'rgb('+Math.round(d)+',0,'+
               Math.round(d*255/setups.ymax)+')';})
)});
  main.variable(observer()).define(["svg1","setups","newData","updateBar"], function(svg1,setups,newData,updateBar){return(
svg1.append('circle').attr('id','circle_bar')
    .attr('cx',setups.m).attr('cy',setups.m).attr('r',15)
    .on('click',function() {newData(); updateBar(); 
                            return svg1.node()})
)});
  main.variable(observer()).define(["svg1","setups"], function(svg1,setups){return(
svg1.append('text').text('<<< update')
    .attr('x',2*setups.m).attr('y',1.25*setups.m)
)});
  main.variable(observer("svg1")).define("svg1", ["d3","DOM","params"], function(d3,DOM,params){return(
d3.select(DOM.svg()).attr('id','svg_bar')
       .attr('width',params.width1)
       .attr('height',params.height1)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
