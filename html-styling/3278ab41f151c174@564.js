// https://observablehq.com/@olgabelitskaya/html-styling@564
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`<h1 class='font-effect-neon' style='color:slategray;'>📑 HTML Styling</h1>`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
@import 'https://fonts.googleapis.com/css?family=Ewert|Akronim|Miss Fajardose&effect=neon|3d';
h1 {font-size:150%; font-family:Ewert;}
#p1 {color:#ff6eff; font-size:200%; font-family:Akronim;}
.svg1 {background:slategray; width:300px; height:300px;}
.circle1 {fill:#ff6eff; stroke-width:5; 
          stroke:silver; transition:transform .8s;}
.circle1:hover {-ms-transform: scale(1.5); 
               -webkit-transform: scale(1.5); 
               transform: scale(1.5);}
.svg2 {background:slategray; width:300px; height:300px;}
#p2 {background-color:#ff6eff; width:300px;
     font-size:120%; text-align:center; color:#fff;}
.circle2 {fill:#ff6eff; stroke-width:5; 
          stroke:silver; transition:transform .8s;}
.circle2:hover {-ms-transform: scale(1.2); 
               -webkit-transform: scale(1.2); 
               transform: scale(1.2);}
</style>`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<div id='div001' style='width:600px; height:100px;'>
<p id='p1' class='font-effect-3d'>
Let's have a look at this example of text styling.</p>
</div>`
)});
  main.variable(observer("params")).define("params", function(){return(
{width:200,height:200}
)});
  main.variable(observer("svg1")).define("svg1", ["d3","DOM"], function(d3,DOM){return(
d3.select(DOM.svg())
       .attr('class','svg1')
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<svg class='svg1'>
<g transform='translate(150,150)'>
<circle class='circle1' cx='0' cy='0' r='80'>
</circle></g></svg>`
)});
  main.variable(observer("viewof v")).define("viewof v", ["html"], function(html){return(
html`<input type='number' id='input1' value=80
style='width:300px; font-size:120%; color:#ff6eff;
background-color:whitesmoke; text-align:center;'>`
)});
  main.variable(observer("v")).define("v", ["Generators", "viewof v"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","v"], function(html,v){return(
html`<p id='p2'>${v}</p>`
)});
  main.variable(observer()).define(["html","v"], function(html,v){return(
html`<svg class='svg2'>
<g transform='translate(150,150)'>
<circle class='circle1' cx='0' cy='0' r=${v}>
</circle></g>
</g></svg>`
)});
  main.variable(observer("viewof t")).define("viewof t", ["html"], function(html){return(
html`<input type='number' id='inputtemp' value='86' width=200
style='font-family:Miss Fajardose; font-size:300%; 
background-color:whitesmoke; color:#ff6eff; text-align:center; 
width:200px; border:double #ff6eff;'></input>`
)});
  main.variable(observer("t")).define("t", ["Generators", "viewof t"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","t"], function(html,t){return(
html`<p>Evaluate the next code cell for converting 
a Fahrenheit temperature to Celsius</p>
<input style='color:#ff6eff; background-color:whitesmoke; 
text-align:center; width:200px; border:double #ff6eff;
font-family:Miss Fajardose; font-size:300%;'
id='outtemp' value=${Math.round((5/9)*(t-32))}></input>`
)});
  main.variable(observer()).define(["d3","DOM"], function(d3,DOM)
{const svg3=d3.select(DOM.svg())
              .attr('width',300).attr('height',300)
              .attr('class','svg3')
const cols=({1:'slategray',2:'#ff6eff'})
for (var i=1; i<7; i++) {
  svg3.append('circle').attr('id','c'+i)
      .attr('transform','translate(150,150)')
      .attr('cx',0).attr('cy',0).attr('r',140-i*20)
      .attr('stroke','silver')
      .attr('fill-opacity',.1*i)
      .transition().duration(10000)
      .styleTween('fill',function() {
          return d3.interpolate(cols[1],cols[2]); }); }
return svg3.node()}
);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  return main;
}
