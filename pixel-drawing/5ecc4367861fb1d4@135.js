// https://observablehq.com/@olgabelitskaya/pixel-drawing@135
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Pixel Drawing`
)});
  main.variable(observer("viewof fill_color")).define("viewof fill_color", ["html"], function(html){return(
html`<select id='fill_color' style='width:200px'>
  <option value='#ff3636'>red => hex #ff3636</option>
  <option value='#3636ff'>blue => hex #3636ff</option>
  <option value='#36ff36'>green => hex #36ff36</option>
  <option value='#ff36ff'>magenta => hex #ff36ff</option>
  <option value='#36ffff'>cyan => hex #ff36ff</option>
  <option value='#ffff36'>yellow => hex #ff36ff</option>
</select>`
)});
  main.variable(observer("fill_color")).define("fill_color", ["Generators", "viewof fill_color"], (G, _) => G.input(_));
  main.variable(observer("viewof value")).define("viewof value", ["Pixel","fill_color"], function(Pixel,fill_color){return(
Pixel(`${fill_color}`)
)});
  main.variable(observer("value")).define("value", ["Generators", "viewof value"], (G, _) => G.input(_));
  main.variable(observer()).define(["value"], function(value){return(
value
)});
  main.variable(observer("viewof value_params")).define("viewof value_params", ["Pixel","fill_color"], function(Pixel,fill_color){return(
Pixel(`${fill_color}`,
  {size:3,stroke:'silver',background:'slategray'})
)});
  main.variable(observer("value_params")).define("value_params", ["Generators", "viewof value_params"], (G, _) => G.input(_));
  main.variable(observer()).define(["value_params"], function(value_params){return(
value_params
)});
  main.variable(observer("Pixel")).define("Pixel", function(){return(
function Pixel(fill,{
  value:v=[],width=32,height=32,size=5,spacing=1,
  stroke='white',background='whitesmoke'}={}) {
  width=Math.abs(Math.floor(width)); height=Math.abs(Math.floor(height));
  size=Math.abs(Math.floor(size)); spacing=Math.abs(Math.floor(spacing));
  let value=new Uint8Array(width*height); value.set(v);
  const canvas=document.createElement('canvas');
  canvas.width=width*size+(width+1)*spacing;
  canvas.height=height*size+(height+1)*spacing;
  canvas.style.imageRendering='-moz-crisp-edges';
  canvas.style.imageRendering='pixelated';
  const context=canvas.getContext('2d');
  Object.defineProperties(canvas,{value:{
      get(){return value;},
      set(v){
        value=new Uint8Array(width*height); value.set(v);
        context.clearRect(0,0,canvas.width,canvas.height);
        if (spacing){
          context.fillStyle=stroke;
          for (let j=0,y=0; j<=height; ++j, y+=spacing+size) {
            context.fillRect(0,y,canvas.width,spacing);}
          for (let i=0, x=0; i<=width; ++i, x+=spacing+size) {
            context.fillRect(x,0,spacing,canvas.height);}}
        context.fillStyle=fill;
        for (let j=0, y=spacing; j<height; ++j, y+=spacing+size) {
          for (let i=0, x=spacing; i<width; ++i, x+=spacing+size) {
            if (value[j*width+i]) {context.fillRect(x,y,size,size); }}}
      }} });
  canvas.addEventListener('click',event=>{
    const i=Math.floor((event.offsetX-spacing)/(size+spacing));
    const j=Math.floor((event.offsetY-spacing)/(size+spacing));
    if (i<0 || i>=width || j<0 || j>=height) return;
    const v=1-value[j*width+i];
    const x=spacing+i*(size+spacing);
    const y=spacing+j*(size+spacing);
    if (v) context.fillStyle=fill,context.fillRect(x,y,size,size);
    else context.clearRect(x,y,size,size);
    value=value.slice(); value[j*width+i]=v;
    canvas.dispatchEvent(new CustomEvent('input'));});
  canvas.value=value;
  canvas.style='padding:4px 4px 4px 4px; background:'+background;
  return canvas;}
)});
  return main;
}
