const t={"editor_3bfa5431-a164-4197-af7b-20302dbb2dd6_js_evalJS_e7974258-99c3-4d92-9ac0-7879b1bbc9ed_js":{start:{toolID:"editor_3bfa5431-a164-4197-af7b-20302dbb2dd6",portID:"js"},end:{toolID:"evalJS_e7974258-99c3-4d92-9ac0-7879b1bbc9ed",portID:"js"}}},r={"editor_3bfa5431-a164-4197-af7b-20302dbb2dd6":{toolType:"editor",toolID:"editor_3bfa5431-a164-4197-af7b-20302dbb2dd6",pos:{x:44.80180700000004,y:5.463634999999936},inports:{},outports:{js:{type:"string",value:`function makeArr(start, stop, numSteps) {
  var arr = [];
  var step = (stop - start) / (numSteps - 1);
  for (var i = 0; i < numSteps; i++) {
    arr.push(start + (step * i));
  }
  return arr;
}

makeArr(0,200,11)`}},state:{code:`function makeArr(start, stop, numSteps) {
  var arr = [];
  var step = (stop - start) / (numSteps - 1);
  for (var i = 0; i < numSteps; i++) {
    arr.push(start + (step * i));
  }
  return arr;
}

makeArr(0,200,11)`},uiState:{toolbar:!0,statePanel:!1},ui:{displayName:"Editor",width:"400px",height:"400px"},domInitialized:!0},"evalJS_e7974258-99c3-4d92-9ac0-7879b1bbc9ed":{toolType:"evalJS",toolID:"evalJS_e7974258-99c3-4d92-9ac0-7879b1bbc9ed",pos:{x:574,y:272},inports:{js:{type:"string",value:`function makeArr(start, stop, numSteps) {
  var arr = [];
  var step = (stop - start) / (numSteps - 1);
  for (var i = 0; i < numSteps; i++) {
    arr.push(start + (step * i));
  }
  return arr;
}

makeArr(0,200,11)`}},outports:{},state:{},uiState:{toolbar:!0,statePanel:!1},ui:{displayName:"Eval",width:"200px",height:"100px"},domInitialized:!0}},a={x:180.41126307582488,y:369.22926554779804,scale:.9151416593531595},e={pipes:t,tools:r,workspace:a};export{e as default,t as pipes,r as tools,a as workspace};
