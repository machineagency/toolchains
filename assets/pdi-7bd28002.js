import{Z as N,y as L,w as E,b as G}from"./lit-html-b7b68613.js";import{p as H}from"./path-52d792b4.js";function Z(t){return typeof t[0]=="number"?"point":t[0]}const U=t=>t.composedPath()[0],W=(t,e)=>U(t).matches(e),C=t=>(e,o,n)=>{t.addEventListener(e,s=>{s.trigger=U(s),(o===""||W(s,o))&&n(s)})},z=t=>t.split(",").slice(0,2).join(","),R=(t,e)=>z(t)===z(e),B=t=>t.split(",").map((e,o,n)=>o!==0?Number(e.trim()):e.trim());function Q(t){for(var e="",o="abcdefghijklmnopqrstuvwxyz",n=o.length,s=0;s<t;s++)e+=o.charAt(Math.floor(Math.random()*n));return e}function V(t,e){const o=C(t);let n=!1,s=1,l=0,i=0,r={x:0,y:0};function u(h){h.style.transformOrigin=`${0}px ${0}px`,h.style.transform="translate("+l+"px, "+i+"px) scale("+s+")"}function c({x:h,y:f}){let p=(h-l)/s,$=(f-i)/s;return{x:p,y:$}}o("pointerdown","",h=>{h.shiftKey||(n=!0,r={x:h.offsetX-l,y:h.offsetY-i},h.detail)}),o("pointermove","",h=>{if(!n||e.transforming)return;l=h.offsetX-r.x,i=h.offsetY-r.y;const f=document.querySelectorAll(".transform-group");for(const p of f)u(p)}),o("pointerup","",h=>{n=!1}),o("wheel","",h=>{let f=(h.offsetX-l)/s,p=(h.offsetY-i)/s;Math.sign(h.deltaY)<0?s*=1.03:s/=1.03,l=h.offsetX-f*s,i=h.offsetY-p*s;const $=document.querySelectorAll(".transform-group");for(const v of $)u(v);h.preventDefault()});function d(h){const f=t.getBoundingClientRect(),p=h.x[1]-h.x[0],$=h.y[1]-h.y[0],v=f.width/p,m=f.height/$,y=Math.min(v,m)*.9;s=y;const g={x:(h.x[0]+h.x[1])/2*y-f.width/2,y:(h.y[0]+h.y[1])/2*y-f.height/2};l=-g.x,i=-g.y;const x=document.querySelectorAll(".transform-group");for(const b of x)u(b)}function a(){const{left:h,right:f,bottom:p,top:$,width:v,height:m}=t.getBoundingClientRect(),y=c({x:v,y:m}),g=c({x:0,y:m}),x=c({x:v,y:0}),b=c({x:0,y:0});return{rt:y,lt:g,rb:x,lb:b}}return{scale:()=>s,x:()=>l,y:()=>i,corners:a,svgPoint:c,setScaleXY:d}}const ee=(t,e)=>{const o=C(t);let n="",s=!1;o("pointerdown",".point",c=>{e.transforming=!0,c.target,n=c.target.dataset.index;let d=!1;e.keysPressed.includes("Shift")?e.selectedPts.has(n)?(e.selectedPts.delete(n),d=l(n,a=>{e.selectedPts.delete(a.join(","))})):e.selectedPts.add(n):e.selectedPts.has(n)||(e.selectedPts=new Set([n])),d||l(n,a=>{e.selectedPts.add(a.join(",")),e.selectedPts.size===2&&(s=!0)}),e.selectedPts.size===1&&(s=!0),e.dispatch()}),o("pointermove","",c=>{if(!e.transforming)return;const{x:d,y:a}=e.panZoom.svgPoint({x:c.offsetX,y:c.offsetY}),h=B(n).reduce((m,y)=>m[y],e.paths),f=d-h[0],p=a-h[1],$=m=>{const[y,g]=m.split(",");return Number(g)===0||Number(g)===e.paths[y].length-1},v=e.closedPaths.has(n.split(",")[0]);e.selectedPts.forEach(m=>{R(m,n)||v&&$(n)&&$(m)||(m.split(",")[0],i(B(m),f,p))}),r(B(n),d,a),l(n,m=>{i(m,f,p)}),e.dispatch()}),o("pointerup","",c=>{s&&!c.shiftKey&&(e.selectedPts=new Set),e.transforming=!1,s=!1,e.dispatch()});const l=(c,d)=>{const a=B(c);if(a.length===3&&[1,3].includes(a.at(-1)))return;if(!e.closedPaths.has(a[0]))return!1;const f=e.paths[a[0]],p=a[1]===0,$=a[1]===f.length-1;return p&&(a[1]=f.length-1,d(a)),$&&(a[1]=0,d(a)),e.dispatch(),!0};function i(c,d,a){let h=c.reduce((f,p)=>f[p],e.paths);h[0]+=d,h[1]+=a,e.dispatch()}function r(c,d,a){const f=e.paths[c[0]][c[1]];if(Z(f)==="point"){const P=c.reduce((S,j)=>S[j],e.paths);P[0]=d,P[1]=a,e.dispatch();return}let[$,v,m,y]=u(c);const g=c.at(-1),x={1:v,2:m,3:y}[g],b=[...x];x[0]=d,x[1]=a;const D=x[0]-b[0],q=x[1]-b[1];if(e.handleMovement!=="broken"&&[1,3].includes(g)){const P=m;let S={1:y,3:v}[g];const j=d-P[0],J=a-P[1],F=te([d,a],P);if(e.handleMovement==="symmetric")S[0]=P[0]-j,S[1]=P[1]-J;else if(e.handleMovement==="colinear"){const T=Math.sqrt((S[0]-P[0])**2+(S[1]-P[1])**2);S[0]=P[0]-T*Math.cos(F),S[1]=P[1]-T*Math.sin(F)}}g===2&&(v[0]+=D,v[1]+=q,y[0]+=D,y[1]+=q),e.dispatch()}function u(c){let[d,a,h,f]=c.slice(0,-1).reduce((y,g)=>y[g],e.paths);const p=e.paths[c[0]],$=e.closedPaths.has(c[0]),v=p[0],m=p.at(-1);return $&&[0,p.length-1].includes(c[1])&&(a=m[1],f=v[3]),["cubic",a,h,f]}};function te(t,e){const o=t[0]-e[0],n=t[1]-e[1];return Math.atan2(n,o)}function ne(t,e){const o=C(t),n=(s,l)=>{const i=B(s);if(i.length===3&&[1,3].includes(i.at(-1)))return;if(!e.closedPaths.has(i[0]))return!1;const u=e.paths[i[0]],c=i[1]===0,d=i[1]===u.length-1;return c&&(i[1]=u.length-1,l(i)),d&&(i[1]=0,l(i)),!0};o("dblclick",".point",s=>{const l=s.target.dataset.type,i=B(s.target.dataset.index),r=e.paths[i[0]];if(l==="point"||l==="cubic"&&i.at(-1)===2){e.selectedPts.forEach(d=>{R(s.target.dataset.index,d)&&(e.selectedPts.delete(d),n(s.target.dataset.index,a=>{e.selectedPts.delete(a)}))});const u=e.closedPaths.has(i[0]),c=i.reduce((d,a)=>d[a],e.paths);if(l==="cubic"&&(r[i[1]]=[...c],u&&(i[1]===0&&(r[r.length-1]=[...c]),i[1]===r.length-1&&(r[0]=[...c]))),l==="point"){const d=oe(r,i[1]),a=2;let h=[c[0]-a*Math.cos(d),c[1]-a*Math.sin(d)],f=[c[0]+a*Math.cos(d),c[1]+a*Math.sin(d)];const p=[c[0]-a*Math.cos(d+Math.PI/2),c[1]-a*Math.sin(d+Math.PI/2)],$=(g,x,b)=>(x[0]-g[0])*(b[1]-g[1])-(x[1]-g[1])*(b[0]-g[0]),v=i[1]>=1?k(r,i[1]-1):k(r,i[1]);if(!($(c,p,h)*$(c,p,v)>=0)){const g=h;h=f,f=g}const y=["cubic",h,[...c],f];r[i[1]]=y,u&&(i[1]===0&&(r[r.length-1]=JSON.parse(JSON.stringify(y))),i[1]===r.length-1&&(r[0]=JSON.parse(JSON.stringify(y))))}}e.dispatch()})}function oe(t,e){if(t.length<=3)return 0;let o=e>=1?k(t,e-1):k(t,e),n=e<t.length-1?k(t,e+1):k(t,e);(e===0||e===t.length-1)&&(o=k(t,1),n=k(t,t.length-2));const s=k(t,e),l=I(s,o),i=I(n,s);return(l+i)/2}function se(t){return typeof t[0]=="number"?"point":t[0]}function k(t,e){const o=t[e];return se(o)==="point"?o:o[2]}function I(t,e){const o=t[0]-e[0],n=t[1]-e[1];return Math.atan2(n,o)}const ie=(t,e)=>{const o=C(t);let n=!1;o("pointerdown","",s=>{n=!1}),o("pointermove","",s=>{n=!0;const{x:l,y:i}=e.panZoom.svgPoint({x:s.offsetX,y:s.offsetY});e.preview=[l,i]}),o("pointerup","",s=>{if(s.button===2||n||e.mode!=="drawing")return;const{x:l,y:i}=e.panZoom.svgPoint({x:s.offsetX,y:s.offsetY});if(e.drawing)e.paths[e.drawingID].push([l,i]);else{e.drawing=!0;const r=Q(5);e.drawingID=r,e.paths[r]=[[l,i]]}e.dispatch()})},re=(t,e)=>{window.addEventListener("keydown",o=>{if(o.key!=="Backspace")return;const n=[];e.selectedPts.forEach(l=>{const i=B(l),r=i.slice(0,2).join(","),u=e.paths[i[0]],c=`${i[0]},${0}`,d=`${i[0]},${u.length-1}`;(c===r||d===r)&&n.push(i[0])}),n.forEach(l=>e.closedPaths.delete(l));const s={};Object.entries(e.paths).forEach(l=>{const[i,r]=l;s[i]=r.filter((u,c)=>{const d=`${i},${c}`;return![...e.selectedPts].map(a=>a.split(",").slice(0,2).join(",")).includes(d)})}),e.paths=s,e.selectedPts=new Set,e.dispatch()})},ce=t=>{window.addEventListener("keydown",e=>{t.keysPressed.includes(e.key)||t.keysPressed.push(e.key),e.key==="Escape"&&(t.selectedPts=new Set),e.key==="Escape"&&t.mode==="drawing"&&(t.drawing=!1,t.preview=null)}),window.addEventListener("keyup",e=>{t.keysPressed.splice(t.keysPressed.indexOf(e.key),1)})},le=(t,e)=>{C(t)("pointermove","",n=>{const{x:s,y:l}=e.panZoom.svgPoint({x:n.offsetX,y:n.offsetY});e.mouse=[s,l]})};function de(t,e){const o=C(t);let n=null,s=null;const l=()=>{n=null,s=null,e.selectBox.start=n,e.selectBox.end=s};o("mousedown","",r=>{r.shiftKey&&(n=e.panZoom.svgPoint({x:r.offsetX,y:r.offsetY}))}),o("mousemove","",r=>{if(!r.shiftKey){l();return}n!==null&&(s=e.panZoom.svgPoint({x:r.offsetX,y:r.offsetY}),e.selectBox.start=n,e.selectBox.end=s)});function i(r,u){let{start:c,end:d}=u;return r.x>c.x&&r.x<d.x&&r.y>c.y&&r.y<d.y||r.x>c.x&&r.x<d.x&&r.y<c.y&&r.y>d.y||r.x<c.x&&r.x>d.x&&r.y>c.y&&r.y<d.y||r.x<c.x&&r.x>d.x&&r.y<c.y&&r.y>d.y}o("mouseup","",r=>{if(n&&s){const u={start:n,end:s};ae(Object.entries(e.paths)).forEach(c=>{let[d,a]=c;a={x:a[0],y:a[1]},i(a,u)&&document.querySelector(`[data-index="${d}"]`).getAttribute("display")!=="none"&&e.selectedPts.add(d)})}l()})}function ae(t){const e=[];return t.forEach(([o,n])=>e.push(...he(n,o))),e}function he(t,e){const o=[];return t.forEach((n,s)=>{const l=`${e},${s}`;if(n.length===2&&o.push([l,n]),n.length===4){const[i,r,u,c]=n;s!==0&&o.push([`${l},1`,r]),o.push([`${l},2`,u]),s!==t.length-1&&o.push([`${l},3`,c])}}),o}const fe=(t,e)=>{C(t)("dblclick",".path",n=>{n.preventDefault(),console.log(n.target)})};function ue(t){const e=new XMLSerializer,o=document.querySelector("svg").cloneNode(!0);o.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");const n=e.serializeToString(o),s="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(n),l=document.createElement("a");l.href=s,l.download="anon.svg",document.body.appendChild(l),l.click(),document.body.removeChild(l)}const O={"--background":"#0091c2","--handle":"#b1d36f","--preview":"#b7afa6","--handleLine":"#20344c","--point":"#f75060","--cubicPoint":"#de7895","--path":"#faead6","--selectedPoint":"#20344c"},w={paths:{uniqueName:[]},bounds:null,closedPaths:new Set(["uniqueName"]),transforming:!1,panZoom:null,handleMovement:"colinear",mode:"selection",viewMode:"handles",gridMode:"none",drawing:!1,preview:null,selectedPts:new Set,keysPressed:[],selectBox:{},mouse:[0,0],drawingID:"",theme:O,dispatch:null};window.state=w;const pe=(t,e)=>{if(!t||!e)return"";const o=`M ${t[0]} ${t[1]} L ${e[0]} ${e[1]}`;return E`
    <path
      d=${o}
      stroke="var(--preview)"
      stroke-width="0.5"
      stroke-linecap="round"
      fill="none"></path>
  `},me=t=>{let e="";return t.forEach((o,n)=>{const[s,l,i,r]=o,u=n===0?`M ${s[0]} ${s[1]}`:"";e+=`${u} C ${l[0]} ${l[1]}, ${i[0]} ${i[1]}, ${r[0]} ${r[1]} `}),E`
    <path
      d=${e}
      stroke="var(--path)"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      class="path">
    </path>
  `},Y=(t,e={})=>E`
  <circle
    cx=${t[0]}
    cy=${t[1]}
    r=${getComputedStyle(document.documentElement).getPropertyValue("--pointSize")}
    display=${e.display??"inherit"}
    fill=${e.fill??"var(--point)"}
    stroke-width="0.15"
    stroke=${w.selectedPts.has(e.index)?"var(--selectedPoint)":""}
    data-index=${e.index}
    data-type=${e.type}
    class="point"
  >`,ge=(t,e)=>{let o=[];const n=w.viewMode==="none"?"none":"inherit",s=w.viewMode==="handles"?"inherit":"none";return t.forEach((l,i)=>{const r=`${e},${i}`,u=Z(l);if(u==="point"&&o.push(Y(l,{display:n,index:r,type:"point"})),u==="cubic"){const[c,d,a,h]=l,f=`
        stroke: var(--handleLine);
        stroke-width: 0.15;
        stroke-dasharray: 0.3;
        opacity: .7;
      `;i!==0&&o.push(E`
        <path display=${s} style="${f}" d="M ${d.join(" ")} L ${a.join(" ")}">
      `),i!==t.length-1&&o.push(E`
        <path display=${s} style="${f}" d="M ${h.join(" ")} L ${a.join(" ")}">
      `),i!==0&&o.push(Y(d,{display:s,fill:"var(--handle)",index:`${r},1`,type:"cubic"})),o.push(Y(a,{display:n,index:`${r},2`,fill:"var(--cubicPoint)",type:"cubic"})),i!==t.length-1&&o.push(Y(h,{display:s,fill:"var(--handle)",index:`${r},3`,type:"cubic"}))}}),o},ye=t=>{if(!t.drawing)return"";const e=t.paths[t.drawingID];if(!e)return"";const o=e.at(-1),n=Z(o)==="cubic"?o[2]:o;return pe(n,t.preview)},X=(t,e,o,n)=>L` <div class="tool">
    <div class="tool-label">${n??e}</div>
    <div class="radio-select">
      ${o.map(s=>L`<span
          class="select-option ${t[e]===s?"selected":""}"
          @click=${()=>{e==="viewMode"&&(t.selectedPts=new Set),t[e]=s,t.drawing=!1,t.preview=null}}
          >${s}</span
        >`)}
    </div>
  </div>`,we=(t,e,o)=>{t.theme[e]=o,window.localStorage.setItem(e,o),document.documentElement.style.setProperty(e,o)},$e=t=>L` <div class="tool color-picker-tool">
    <div class="color-picker-label">
      <span>colors</span>
    </div>
    <div class="color-picker-container">
      ${Object.entries(t.theme).map(e=>L`<div class="color-picker">
          <label for=${e[0]}>${e[0]}</label
          ><input
            id=${e[0]}
            @input=${o=>{we(t,e[0],o.target.value)}}
            value=${e[1]}
            type="color" />
        </div>`)}
    </div>
  </div>`,ve=t=>{if(t.gridMode==="none")return;const e=t.panZoom.x(),o=t.panZoom.y(),n=t.panZoom.scale();return E`
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
    </rect>`},K=t=>{let e="";for(const o in t.theme){const n=t.theme[o];e+=`${o}: ${n};
`}return L`
    <div class="toolbox">
      <!-- ${$e(t)} -->
      ${X(t,"handleMovement",["symmetric","colinear","broken"],"handles")}
      ${X(t,"mode",["drawing","selection"])}
      ${X(t,"viewMode",["handles","points","none"],"view")}
      ${X(t,"gridMode",["grid","dots","none"],"background")}
      <button @click=${()=>ue()} class="export-svg">
        export svg
      </button>
    </div>
    <!-- <div class="mouse-coords">
      ${t.mouse[0].toFixed(2)},${t.mouse[1].toFixed(2)}
    </div> -->
    <svg class="drawing-area" preserveAspectRatio="xMidYMid meet">
      <g style=${e}>
        <rect width="100%" height="100%" fill="var(--background)"></rect>
        ${t.panZoom?ve(t):""}
        <g class="transform-group">
          ${xe(t)} ${ye(t)}
          ${Object.entries(t.paths).map(([o,n],s)=>me(H(n).cubics))}
          ${Object.entries(t.paths).map(([o,n],s)=>ge(n,o))}
          ${t.bounds?E`<rect x=${t.bounds.d1.min} y=${t.bounds.d2.min}
              height=${t.bounds.d2.max-t.bounds.d2.min}
              width=${t.bounds.d1.max-t.bounds.d1.min}
              fill="none"
              stroke="black"
              stroke-width="0.1"></rect>`:G}
        </g>
      </g>
    </svg>
  `},xe=t=>t.selectBox.start&&t.selectBox.end?E`
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
  />`:"";N(K(w),document.body);const M=document.querySelector(".drawing-area"),A=V(M,w);w.panZoom=A;A.setScaleXY({x:[0,40],y:[0,40]});const Pe=t=>{w.bounds=t,A.setScaleXY({x:[t.d1.min,t.d1.max],y:[t.d2.min,t.d2.max]})};window.setBounds=Pe;ce(w);fe(M);ee(M,w);re(M,w);ne(M,w);ie(M,w);de(M,w);le(M,w);M.addEventListener("mousedown",t=>{t.detail===2&&t.preventDefault()});const _=()=>{let t=window.innerHeight*.01,e=window.innerWidth*.01;document.documentElement.style.setProperty("--vh",`${t}px`),document.documentElement.style.setProperty("--vw",`${e}px`),N(K(w),document.body),window.requestAnimationFrame(_)};function be(){window.setPaths&&window.setPaths(w.paths)}window.onload=t=>{Object.keys(O).map(e=>{w.theme[e]=O[e],document.documentElement.style.setProperty(e,w.theme[e])}),w.dispatch=be};window.requestAnimationFrame(_);
