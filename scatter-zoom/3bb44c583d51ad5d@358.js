// https://observablehq.com/@olgabelitskaya/scatter-zoom@358
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Scatter Zoom`
)});
  main.variable(observer("viewof transform")).define("viewof transform", ["html","transforms","invalidation"], function(html,transforms,invalidation)
{
  const form=html`<form style='display:flex; height:50px; align-items:center;'>
  ${transforms.map(([name,transform],i)=>
    html`<label style='color:slategray; text-shadow:3px 3px 3px #999; margin-right:1em;
                       font:16px times; display:inline-flex; align-items:center;'>
    <input type='radio' name='radio' value='${i}'${i===0 ? 'checked':''}>
    🕸 &nbsp;${name}</label>`)}</form>`;
  const timeout=setInterval(()=>{
    form.value=transforms[form.radio.value=(+form.radio.value+2)%transforms.length][1];
    form.dispatchEvent(new CustomEvent('input'));},3000);
  form.onchange=()=>form.dispatchEvent(new CustomEvent('input'));
  form.oninput=event=>{ 
    if (event.isTrusted) clearInterval(timeout),form.onchange=null;
    form.value=transforms[form.radio.value][1];};
  form.value=transforms[form.radio.value][1];
  invalidation.then(()=>clearInterval(timeout));
  return form;}
);
  main.variable(observer("transform")).define("transform", ["Generators", "viewof transform"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","data","x","y","z","viewof transform","xAxis","yAxis"], function(d3,width,height,data,x,y,z,$0,xAxis,yAxis)
{
  const zoom=d3.zoom().on('zoom',zoomed);
  const svg=d3.create('svg').attr('viewBox',[0,0,width,height]);
  const g=svg.append('g').attr('fill','none').attr('stroke-linecap','round');
  g.selectAll('path').data(data).join('path')
      .attr('d',d=>`M${x(d[0])},${y(d[1])}h0`)
      .attr('stroke',d=>z(d[2]));
  const gx=svg.append('g'),gy=svg.append('g');
  svg.call(zoom.transform,$0.value);
  function zoomed(event){
    const {transform}=event;
    g.attr('transform',transform).attr('stroke-width',1/transform.k);
    gx.call(xAxis,transform.rescaleX(x));
    gy.call(yAxis,transform.rescaleY(y));}
  return Object.assign(svg.node(), {
    update(transform){
      svg.transition().duration(5000).call(zoom.transform,transform);}}); }
);
  main.variable(observer()).define(["chart","transform"], function(chart,transform){return(
chart.update(transform)
)});
  main.variable(observer("transforms")).define("transforms", ["d3","data","x","y","width","height"], function(d3,data,x,y,width,height){return(
[['Overview',d3.zoomIdentity]].concat(d3.groups(data,
  d=>d[2]).map(([key,data])=>{
    const [x0,x1]=d3.extent(data,d=>d[0]).map(x);
    const [y1,y0]=d3.extent(data,d=>d[1]).map(y);
    const k=.8*Math.min(width/(x1-x0),height/(y1-y0));
    const tx=(width-k*(x0+x1))/2,ty=(height-k*(y0+y1))/2;
    return [`function ${key+1}`,d3.zoomIdentity.translate(tx,ty).scale(k)];
}))
)});
  main.variable(observer("x")).define("x", ["d3","width"], function(d3,width){return(
d3.scaleLinear().domain([-7,7]).range([0,width])
)});
  main.variable(observer("y")).define("y", ["d3","k","height"], function(d3,k,height){return(
d3.scaleLinear().domain([-7*k,7*k]).range([height,0])
)});
  main.variable(observer("z")).define("z", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal().domain(data.map(d=>d[2]))
    .range(d3.schemeCategory10)
)});
  main.variable(observer("randi")).define("randi", function(){return(
function randi(xmin,xmax){
    return Math.floor(Math.random()*(xmax-xmin+1))+xmin;}
)});
  main.variable(observer("make_data")).define("make_data", ["randi","d3"], function(randi,d3){return(
function make_data(j,dx,dy,num) {
     const a=randi(5,11),b=randi(12,36),d=2*Math.PI/num;
     return d3.range(0,num).map(function(i) {
        return [Math.cos(d*i)+Math.cos(a*d*i)/2+Math.sin((a+b)*d*i)/3+dx,
                Math.sin(d*i)+Math.sin(a*d*i)/2+Math.cos((a+b)*d*i)/3+dy,
                j]}); }
)});
  main.variable(observer("data")).define("data", ["make_data"], function(make_data)
{
  const num=1280;
  return [].concat(make_data(0,3,2,3*num),make_data(1,-3,2,num),
                   make_data(2,-3,-2,3*num),make_data(3,3,-2,num))}
);
  main.variable(observer("xAxis")).define("xAxis", ["height","d3"], function(height,d3){return(
(g,x)=>g
    .attr('transform',`translate(0,${height})`)
    .call(d3.axisTop(x).ticks(12))
    .call(g=>g.select('.domain').attr('display','none'))
)});
  main.variable(observer("yAxis")).define("yAxis", ["d3","k"], function(d3,k){return(
(g,y)=>g
    .call(d3.axisRight(y).ticks(12*k))
    .call(g=>g.select('.domain').attr('display','none'))
)});
  main.variable(observer("k")).define("k", ["height","width"], function(height,width){return(
height/width
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
