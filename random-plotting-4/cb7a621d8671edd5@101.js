// https://observablehq.com/@olgabelitskaya/random-plotting-4@101
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Random Plotting 4`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
@import 'https://fonts.googleapis.com/css?family=Akronim|Ewert';
h1 {color:#36ffff; font-size:200%; font-family:Ewert;}
</style>`
)});
  main.variable(observer("randi")).define("randi", function(){return(
function randi(min,max) {
    return Math.floor(Math.random()*(max-min+1))+min;}
)});
  main.variable(observer("f")).define("f", function(){return(
function f(a,b,c,d,e,q,n,t,k) {
    var x1=a+.1*b*Math.cos(c*Math.PI*t/n+k*Math.PI/q),
        x2=.1*a+.01*d*Math.cos(e*Math.PI*t/n+k*Math.PI/q),
        x3=1+Math.sin(Math.PI*t/n+k*Math.PI/q); 
    return x1*x2*x3}
)});
  main.variable(observer("fx")).define("fx", ["f"], function(f){return(
function fx(a,b,c,d,e,q,n,t,k) {
    return f(a,b,c,d,e,q,n,t,k)*Math.cos(Math.PI*t/n+k*Math.PI/q)}
)});
  main.variable(observer("fy")).define("fy", ["f"], function(f){return(
function fy(a,b,c,d,e,q,n,t,k) {
    return f(a,b,c,d,e,q,n,t,k)*Math.sin(Math.PI*t/n+k*Math.PI/q)}
)});
  main.variable(observer("make_data")).define("make_data", ["d3","fx","fy"], function(d3,fx,fy){return(
function make_data(a,b,c,d,e,q,n,k) {
    return d3.range(1,2*n+1).map(function(t) {
        return {'x':fx(a,b,c,d,e,q,n,t,k),
                'y':fy(a,b,c,d,e,q,n,t,k)}; }); }
)});
  main.variable(observer("randcolGB")).define("randcolGB", ["randi"], function(randi){return(
function randcolGB(i) {
    var g=randi(i,255),b=randi(i,255);
    return '#00'+g.toString(16)+b.toString(16);}
)});
  main.variable(observer("RandomPlot")).define("RandomPlot", ["randi","d3","DOM","make_data","randcolGB"], function(randi,d3,DOM,make_data,randcolGB){return(
function RandomPlot() {
    const m=20;
    var margin={top:m,right:m,bottom:m,left:m},
        width=600-margin.left-margin.right,
        height=600-margin.top-margin.bottom;
    const a=randi(3,11),b=randi(3,25),c=randi(8,16),
          d=randi(5,9),e=randi(200,300),
          q=randi(2,10),n=randi(30,300);
    var xScale=d3.scaleLinear().domain([-1.8*(a+.1*b),1.8*(a+.1*b)])
                 .range([0,width]),
        yScale=d3.scaleLinear().domain([-.5*(a+.1*b),3*(a+.1*b)])
                  .range([height,0]);
    const svg=d3.select(DOM.svg(width,height))
                .attr('style','background:whitesmoke');
    var line=d3.line().curve(d3.curveMonotoneX)
               .x(function(d){return xScale(d.x);})
               .y(function(d){return yScale(d.y);});
    for (var i=0; i<2*q+1; i++) {
        var data=make_data(a,b,c,d,e,q,n,i),
            col=randcolGB(i);
        svg.append('path').datum(data)
           .attr('class','line').attr('d',line)
           .attr('stroke',col).attr('stroke-width',.3)
           .attr('fill','none');};
    svg.append('text').text('[a,b,c,d,e,q,n]='+[a,b,c,d,e,q,n])
       .attr('x',width/4).attr('y',2*m)
    return svg.node();}
)});
  main.variable(observer()).define(["RandomPlot"], function(RandomPlot){return(
RandomPlot()
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
