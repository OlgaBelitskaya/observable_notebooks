// https://observablehq.com/@olgabelitskaya/tf-practice@145
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Tf Practice`
)});
  main.variable(observer("img_size")).define("img_size", function(){return(
28
)});
  main.variable(observer("img_resize")).define("img_resize", function(){return(
14
)});
  main.variable(observer("num_classes")).define("num_classes", function(){return(
10
)});
  main.variable(observer("num_points")).define("num_points", function(){return(
1*10**4
)});
  main.variable(observer("batch_size")).define("batch_size", function(){return(
1000
)});
  main.variable(observer("tf")).define("tf", ["require"], async function(require)
{const r=require.alias({
    '@tensorflow/tfjs-core':'@tensorflow/tfjs-core@0.14.3',
    '@tensorflow/tfjs-tsne':'@tensorflow/tfjs-tsne@0.2.0'}),
          [tf,tsne]=await Promise.all([
    r('@tensorflow/tfjs-core'),r('@tensorflow/tfjs-tsne')]);
    tf.tsne=tsne; return tf;}
);
  main.variable(observer("tf_images")).define("tf_images", function(){return(
new Promise((resolve,reject)=>{
  const image=new Image;
  image.width=600;image.height=30;
  image.style.imageRendering='pixelated';
  image.crossOrigin='anonymous';
  image.src='https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png';
  image.onload=()=>resolve(image); image.onerror=reject;})
)});
  main.variable(observer("image")).define("image", ["DOM","img_size","tf_images"], function(DOM,img_size,tf_images){return(
function image(i) {
  const context=DOM.context2d(img_size,img_size,1);
  for (let y=0; y<img_size; ++y) {
    context.drawImage(tf_images,y*img_size,i,img_size,1,
                      0,y,img_size,1);}
  return context.canvas;}
)});
  main.variable(observer("inlineImage")).define("inlineImage", ["image"], function(image){return(
function inlineImage(i) {
  const canvas=image(i);
  canvas.style.filter='invert(1)';
  canvas.style.width='28px'; canvas.style.height='28px';
  return canvas;}
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
  main.variable(observer("label")).define("label", ["labels","num_classes"], function(labels,num_classes){return(
i=>labels.subarray(i*num_classes,(i+1)*num_classes)
)});
  main.variable(observer("labelClass")).define("labelClass", ["label"], function(label){return(
i=>label(i).findIndex(value=>value===1)
)});
  main.variable(observer("randInt")).define("randInt", ["num_points"], function(num_points){return(
Math.floor(num_points*Math.random())
)});
  main.variable(observer()).define(["inlineImage","randInt"], function(inlineImage,randInt){return(
inlineImage(randInt)
)});
  main.variable(observer()).define(["labelClass","randInt"], function(labelClass,randInt){return(
labelClass(randInt)
)});
  main.variable(observer("tidy")).define("tidy", ["Generators","tf"], function(Generators,tf){return(
f=>Generators.disposable(tf.tidy(f),
                              x=>x&&x.dispose&&x.dispose())
)});
  main.variable(observer("dataLabels")).define("dataLabels", ["tidy","tf","labels","num_points","num_classes"], function(tidy,tf,labels,num_points,num_classes){return(
tidy(()=>
    tf.tensor2d(labels,[num_points,num_classes])
      .argMax(1).dataSync())
)});
  main.variable(observer("dataImages")).define("dataImages", ["tidy","tf","images","num_points","img_size","img_resize"], function(tidy,tf,images,num_points,img_size,img_resize){return(
tidy(()=>
    tf.tensor4d(images,
                [num_points,img_size,img_size,1])
      .resizeBilinear([img_resize,img_resize])
      .reshape([num_points,img_resize*img_resize]))
)});
  main.variable(observer("tsneMNIST")).define("tsneMNIST", ["tf"], function(tf){return(
async function* tsneMNIST(data) {
  const tsne=tf.tsne.tsne(data);
  await tsne.iterateKnn(500);
  for (let i=0; i<1000; ++i) {
    await tsne.iterate();
    yield await tsne.coordinates().data();}}
)});
  main.variable(observer("tsneCoord")).define("tsneCoord", ["tsneMNIST","dataImages"], function(tsneMNIST,dataImages){return(
tsneMNIST(dataImages)
)});
  main.variable(observer("get_coord")).define("get_coord", ["num_points"], function(num_points){return(
function get_coord(data) {
    var coord=[];
    for (var i=0; i<num_points; i++) {
        coord[i]={'x':data[2*i],'y':data[2*i+1]}};
    return coord;}
)});
  main.variable(observer("coord")).define("coord", ["get_coord","tsneCoord"], function(get_coord,tsneCoord){return(
get_coord(tsneCoord)
)});
  return main;
}
