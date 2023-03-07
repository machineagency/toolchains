import{y as i,b as M}from"./index-0a3b502e.js";const g={inports:{},outports:{serialOut:{type:"pulse",value:null}},state:{connected:!1},ui:{displayName:"Axi",width:"200px",height:"200px"}},h=(o,r,t)=>`SM,${o},${r},${t}\r`,P=(o,r,t)=>`XM,${o},${r},${t}\r`,u={nickname:"QT\r",reboot:"RB\r",queryPenUp:"QP\r",togglePen:"TP\r",disableMotors:"EM,0,0\r",enableMotors:"EM,1,1\r",abMove:P(1e3,1e3,1e3),xyMove:h(1e3,1e3,1e3),eStop:"ES\r"};function S(o,r,t){function p(){}let s=[],a,c,l,d,n;async function b(){const e=new TextDecoderStream;for(l=n.readable.pipeTo(e.writable),c=e.readable.getReader();;){const{value:v,done:x}=await c.read();if(x){c.releaseLock();break}s.push(v)}}async function w(){const e=new TextEncoderStream;d=e.readable.pipeTo(n.writable),a=e.writable.getWriter()}async function f(e){await a.write(u[e])}async function y(){await n.open({baudRate:9600}),t.connected=!0,b(),w()}async function $(){c.cancel(),await l.catch(()=>{}),a.close(),await d,await n.close(),t.connected=!1}async function m(){t.connected?(console.log("Disconnect"),$()):navigator.serial.requestPort().then(e=>{n=e,y()}).catch(e=>{console.log("oops no port selected")})}return{init:p,render:()=>i`<style>
        button {
          width: 100%;
        }
      </style>
      <div>Connected: ${t.connected}</div>
      <button @click=${m}>
        ${t.connected?"Disconnect":"Connect"}
      </button>
      ${t.connected?Object.keys(u).map(e=>i`<button @click=${()=>f(e)}>${e}</button>`):M}
      <div>
        ${s.map(e=>i`<div>${e}</div>`)}
      </div>`}}const C={config:g,tool:S};export{C as default};
