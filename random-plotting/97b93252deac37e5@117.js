// https://observablehq.com/@olgabelitskaya/random-plotting@117
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Random Plotting
## Patterns`
)});
  main.variable(observer("fx")).define("fx", function(){return(
function fx(t,a,b,k){
    const d=.001;
    return Math.cos(d*t+k*Math.PI/6)+Math.cos(a*d*t)/2+Math.sin((a+b)*d*t)/3}
)});
  main.variable(observer("fy")).define("fy", function(){return(
function fy(t,a,b,k){
    const d=.001;
    return Math.sin(d*t+k*Math.PI/6)+Math.sin(a*d*t)/2+Math.cos((a+b)*d*t)/3}
)});
  main.variable(observer("randi")).define("randi", function(){return(
function randi(xmin,xmax){
    return Math.floor(Math.random()*(xmax-xmin+1))+xmin;}
)});
  main.variable(observer("randcol")).define("randcol", ["randi"], function(randi){return(
function randcol(i){
    var r=randi(i,255),g=randi(i,50),b=randi(i,255);
    return '#'+r.toString(16)+g.toString(16)+b.toString(16);}
)});
  main.variable(observer("make_data")).define("make_data", ["randi","d3","fx","fy"], function(randi,d3,fx,fy){return(
function make_data(k){
    const n=6400;
    var a=randi(7,15),b=randi(10,48);
    return d3.range(1,n).map(function(t){
        return {'x':fx(t,a,b,k),'y':fy(t,a,b,k)}});}
)});
  main.variable(observer("RandomPlot")).define("RandomPlot", ["d3","DOM","make_data","randcol"], function(d3,DOM,make_data,randcol){return(
function RandomPlot() {
    const n=6400,m=6,d=.001,
          margin={top:m,right:m,bottom:m,left:m},
          width=500-margin.left-margin.right,
          height=500-margin.top-margin.bottom,
          tr='translate('+margin.left+','+margin.top+')'; 
    var xScale=d3.scaleLinear()
             .domain([-2,2]).range([0,width+10]),
        yScale=d3.scaleLinear()
             .domain([-2,2]).range([height+10,0]);
    const svg=d3.select(DOM.svg(width,height))
                .attr('transform',tr);
    var line=d3.line().curve(d3.curveMonotoneX)
               .x(function(d){return xScale(d.x);})
               .y(function(d){return yScale(d.y);});
    for (var i=1; i<m; i++) {
        var data=make_data(i),col=randcol(i);
        svg.append('path').datum(data)
           .attr('class','line').attr('d',line)
           .attr('stroke',col).attr('fill','none');};
    return svg.node();}
)});
  main.variable(observer()).define(["RandomPlot"], function(RandomPlot){return(
RandomPlot()
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
