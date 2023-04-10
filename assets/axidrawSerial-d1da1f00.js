import{y as $,b as N}from"./lit-html-b7b68613.js";import{path as B}from"./path-64f1c30e.js";class R{constructor(){this.container=""}transform(e,t){this.container+=e;const n=this.container.split(`\r
`);this.container=n.pop(),n.forEach(o=>t.enqueue(o))}flush(e){e.enqueue(this.container)}}function U(l){let e,t,n,o,s,r;async function a(){for(;;){const{value:i,done:u}=await t.read();if(i&&l(i),u){console.log("[readLoop] DONE",u),t.releaseLock();break}}}function h(...i){const u=r.getWriter();i.forEach(S=>{console.debug("[SEND]",S),u.write(S+`
`)}),u.releaseLock()}async function w(){if(!1 in navigator){alert("Please update to the latest Chrome");return}e=await navigator.serial.requestPort(),await e.open({baudRate:9600});const i=new TextEncoderStream;o=i.readable.pipeTo(e.writable),r=i.writable;let u=new TextDecoderStream;return n=e.readable.pipeTo(u.writable),s=u.readable.pipeThrough(new TransformStream(new R)),t=s.getReader(),a(),e}async function g(){return t&&(await t.cancel(),await n.catch(()=>{}),t=null,n=null),r&&(await r.getWriter().close(),await o,r=null,o=null),await e.close(),e=null,e}return{connect:w,disconnect:g,writeToStream:h}}const b=40;function v(l,e,t){let n=Math.round(e*b),o=Math.round(t*b),s=Math.sqrt(e*e+t*t),r=Math.round(s/l*1e3);return r==0&&console.log("INVALID DURATION"),r=r<4?4:r,`XM,${r},${n},${o}`}function C(l,e,t){e||(e=0),t||(t=0);let n=l*b,o=Math.round(e*b),s=Math.round(t*b);const r=o+s,a=o-s;return n=n>25e3?25e3:n,n=n<2?2:n,`HM,${n},${r},${a}`}const m={penDown:"SP,0,500",penUp:"SP,1,500",home:"HM,20000",motorsOff:"EM,0,0",motorsOn:"EM,1,1",nickname:"QT",reboot:"RB",queryPenUp:"QP",togglePen:"TP",home:"HM,1000",queryMotors:"QE",disableMotors:"EM,0,0",enableMotors:"EM,1,1",eStop:"ES",queryVersion:"V"},L={inports:{path:{type:"array",value:null},testBounds:{type:"domain2D",value:null},workspaceBounds:{type:"domain2D",value:null}},outports:{serialOut:{type:"string",value:null}},state:{connected:!1,commandStream:[],commandHistory:[],currentPos:[0,0],testOffset:20,penUpSpeed:100,penDownSpeed:20},ui:{displayName:"Axi",width:200,height:200}};function Q(l,e,t){let n=0,o,s,r,a,h;function w(c){console.debug(c),c.includes("OK")&&h&&h(),c.includes("Err")&&(console.log("ERROR!"),console.log(c))}function g(){h=i,i()}function i(){if(t.commandStream.length===0){h=null;return}a(t.commandStream[0]),t.commandStream.shift()}function u(){const c=l.testBounds.value,p=l.workspaceBounds.value;if(!c||!p)return console.log("Need test and workspace bounds to auto-move test"),[0,0];const f=Math.floor(p.d1.max/c.d1.max),M=n%f,d=Math.floor(n/f);return[M*c.d1.max,d*c.d2.max]}function S(){const c=u();let p=0,f=0;for(const M of Object.values(l.path.value)){let d=B(M);if(d.length<1)continue;let D=d[0][0]-p,E=d[0][1]-f;p=d[0][0],f=d[0][1],t.commandStream.push(v(t.penUpSpeed,D,E)),d.shift(),t.commandStream.push(m.penDown),d.forEach(([k,y])=>{let x=k-p,q=y-f;p=k,f=y,t.commandStream.push(v(t.penDownSpeed,x,q))}),t.commandStream.push(m.penUp)}n++,t.commandStream.push(C(t.penUpSpeed,c[0],c[1])),g()}async function O(){if(o){o=await r();return}({connect:s,disconnect:r,writeToStream:a}=U(w)),o=await s()}function P(){return $`<span
        >${t.commandStream.length>0?"MOVING":"NOT MOVING"}</span
      >
      <button @click=${()=>a(m.togglePen)}>
        Toggle Pen
      </button>
      <button @click=${()=>a(m.home)}>Home</button>
      <button @click=${S}>Test Path</button>
      <button @click=${()=>a(m.motorsOff)}>
        motorsOff
      </button>
      <button @click=${()=>a(m.motorsOn)}>motorsOn</button>
      <button @click=${()=>a(m.queryMotors)}>
        Query motors
      </button>
      <button @click=${()=>a(m.queryVersion)}>
        Query version
      </button>
      <button @click=${()=>a(m.nickname)}>
        Query nickname
      </button>`}function T(){return $`
      <style>
        #controls-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          background-color: var(--tool-background);
        }
      </style>
      <div id="controls-container">
        <button @click=${O}>
          ${o?"Disconnect":"Connect"}
        </button>
        ${o?P():N}
      </div>
    `}return{render:T}}const H={config:L,tool:Q};export{H as default};
