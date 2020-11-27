// https://observablehq.com/@olgabelitskaya/exploration-of-animated-objects@316
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Exploration of Animated Objects`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## 🤖 Markdown Cells & HTML Headers`
)});
  main.variable(observer()).define(["md","d3","now"], function(md,d3,now)
{const md_cell1=md`### 🌈 Color Interpolation for Markdown Cells`;
 md_cell1.style.color=d3.interpolateRainbow(now/1000);
 return md_cell1;}
);
  main.variable(observer()).define(["md","now"], function(md,now){return(
md`### 🕒 ${new Date(now).toLocaleString()}`
)});
  main.variable(observer()).define(["html","d3","now"], function(html,d3,now)
{const html_header=html`<h3>🌈 Color Interpolation for HTML Headers</h3>`;
 html_header.style.color=d3.interpolateSinebow(now/3000);
 return html_header}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## 🤖 Charts`
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top:20,right:20,bottom:20,left:60}
)});
  main.variable(observer("height")).define("height", function(){return(
250
)});
  main.variable(observer("viewof play_button_1")).define("viewof play_button_1", ["html"], function(html){return(
html`
<button style='background:silver; width:200px; height:25px'>RUN</button>`
)});
  main.variable(observer("play_button_1")).define("play_button_1", ["Generators", "viewof play_button_1"], (G, _) => G.input(_));
  main.variable(observer()).define(["play_button_1","customers"], function*(play_button_1,customers)
{play_button_1; for (let i=1; i<customers.length+1; i++) {yield i;};}
);
  main.variable(observer()).define(["play_button_1","html","width","height","d3","line_path","customers","reveal","svg","xAxis","yAxis"], function(play_button_1,html,width,height,d3,line_path,customers,reveal,svg,xAxis,yAxis){return(
play_button_1,
html`<svg viewBox='0 0 ${width} ${height}'>
  ${d3.select(line_path(customers)).call(reveal).node()}
  ${d3.select(svg`<g>`).call(xAxis).node()}
  ${d3.select(svg`<g>`).call(yAxis).node()}</svg>`
)});
  main.variable(observer("viewof input_1")).define("viewof input_1", ["html"], function(html){return(
html`
<select id='product' name='Product'
style='text-align:center; text-align-last:center; 
background:silver; width:200px; height:25px'>
  <option value='Fresh'>Fresh</option>
  <option value='Milk'>Milk</option>
  <option value='Grocery'>Grocery</option>
  <option value='Frozen'>Frosen</option>
  <option value='Detergents_Paper'>Detergents Paper</option>
  <option value='Delicatessen'>Delicatessen</option>
</select>`
)});
  main.variable(observer("input_1")).define("input_1", ["Generators", "viewof input_1"], (G, _) => G.input(_));
  main.variable(observer("reveal")).define("reveal", ["d3"], function(d3){return(
path=>
path.transition().duration(7000).ease(d3.easeLinear)
    .attrTween('stroke-dasharray',function() {
      const length=this.getTotalLength();
      return d3.interpolate(`0,${length}`,`${length},${length}`);})
)});
  main.variable(observer("x")).define("x", ["d3","customers","margin","width"], function(d3,customers,margin,width){return(
d3.scaleLinear()
    .domain([0,customers.length])
    .range([margin.left,width-margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","tr_customers","input_1","height","margin"], function(d3,tr_customers,input_1,height,margin){return(
d3.scaleLinear()
    .domain([0,d3.max(tr_customers[`${input_1}`])])
    .range([height-margin.bottom,margin.top])
)});
  main.variable(observer("xAxis")).define("xAxis", ["x","height","margin","d3","width"], function(x,height,margin,d3,width){return(
(g,scale=x)=>g
    .attr('transform',`translate(0,${height-margin.bottom})`)
    .call(d3.axisBottom(scale).ticks(width/80).tickSizeOuter(0))
)});
  main.variable(observer("yAxis")).define("yAxis", ["y","margin","d3","height"], function(y,margin,d3,height){return(
(g,scale=y)=>g
    .attr('transform',`translate(${margin.left},0)`)
    .call(d3.axisLeft(scale).ticks(height/40))
    .call(g=>g.select('.domain').remove())
)});
  main.variable(observer("line")).define("line", ["d3","x","y","input_1"], function(d3,x,y,input_1){return(
d3.line().x(function(d,i) {return x(i);})
              .y(function(d) {return y(d[`${input_1}`]);})
)});
  main.variable(observer("line_path")).define("line_path", ["svg","line"], function(svg,line){return(
function line_path(data) {
  return svg`<path d='${line(data)}' 
            fill='none' stroke='#ff36ff' stroke-width='1' 
            stroke-miterlimit='1' stroke-dasharray='0,1'></path>`}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## 🤖 Modules & Data`
)});
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
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
