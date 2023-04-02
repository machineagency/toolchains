import{Z as U,y as Y,w as B,b as G}from"./lit-html-b7b68613.js";import{p as H}from"./path-52d792b4.js";function Z(t){return typeof t[0]=="number"?"point":t[0]}const z=t=>t.composedPath()[0],W=(t,e)=>z(t).matches(e),C=t=>(e,o,n)=>{t.addEventListener(e,s=>{s.trigger=z(s),(o===""||W(s,o))&&n(s)})},I=t=>t.split(",").slice(0,2).join(","),K=(t,e)=>I(t)===I(e),E=t=>t.split(",").map((e,o,n)=>o!==0?Number(e.trim()):e.trim());function Q(t){for(var e="",o="abcdefghijklmnopqrstuvwxyz",n=o.length,s=0;s<t;s++)e+=o.charAt(Math.floor(Math.random()*n));return e}function V(t,e){const o=C(t);let n=!1,s=1,a=0,i=0,r={x:0,y:0};function u(f){f.style.transformOrigin=`${0}px ${0}px`,f.style.transform="translate("+a+"px, "+i+"px) scale("+s+")"}function c({x:f,y:h}){let p=(f-a)/s,w=(h-i)/s;return{x:p,y:w}}o("pointerdown","",f=>{f.shiftKey||(n=!0,r={x:f.offsetX-a,y:f.offsetY-i},f.detail)}),o("pointermove","",f=>{if(!n||e.transforming)return;a=f.offsetX-r.x,i=f.offsetY-r.y;const h=document.querySelectorAll(".transform-group");for(const p of h)u(p)}),o("pointerup","",f=>{n=!1}),o("wheel","",f=>{let h=(f.offsetX-a)/s,p=(f.offsetY-i)/s;Math.sign(f.deltaY)<0?s*=1.03:s/=1.03,a=f.offsetX-h*s,i=f.offsetY-p*s;const w=document.querySelectorAll(".transform-group");for(const v of w)u(v);f.preventDefault()});function l(f){const h=t.getBoundingClientRect(),p=f.x[1]-f.x[0],w=f.y[1]-f.y[0],v=h.width/p,m=h.height/w,y=Math.min(v,m)*.9;s=y;const g={x:(f.x[0]+f.x[1])/2*y-h.width/2,y:(f.y[0]+f.y[1])/2*y-h.height/2};a=-g.x,i=-g.y;const x=document.querySelectorAll(".transform-group");for(const b of x)u(b)}function d(){const{left:f,right:h,bottom:p,top:w,width:v,height:m}=t.getBoundingClientRect(),y=c({x:v,y:m}),g=c({x:0,y:m}),x=c({x:v,y:0}),b=c({x:0,y:0});return{rt:y,lt:g,rb:x,lb:b}}return{scale:()=>s,x:()=>a,y:()=>i,corners:d,svgPoint:c,setScaleXY:l}}const ee=(t,e)=>{const o=C(t);let n="",s=!1;o("pointerdown",".point",c=>{e.transforming=!0,c.target,n=c.target.dataset.index;let l=!1;e.keysPressed.includes("Shift")?e.selectedPts.has(n)?(e.selectedPts.delete(n),l=a(n,d=>{e.selectedPts.delete(d.join(","))})):e.selectedPts.add(n):e.selectedPts.has(n)||(e.selectedPts=new Set([n])),l||a(n,d=>{e.selectedPts.add(d.join(",")),e.selectedPts.size===2&&(s=!0)}),e.selectedPts.size===1&&(s=!0),e.dispatch()}),o("pointermove","",c=>{if(!e.transforming)return;const{x:l,y:d}=e.panZoom.svgPoint({x:c.offsetX,y:c.offsetY}),f=E(n).reduce((m,y)=>m[y],e.paths),h=l-f[0],p=d-f[1],w=m=>{const[y,g]=m.split(",");return Number(g)===0||Number(g)===e.paths[y].length-1},v=e.closedPaths.has(n.split(",")[0]);e.selectedPts.forEach(m=>{K(m,n)||v&&w(n)&&w(m)||(m.split(",")[0],i(E(m),h,p))}),r(E(n),l,d),a(n,m=>{i(m,h,p)}),e.dispatch()}),o("pointerup","",c=>{s&&!c.shiftKey&&(e.selectedPts=new Set),e.transforming=!1,s=!1,e.dispatch()});const a=(c,l)=>{const d=E(c);if(d.length===3&&[1,3].includes(d.at(-1)))return;if(!e.closedPaths.has(d[0]))return!1;const h=e.paths[d[0]],p=d[1]===0,w=d[1]===h.length-1;return p&&(d[1]=h.length-1,l(d)),w&&(d[1]=0,l(d)),e.dispatch(),!0};function i(c,l,d){let f=c.reduce((h,p)=>h[p],e.paths);f[0]+=l,f[1]+=d,e.dispatch()}function r(c,l,d){const h=e.paths[c[0]][c[1]];if(Z(h)==="point"){const P=c.reduce((S,L)=>S[L],e.paths);P[0]=l,P[1]=d,e.dispatch();return}let[w,v,m,y]=u(c);const g=c.at(-1),x={1:v,2:m,3:y}[g],b=[...x];x[0]=l,x[1]=d;const A=x[0]-b[0],F=x[1]-b[1];if(e.handleMovement!=="broken"&&[1,3].includes(g)){const P=m;let S={1:y,3:v}[g];const L=l-P[0],R=d-P[1],q=te([l,d],P);if(e.handleMovement==="symmetric")S[0]=P[0]-L,S[1]=P[1]-R;else if(e.handleMovement==="colinear"){const T=Math.sqrt((S[0]-P[0])**2+(S[1]-P[1])**2);S[0]=P[0]-T*Math.cos(q),S[1]=P[1]-T*Math.sin(q)}}g===2&&(v[0]+=A,v[1]+=F,y[0]+=A,y[1]+=F),e.dispatch()}function u(c){let[l,d,f,h]=c.slice(0,-1).reduce((y,g)=>y[g],e.paths);const p=e.paths[c[0]],w=e.closedPaths.has(c[0]),v=p[0],m=p.at(-1);return w&&[0,p.length-1].includes(c[1])&&(d=m[1],h=v[3]),["cubic",d,f,h]}};function te(t,e){const o=t[0]-e[0],n=t[1]-e[1];return Math.atan2(n,o)}function ne(t,e){const o=C(t),n=(s,a)=>{const i=E(s);if(i.length===3&&[1,3].includes(i.at(-1)))return;if(!e.closedPaths.has(i[0]))return!1;const u=e.paths[i[0]],c=i[1]===0,l=i[1]===u.length-1;return c&&(i[1]=u.length-1,a(i)),l&&(i[1]=0,a(i)),!0};o("dblclick",".point",s=>{const a=s.target.dataset.type,i=E(s.target.dataset.index),r=e.paths[i[0]];if(a==="point"||a==="cubic"&&i.at(-1)===2){e.selectedPts.forEach(l=>{K(s.target.dataset.index,l)&&(e.selectedPts.delete(l),n(s.target.dataset.index,d=>{e.selectedPts.delete(d)}))});const u=e.closedPaths.has(i[0]),c=i.reduce((l,d)=>l[d],e.paths);if(a==="cubic"&&(r[i[1]]=[...c],u&&(i[1]===0&&(r[r.length-1]=[...c]),i[1]===r.length-1&&(r[0]=[...c]))),a==="point"){const l=oe(r,i[1]),d=2;let f=[c[0]-d*Math.cos(l),c[1]-d*Math.sin(l)],h=[c[0]+d*Math.cos(l),c[1]+d*Math.sin(l)];const p=[c[0]-d*Math.cos(l+Math.PI/2),c[1]-d*Math.sin(l+Math.PI/2)],w=(g,x,b)=>(x[0]-g[0])*(b[1]-g[1])-(x[1]-g[1])*(b[0]-g[0]),v=i[1]>=1?k(r,i[1]-1):k(r,i[1]);if(!(w(c,p,f)*w(c,p,v)>=0)){const g=f;f=h,h=g}const y=["cubic",f,[...c],h];r[i[1]]=y,u&&(i[1]===0&&(r[r.length-1]=JSON.parse(JSON.stringify(y))),i[1]===r.length-1&&(r[0]=JSON.parse(JSON.stringify(y))))}}e.dispatch()})}function oe(t,e){if(t.length<=3)return 0;let o=e>=1?k(t,e-1):k(t,e),n=e<t.length-1?k(t,e+1):k(t,e);(e===0||e===t.length-1)&&(o=k(t,1),n=k(t,t.length-2));const s=k(t,e),a=N(s,o),i=N(n,s);return(a+i)/2}function se(t){return typeof t[0]=="number"?"point":t[0]}function k(t,e){const o=t[e];return se(o)==="point"?o:o[2]}function N(t,e){const o=t[0]-e[0],n=t[1]-e[1];return Math.atan2(n,o)}const ie=(t,e)=>{const o=C(t);let n=!1;o("pointerdown","",s=>{n=!1}),o("pointermove","",s=>{n=!0;const{x:a,y:i}=e.panZoom.svgPoint({x:s.offsetX,y:s.offsetY});e.preview=[a,i]}),o("pointerup","",s=>{if(s.button===2||n||e.mode!=="drawing")return;const{x:a,y:i}=e.panZoom.svgPoint({x:s.offsetX,y:s.offsetY});if(e.drawing)e.paths[e.drawingID].push([a,i]);else{e.drawing=!0;const r=Q(5);e.drawingID=r,e.paths[r]=[[a,i]]}e.dispatch()})},re=(t,e)=>{window.addEventListener("keydown",o=>{if(o.key!=="Backspace")return;const n=[];e.selectedPts.forEach(a=>{const i=E(a),r=i.slice(0,2).join(","),u=e.paths[i[0]],c=`${i[0]},${0}`,l=`${i[0]},${u.length-1}`;(c===r||l===r)&&n.push(i[0])}),n.forEach(a=>e.closedPaths.delete(a));const s={};Object.entries(e.paths).forEach(a=>{const[i,r]=a;s[i]=r.filter((u,c)=>{const l=`${i},${c}`;return![...e.selectedPts].map(d=>d.split(",").slice(0,2).join(",")).includes(l)})}),e.paths=s,e.selectedPts=new Set,e.dispatch()})},ce=t=>{window.addEventListener("keydown",e=>{t.keysPressed.includes(e.key)||t.keysPressed.push(e.key),e.key==="Escape"&&(t.selectedPts=new Set),e.key==="Escape"&&t.mode==="drawing"&&(t.drawing=!1,t.preview=null)}),window.addEventListener("keyup",e=>{t.keysPressed.splice(t.keysPressed.indexOf(e.key),1)})},le=(t,e)=>{C(t)("pointermove","",n=>{const{x:s,y:a}=e.panZoom.svgPoint({x:n.offsetX,y:n.offsetY});e.mouse=[s,a]})};function de(t,e){const o=C(t);let n=null,s=null;const a=()=>{n=null,s=null,e.selectBox.start=n,e.selectBox.end=s};o("mousedown","",r=>{r.shiftKey&&(n=e.panZoom.svgPoint({x:r.offsetX,y:r.offsetY}))}),o("mousemove","",r=>{if(!r.shiftKey){a();return}n!==null&&(s=e.panZoom.svgPoint({x:r.offsetX,y:r.offsetY}),e.selectBox.start=n,e.selectBox.end=s)});function i(r,u){let{start:c,end:l}=u;return r.x>c.x&&r.x<l.x&&r.y>c.y&&r.y<l.y||r.x>c.x&&r.x<l.x&&r.y<c.y&&r.y>l.y||r.x<c.x&&r.x>l.x&&r.y>c.y&&r.y<l.y||r.x<c.x&&r.x>l.x&&r.y<c.y&&r.y>l.y}o("mouseup","",r=>{if(n&&s){const u={start:n,end:s};ae(Object.entries(e.paths)).forEach(c=>{let[l,d]=c;d={x:d[0],y:d[1]},i(d,u)&&document.querySelector(`[data-index="${l}"]`).getAttribute("display")!=="none"&&e.selectedPts.add(l)})}a()})}function ae(t){const e=[];return t.forEach(([o,n])=>e.push(...fe(n,o))),e}function fe(t,e){const o=[];return t.forEach((n,s)=>{const a=`${e},${s}`;if(n.length===2&&o.push([a,n]),n.length===4){const[i,r,u,c]=n;s!==0&&o.push([`${a},1`,r]),o.push([`${a},2`,u]),s!==t.length-1&&o.push([`${a},3`,c])}}),o}const he=(t,e)=>{C(t)("dblclick",".path",n=>{n.preventDefault(),console.log(n.target)})},O={"--background":"#0091c2","--handle":"#b1d36f","--preview":"#b7afa6","--handleLine":"#20344c","--point":"#f75060","--cubicPoint":"#de7895","--path":"#faead6","--selectedPoint":"#20344c"},$={paths:{uniqueName:[]},bounds:null,closedPaths:new Set(["uniqueName"]),transforming:!1,panZoom:null,handleMovement:"colinear",mode:"selection",viewMode:"handles",gridMode:"none",drawing:!1,preview:null,selectedPts:new Set,keysPressed:[],selectBox:{},mouse:[0,0],drawingID:"",theme:O,dispatch:null};window.state=$;const ue=(t,e)=>{if(!t||!e)return"";const o=`M ${t[0]} ${t[1]} L ${e[0]} ${e[1]}`;return B`
    <path
      d=${o}
      stroke="var(--preview)"
      stroke-width="0.5"
      stroke-linecap="round"
      fill="none"></path>
  `},pe=t=>{let e="";return t.forEach((o,n)=>{const[s,a,i,r]=o,u=n===0?`M ${s[0]} ${s[1]}`:"";e+=`${u} C ${a[0]} ${a[1]}, ${i[0]} ${i[1]}, ${r[0]} ${r[1]} `}),B`
    <path
      d=${e}
      stroke="var(--path)"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      class="path">
    </path>
  `},j=(t,e={})=>B`
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
  >`,me=(t,e)=>{let o=[];const n=$.viewMode==="none"?"none":"inherit",s=$.viewMode==="handles"?"inherit":"none";return t.forEach((a,i)=>{const r=`${e},${i}`,u=Z(a);if(u==="point"&&o.push(j(a,{display:n,index:r,type:"point"})),u==="cubic"){const[c,l,d,f]=a,h=`
        stroke: var(--handleLine);
        stroke-width: 0.15;
        stroke-dasharray: 0.3;
        opacity: .7;
      `;i!==0&&o.push(B`
        <path display=${s} style="${h}" d="M ${l.join(" ")} L ${d.join(" ")}">
      `),i!==t.length-1&&o.push(B`
        <path display=${s} style="${h}" d="M ${f.join(" ")} L ${d.join(" ")}">
      `),i!==0&&o.push(j(l,{display:s,fill:"var(--handle)",index:`${r},1`,type:"cubic"})),o.push(j(d,{display:n,index:`${r},2`,fill:"var(--cubicPoint)",type:"cubic"})),i!==t.length-1&&o.push(j(f,{display:s,fill:"var(--handle)",index:`${r},3`,type:"cubic"}))}}),o},ge=t=>{if(!t.drawing)return"";const e=t.paths[t.drawingID];if(!e)return"";const o=e.at(-1),n=Z(o)==="cubic"?o[2]:o;return ue(n,t.preview)},X=(t,e,o,n)=>Y` <div class="tool">
    <div class="tool-label">${n??e}</div>
    <div class="radio-select">
      ${o.map(s=>Y`<span
          class="select-option ${t[e]===s?"selected":""}"
          @click=${()=>{e==="viewMode"&&(t.selectedPts=new Set),t[e]=s,t.drawing=!1,t.preview=null}}
          >${s}</span
        >`)}
    </div>
  </div>`,ye=(t,e,o)=>{t.theme[e]=o,window.localStorage.setItem(e,o),document.documentElement.style.setProperty(e,o)},$e=t=>Y` <div class="tool color-picker-tool">
    <div class="color-picker-label">
      <span>colors</span>
    </div>
    <div class="color-picker-container">
      ${Object.entries(t.theme).map(e=>Y`<div class="color-picker">
          <label for=${e[0]}>${e[0]}</label
          ><input
            id=${e[0]}
            @input=${o=>{ye(t,e[0],o.target.value)}}
            value=${e[1]}
            type="color" />
        </div>`)}
    </div>
  </div>`,we=t=>{if(t.gridMode==="none")return;const e=t.panZoom.x(),o=t.panZoom.y(),n=t.panZoom.scale();return B`
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
    </rect>`},_=t=>{let e="";for(const o in t.theme){const n=t.theme[o];e+=`${o}: ${n};
`}return Y`
    <div class="toolbox">
      <!-- ${$e(t)} -->
      ${X(t,"handleMovement",["symmetric","colinear","broken"],"handles")}
      ${X(t,"mode",["drawing","selection"])}
      ${X(t,"viewMode",["handles","points","none"],"view")}
      ${X(t,"gridMode",["grid","dots","none"],"background")}
    </div>
    <!-- <div class="mouse-coords">
      ${t.mouse[0].toFixed(2)},${t.mouse[1].toFixed(2)}
    </div> -->
    <svg class="drawing-area" preserveAspectRatio="xMidYMid meet">
      <g style=${e}>
        <rect width="100%" height="100%" fill="var(--background)"></rect>
        ${t.panZoom?we(t):""}
        <g class="transform-group">
          ${ve(t)} ${ge(t)}
          ${Object.entries(t.paths).map(([o,n],s)=>pe(H(n).cubics))}
          ${Object.entries(t.paths).map(([o,n],s)=>me(n,o))}
          ${t.bounds?B`<rect x=${t.bounds.d1.min} y=${t.bounds.d2.min}
              height=${t.bounds.d2.max-t.bounds.d2.min}
              width=${t.bounds.d1.max-t.bounds.d1.min}
              fill="none"
              stroke="black"
              stroke-width="0.1"></rect>`:G}
        </g>
      </g>
    </svg>
  `},ve=t=>t.selectBox.start&&t.selectBox.end?B`
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
  />`:"";U(_($),document.body);const M=document.querySelector(".drawing-area"),D=V(M,$);$.panZoom=D;D.setScaleXY({x:[0,40],y:[0,40]});const xe=t=>{$.bounds=t,D.setScaleXY({x:[t.d1.min,t.d1.max],y:[t.d2.min,t.d2.max]})};window.setBounds=xe;ce($);he(M);ee(M,$);re(M,$);ne(M,$);ie(M,$);de(M,$);le(M,$);M.addEventListener("mousedown",t=>{t.detail===2&&t.preventDefault()});const J=()=>{let t=window.innerHeight*.01,e=window.innerWidth*.01;document.documentElement.style.setProperty("--vh",`${t}px`),document.documentElement.style.setProperty("--vw",`${e}px`),U(_($),document.body),window.requestAnimationFrame(J)};function Pe(){window.setPaths&&window.setPaths($.paths)}window.onload=t=>{Object.keys(O).map(e=>{$.theme[e]=O[e],document.documentElement.style.setProperty(e,$.theme[e])}),$.dispatch=Pe};window.requestAnimationFrame(J);
