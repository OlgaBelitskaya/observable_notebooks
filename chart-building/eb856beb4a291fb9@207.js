// https://observablehq.com/@olgabelitskaya/chart-building@207
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 BarChart Building`
)});
  main.variable(observer("viewof font_family")).define("viewof font_family", ["html"], function(html){return(
html`
<select id='n_font_family' style='width:200px'>
  <option value='Orbitron'>Orbitron</option>
  <option value='Wallpoet'>Wallpoet</option>
  <option value='Akronim'>Akronim</option>
  <option value='Smokum'>Smokum</option>
  <option value='Satisfy'>Satisfy</option>
  <option value='Aladin'>Aladin</option>
</select>`
)});
  main.variable(observer("font_family")).define("font_family", ["Generators", "viewof font_family"], (G, _) => G.input(_));
  main.variable(observer("viewof background_color")).define("viewof background_color", ["html"], function(html){return(
html`
<select id='n_background_color' style='width:200px'>
  <option value='#ff355e'>Radical Red</option>
  <option value='#fd5b78'>Wild Watermelon</option>
  <option value='#ff6037'>Outrageous Orange</option>
  <option value='#ff9966'>Atomic Tangerine</option>
  <option value='#ff9933'>Neon Carrot</option>
  <option value='#ffcc33'>Sunglow</option>
  <option value='#ffff66'>Laser Lemon</option>
  <option value='#ccff00'>Electric Lime</option>
  <option value='#66ff66'>Screamin' Green</option>
  <option value='#aaf0d1'>Magic Mint</option>
  <option value='#50bfe6'>Blizzard Blue</option>
  <option value='#ff6eff'>Shocking Pink</option>
  <option value='#ee34d2'>Razzle Dazzle Rose</option>
  <option value='#ff00cc'>Hot Magenta</option>
</select>`
)});
  main.variable(observer("background_color")).define("background_color", ["Generators", "viewof background_color"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","font_family","width","dmax","linear_gradient","background_color","data"], function(html,font_family,width,dmax,linear_gradient,background_color,data){return(
html`
<style>
@import 'https://fonts.googleapis.com/css?family=${font_family}';
.div_params {padding:5px; width:${width/100*dmax*1.1}px;
             text-align:right; text-shadow:4px 4px 4px slategray;
             color:silver; font-size:20px; font-family:${font_family};
background:linear-gradient(180deg,
${linear_gradient.color1} ${linear_gradient.percent1}%,
${linear_gradient.color2} ${linear_gradient.percent2}%,
${linear_gradient.color3} ${linear_gradient.percent3}%,
${linear_gradient.color4} ${linear_gradient.percent4}%);
}
.div_params_in {background:${background_color}; padding:10px; margin:3px;}
</style>
<div class='div_params'>
  <div class='div_params_in' style='width:${width/100*data[0]}px;'>${data[0]}</div>
  <div class='div_params_in' style='width:${width/100*data[1]}px;'>${data[1]}</div>
  <div class='div_params_in' style='width:${width/100*data[2]}px;'>${data[2]}</div>
  <div class='div_params_in' style='width:${width/100*data[3]}px;'>${data[3]}</div>
  <div class='div_params_in' style='width:${width/100*data[4]}px;'>${data[4]}</div>
  <div class='div_params_in' style='width:${width/100*data[5]}px;'>${data[5]}</div>
</div>`
)});
  main.variable(observer("data")).define("data", function(){return(
[4,12,21,38,42,55]
)});
  main.variable(observer("dmax")).define("dmax", ["d3","data"], function(d3,data){return(
d3.max(data)
)});
  main.variable(observer("linear_gradient")).define("linear_gradient", function(){return(
{color1:'lightgray',percent1:0,
                  color2:'silver',percent2:33,
                  color3:'slategray',percent3:67,
                  color4:'darkslategray',percent4:100}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
