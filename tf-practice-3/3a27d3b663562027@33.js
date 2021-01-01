// https://observablehq.com/@olgabelitskaya/tf-practice-3@33
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Tf Practice 3`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Predictions for Zero Arrays`
)});
  main.variable(observer()).define(["model","tf"], function(model,tf){return(
model.predict(tf.zeros([1,28,28,1])).data()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Model Building`
)});
  main.variable(observer("model")).define("model", ["tf"], async function(tf)
{
  const model=tf.sequential();
  
  model.add( tf.layers.conv2d({
    inputShape:[28,28,1],padding:'same',
    kernelSize:7,filters:32,strides:1,
    kernelInitializer:'VarianceScaling'}) );
  model.add( tf.layers.leakyReLU({alpha:.02}) );
  model.add( tf.layers.maxPooling2d({
    poolSize:[2,2],strides:[2,2]}) );
  model.add( tf.layers.dropout({rate:.25}) );
  
  model.add( tf.layers.conv2d({
    kernelSize:7,filters:96,strides:1,padding:'same',
    kernelInitializer:'VarianceScaling'}) );
  model.add( tf.layers.leakyReLU({alpha:.02}) ); 
  model.add( tf.layers.maxPooling2d({
    poolSize:[2,2],strides:[2,2]}) );
  model.add( tf.layers.dropout({rate:.25}) );
   
  model.add( tf.layers.conv2d({
    kernelSize:7,filters:32,strides:1,padding:'same',
    kernelInitializer:'VarianceScaling'}) );
  model.add( tf.layers.leakyReLU({alpha:.02}) );
  model.add( tf.layers.maxPooling2d({
    poolSize:[2,2],strides:[2,2]}) );
  model.add( tf.layers.dropout({rate:.25}) ); 
  
  model.add(tf.layers.globalMaxPooling2d({
    dataFormat:'channelsLast'}));
  model.add(tf.layers.dense({
    units:512,kernelInitializer:'VarianceScaling'})); 
  model.add( tf.layers.leakyReLU({alpha:.02}) );
  model.add( tf.layers.dropout({rate:.5}) );
  
  model.add(tf.layers.dense({
    units:10,activation:'softmax',
    kernelInitializer:'VarianceScaling'}));  
  await model.compile({
    optimizer:tf.train.adam(),
    loss:'categoricalCrossentropy',
    metrics:['accuracy']});  
  return model; }
);
  main.variable(observer("tf")).define("tf", ["require"], function(require){return(
require('@tensorflow/tfjs')
)});
  return main;
}
