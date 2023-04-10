const e="p5_sketch",t={"p5Editor_4aa2f16c-cf66-46fb-8787-fd0c863f736c_sketch_p5Viewer_dbf2db45-2f06-4165-9ceb-d1e62d0a91a9_sketch":{start:{toolID:"p5Editor_4aa2f16c-cf66-46fb-8787-fd0c863f736c",portID:"sketch"},end:{toolID:"p5Viewer_dbf2db45-2f06-4165-9ceb-d1e62d0a91a9",portID:"sketch"}}},s={"p5Editor_4aa2f16c-cf66-46fb-8787-fd0c863f736c":{path:"p5/p5Editor",toolID:"p5Editor_4aa2f16c-cf66-46fb-8787-fd0c863f736c",pos:{x:188,y:85},inports:{},outports:{sketch:{type:"string",value:`function setup() {
  createCanvas(windowWidth, windowHeight);
  background(102);
}

function draw() {
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}`}},state:{sketch:`function setup() {
  createCanvas(windowWidth, windowHeight);
  background(102);
}

function draw() {
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}`},uiState:{toolbar:!0,statePanel:!1},ui:{displayName:"P5 Sketch Editor",width:500,height:400,resize:"both"},domInitialized:!0},"p5Viewer_dbf2db45-2f06-4165-9ceb-d1e62d0a91a9":{path:"p5/p5Viewer",toolID:"p5Viewer_dbf2db45-2f06-4165-9ceb-d1e62d0a91a9",pos:{x:787,y:272},inports:{sketch:{type:"javascript",value:`function setup() {
  createCanvas(windowWidth, windowHeight);
  background(102);
}

function draw() {
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}`}},outports:{},state:{},uiState:{toolbar:!0,statePanel:!1},ui:{displayName:"P5 Sketch Viewer",width:300,height:300,resize:"both"},domInitialized:!0}},n={x:-34.4000244140625,y:39.20001220703125,scale:1},a={title:e,pipes:t,tools:s,workspace:n};export{a as default,t as pipes,e as title,s as tools,n as workspace};
