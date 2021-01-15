// https://observablehq.com/@olgabelitskaya/highcharts-importing@76
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Highcharts Importing`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<div id='div_highcharts' style='height:600px; width:600px;'></div>`
)});
  main.variable(observer()).define(["chart","randi"], function(chart,randi){return(
chart(randi(7,15),randi(10,24),12)
)});
  main.variable(observer("randi")).define("randi", function(){return(
function randi(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;}
)});
  main.variable(observer("ar")).define("ar", function(){return(
function ar(k,a,b){var d=.01,m=640;
    return Array(m).fill(k).map((k,t)=>
           [k*(Math.cos(d*t)+Math.cos(a*d*t)/2+
               Math.sin((a+b)*d*t)/3),
            k*(Math.sin(d*t)+Math.sin(a*d*t)/2+
               Math.cos((a+b)*d*t)/3)]);}
)});
  main.variable(observer("col")).define("col", ["randi"], function(randi){return(
function col(i){
    var r=randi(10*i,255),
        g=randi(10*i,255),
        b=randi(10*i,255);
    return 'rgb('+r+','+g+','+b+')';}
)});
  main.variable(observer("chart")).define("chart", ["col","ar","Highcharts"], function(col,ar,Highcharts){return(
function(a,b,n) {
  const series=[];
  for (var i=1; i<n+1; i++){
    series.push({name:'k='+i,color:col(i),
                 lineWidth:.5,data:ar(i,a,b)})};
  return Highcharts.chart('div_highcharts',{
    chart:{type:'line',backgroundColor:'mintcream'},
    xAxis:{title:{text:'x'}},yAxis:{title:{text:'y'}},
    title:{text:'Random Parameters: a,b = '+[a,b]},
    credits:{enabled:false},legend:{enabled:false},
    series:series}) }
)});
  main.variable(observer("$")).define("$", ["require"], function(require){return(
require('https://code.jquery.com/jquery-3.5.1.js')
)});
  main.variable(observer("head")).define("head", ["$"], function($){return(
$('head')
)});
  main.variable(observer("import_css")).define("import_css", ["$"], function($){return(
function(src) {
  $('head').append(`<link rel='stylesheet' href='${src}'>`)}
)});
  main.variable(observer()).define(["import_css"], function(import_css){return(
import_css('https://unpkg.com/highcharts@6.1.1/css/highcharts.css')
)});
  main.variable(observer("import_js")).define("import_js", ["require"], function(require){return(
function(src,module_name) {
  /*if (!$('head').find(`script[src='${src}']`)) {
    $('head').append(`<script src='${src}'></script>`);
  }*/
  return new Promise(function(resolve,reject) {
    function waiting(){
      if (typeof module_name=='undefined') resolve();
      if (eval(module_name)) resolve(eval(module_name));
      setTimeout(waiting,30);};
    require(src).then(function() {waiting();})
                .catch(function() {waiting();}); }); }
)});
  main.variable(observer("Highcharts")).define("Highcharts", ["import_js"], function(import_js){return(
import_js('https://unpkg.com/highcharts@6.1.1/highcharts.js',
                     'window.Highcharts')
)});
  return main;
}
