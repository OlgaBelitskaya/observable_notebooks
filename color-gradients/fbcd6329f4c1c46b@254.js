// https://observablehq.com/@olgabelitskaya/color-gradients@254
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Color Gradients`
)});
  main.variable(observer("limits")).define("limits", function(){return(
{m:50}
)});
  main.variable(observer("margin")).define("margin", ["limits"], function(limits){return(
{top:limits.m,right:limits.m,
         bottom:limits.m,left:limits.m}
)});
  main.variable(observer("params")).define("params", ["margin"], function(margin){return(
{width:800-margin.left-margin.right,
         height:400-margin.top-margin.bottom}
)});
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.csvParse(`date,value,
2020-09-01,73.8039,
2020-09-02,73.5849,
2020-09-03,73.8588,
2020-09-04,75.4680,
2020-09-05,75.1823,
2020-09-08,75.5910,
2020-09-09,75.9645,
2020-09-10,76.0713,
2020-09-11,75.5274,
2020-09-12,74.8896,
2020-09-15,74.7148,
2020-09-16,75.1884,
2020-09-17,74.9278,
2020-09-18,75.1941,
2020-09-19,75.0319,
2020-09-22,76.0381,
2020-09-23,76.2711,
2020-09-24,76.3545,
2020-09-25,77.1780,
2020-09-26,76.8195,
2020-09-29,78.6713,
2020-09-30,79.6845,
2020-10-01,78.7847,
2020-10-02,77.2774,
2020-10-03,78.0915,
2020-10-06,78.1281,
2020-10-07,78.5119,
2020-10-08,78.0921,
2020-10-09,77.9157,
2020-10-10,77.0284,
2020-10-13,77.0239,
2020-10-14,77.2855,
2020-10-15,77.2759,
2020-10-16,77.9461,
2020-10-17,77.9644,
2020-10-20,77.9241,
2020-10-21,77.7780,
2020-10-22,77.0322,
2020-10-23,77.0809,
2020-10-24,76.4667,
2020-10-27,76.4443,
2020-10-28,76.4556,
2020-10-29,77.5520,
2020-10-30,78.8699,
2020-10-31,79.3323,
2020-11-03,80.5749,
2020-11-04,80.0006,
2020-11-06,78.4559,
2020-11-07,77.1875,
2020-11-10,76.9515,
2020-11-11,76.3978,
2020-11-12,76.2075,
2020-11-13,77.1148`,
d3.autoType)
)});
  main.variable(observer("x")).define("x", ["d3","data","margin","params"], function(d3,data,margin,params){return(
d3.scaleUtc().domain(d3.extent(data,d=>d.date))
    .range([margin.left,params.width-margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","data","params","margin"], function(d3,data,params,margin){return(
d3.scaleLinear()
    .domain(d3.extent(data,d=>d.value)).nice()
    .range([params.height-margin.bottom,margin.top])
)});
  main.variable(observer("colors")).define("colors", ["d3","y"], function(d3,y){return(
d3.scaleSequential(y.domain(),d3.interpolateTurbo)
)});
  main.variable(observer("xAxis")).define("xAxis", ["params","margin","d3","x"], function(params,margin,d3,x){return(
g=>g
    .attr('transform',
          `translate(0,${params.height-margin.bottom})`)
    .call(d3.axisBottom(x)
            .ticks(.01*params.width).tickSizeOuter(0))
    .call(g=>g.select('.domain').remove())
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","data"], function(margin,d3,y,data){return(
g=>g
    .attr('transform',`translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g=>g.select('.domain').remove())
    .call(g=>g.select('.tick:last-of-type text')
              .append('tspan').text(data.y))
)});
  main.variable(observer("area")).define("area", ["d3","x","params","margin","y"], function(d3,x,params,margin,y){return(
d3.area()
       .x(function(d) {return x(d.date);})
       .y0(params.height-margin.bottom)
       .y1(function(d) {return y(d.value);})
)});
  main.variable(observer()).define(["d3","params","DOM","xAxis","yAxis","margin","colors","data","area"], function(d3,params,DOM,xAxis,yAxis,margin,colors,data,area)
{const svgLine=d3.create('svg')
                 .attr('viewBox',
                       [0,0,params.width,params.height]);
 const gradient=DOM.uid();
 svgLine.append('g').call(xAxis);
 svgLine.append('g').call(yAxis);
 svgLine.append('linearGradient').attr('id',gradient.id)
        .attr('gradientUnits','userSpaceOnUse')
        .attr('x1',0).attr('y1',params.height-margin.bottom)
        .attr('x2',0).attr('y2',margin.top)
        .selectAll('stop')
        .data(d3.ticks(0,1,10)).join('stop')
        .attr('offset',d=>d)
        .attr('stop-color',colors.interpolator());
  svgLine.append('path').datum(data)
         .attr('fill',gradient).attr('fill-opacity',.3)
         .attr('stroke',gradient).attr('stroke-width',3)
         .attr('d',area);
  return svgLine.node();}
);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  return main;
}
