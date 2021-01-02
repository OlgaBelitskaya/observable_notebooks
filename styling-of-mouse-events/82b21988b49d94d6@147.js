// https://observablehq.com/@olgabelitskaya/styling-of-mouse-events@147
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Styling of Mouse Events`
)});
  main.variable(observer()).define(["DOM","width","height","d3","track_tap","clear","track","draw"], function(DOM,width,height,d3,track_tap,clear,track,draw)
{ const context=DOM.context2d(width,height),
  canvas=context.canvas;
  d3.select(canvas)
    .style('background','silver')
    .style('margin','5px 5px 15px 5px')
    .on('touchmove',e=>e.preventDefault())
    .on('pointerenter',()=>(canvas.dbltap=canvas.dbltap||track_tap()))
    .on('pointerdown',e=>{
      if (canvas.dbltap(e)) return clear(context);
      track(e,{
        start:line=>{console.log('start',line);},
        move:line=>{draw(context,line); console.log('move',line);},
        out:line=>console.log('out',line),
        end:line=>console.log('end',line)});});
  return canvas;}
);
  main.variable(observer("track_tap")).define("track_tap", ["d3"], function(d3){return(
function track_tap(delay=200) {
  let tap;
  return function(e) {
    const t=d3.pointer(e);
    if (tap&&Math.hypot(tap[0]-t[0],tap[1]-t[1])<20) return true;
    tap=t;
    setTimeout(()=>(tap=null),delay);}; }
)});
  main.variable(observer("track")).define("track", ["d3"], function(d3){return(
function track(e,{start,move,out,end}){
  const tracker={},
    id=(tracker.id=e.pointerId),
    target=e.target;
  tracker.point=d3.pointer(e,target);
  target.setPointerCapture(id);
  d3.select(target)
    .on(`pointerup.${id} pointercancel.${id}`,e=>{
      if (e.pointerId!==id) return;
      tracker.sourceEvent=e;
      d3.select(target).on(`.${id}`,null);
      target.releasePointerCapture(id);
      end&&end(tracker);})
    .on(`pointermove.${id}`,e=>{
      if (e.pointerId!==id) return;
      tracker.sourceEvent=e;
      tracker.prev=tracker.point;
      tracker.point=d3.pointer(e,target);
      move&&move(tracker);})
    .on(`pointerout.${id}`,e=>{
      if (e.pointerId!==id) return;
      tracker.sourceEvent=e;
      tracker.point=null;
      out && out(tracker);});
  start&&start(tracker);}
)});
  main.variable(observer("draw")).define("draw", ["d3"], function(d3){return(
function draw(context,line) {
    const pressure=2*line.sourceEvent.pressure||1;
    if (line.prev) {
      context.beginPath();
      context.lineWidth=pressure;
      context.strokeStyle=d3.interpolateSinebow(Date.now()/1000);
      context.moveTo(...line.prev);
      context.lineTo(...line.point);
      context.lineCap='round';
      context.stroke();} }
)});
  main.variable(observer("clear")).define("clear", ["width","height"], function(width,height){return(
function clear(context){context.clearRect(0,0,width,height);}
)});
  main.variable(observer("width")).define("width", function(){return(
document.documentElement.clientWidth-35
)});
  main.variable(observer("height")).define("height", function(){return(
300
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
