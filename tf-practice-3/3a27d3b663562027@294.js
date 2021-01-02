// https://observablehq.com/@olgabelitskaya/tf-practice-3@294
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 📑 Tf Practice 3`
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
3*10**3
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
  main.variable(observer()).define(["md"], function(md){return(
md`## Data Processing`
)});
  main.variable(observer("tidy")).define("tidy", ["Generators","tf"], function(Generators,tf){return(
f=>Generators.disposable(
    tf.tidy(f),x=>x&&x.dispose&&x.dispose())
)});
  main.variable(observer("dataLabels")).define("dataLabels", ["tidy","tf","labels","num_points","num_classes"], function(tidy,tf,labels,num_points,num_classes){return(
tidy(()=>
    tf.tensor2d(labels,[num_points,num_classes]))
)});
  main.variable(observer("dataImages")).define("dataImages", ["tidy","tf","images","num_points","img_size"], function(tidy,tf,images,num_points,img_size){return(
tidy(()=>
    tf.tensor4d(images,[num_points,img_size,img_size,1]))
)});
  main.variable(observer("trainDataLabels")).define("trainDataLabels", ["dataLabels","num_points"], function(dataLabels,num_points){return(
dataLabels.slice(1,.8*num_points)
)});
  main.variable(observer("testDataLabels")).define("testDataLabels", ["dataLabels","num_points"], function(dataLabels,num_points){return(
dataLabels.slice(.8*num_points,.2*num_points)
)});
  main.variable(observer("trainDataImages")).define("trainDataImages", ["dataImages","num_points"], function(dataImages,num_points){return(
dataImages.slice(1,.8*num_points)
)});
  main.variable(observer("testDataImages")).define("testDataImages", ["dataImages","num_points"], function(dataImages,num_points){return(
dataImages.slice(.8*num_points,.2*num_points)
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
  
  model.add( tf.layers.globalMaxPooling2d({
    dataFormat:'channelsLast'}) );
  model.add( tf.layers.dense({
    units:512,kernelInitializer:'VarianceScaling'}) ); 
  model.add( tf.layers.leakyReLU({alpha:.02}) );
  model.add( tf.layers.dropout({rate:.5}) );
  
  model.add( tf.layers.dense({
    units:num_classes,activation:'softmax',
    kernelInitializer:'VarianceScaling'}) );  
  await model.compile({
    optimizer:tf.train.adam(),
    loss:'categoricalCrossentropy',
    metrics:['accuracy']});  
  return model; }
);
  main.define("initial epochs", function(){return(
10
)});
  main.variable(observer("mutable epochs")).define("mutable epochs", ["Mutable", "initial epochs"], (M, _) => new M(_));
  main.variable(observer("epochs")).define("epochs", ["mutable epochs"], _ => _.generator);
  main.define("initial step", function(){return(
1
)});
  main.variable(observer("mutable step")).define("mutable step", ["Mutable", "initial step"], (M, _) => new M(_));
  main.variable(observer("step")).define("step", ["mutable step"], _ => _.generator);
  main.define("initial loss", function(){return(
0
)});
  main.variable(observer("mutable loss")).define("mutable loss", ["Mutable", "initial loss"], (M, _) => new M(_));
  main.variable(observer("loss")).define("loss", ["mutable loss"], _ => _.generator);
  main.define("initial accuracy", function(){return(
0
)});
  main.variable(observer("mutable accuracy")).define("mutable accuracy", ["Mutable", "initial accuracy"], (M, _) => new M(_));
  main.variable(observer("accuracy")).define("accuracy", ["mutable accuracy"], _ => _.generator);
  main.variable(observer("train")).define("train", ["mutable step","mutable epochs","model","trainDataImages","trainDataLabels","batch_size","step","mutable loss","mutable accuracy","tf"], function($0,$1,model,trainDataImages,trainDataLabels,batch_size,step,$2,$3,tf){return(
async function train() {
    while ($0.value < $1.value) {
        const history=await model.fit(
            trainDataImages,trainDataLabels,
            {batch_size:batch_size,epochs:step,yieldEvery:'epoch',
             validationSplit:.2,shuffle:true});
        $0.value++;
        $2.value=history.history.loss[0];
        $3.value=history.history.acc[0];
        await tf.nextFrame(); }; 
    await tf.nextFrame();}
)});
  main.variable(observer()).define(["train"], function(train){return(
train()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Predictions for Zero Arrays and Images`
)});
  main.variable(observer()).define(["tf","model"], async function(tf,model)
{ await tf.nextFrame();
  return model.predict(tf.zeros([1,28,28,1])).data();}
);
  main.variable(observer()).define(["tf","model","testDataImages"], async function(tf,model,testDataImages)
{ await tf.nextFrame();
  const testPredictLabels=model.predict(testDataImages).argMax(1).data();
  return testPredictLabels; }
);
  main.variable(observer()).define(["testDataLabels"], function(testDataLabels){return(
testDataLabels.argMax(1).data()
)});
  main.variable(observer("randInt")).define("randInt", ["num_points"], function(num_points){return(
Math.floor(num_points*(.8+.2*Math.random()))
)});
  main.variable(observer()).define(["getImage","randInt"], function(getImage,randInt){return(
getImage(randInt)
)});
  main.variable(observer()).define(["getLabel","randInt"], function(getLabel,randInt){return(
getLabel(randInt)
)});
  main.variable(observer()).define(["tf","model","dataImages","randInt"], async function(tf,model,dataImages,randInt)
{ await tf.nextFrame();
  return model.predict(dataImages.slice(randInt,1)).argMax(1).data(); }
);
  main.variable(observer("tf")).define("tf", ["require"], function(require){return(
require('@tensorflow/tfjs')
)});
  return main;
}
