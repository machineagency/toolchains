import{y}from"./index-0a3b502e.js";const config={inports:{js:{type:"string",value:null}},outports:{},state:{},ui:{displayName:"Eval",width:"200px",height:"100px"}};function evalJS(inports,outports,state){let output;function inportsUpdated(){console.log("updated");try{output=JSON.stringify(eval(inports.js.value),null,"	")}catch{output="error"}}function render(){return y`<style>
        #output {
          padding: 0.2rem;
          font-size: 1rem;
          font-family: monospace;
        }
      </style>
      <div id="output">${output}</div>`}return{inportsUpdated,render}}const evalJS$1={config,tool:evalJS};export{evalJS$1 as default};
