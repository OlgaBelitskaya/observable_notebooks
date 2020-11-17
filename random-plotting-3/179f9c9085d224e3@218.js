// https://observablehq.com/@olgabelitskaya/random-plotting-3@218
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Random Plotting 3`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
@import 'https://fonts.googleapis.com/css?family=Akronim|Roboto';
h1 {color:#3636ff; font-size:200%; font-family:Akronim;}
.svg1 {background:ghostwhite;}
</style>`
)});
  main.variable(observer("randi")).define("randi", function(){return(
function randi(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;}
)});
  main.variable(observer("fx")).define("fx", function(){return(
function fx(a,b,c,d,e,q,n,t,k) {
    var x1=Math.cos(Math.PI*t/n+k*Math.PI/q)+
           Math.cos(a*Math.PI*t/n+k*Math.PI/q),
        x2=Math.cos(b*Math.PI*t/n+k*Math.PI/q)+
           Math.cos(c*Math.PI*t/n+k*Math.PI/q),
        x3=Math.cos(d*Math.PI*t/n+k*Math.PI/q)+
           Math.cos(e*Math.PI*t/n+k*Math.PI/q);
    return x1+x2+x3}
)});
  main.variable(observer("fy")).define("fy", function(){return(
function fy(a,b,c,d,e,q,n,t,k) {
    var y1=Math.sin(Math.PI*t/n+k*Math.PI/q)+
           Math.sin(a*Math.PI*t/n+k*Math.PI/q),
        y2=Math.sin(b*Math.PI*t/n+k*Math.PI/q)+
           Math.sin(c*Math.PI*t/n+k*Math.PI/q),
        y3=Math.sin(d*Math.PI*t/n+k*Math.PI/q)+
           Math.sin(e*Math.PI*t/n+k*Math.PI/q);
    return y1+y2+y3}
)});
  main.variable(observer("make_data")).define("make_data", ["d3","fx","fy"], function(d3,fx,fy){return(
function make_data(a,b,c,d,e,q,n,k) {
    return d3.range(0,2*n+1).map(function(t) {
      return {'x':fx(a,b,c,d,e,q,n,t,k),
              'y':fy(a,b,c,d,e,q,n,t,k)}; }) }
)});
  main.variable(observer("randcolRB")).define("randcolRB", ["randi"], function(randi){return(
function randcolRB(i) {
    var r=randi(i,255),b=randi(i,255);
    return '#'+r.toString(16)+'00'+b.toString(16);}
)});
  main.variable(observer("RandomPlot")).define("RandomPlot", ["randi","d3","DOM","make_data","randcolRB"], function(randi,d3,DOM,make_data,randcolRB){return(
function RandomPlot() {
    const m=20;
    var margin={top:m,right:m,bottom:m,left:m},
        width=600-margin.left-margin.right,
        height=600-margin.top-margin.bottom;
    const a=randi(5,9),b=randi(10,14),c=randi(15,19),
          d=randi(20,36),e=randi(37,81),
          q=randi(3,12),n=randi(3,15);
    var xScale=d3.scaleLinear().domain([-7,7])
                 .range([0,width]),
        yScale=d3.scaleLinear().domain([-7,7])
                  .range([height,0]);
    const svg=d3.select(DOM.svg(width,height))
                .attr('class','svg1');
    var line=d3.line().curve(d3.curveMonotoneX)
               .x(function(d){return xScale(d.x);})
               .y(function(d){return yScale(d.y);});
    for (var i=1; i<2*(q+n+1); i++) {
        var data=make_data(a,b,c,d,e,q,n,i),
            col=randcolRB(i);
        svg.append('path').datum(data)
           .attr('class','line').attr('d',line)
           .attr('stroke',col).attr('stroke-width',.3)
           .attr('fill','none');};
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
