import{Z as N,y as L,w as B}from"./lit-html-b7b68613.js";const T=(t,e)=>ee(t,e)<1e-6,ee=([t,e],[o,n])=>Math.sqrt((o-t)**2+(n-e)**2);function j(t,e=[0,0],o=[0,0]){if(typeof t[0]!="string")return t;if(t[0]==="chamfer"){const[n,s,l]=t;return l}else if(t[0]==="fillet"){const[n,s,l]=t;return l}else if(t[0]==="cubic"){const[n,s,l,r]=t;return l}else if(t[0]==="relative"){const[n,s,l]=t;return[e[0]+s,e[1]+l]}else if(t[0]==="turnForward"){const[n,s,l]=t,r=s/180*Math.PI,i=ne(e,o)+r;return[e[0]+Math.cos(i)*l,e[1]+Math.sin(i)*l]}else return null}function te(t){if(typeof t[0]!="string")return t;if(t[0]==="chamfer"){const[e,o,n]=t;return n}else if(t[0]==="fillet"){const[e,o,n]=t;return n}else if(t[0]==="cubic"){const[e,o,n,s]=t;return s}else return null}function ne(t,e){const o=t[0]-e[0],n=t[1]-e[1];return Math.atan2(n,o)}function oe(t){const e=[],o=[];if(t.length===0)return{cubics:e,filletsAndChamfers:o};let n=j(t[0]),s=te(t[0]);s===null&&(s=n);const l=()=>e.length>0?se(e.at(-1),32).slice(-2).reverse():[n,n];for(let r=1;r<t.length;r++){const i=t[r];if(typeof i[0]!="string")e.push([n,s,i,i]),n=i,s=i;else if(i[0]==="fillet"||i[0]==="chamfer"){const[u,c,d]=i,a=j(d,...l());e.push([n,s,a,a]),n=a,s=a;const f=r===t.length-1?a:j(t[r+1],a,n),h={lowerLimit:n,start:a,upperLimit:f,radius:c,cubicIndex:r-1,type:u};o.push(h)}else if(i[0]==="cubic"){const[u,c,d,a]=i;e.push([n,s,c,d]),n=d,s=a}else if(i[0]==="relative"||i[0]==="turnForward"){const u=j(i,...l());e.push([n,s,u,u]),n=u,s=u}else throw console.log(i),new Error("Unknown command used in path(...)")}return{cubics:e,filletsAndChamfers:o}}const I=(t,e,o)=>[(1-t)*e[0]+t*o[0],(1-t)*e[1]+t*o[1]],K=(t,e,o,...n)=>n.length>0?[I(t,e,o),...K(t,o,...n)]:[I(t,e,o)],R=(t,e)=>e.length>1?R(t,K(t,...e)):e[0];function se(t,e){if(T(t[0],t[1])&&T(t[2],t[3]))return[t[0],t[3]];const o=[];for(let n=0;n<=1*e;n+=1){const s=R(n/e,t);o.push(s)}return o}function O(t){return typeof t[0]=="number"?"point":t[0]}const H=t=>t.composedPath()[0],ie=(t,e)=>H(t).matches(e),C=t=>(e,o,n)=>{t.addEventListener(e,s=>{s.trigger=H(s),(o===""||ie(s,o))&&n(s)})},U=t=>t.split(",").slice(0,2).join(","),J=(t,e)=>U(t)===U(e),E=t=>t.split(",").map((e,o,n)=>o!==0?Number(e.trim()):e.trim());function re(t){for(var e="",o="abcdefghijklmnopqrstuvwxyz",n=o.length,s=0;s<t;s++)e+=o.charAt(Math.floor(Math.random()*n));return e}function ce(t,e){const o=C(t);let n=!1,s=1,l=0,r=0,i={x:0,y:0};function u(f){f.style.transformOrigin=`${0}px ${0}px`,f.style.transform="translate("+l+"px, "+r+"px) scale("+s+")"}function c({x:f,y:h}){let p=(f-l)/s,w=(h-r)/s;return{x:p,y:w}}o("pointerdown","",f=>{f.shiftKey||(n=!0,i={x:f.offsetX-l,y:f.offsetY-r},f.detail)}),o("pointermove","",f=>{if(!n||e.transforming)return;l=f.offsetX-i.x,r=f.offsetY-i.y;const h=document.querySelectorAll(".transform-group");for(const p of h)u(p)}),o("pointerup","",f=>{n=!1}),o("wheel","",f=>{let h=(f.offsetX-l)/s,p=(f.offsetY-r)/s;Math.sign(f.deltaY)<0?s*=1.03:s/=1.03,l=f.offsetX-h*s,r=f.offsetY-p*s;const w=document.querySelectorAll(".transform-group");for(const v of w)u(v);f.preventDefault()});function d(f){const h=t.getBoundingClientRect(),p=f.x[1]-f.x[0],w=f.y[1]-f.y[0],v=h.width/p,g=h.height/w,m=Math.min(v,g)*.9;s=m;const y={x:(f.x[0]+f.x[1])/2*m-h.width/2,y:(f.y[0]+f.y[1])/2*m-h.height/2};l=-y.x,r=-y.y;const x=document.querySelectorAll(".transform-group");for(const b of x)u(b)}function a(){const{left:f,right:h,bottom:p,top:w,width:v,height:g}=t.getBoundingClientRect(),m=c({x:v,y:g}),y=c({x:0,y:g}),x=c({x:v,y:0}),b=c({x:0,y:0});return{rt:m,lt:y,rb:x,lb:b}}return{scale:()=>s,x:()=>l,y:()=>r,corners:a,svgPoint:c,setScaleXY:d}}const le=(t,e)=>{const o=C(t);let n="",s=!1;o("pointerdown",".point",c=>{e.transforming=!0,c.target,n=c.target.dataset.index;let d=!1;e.keysPressed.includes("Shift")?e.selectedPts.has(n)?(e.selectedPts.delete(n),d=l(n,a=>{e.selectedPts.delete(a.join(","))})):e.selectedPts.add(n):e.selectedPts.has(n)||(e.selectedPts=new Set([n])),d||l(n,a=>{e.selectedPts.add(a.join(",")),e.selectedPts.size===2&&(s=!0)}),e.selectedPts.size===1&&(s=!0),e.dispatch()}),o("pointermove","",c=>{if(!e.transforming)return;const{x:d,y:a}=e.panZoom.svgPoint({x:c.offsetX,y:c.offsetY}),f=E(n).reduce((g,m)=>g[m],e.paths),h=d-f[0],p=a-f[1],w=g=>{const[m,y]=g.split(",");return Number(y)===0||Number(y)===e.paths[m].length-1},v=e.closedPaths.has(n.split(",")[0]);e.selectedPts.forEach(g=>{J(g,n)||v&&w(n)&&w(g)||(g.split(",")[0],r(E(g),h,p))}),i(E(n),d,a),l(n,g=>{r(g,h,p)}),e.dispatch()}),o("pointerup","",c=>{s&&!c.shiftKey&&(e.selectedPts=new Set),e.transforming=!1,s=!1,e.dispatch()});const l=(c,d)=>{const a=E(c);if(a.length===3&&[1,3].includes(a.at(-1)))return;if(!e.closedPaths.has(a[0]))return!1;const h=e.paths[a[0]],p=a[1]===0,w=a[1]===h.length-1;return p&&(a[1]=h.length-1,d(a)),w&&(a[1]=0,d(a)),e.dispatch(),!0};function r(c,d,a){let f=c.reduce((h,p)=>h[p],e.paths);f[0]+=d,f[1]+=a,e.dispatch()}function i(c,d,a){const h=e.paths[c[0]][c[1]];if(O(h)==="point"){const P=c.reduce((S,D)=>S[D],e.paths);P[0]=d,P[1]=a,e.dispatch();return}let[w,v,g,m]=u(c);const y=c.at(-1),x={1:v,2:g,3:m}[y],b=[...x];x[0]=d,x[1]=a;const Z=x[0]-b[0],F=x[1]-b[1];if(e.handleMovement!=="broken"&&[1,3].includes(y)){const P=g;let S={1:m,3:v}[y];const D=d-P[0],V=a-P[1],_=ae([d,a],P);if(e.handleMovement==="symmetric")S[0]=P[0]-D,S[1]=P[1]-V;else if(e.handleMovement==="colinear"){const q=Math.sqrt((S[0]-P[0])**2+(S[1]-P[1])**2);S[0]=P[0]-q*Math.cos(_),S[1]=P[1]-q*Math.sin(_)}}y===2&&(v[0]+=Z,v[1]+=F,m[0]+=Z,m[1]+=F),e.dispatch()}function u(c){let[d,a,f,h]=c.slice(0,-1).reduce((m,y)=>m[y],e.paths);const p=e.paths[c[0]],w=e.closedPaths.has(c[0]),v=p[0],g=p.at(-1);return w&&[0,p.length-1].includes(c[1])&&(a=g[1],h=v[3]),["cubic",a,f,h]}};function ae(t,e){const o=t[0]-e[0],n=t[1]-e[1];return Math.atan2(n,o)}function de(t,e){const o=C(t),n=(s,l)=>{const r=E(s);if(r.length===3&&[1,3].includes(r.at(-1)))return;if(!e.closedPaths.has(r[0]))return!1;const u=e.paths[r[0]],c=r[1]===0,d=r[1]===u.length-1;return c&&(r[1]=u.length-1,l(r)),d&&(r[1]=0,l(r)),!0};o("dblclick",".point",s=>{const l=s.target.dataset.type,r=E(s.target.dataset.index),i=e.paths[r[0]];if(l==="point"||l==="cubic"&&r.at(-1)===2){e.selectedPts.forEach(d=>{J(s.target.dataset.index,d)&&(e.selectedPts.delete(d),n(s.target.dataset.index,a=>{e.selectedPts.delete(a)}))});const u=e.closedPaths.has(r[0]),c=r.reduce((d,a)=>d[a],e.paths);if(l==="cubic"&&(i[r[1]]=[...c],u&&(r[1]===0&&(i[i.length-1]=[...c]),r[1]===i.length-1&&(i[0]=[...c]))),l==="point"){const d=fe(i,r[1]),a=2;let f=[c[0]-a*Math.cos(d),c[1]-a*Math.sin(d)],h=[c[0]+a*Math.cos(d),c[1]+a*Math.sin(d)];const p=[c[0]-a*Math.cos(d+Math.PI/2),c[1]-a*Math.sin(d+Math.PI/2)],w=(y,x,b)=>(x[0]-y[0])*(b[1]-y[1])-(x[1]-y[1])*(b[0]-y[0]),v=r[1]>=1?k(i,r[1]-1):k(i,r[1]);if(!(w(c,p,f)*w(c,p,v)>=0)){const y=f;f=h,h=y}const m=["cubic",f,[...c],h];i[r[1]]=m,u&&(r[1]===0&&(i[i.length-1]=JSON.parse(JSON.stringify(m))),r[1]===i.length-1&&(i[0]=JSON.parse(JSON.stringify(m))))}}e.dispatch()})}function fe(t,e){if(t.length<=3)return 0;let o=e>=1?k(t,e-1):k(t,e),n=e<t.length-1?k(t,e+1):k(t,e);(e===0||e===t.length-1)&&(o=k(t,1),n=k(t,t.length-2));const s=k(t,e),l=z(s,o),r=z(n,s);return(l+r)/2}function ue(t){return typeof t[0]=="number"?"point":t[0]}function k(t,e){const o=t[e];return ue(o)==="point"?o:o[2]}function z(t,e){const o=t[0]-e[0],n=t[1]-e[1];return Math.atan2(n,o)}const he=(t,e)=>{const o=C(t);let n=!1;o("pointerdown","",s=>{n=!1}),o("pointermove","",s=>{n=!0;const{x:l,y:r}=e.panZoom.svgPoint({x:s.offsetX,y:s.offsetY});e.preview=[l,r]}),o("pointerup","",s=>{if(s.button===2||n||e.mode!=="drawing")return;const{x:l,y:r}=e.panZoom.svgPoint({x:s.offsetX,y:s.offsetY});if(e.drawing)e.paths[e.drawingID].push([l,r]);else{e.drawing=!0;const i=re(5);e.drawingID=i,e.paths[i]=[[l,r]]}e.dispatch()})},pe=(t,e)=>{window.addEventListener("keydown",o=>{if(o.key!=="Backspace")return;const n=[];e.selectedPts.forEach(l=>{const r=E(l),i=r.slice(0,2).join(","),u=e.paths[r[0]],c=`${r[0]},${0}`,d=`${r[0]},${u.length-1}`;(c===i||d===i)&&n.push(r[0])}),n.forEach(l=>e.closedPaths.delete(l));const s={};Object.entries(e.paths).forEach(l=>{const[r,i]=l;s[r]=i.filter((u,c)=>{const d=`${r},${c}`;return![...e.selectedPts].map(a=>a.split(",").slice(0,2).join(",")).includes(d)})}),e.paths=s,e.selectedPts=new Set,e.dispatch()})},ge=t=>{window.addEventListener("keydown",e=>{t.keysPressed.includes(e.key)||t.keysPressed.push(e.key),e.key==="Escape"&&(t.selectedPts=new Set),e.key==="Escape"&&t.mode==="drawing"&&(t.drawing=!1,t.preview=null)}),window.addEventListener("keyup",e=>{t.keysPressed.splice(t.keysPressed.indexOf(e.key),1)})},ye=(t,e)=>{C(t)("pointermove","",n=>{const{x:s,y:l}=e.panZoom.svgPoint({x:n.offsetX,y:n.offsetY});e.mouse=[s,l]})};function me(t,e){const o=C(t);let n=null,s=null;const l=()=>{n=null,s=null,e.selectBox.start=n,e.selectBox.end=s};o("mousedown","",i=>{i.shiftKey&&(n=e.panZoom.svgPoint({x:i.offsetX,y:i.offsetY}))}),o("mousemove","",i=>{if(!i.shiftKey){l();return}n!==null&&(s=e.panZoom.svgPoint({x:i.offsetX,y:i.offsetY}),e.selectBox.start=n,e.selectBox.end=s)});function r(i,u){let{start:c,end:d}=u;return i.x>c.x&&i.x<d.x&&i.y>c.y&&i.y<d.y||i.x>c.x&&i.x<d.x&&i.y<c.y&&i.y>d.y||i.x<c.x&&i.x>d.x&&i.y>c.y&&i.y<d.y||i.x<c.x&&i.x>d.x&&i.y<c.y&&i.y>d.y}o("mouseup","",i=>{if(n&&s){const u={start:n,end:s};$e(Object.entries(e.paths)).forEach(c=>{let[d,a]=c;a={x:a[0],y:a[1]},r(a,u)&&document.querySelector(`[data-index="${d}"]`).getAttribute("display")!=="none"&&e.selectedPts.add(d)})}l()})}function $e(t){const e=[];return t.forEach(([o,n])=>e.push(...we(n,o))),e}function we(t,e){const o=[];return t.forEach((n,s)=>{const l=`${e},${s}`;if(n.length===2&&o.push([l,n]),n.length===4){const[r,i,u,c]=n;s!==0&&o.push([`${l},1`,i]),o.push([`${l},2`,u]),s!==t.length-1&&o.push([`${l},3`,c])}}),o}const ve=(t,e)=>{C(t)("dblclick",".path",n=>{n.preventDefault(),console.log(n.target)})},X={"--background":"#0091c2","--handle":"#b1d36f","--preview":"#b7afa6","--handleLine":"#20344c","--point":"#f75060","--cubicPoint":"#de7895","--path":"#faead6","--selectedPoint":"#20344c"};new Proxy({},{set(t,e,o,n){return console.log("PATH UPDATEDDD!"),Reflect.set(t,e,o,n)}});const $={paths:{uniqueName:[]},closedPaths:new Set(["uniqueName"]),transforming:!1,panZoom:null,handleMovement:"colinear",mode:"selection",viewMode:"handles",gridMode:"none",drawing:!1,preview:null,selectedPts:new Set,keysPressed:[],selectBox:{},mouse:[0,0],drawingID:"",theme:X,dispatch:null};window.state=$;const xe=(t,e)=>{if(!t||!e)return"";const o=`M ${t[0]} ${t[1]} L ${e[0]} ${e[1]}`;return B`
    <path
      d=${o}
      stroke="var(--preview)"
      stroke-width="0.5"
      stroke-linecap="round"
      fill="none"></path>
  `},Pe=t=>{let e="";return t.forEach((o,n)=>{const[s,l,r,i]=o,u=n===0?`M ${s[0]} ${s[1]}`:"";e+=`${u} C ${l[0]} ${l[1]}, ${r[0]} ${r[1]}, ${i[0]} ${i[1]} `}),B`
    <path
      d=${e}
      stroke="var(--path)"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      class="path">
    </path>
  `},Y=(t,e={})=>B`
  <circle
    cx=${t[0]}
    cy=${t[1]}
    r=${getComputedStyle(document.documentElement).getPropertyValue("--pointSize")}
    display=${e.display??"inherit"}
    fill=${e.fill??"var(--point)"}
    stroke-width="0.15"
    stroke=${$.selectedPts.has(e.index)?"var(--selectedPoint)":""}
    data-index=${e.index}
    data-type=${e.type}
    class="point"
  >`,be=(t,e)=>{let o=[];const n=$.viewMode==="none"?"none":"inherit",s=$.viewMode==="handles"?"inherit":"none";return t.forEach((l,r)=>{const i=`${e},${r}`,u=O(l);if(u==="point"&&o.push(Y(l,{display:n,index:i,type:"point"})),u==="cubic"){const[c,d,a,f]=l,h=`
        stroke: var(--handleLine);
        stroke-width: 0.15;
        stroke-dasharray: 0.3;
        opacity: .7;
      `;r!==0&&o.push(B`
        <path display=${s} style="${h}" d="M ${d.join(" ")} L ${a.join(" ")}">
      `),r!==t.length-1&&o.push(B`
        <path display=${s} style="${h}" d="M ${f.join(" ")} L ${a.join(" ")}">
      `),r!==0&&o.push(Y(d,{display:s,fill:"var(--handle)",index:`${i},1`,type:"cubic"})),o.push(Y(a,{display:n,index:`${i},2`,fill:"var(--cubicPoint)",type:"cubic"})),r!==t.length-1&&o.push(Y(f,{display:s,fill:"var(--handle)",index:`${i},3`,type:"cubic"}))}}),o},ke=t=>{if(!t.drawing)return"";const e=t.paths[t.drawingID];if(!e)return"";const o=e.at(-1),n=O(o)==="cubic"?o[2]:o;return xe(n,t.preview)},A=(t,e,o,n)=>L` <div class="tool">
    <div class="tool-label">${n??e}</div>
    <div class="radio-select">
      ${o.map(s=>L`<span
          class="select-option ${t[e]===s?"selected":""}"
          @click=${()=>{e==="viewMode"&&(t.selectedPts=new Set),t[e]=s,t.drawing=!1,t.preview=null}}
          >${s}</span
        >`)}
    </div>
  </div>`,Me=(t,e,o)=>{t.theme[e]=o,window.localStorage.setItem(e,o),document.documentElement.style.setProperty(e,o)},Se=t=>L` <div class="tool color-picker-tool">
    <div class="color-picker-label">
      <span>colors</span>
    </div>
    <div class="color-picker-container">
      ${Object.entries(t.theme).map(e=>L`<div class="color-picker">
          <label for=${e[0]}>${e[0]}</label
          ><input
            id=${e[0]}
            @input=${o=>{Me(t,e[0],o.target.value)}}
            value=${e[1]}
            type="color" />
        </div>`)}
    </div>
  </div>`,Ee=t=>{if(t.gridMode==="none")return;const e=t.panZoom.x(),o=t.panZoom.y(),n=t.panZoom.scale();return B`
    <defs>
      <pattern
        id="dots"
        x="${e-n/2}"
        y="${o-n/2}"
        width="${n}"
        height="${n}"
        patternUnits="userSpaceOnUse">
        <circle fill="var(--white)" cx="${n/2}" cy="${n/2}" r="1">
        </circle>
      </pattern>
      <pattern
        id="grid"
        x="${e}"
        y="${o}"
        width="${n}"
        height="${n}"
        patternUnits="userSpaceOnUse">
        <line stroke="var(--white)" x1="0" y1="0" x2="${n}" y2="0"></line>
        <line stroke="var(--white)" x1="0" y1="0" x2="0" y2="${n}"></line>
      </pattern>
    </defs>
    <rect
      class="grid-background"
      width="100%"
      height="100%"
      fill="url(#${t.gridMode})">
    </rect>`},G=t=>{let e="";for(const o in t.theme){const n=t.theme[o];e+=`${o}: ${n};
`}return L`
    <div class="toolbox">
      <!-- ${Se(t)} -->
      ${A(t,"handleMovement",["symmetric","colinear","broken"],"handles")}
      ${A(t,"mode",["drawing","selection"])}
      ${A(t,"viewMode",["handles","points","none"],"view")}
      ${A(t,"gridMode",["grid","dots","none"],"background")}
    </div>
    <!-- <div class="mouse-coords">
      ${t.mouse[0].toFixed(2)},${t.mouse[1].toFixed(2)}
    </div> -->
    <svg class="drawing-area" preserveAspectRatio="xMidYMid meet">
      <g style=${e}>
        <rect width="100%" height="100%" fill="var(--background)"></rect>
        ${t.panZoom?Ee(t):""}
        <g class="transform-group">
          ${Be(t)} ${ke(t)}
          ${Object.entries(t.paths).map(([o,n],s)=>Pe(oe(n).cubics))}
          ${Object.entries(t.paths).map(([o,n],s)=>be(n,o))}
        </g>
      </g>
    </svg>
  `},Be=t=>t.selectBox.start&&t.selectBox.end?B`
  <path
    style="
      fill:#cb94e7;
      opacity: 0.6;
    "
    d="
      M ${t.selectBox.start.x} ${t.selectBox.start.y}
      L ${t.selectBox.end.x} ${t.selectBox.start.y}
      L ${t.selectBox.end.x} ${t.selectBox.end.y}
      L ${t.selectBox.start.x} ${t.selectBox.end.y}
    "
  />`:"";N(G($),document.body);const M=document.querySelector(".drawing-area"),W=ce(M,$);$.panZoom=W;W.setScaleXY({x:[-10,10],y:[-10,10]});ge($);ve(M);le(M,$);pe(M,$);de(M,$);he(M,$);me(M,$);ye(M,$);M.addEventListener("mousedown",t=>{t.detail===2&&t.preventDefault()});const Q=()=>{let t=window.innerHeight*.01,e=window.innerWidth*.01;document.documentElement.style.setProperty("--vh",`${t}px`),document.documentElement.style.setProperty("--vw",`${e}px`),N(G($),document.body),window.requestAnimationFrame(Q)};function Ce(){window.setPaths&&window.setPaths($.paths)}window.onload=t=>{Object.keys(X).map(e=>{$.theme[e]=X[e],document.documentElement.style.setProperty(e,$.theme[e])}),$.dispatch=Ce};window.requestAnimationFrame(Q);
