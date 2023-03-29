const e={"p5Editor_2282d924-7611-457a-978f-ce3be53bd122_sketch_p5Viewer_7b8b611f-62ac-477d-a0dd-ca541c68cd2d_sketch":{start:{toolID:"p5Editor_2282d924-7611-457a-978f-ce3be53bd122",portID:"sketch"},end:{toolID:"p5Viewer_7b8b611f-62ac-477d-a0dd-ca541c68cd2d",portID:"sketch"}}},n={"p5Viewer_7b8b611f-62ac-477d-a0dd-ca541c68cd2d":{toolType:"p5Viewer",toolID:"p5Viewer_7b8b611f-62ac-477d-a0dd-ca541c68cd2d",pos:{x:810.8281390604775,y:-346.093485313746},inports:{sketch:{type:"javascript",value:`function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0)
}`}},outports:{},state:{},uiState:{toolbar:!0,statePanel:!1},ui:{displayName:"P5 Sketch Viewer",width:1013.7071524900492,height:864.0237674985141,resize:"both"},domInitialized:!0},"p5Editor_2282d924-7611-457a-978f-ce3be53bd122":{toolType:"p5Editor",toolID:"p5Editor_2282d924-7611-457a-978f-ce3be53bd122",pos:{x:126.69016768241546,y:-345.30371259170914},inports:{},outports:{sketch:{type:"string",value:`function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0)
}`}},state:{sketch:`function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0)
}`},uiState:{toolbar:!0,statePanel:!1},ui:{displayName:"P5 Sketch Editor",width:500,height:400,resize:"both"},domInitialized:!0}},t={x:154.49468709305575,y:326.70957141198903,scale:.623166939220114},i={pipes:e,tools:n,workspace:t};export{i as default,e as pipes,n as tools,t as workspace};
