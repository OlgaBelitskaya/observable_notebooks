// https://observablehq.com/@olgabelitskaya/dataframe-html-experiments@379
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 DataFrame-HTML Experiments`
)});
  main.variable(observer("db_data")).define("db_data", ["tr_data","d3"], function(tr_data,d3){return(
Object.entries(tr_data).slice(2,8).map(
  el=>({'name':el[0],
        'median_mean':[d3.median(el[1]),d3.mean(el[1])]}))
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","margin","xAxis","yAxis","db_data","x","y","d3Legend"], function*(d3,width,height,margin,xAxis,yAxis,db_data,x,y,d3Legend)
{
  const col1='#36ff36',col2='#3636ff';  
  const svg=d3.create('svg').attr('style','background:whitesmoke')
              .attr('viewBox',[0,0,1.2*width,1.2*height]);
  svg.append('g').append('text').attr('text-anchor','middle')
                 .attr('x',(width+margin.left)/2)
                 .attr('y',height+margin.bottom+margin.top)
                 .style('font-size','24px')
                 .text('Median & Mean Values');
  svg.append('g').call(xAxis).style('font-size','12px');
  svg.append('g').call(yAxis).style('font-size','12px');
  const lines=svg.append('g').attr('class','lines')
                 .attr('transform',`translate(0,${margin.top})`)
                 .selectAll('line').data(db_data).join('line')
                 .attr('stroke','#363636').attr('stroke-width',4)
                 .attr('opacity','.7')
                 .attr('x1',d=>x(d.median_mean[0]))
                 .attr('x2',d=>x(d.median_mean[1]))
                 .attr('y1',d=>y(d.name)).attr('y2',d=>y(d.name));
  const dots=svg.append('g').attr('class','dots')
                .attr('transform',`translate(0,${margin.top})`)
                .selectAll('circle').data(db_data).join('circle')
                .attr('fill',col1).attr('r',8)
                .attr('cx',d=>x(d.median_mean[0]))
                .attr('cy',d=>y(d.name))
                .clone(true)
                .attr('cx',d=>x(d.median_mean[1]))
                .attr('fill',col2);
  const legend_trans=`translate(${width+margin.right}`
                     .concat(`,${height/2-margin.bottom})`);
  const legend=svg.append('g').attr('class','legend')
                  .attr('transform',legend_trans)
                  .call(d3Legend.legendColor()
                  .shape('circle').shapeRadius(8)
                  .shapePadding(60).orient('vertical')
                  .labelAlign('center').labelOffset('20')
                  .scale(d3.scaleOrdinal()
                           .domain(['median','mean'])
                           .range([col1, col2])));
  yield svg.node();}
);
  main.variable(observer("width")).define("width", function(){return(
800
)});
  main.variable(observer("height")).define("height", function(){return(
400
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top:20,right:20,bottom:20,left:120}
)});
  main.variable(observer("url")).define("url", function(){return(
'https://raw.githubusercontent.com/OlgaBelitskaya/'
    .concat('machine_learning_engineer_nd009/master/')
    .concat('Machine_Learning_Engineer_ND_P3/customers.csv')
)});
  main.variable(observer("data")).define("data", ["d3","url"], function(d3,url){return(
d3.csv(url,d3.autoType)
)});
  main.variable(observer("tr_data")).define("tr_data", ["data"], function(data){return(
Object.assign(...Object.keys(data[0])
              .map(key=>({[key]:data.map(o=>o[key])})))
)});
  main.variable(observer("x")).define("x", ["d3","db_data","margin","width"], function(d3,db_data,margin,width){return(
d3.scaleLinear()
    .domain([0,d3.max(db_data,d=>d.median_mean[1])])
    .range([margin.left,width-margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","db_data","margin","height"], function(d3,db_data,margin,height){return(
d3.scalePoint()
    .domain(db_data.map(d=>d.name))
    .rangeRound([margin.top,height-margin.bottom])
)});
  main.variable(observer("xAxis")).define("xAxis", ["margin","height","d3","x","width"], function(margin,height,d3,x,width){return(
g=>g
    .attr('transform',
          `translate(${margin.left}),${height-margin.bottom})`)
    .call(d3.axisBottom(x).ticks(.02*width).tickSizeOuter(0))
    .call(g=>g.select('.domain').remove())
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","db_data"], function(margin,d3,y,db_data){return(
g=>g
    .attr('transform',
          `translate(${margin.left},${margin.top})`)
    .call(d3.axisLeft(y))
    .call(g=>g.select('.domain').remove())
    .call(g=>g.select('.tick:last-of-type text')
              .append('tspan').text(db_data.name))
)});
  main.variable(observer("d3Legend")).define("d3Legend", ["require"], function(require){return(
require('d3-svg-legend')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<div style='border:10px double white; 
width:950px; height:350px; overflow:auto; 
padding:5px; background-color:ghostwhite'>
<iframe src='https://olgabelitskaya.github.io/instagram15.html' 
width='935' height='335'></iframe></div>`
)});
  return main;
}
