// https://observablehq.com/@olgabelitskaya/text-styling@334
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Text Styling`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## webkit-background-clip`
)});
  main.variable(observer("viewof deg")).define("viewof deg", ["html"], function(html){return(
html`<input type='range' id='n_deg' value=120 min=0 max=360 style='width:200px'>`
)});
  main.variable(observer("deg")).define("deg", ["Generators", "viewof deg"], (G, _) => G.input(_));
  main.variable(observer("viewof font_width")).define("viewof font_width", ["html"], function(html){return(
html`<input type='range' id='n_font_width' value=200 min=100 max=900 style='width:200px'>`
)});
  main.variable(observer("font_width")).define("font_width", ["Generators", "viewof font_width"], (G, _) => G.input(_));
  main.variable(observer("viewof font_size_px")).define("viewof font_size_px", ["html"], function(html){return(
html`<input type='range' id='n_font_size_px' value=29 min=8 max=48 style='width:200px'>`
)});
  main.variable(observer("font_size_px")).define("font_size_px", ["Generators", "viewof font_size_px"], (G, _) => G.input(_));
  main.variable(observer("viewof font_family")).define("viewof font_family", ["html"], function(html){return(
html`<select id='n_font_family' style='width:200px'>
  <option value='Akronim'>Akronim</option>
  <option value='Miss Fajardose'>Miss Fajardose</option>
  <option value='Smokum'>Smokum</option>
  <option value='Tangerine'>Tangerine</option>
  <option value='Wallpoet'>Wallpoet</option>
  <option value='Satisfy'>Satisfy</option>
  <option value='Aladin'>Aladin</option>
</select>`
)});
  main.variable(observer("font_family")).define("font_family", ["Generators", "viewof font_family"], (G, _) => G.input(_));
  main.variable(observer("viewof background_color")).define("viewof background_color", ["html"], function(html){return(
html`<select id='n_background_color' style='width:200px'>
  <option value='black'>black</option>
  <option value='darkslategray'>darkslategray</option>
  <option value='midnightblue'>midnightblue</option>
  <option value='mintcream'>mintcream</option>
  <option value='whitesmoke'>whitesmoke</option>
  <option value='ghostwhite'>ghostwhite</option>
  <option value='ivory'>ivory</option>
  <option value='oldlace'>oldlace</option>
</select>`
)});
  main.variable(observer("background_color")).define("background_color", ["Generators", "viewof background_color"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","font_family","background_color","params","deg","linear_gradient","font_width","font_size_px","string"], function(html,font_family,background_color,params,deg,linear_gradient,font_width,font_size_px,string){return(
html`
<style>
@import 'https://fonts.googleapis.com/css?family=${font_family}';
</style>
<div style='background:${background_color}; padding:${params.padding}vw;'>
<div style='background:linear-gradient(${deg}deg,
${linear_gradient.color1} ${linear_gradient.percent1}%,
${linear_gradient.color2} ${linear_gradient.percent2}%,
${linear_gradient.color3} ${linear_gradient.percent3}%,
${linear_gradient.color4} ${linear_gradient.percent4}%); 
font:${font_width} ${font_size_px}px/${params.font_view_height} 
var(--sans-serif); font-family:${font_family};
-webkit-background-clip:text; color:${params.font_color};'>
${string}</div></div>`
)});
  main.variable(observer("params")).define("params", function(){return(
{padding:2,font_color:'transparent',font_view_height:1.1}
)});
  main.variable(observer("linear_gradient")).define("linear_gradient", function(){return(
{color1:'magenta',percent1:0,
                  color2:'orange',percent2:33,
                  color3:'cyan',percent3:67,
                  color4:'purple',percent4:100}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## canvas`
)});
  main.variable(observer()).define(["html","canvas_text","corpus"], function(html,canvas_text,corpus){return(
html`<p>${canvas_text(corpus)}</p>`
)});
  main.variable(observer("canvas_text")).define("canvas_text", ["DOM"], function(DOM){return(
function canvas_text(string_array,width=900,height=300,
                     font_size_px=20,font_family='Verdana',
                     colors=['#33dddd','#3333dd','#dd33dd',
                             '#dd3333','#dddd33']) 
{const context=DOM.context2d(width,height);
 context.font=font_size_px+'px '.concat(font_family);
 const gradient=context.createLinearGradient(0,height,width,0);
 for (var i=0; i<colors.length; i++) {
   gradient.addColorStop((i/colors.length).toString(),colors[i]);}
 context.strokeStyle=gradient;
 for (var i=0; i<string_array.length; i++) {
   context.strokeText(string_array[i],10,(font_size_px+5)*(i+1));};
 return context.canvas;}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## svg random sequences`
)});
  main.variable(observer("randcorpus")).define("randcorpus", ["d3","corpus","Promises"], async function*(d3,corpus,Promises)
{while (true) {
    yield d3.shuffle([...corpus].slice())
            .slice(Math.floor(Math.random()*10)+1)
            .sort(d3.ascending);
    await Promises.delay(3000);};}
);
  main.variable(observer("letter_chart")).define("letter_chart", ["d3","corpus"], function(d3,corpus)
{
  const svg=d3.create('svg')
  return Object.assign(svg.node(),{
    update(letters) {
      const height=20*letters.length+25;
      svg.attr('viewBox',[0,0,600,height])
          .attr('font-family','Verdana').attr('font-size',10)
          .style('display','block');
      let text=svg.selectAll('text');
      text=text.data(letters).join('text').text(d=>d)
               .attr('x',20).attr('y',(d,i)=>(i+1)*20)
               .style('fill',d3.interpolateTurbo(
                 letters.length/corpus.length))}});}
);
  main.variable(observer()).define(["letter_chart","randcorpus"], function(letter_chart,randcorpus){return(
letter_chart.update(randcorpus)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## text`
)});
  main.variable(observer("corpus")).define("corpus", function(){return(
['Have you already set your goals for the New Year?', 
        'Do you want to lose ten kilos, run a marathon or speak fluent English?', 
        'Some experts believe that you need systems, not goals.', 
        'A system is something you do on a regular basis. ',
        'This means focusing on what you can control (your actions) rather than what you can’t.',
        'For example, do not focus on losing ten kilos.',
        'Focus on shopping for healthy food and cooking something light every day.',
        'Do not focus on the marathon.',
        'Focus on the training schedule.',
        'Invent a system to improve your English, one step at a time.',
        'Good luck!']
)});
  main.variable(observer("string")).define("string", ["corpus"], function(corpus){return(
corpus.join(' ')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
