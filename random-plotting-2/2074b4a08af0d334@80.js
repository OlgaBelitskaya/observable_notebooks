// https://observablehq.com/@olgabelitskaya/random-plotting-2@80
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Random Plotting 2
## Patterns`
)});
  main.variable(observer("randi")).define("randi", function(){return(
function randi(xmin,xmax){
    return Math.floor(Math.random()*(xmax-xmin+1))+xmin;}
)});
  main.variable(observer()).define(["randi"], function(randi){return(
randi(5,250)
)});
  main.variable(observer("randcolRB")).define("randcolRB", ["randi"], function(randi){return(
function randcolRB(i) {
    var r=randi(30*(i+1),255),g=randi(i+10,50),b=randi(3*(i+1),255);
    return '#'+r.toString(16)+g.toString(16)+b.toString(16);}
)});
  main.variable(observer()).define(["randcolRB"], function(randcolRB){return(
randcolRB(2)
)});
  main.variable(observer("randcolGB")).define("randcolGB", ["randi"], function(randi){return(
function randcolGB(i) {
    var r=randi(i+10,50),g=randi(30*(i+1),255),b=randi(3*(i+1),255);
    return '#'+r.toString(16)+g.toString(16)+b.toString(16);}
)});
  main.variable(observer()).define(["randcolGB"], function(randcolGB){return(
randcolGB(5)
)});
  main.variable(observer("make_data")).define("make_data", ["d3"], function(d3){return(
function make_data(j,a,b,d,n) {
     return d3.range(0,n).map(function(i) {
          return {
              'x':6*j*(Math.cos(d*i)+
                       Math.cos(a*d*i)/2+
                       Math.sin((a+b)*d*i)/3),
              'y':6*j*(Math.sin(d*i)+
                       Math.sin(a*d*i)/2+
                       Math.cos((a+b)*d*i)/3)} }); }
)});
  main.variable(observer()).define(["make_data","randi"], function(make_data,randi){return(
make_data(3,randi(5,15),randi(2,20),.1,64)
)});
  main.variable(observer("RandomPlot")).define("RandomPlot", ["d3","DOM","randi","randcolRB","randcolGB"], function(d3,DOM,randi,randcolRB,randcolGB){return(
function RandomPlot() {
    const n=640,m=20;
    var margin={top:m,right:m,bottom:m,left:m},
        width=600-margin.left-margin.right,
        height=600-margin.top-margin.bottom,
        trans='translate('+margin.left+','+margin.top+')';
    var xScale=d3.scaleLinear()
                 .domain([-30,30]).range([0,width]),
        yScale=d3.scaleLinear()
                 .domain([-30,30]).range([height,0]); 
    const svg=d3.select(DOM.svg(width,height))
                .attr('transform',trans);
    var line=d3.line().curve(d3.curveMonotoneX)
               .x(function(d){return xScale(d.x);})
               .y(function(d){return yScale(d.y);});
    var a=randi(7,15),b=randi(10,24);           
    function make_data(j) {
        return d3.range(0,n).map(function(i) {
            return {'x':5*j*(Math.cos(0.01*i)+
                             Math.cos(a*0.01*i)/2+
                             Math.sin((a+b)*0.01*i)/3),
                    'y':5*j*(Math.sin(0.01*i)+
                             Math.sin(a*0.01*i)/2+
                             Math.cos((a+b)*0.01*i)/3)} }); };
    for (var k=1; k<4; k++) {
        var data=make_data(k);
        svg.append('path').datum(data)
           .attr('class','line').attr('d',line)
           .attr('fill','none').attr('stroke-width',2)
           .transition().duration(10000)
           .styleTween('stroke',function() {
                var col1=randcolRB(k),col2=randcolGB(k); 
                return d3.interpolate(col1,col2);}); };
    svg.append('text').attr('transform',trans)
       .style('fill','slategray').text('a='+a+'; b='+b); 
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
