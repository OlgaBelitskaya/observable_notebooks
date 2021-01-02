// https://observablehq.com/@olgabelitskaya/tf-practice-3@71
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
md`## MNIST Loading`
)});
  main.variable(observer("img_size")).define("img_size", function(){return(
28
)});
  main.variable(observer("num_classes")).define("num_classes", function(){return(
10
)});
  main.variable(observer("num_points")).define("num_points", function(){return(
1*10**3
)});
  main.variable(observer("batch_size")).define("batch_size", function(){return(
64
)});
  main.variable(observer("tf_images")).define("tf_images", function(){return(
new Promise((resolve,reject)=>{
  const image=new Image;
  image.width=600;image.height=30;
  image.style.imageRendering='pixelated';
  image.crossOrigin='anonymous';
  image.src='https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png';
  image.onload=()=>resolve(image); image.onerror=reject;})
)});
  main.variable(observer("images")).define("images", ["num_points","img_size","DOM","batch_size","tf_images"], function(num_points,img_size,DOM,batch_size,tf_images)
{
  const array=new Float32Array(num_points*img_size**2);
  const context=DOM.context2d(img_size**2,batch_size,1);
  for (let i=0; i<num_points; i+=batch_size) {
    context.drawImage(tf_images,0,i,img_size**2,batch_size,
                      0,0,img_size**2,batch_size);
    const {data}=context.getImageData(0,0,img_size**2,batch_size);
    const offset=i*img_size**2;
    for (let j=0; j<data.length; j+=4) {array[offset+(j>>2)]=data[j]/255;}}
  return array;}
);
  main.variable(observer("labels")).define("labels", ["num_classes","num_points"], function(num_classes,num_points){return(
fetch('https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8')
  .then(response=>response.arrayBuffer())
  .then(buffer=>new Uint8Array(buffer,0,num_classes*num_points))
)});
  main.variable(observer("getImage")).define("getImage", ["DOM","img_size","tf_images"], function(DOM,img_size,tf_images){return(
function getImage(i) {
  const context=DOM.context2d(img_size,img_size,1);
  for (let y=0; y<img_size; ++y) {
    context.drawImage(tf_images,y*img_size,i,img_size,1,0,y,img_size,1);}
  context.canvas.style.filter='invert(1)';
  context.canvas.style.width='28px'; 
  context.canvas.style.height='28px';
  return context.canvas;}
)});
  main.variable(observer("getLabel")).define("getLabel", ["labels","num_classes"], function(labels,num_classes){return(
i=>labels.subarray(i*num_classes,(i+1)*num_classes)
                   .findIndex(value=>value===1)
)});
  main.variable(observer("randInt")).define("randInt", ["num_points"], function(num_points){return(
Math.floor(num_points*Math.random())
)});
  main.variable(observer()).define(["getImage","randInt"], function(getImage,randInt){return(
getImage(randInt)
)});
  main.variable(observer()).define(["getLabel","randInt"], function(getLabel,randInt){return(
getLabel(randInt)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## CNN Model Building`
)});
  main.variable(observer("model")).define("model", ["tf","img_size","num_classes"], async function(tf,img_size,num_classes)
{
  const model=tf.sequential();
  
  model.add( tf.layers.conv2d({
    inputShape:[img_size,img_size,1],padding:'same',
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
    units:num_classes,activation:'softmax',
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
