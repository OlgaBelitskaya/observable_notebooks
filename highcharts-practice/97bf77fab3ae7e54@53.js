// https://observablehq.com/@olgabelitskaya/highcharts-practice@53
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
  main.variable(observer("chart")).define("chart", ["html","Highcharts","db_customers"], function(html,Highcharts,db_customers)
{const figure=html`<div style='height:400px;'>`;
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
  main.variable(observer("customers")).define("customers", ["d3","url"], function(d3,url){return(
d3.csv(url,d3.autoType)
)});
  main.variable(observer("tr_customers")).define("tr_customers", ["customers"], function(customers){return(
Object.assign(...Object.keys(customers[0])
                   .map(key=>({[key]:customers.map(o=>o[key])})))
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
  main.variable(observer("url")).define("url", function(){return(
'https://raw.githubusercontent.com/OlgaBelitskaya/'
    .concat('machine_learning_engineer_nd009/master/')
    .concat('Machine_Learning_Engineer_ND_P3/customers.csv')
)});
  return main;
}
