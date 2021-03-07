// https://observablehq.com/@olgabelitskaya/chart-building@426
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Chart Building`
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
  main.variable(observer("viewof font_size_px")).define("viewof font_size_px", ["html"], function(html){return(
html`
<input type='range' id='n_font_size_px' 
value=16 min=8 max=48 style='width:200px'>`
)});
  main.variable(observer("font_size_px")).define("font_size_px", ["Generators", "viewof font_size_px"], (G, _) => G.input(_));
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
  main.variable(observer()).define(["html"], function(html){return(
html`
<table style='width:81%; border:double slategray;'>
  <tr>
    <th>value #1</th><th>value #2</th><th>value #3</th><th>value #4</th><th>value #5</th>
    <th>value #6</th><th>value #7</th><th>value #8</th><th>value #9</th>
  </tr>
  <tr>
     <td><center><input type='range' id='value1' value=4 min=1 max=100 style='width:70px'></center></td>
     <td><center><input type='range' id='value2' value=17 min=1 max=100 style='width:70px'></center></td>
     <td><center><input type='range' id='value3' value=30 min=1 max=100 style='width:70px'></center></td>
     <td><center><input type='range' id='value4' value=42 min=1 max=100 style='width:70px'></center></td>
     <td><center><input type='range' id='value5' value=53 min=1 max=100 style='width:70px'></center></td>
     <td><center><input type='range' id='value6' value=24 min=1 max=100 style='width:70px'></center></td>
     <td><center><input type='range' id='value7' value=71 min=1 max=100 style='width:70px'></center></td>
     <td><center><input type='range' id='value8' value=62 min=1 max=100 style='width:70px'></center></td>
     <td><center><input type='range' id='value9' value=85 min=1 max=100 style='width:70px'></center></td>
   </tr>
</table>`
)});
  main.variable(observer()).define(["html","font_family","width","d3","get_data","font_size_px","linear_gradient","background_color"], function(html,font_family,width,d3,get_data,font_size_px,linear_gradient,background_color){return(
html`
<style>
@import 'https://fonts.googleapis.com/css?family=${font_family}';
.div_params {
  padding:5px; width:${width/100*d3.max(get_data())}px;
  text-align:right; text-shadow:4px 4px 4px slategray;
  color:lightgray; font-size:${font_size_px}px; font-family:${font_family};
  background:linear-gradient(180deg,
  ${linear_gradient.color1} ${linear_gradient.percent1}%,
  ${linear_gradient.color2} ${linear_gradient.percent2}%,
  ${linear_gradient.color3} ${linear_gradient.percent3}%,
  ${linear_gradient.color4} ${linear_gradient.percent4}%);}
.div_params_in {background:${background_color}; padding:5px; margin:3px;}
#div_h2 {text-shadow:4px 4px 4px slategray; color:${background_color};
         font-size:${font_size_px}px; font-family:${font_family}; padding-left:${.3*width}px;}
</style>
<div class='div_params'>
<h2 id='div_h2'>Building Bar Charts</h2>
<div class='div_params_in' style='width:${.009*width*get_data()[0]}px;'>${get_data()[0]}</div>
<div class='div_params_in' style='width:${.009*width*get_data()[1]}px;'>${get_data()[1]}</div>
<div class='div_params_in' style='width:${.009*width*get_data()[2]}px;'>${get_data()[2]}</div>
<div class='div_params_in' style='width:${.009*width*get_data()[3]}px;'>${get_data()[3]}</div>
<div class='div_params_in' style='width:${.009*width*get_data()[4]}px;'>${get_data()[4]}</div>
<div class='div_params_in' style='width:${.009*width*get_data()[5]}px;'>${get_data()[5]}</div>
<div class='div_params_in' style='width:${.009*width*get_data()[6]}px;'>${get_data()[6]}</div>
<div class='div_params_in' style='width:${.009*width*get_data()[7]}px;'>${get_data()[7]}</div>
<div class='div_params_in' style='width:${.009*width*get_data()[8]}px;'>${get_data()[8]}</div>
</div>`
)});
  main.variable(observer("linear_gradient")).define("linear_gradient", function(){return(
{color1:'lightgray',percent1:0,
                  color2:'silver',percent2:33,
                  color3:'slategray',percent3:67,
                  color4:'darkslategray',percent4:100}
)});
  main.variable(observer()).define(["html","font_family"], function(html,font_family){return(
html`
<style>
@import 'https://fonts.googleapis.com/css?family=${font_family}';
</style>
<div id='d3barchart'><text id='d3barchart_title'></text></div>`
)});
  main.variable(observer()).define(["d3","now","get_data","width","font_family","font_size_px"], function(d3,now,get_data,width,font_family,font_size_px)
{ var div=d3.select('#d3barchart')
  div.style('text-align','right')
     .style('text-shadow','4px 4px 4px darkslategray')
     .style('padding','10px')
     .style('width','80%')
     .style('color',d3.interpolateSinebow(now/30000))
     .style('background',d3.interpolateSinebow(now/30000));
  var x=d3.scaleLinear().domain([0,d3.max(get_data())]).range([0,.75*width]);
  div.select('#d3barchart_title')
     .text('An Example of D3 Bar Charts')
     .style('text-shadow','4px 4px 4px darkslategray')
     .style('color','silver')
     .style('font-family',`${font_family}`)
     .style('font-size',`${font_size_px}px`);
  div.selectAll('div').data(get_data()).join('div')
      .style('background','silver')
      .style('padding','5px').style('margin','3px')
      .style('width',d=>`${x(d)}px`)
      .style('font-family',`${font_family}`)
      .style('font-size',`${font_size_px}px`)
      .text(d=>d);
  return div.node(); }
);
  main.variable(observer("get_data")).define("get_data", function(){return(
function get_data() {
    var data=[];
    for (var i=1; i<10; i++){
      var v=parseFloat(document.getElementById('value'+i).value);
      data.push(v)};
    return data}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
