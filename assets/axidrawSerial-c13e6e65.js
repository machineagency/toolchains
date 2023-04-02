import{y as T,b as q}from"./lit-html-b7b68613.js";import{a as N}from"./path-52d792b4.js";class B{constructor(){this.container=""}transform(o,t){this.container+=o;const n=this.container.split(`\r
`);this.container=n.pop(),n.forEach(r=>t.enqueue(r))}flush(o){o.enqueue(this.container)}}function R(c){let o,t,n,r,s,e;async function d(){for(;;){const{value:l,done:i}=await t.read();if(l&&c(l),i){console.log("[readLoop] DONE",i),t.releaseLock();break}}}function w(...l){const i=e.getWriter();l.forEach(S=>{console.debug("[SEND]",S),i.write(S+`
`)}),i.releaseLock()}async function g(){if(!1 in navigator){alert("Please update to the latest Chrome");return}o=await navigator.serial.requestPort(),await o.open({baudRate:9600});const l=new TextEncoderStream;r=l.readable.pipeTo(o.writable),e=l.writable;let i=new TextDecoderStream;return n=o.readable.pipeTo(i.writable),s=i.readable.pipeThrough(new TransformStream(new B)),t=s.getReader(),d(),o}async function b(){return t&&(await t.cancel(),await n.catch(()=>{}),t=null,n=null),e&&(await e.getWriter().close(),await r,e=null,r=null),await o.close(),o=null,o}return{connect:g,disconnect:b,writeToStream:w}}const h=40;function $(c,o,t){let n=Math.round(o*h),r=Math.round(t*h),s=Math.sqrt(o*o+t*t),e=Math.round(s/c*1e3);return e==0&&console.log("INVALID DURATION"),e=e<4?4:e,`XM,${e},${n},${r}`}function U(c,o,t){o||(o=0),t||(t=0);let n=c*h,r=Math.round(o*h),s=Math.round(t*h);const e=r+s,d=r-s;return n=n>25e3?25e3:n,n=n<2?2:n,`HM,${n},${e},${d}`}const m={penDown:"SP,0,500",penUp:"SP,1,500",home:"HM,20000",motorsOff:"EM,0,0",motorsOn:"EM,1,1",nickname:"QT",reboot:"RB",queryPenUp:"QP",togglePen:"TP",home:"HM,1000",queryMotors:"QE",disableMotors:"EM,0,0",enableMotors:"EM,1,1",eStop:"ES",queryVersion:"V"},C={inports:{path:{type:"array",value:null},testBounds:{type:"domain2D",value:null},workspaceBounds:{type:"domain2D",value:null}},outports:{serialOut:{type:"string",value:null}},state:{connected:!1,commandStream:[],commandHistory:[],currentPos:[0,0],testOffset:20,numTest:0,penUpSpeed:100,penDownSpeed:20},ui:{displayName:"Axi",width:200,height:200}};function L(c,o,t){let n,r,s,e,d;function w(a){console.debug(a),a.includes("OK")&&d&&d(),a.includes("Err")&&(console.log("ERROR!"),console.log(a))}function g(){d=b,b()}function b(){if(t.commandStream.length===0){d=null;return}e(t.commandStream[0]),t.commandStream.shift()}function l(){const a=c.testBounds.value,p=c.workspaceBounds.value;if(!a||!p)return console.log("Need test and workspace bounds to auto-move test"),[0,0];const f=Math.floor(p.d1.max/a.d1.max),M=t.numTest%f,u=Math.floor(t.numTest/f);return[M*a.d1.max,u*a.d2.max]}function i(){const a=l();let p=0,f=0;for(const M of Object.values(c.path.value)){let u=N(M);if(u.length<1)continue;let v=u[0][0]-p,D=u[0][1]-f;p=u[0][0],f=u[0][1],t.commandStream.push($(t.penUpSpeed,v,D)),u.shift(),t.commandStream.push(m.penDown),u.forEach(([k,y])=>{let E=k-p,x=y-f;p=k,f=y,t.commandStream.push($(t.penDownSpeed,E,x))}),t.commandStream.push(m.penUp)}t.numTest++,t.commandStream.push(U(t.penUpSpeed,a[0],a[1])),g()}async function S(){if(n){n=await s();return}({connect:r,disconnect:s,writeToStream:e}=R(w)),n=await r()}function O(){return T`<span
        >${t.commandStream.length>0?"MOVING":"NOT MOVING"}</span
      >
      <button @click=${()=>e(m.togglePen)}>
        Toggle Pen
      </button>
      <button @click=${()=>e(m.home)}>Home</button>
      <button @click=${i}>Test Path</button>
      <button @click=${()=>e(m.motorsOff)}>
        motorsOff
      </button>
      <button @click=${()=>e(m.motorsOn)}>motorsOn</button>
      <button @click=${()=>e(m.queryMotors)}>
        Query motors
      </button>
      <button @click=${()=>e(m.queryVersion)}>
        Query version
      </button>
      <button @click=${()=>e(m.nickname)}>
        Query nickname
      </button>`}function P(){return T`
      <style>
        #controls-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
      </style>
      <div id="controls-container">
        <button @click=${S}>
          ${n?"Disconnect":"Connect"}
        </button>
        ${n?O():q}
      </div>
    `}return{render:P}}const A={config:C,tool:L};export{A as default};
