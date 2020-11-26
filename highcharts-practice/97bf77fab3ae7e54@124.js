// https://observablehq.com/@olgabelitskaya/highcharts-practice@124
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Highcharts' Practice`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Dumbbell Charts`
)});
  main.variable(observer("db_customers")).define("db_customers", ["tr_customers","d3"], function(tr_customers,d3){return(
Object.entries(tr_customers).slice(2,8).map(
  el=>({'name':el[0],'low':d3.median(el[1]),'high':d3.mean(el[1])}))
)});
  main.variable(observer("db_chart")).define("db_chart", ["html","Highcharts","db_customers"], function(html,Highcharts,db_customers)
{const figure=html`<div id='db' style='height:400px;'>`;
  Highcharts.chart(figure, {
    chart:{type:'dumbbell',inverted:true},
    legend:{enabled:false},
    title:{text:'Product Median & Mean Values'},
    tooltip:{shared:true},
    xAxis:{type:'category'},
    yAxis:{title:{text:'Median & Mean Values'}},
    series:[{name:'median - mean',data:db_customers}] });
  return figure;}
);
  main.variable(observer("url")).define("url", function(){return(
'https://raw.githubusercontent.com/OlgaBelitskaya/'
    .concat('machine_learning_engineer_nd009/master/')
    .concat('Machine_Learning_Engineer_ND_P3/customers.csv')
)});
  main.variable(observer("customers")).define("customers", ["d3","url"], function(d3,url){return(
d3.csv(url,d3.autoType)
)});
  main.variable(observer("tr_customers")).define("tr_customers", ["customers"], function(customers){return(
Object.assign(...Object.keys(customers[0])
                   .map(key=>({[key]:customers.map(o=>o[key])})))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Line Charts`
)});
  main.variable(observer("randi")).define("randi", function(){return(
function randi(min,max) {
  return Math.floor(Math.random()*(max-min+1))+min;}
)});
  main.variable(observer("randcol")).define("randcol", ["randi"], function(randi){return(
function randcol(i) {
  const r=randi(10+i,250),g=randi(10+i,250),b=randi(10+i,250);
  return 'rgb('+r+','+g+','+b+')';}
)});
  main.variable(observer("arr")).define("arr", function(){return(
function arr(k,a,b) {
  const d=.1**3,n=Math.ceil(2*Math.PI/d);
  return Array(n).fill(k).map((k,t)=>
        [Math.cos(d*t+k*Math.PI/6)+Math.cos(a*d*t)/2+Math.sin((a+b)*d*t)/3,
         Math.sin(d*t+k*Math.PI/6)+Math.sin(a*d*t)/2+Math.cos((a+b)*d*t)/3]);}
)});
  main.variable(observer("make_data")).define("make_data", ["randcol","arr"], function(randcol,arr){return(
function make_data(k,a,b) {
  var series=[];
  for (var i=1; i<2*k+1; i++) {
    series.push({name:i,color:randcol(i),lineWidth:.5,data:arr(i,a,b)});};
  return series}
)});
  main.variable(observer("line_chart")).define("line_chart", ["html","randi","Highcharts","make_data"], function(html,randi,Highcharts,make_data)
{
  const figure=html`<div id='line' style='width:600px; height:650px;'>`;
  const a=randi(5,15),b=randi(8,48);
  Highcharts.chart(figure, {
    chart:{type:'line',backgroundColor:'white'},
    xAxis:{title:{text:'x'}},yAxis:{title:{text:'y'}},
    title:{text:'Random Parameters: a,b = '+[a,b]},
    credits:{enabled:false},legend:{enabled:false},
    series:make_data(6,a,b)});
  return figure;}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Modules`
)});
  main.variable(observer("Highcharts")).define("Highcharts", ["require"], async function(require)
{
  const Highcharts=await require('highcharts@8');
  await require('highcharts@8/highcharts-more.js');
  await require('highcharts@8/modules/dumbbell.js');
  return Highcharts;}
);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
