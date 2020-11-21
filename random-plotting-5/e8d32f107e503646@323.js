// https://observablehq.com/@olgabelitskaya/random-plotting-5@323
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Random Plotting 5`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
@import 'https://fonts.googleapis.com/css?family=Akronim';
h1 {color:#36ffff; font-size:200%; font-family:Akronim;}
#date_time_button {background-color:silver; color:#36ffff; border:double #36ffff; 
                   text-align:center; font-family:Akronim; font-size:200%;
                   border-radius:15px; padding:10px; width:450px; 
                   transition:all 0.7s; cursor:pointer; margin:2px;}
#date_time_button span {cursor:pointer; display:inline-block; 
                        position:relative; transition:0.8s;}
#date_time_p {color:silver; font-family:Akronim; font-size:130%;}
</style>
<button type='button' id='date_time_button' 
onclick="document.getElementById('date_time_p').innerHTML=Date()">
Current Date and Time</button><p id='date_time_p'></p>`
)});
  main.variable(observer("randi")).define("randi", function(){return(
function randi(min,max) {
    return Math.floor(Math.random()*(max-min+1))+min;}
)});
  main.variable(observer("fx")).define("fx", function(){return(
function fx(a,b,c,d,e,f,t) {
    var x1=Math.sin(t/d),
        x2=(-1)**f*a*Math.sin(b*t)*Math.cos(t),
        x3=(-1)**f*c*Math.sin(e*b*t);
    return x1+x2+x3}
)});
  main.variable(observer("fy")).define("fy", function(){return(
function fy(a,b,c,d,e,f,t) {
     var y1=Math.cos(t/d),
         y2=(-1)**f*a*Math.sin(b*t)*Math.sin(t),
         y3=(-1)**f*c*Math.cos(e*b*t);
     return y1+y2+y3}
)});
  main.variable(observer("make_data")).define("make_data", ["randi","d3","fx","fy"], function(randi,d3,fx,fy){return(
function make_data() {
    const a=randi(5,15)/10,b=randi(6,12),c=randi(1,100)/10**3,
          d=randi(5,7),e=randi(14,18),f=randi(1,2);
    var data=d3.range(1,10**3+1).map(function(k) {
        return {'x':fx(a,b,c,d,e,f,k*b*e*Math.PI/10**3),
                'y':fy(a,b,c,d,e,f,k*b*e*Math.PI/10**3)}; });
    return [data,[a,b,c,d,e,f]]}
)});
  main.variable(observer("randcol")).define("randcol", ["randi"], function(randi){return(
function randcol() {
    var g=randi(50,200),b=randi(50,200);
    return '#00'+g.toString(16)+b.toString(16);}
)});
  main.variable(observer("RandomPlot")).define("RandomPlot", ["d3","xScale","yScale","svg","width"], function(d3,xScale,yScale,svg,width){return(
function RandomPlot(data,coef,col) {
    var line=d3.line().curve(d3.curveMonotoneX)
               .x(function(d){return xScale(d.x);})
               .y(function(d){return yScale(d.y);});
    svg.append('path').datum(data)
       .transition().duration(3000)
       .attr('class','line').attr('d',line)
       .attr('stroke',col).attr('stroke-width',.5)
       .attr('fill',col).attr('fill-opacity',.1);
    svg.append('text').attr('id','plot_text')
       .text('[a,b,c,d,e,f]='+coef)
       .attr('x',width/2).attr('y',40)
       .attr('fill',col);
    return svg.node();}
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top:20,right:20,bottom:20,left:20}
)});
  main.variable(observer("width")).define("width", ["margin"], function(margin){return(
800-margin.left-margin.right
)});
  main.variable(observer("height")).define("height", ["margin"], function(margin){return(
800-margin.top-margin.bottom
)});
  main.variable(observer("xScale")).define("xScale", ["d3","width"], function(d3,width){return(
d3.scaleLinear().domain([-3,3])
                 .range([0,width])
)});
  main.variable(observer("yScale")).define("yScale", ["d3","height"], function(d3,height){return(
d3.scaleLinear().domain([-3,3])
                  .range([height,0])
)});
  main.variable(observer("svg")).define("svg", ["d3","DOM","width","height"], function(d3,DOM,width,height){return(
d3.select(DOM.svg(width,height))
      .attr('style','background:silver')
)});
  main.variable(observer()).define(["svg"], function(svg){return(
svg.append('text').text('<<< add a random line')
    .attr('x',60).attr('y',50).attr('fill','#36ffff')
    .attr('style','font-family:Akronim; font-size:200%')
)});
  main.variable(observer()).define(["svg","d3","make_data","randcol","RandomPlot"], function(svg,d3,make_data,randcol,RandomPlot){return(
svg.append('circle')
    .attr('cx',40).attr('cy',40)
    .attr('r',20).attr('fill','#36ffff')
    .attr('stroke','silver').attr('stroke-width',5)
    .on('click',function() {
        d3.selectAll('#plot_text').remove();
        d3.selectAll('path').remove();
        var array=make_data(),col=randcol();
        RandomPlot(array[0],array[1],col);})
)});
  main.variable(observer()).define(["svg"], function(svg){return(
svg.node()
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
