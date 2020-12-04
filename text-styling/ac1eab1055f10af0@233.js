// https://observablehq.com/@olgabelitskaya/text-styling@233
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Text Styling`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## webkit-background-clip`
)});
  main.variable(observer()).define(["html","params","linear_gradient","string"], function(html,params,linear_gradient,string){return(
html`
<style>
@import 'https://fonts.googleapis.com/css?family=${params.font_family}';
</style>
<div style='background:${params.background_color}; padding:${params.padding}vw;'>
<div style='background:linear-gradient(${linear_gradient.deg}deg,
${linear_gradient.color1} ${linear_gradient.percent1}%,
${linear_gradient.color2} ${linear_gradient.percent2}%,
${linear_gradient.color3} ${linear_gradient.percent3}%,
${linear_gradient.color4} ${linear_gradient.percent4}%); 
font:${params.font_width} ${params.font_size_px}px/${params.font_view_height} 
var(--sans-serif); font-family:${params.font_family};
-webkit-background-clip:text; color:${params.font_color};'>
${string}</div></div>`
)});
  main.variable(observer("params")).define("params", function(){return(
{background_color:'darkslategray',padding:5,
         font_family:'Akronim',font_width:500,
         font_color:'transparent',
         font_size_px:36,font_view_height:1.7}
)});
  main.variable(observer("linear_gradient")).define("linear_gradient", function(){return(
{deg:120,color1:'magenta',percent1:0,
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
  return main;
}
