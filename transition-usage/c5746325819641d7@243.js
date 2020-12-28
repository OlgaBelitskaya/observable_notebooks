// https://observablehq.com/@olgabelitskaya/transition-usage@243
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Transition Usage`
)});
  main.variable(observer()).define(["d3","data"], async function*(d3,data)
{ const div=d3.create('div'); 
  div.style('text-shadow','4px 4px 4px #ffa');
  while (true){
    yield div.node(); const randi=Math.random();
    await div.transition().duration(10000).textTween(
      ()=>t=>`cat emoji ===> ${data.slice(0,Math.floor(8*t.toFixed(1)))}`)
      .end();}
}
);
  main.variable(observer("data")).define("data", function(){return(
['😸','😹','😻','😼','😽','😾','😿','🙀']
)});
  main.variable(observer()).define(["width","d3","DOM"], async function*(width,d3,DOM)
{ const w=Math.min(1100,width),h=120,r=h/3,stroke_width=5;
  const svg=d3.select(DOM.svg(w,h));
  const x=d3.scaleLinear().range([0,w+2*stroke_width]);
  const xAxis=g=>g
    .attr('transform',`translate(0,${h})`)
    .call(d3.axisBottom(x.copy().interpolate(d3.interpolateRound)).ticks(w/110))
    .call(g=>g.select('.domain').remove())
    .call(g=>g.selectAll('.tick line').clone()
        .attr('stroke-opacity',.5)
        .attr('y1',-h/12))
  svg.append('g').call(xAxis);
  const circle=svg.append('circle').attr('r',r).attr('cx',r+stroke_width)
                  .attr('cy',7*h/12-stroke_width)
                  .attr('fill','transparent')
                  .attr('stroke','silver')
                  .attr('stroke-width',stroke_width);
  yield svg.node();
  await circle.transition().duration(2000).ease(d3.easeBounce)
              .attr('fill','silver').attr('cx',w/2+stroke_width).end();
  while (true) {
    yield svg.node();
    const cx=.1*Math.floor(10*Math.random())*(w-r*2-stroke_width*2)+r+stroke_width;
    await circle.transition().duration(2000)
                .attr('fill',`hsl(${Math.random()*360},100%,70%)`)
                .attr('cx',cx).end();} }
);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
