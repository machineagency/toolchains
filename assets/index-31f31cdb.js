import{Z as g,y as p,w as s,b as M}from"./lit-html-b7b68613.js";import{pathToCubics as S}from"./path-64f1c30e.js";import{addPanZoom as B}from"./addPanZoom-d065c67a.js";import{cmdType as b}from"./utils-c498b33b.js";import{addPointInteraction as L}from"./addPointInteraction-4ecb555b.js";import{addConvertPts as j}from"./addConvertPts-5215b22b.js";import{addPathDrawing as C}from"./addPathDrawing-3969a1cc.js";import{addPointDeletion as E}from"./addPointDeletion-324f2f57.js";import{addGlobalKeypress as Z}from"./addGlobalKeypress-9be88809.js";import{addMouseTracking as D}from"./addMouseTracking-9b51a8f3.js";import{addSelectBox as O}from"./addSelectBox-11a4a93d.js";import{addPathInteraction as T}from"./addPathInteraction-9ea31a71.js";import{exportSVG as q}from"./exportSVG-6f9348cc.js";const w={"--background":"#0091c2","--handle":"#b1d36f","--preview":"#b7afa6","--handleLine":"#20344c","--point":"#f75060","--cubicPoint":"#de7895","--path":"#faead6","--selectedPoint":"#20344c"},i={paths:{uniqueName:[]},bounds:null,closedPaths:new Set(["uniqueName"]),transforming:!1,panZoom:null,handleMovement:"colinear",mode:"selection",viewMode:"handles",gridMode:"none",drawing:!1,preview:null,selectedPts:new Set,keysPressed:[],selectBox:{},mouse:[0,0],drawingID:"",theme:w,dispatch:null};window.state=i;const U=(e,o)=>{if(!e||!o)return"";const n=`M ${e[0]} ${e[1]} L ${o[0]} ${o[1]}`;return s`
    <path
      d=${n}
      stroke="var(--preview)"
      stroke-width="0.5"
      stroke-linecap="round"
      fill="none"></path>
  `},F=e=>{let o="";return e.forEach((n,t)=>{const[r,a,l,c]=n,h=t===0?`M ${r[0]} ${r[1]}`:"";o+=`${h} C ${a[0]} ${a[1]}, ${l[0]} ${l[1]}, ${c[0]} ${c[1]} `}),s`
    <path
      d=${o}
      stroke="var(--path)"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      class="path">
    </path>
  `},m=(e,o={})=>s`
  <circle
    cx=${e[0]}
    cy=${e[1]}
    r=${getComputedStyle(document.documentElement).getPropertyValue("--pointSize")}
    display=${o.display??"inherit"}
    fill=${o.fill??"var(--point)"}
    stroke-width="0.15"
    stroke=${i.selectedPts.has(o.index)?"var(--selectedPoint)":""}
    data-index=${o.index}
    data-type=${o.type}
    class="point"
  >`,A=(e,o)=>{let n=[];const t=i.viewMode==="none"?"none":"inherit",r=i.viewMode==="handles"?"inherit":"none";return e.forEach((a,l)=>{const c=`${o},${l}`,h=b(a);if(h==="point"&&n.push(m(a,{display:t,index:c,type:"point"})),h==="cubic"){const[I,y,u,f]=a,x=`
        stroke: var(--handleLine);
        stroke-width: 0.15;
        stroke-dasharray: 0.3;
        opacity: .7;
      `;l!==0&&n.push(s`
        <path display=${r} style="${x}" d="M ${y.join(" ")} L ${u.join(" ")}">
      `),l!==e.length-1&&n.push(s`
        <path display=${r} style="${x}" d="M ${f.join(" ")} L ${u.join(" ")}">
      `),l!==0&&n.push(m(y,{display:r,fill:"var(--handle)",index:`${c},1`,type:"cubic"})),n.push(m(u,{display:t,index:`${c},2`,fill:"var(--cubicPoint)",type:"cubic"})),l!==e.length-1&&n.push(m(f,{display:r,fill:"var(--handle)",index:`${c},3`,type:"cubic"}))}}),n},G=e=>{if(!e.drawing)return"";const o=e.paths[e.drawingID];if(!o)return"";const n=o.at(-1),t=b(n)==="cubic"?n[2]:n;return U(t,e.preview)},$=(e,o,n,t)=>p` <div class="tool">
    <div class="tool-label">${t??o}</div>
    <div class="radio-select">
      ${n.map(r=>p`<span
          class="select-option ${e[o]===r?"selected":""}"
          @click=${()=>{o==="viewMode"&&(e.selectedPts=new Set),e[o]=r,e.drawing=!1,e.preview=null}}
          >${r}</span
        >`)}
    </div>
  </div>`,Y=(e,o,n)=>{e.theme[o]=n,window.localStorage.setItem(o,n),document.documentElement.style.setProperty(o,n)},R=e=>p` <div class="tool color-picker-tool">
    <div class="color-picker-label">
      <span>colors</span>
    </div>
    <div class="color-picker-container">
      ${Object.entries(e.theme).map(o=>p`<div class="color-picker">
          <label for=${o[0]}>${o[0]}</label
          ><input
            id=${o[0]}
            @input=${n=>{Y(e,o[0],n.target.value)}}
            value=${o[1]}
            type="color" />
        </div>`)}
    </div>
  </div>`,X=e=>{if(e.gridMode==="none")return;const o=e.panZoom.x(),n=e.panZoom.y(),t=e.panZoom.scale();return s`
    <defs>
      <pattern
        id="dots"
        x="${o-t/2}"
        y="${n-t/2}"
        width="${t}"
        height="${t}"
        patternUnits="userSpaceOnUse">
        <circle fill="var(--white)" cx="${t/2}" cy="${t/2}" r="1">
        </circle>
      </pattern>
      <pattern
        id="grid"
        x="${o}"
        y="${n}"
        width="${t}"
        height="${t}"
        patternUnits="userSpaceOnUse">
        <line stroke="var(--white)" x1="0" y1="0" x2="${t}" y2="0"></line>
        <line stroke="var(--white)" x1="0" y1="0" x2="0" y2="${t}"></line>
      </pattern>
    </defs>
    <rect
      class="grid-background"
      width="100%"
      height="100%"
      fill="url(#${e.gridMode})">
    </rect>`},k=e=>{let o="";for(const n in e.theme){const t=e.theme[n];o+=`${n}: ${t};
`}return p`
    <div class="toolbox">
      <!-- ${R(e)} -->
      ${$(e,"handleMovement",["symmetric","colinear","broken"],"handles")}
      ${$(e,"mode",["drawing","selection"])}
      ${$(e,"viewMode",["handles","points","none"],"view")}
      ${$(e,"gridMode",["grid","dots","none"],"background")}
      <button @click=${()=>q()} class="export-svg">
        export svg
      </button>
    </div>
    <!-- <div class="mouse-coords">
      ${e.mouse[0].toFixed(2)},${e.mouse[1].toFixed(2)}
    </div> -->
    <svg class="drawing-area" preserveAspectRatio="xMidYMid meet">
      <g style=${o}>
        <rect width="100%" height="100%" fill="var(--background)"></rect>
        ${e.panZoom?X(e):""}
        <g class="transform-group">
          ${_(e)} ${G(e)}
          ${Object.entries(e.paths).map(([n,t],r)=>F(S(t).cubics))}
          ${Object.entries(e.paths).map(([n,t],r)=>A(t,n))}
          ${e.bounds?s`<rect x=${e.bounds.d1.min} y=${e.bounds.d2.min}
              height=${e.bounds.d2.max-e.bounds.d2.min}
              width=${e.bounds.d1.max-e.bounds.d1.min}
              fill="none"
              stroke="black"
              stroke-width="0.1"></rect>`:M}
        </g>
      </g>
    </svg>
  `},_=e=>e.selectBox.start&&e.selectBox.end?s`
  <path
    style="
      fill:#cb94e7;
      opacity: 0.6;
    "
    d="
      M ${e.selectBox.start.x} ${e.selectBox.start.y}
      L ${e.selectBox.end.x} ${e.selectBox.start.y}
      L ${e.selectBox.end.x} ${e.selectBox.end.y}
      L ${e.selectBox.start.x} ${e.selectBox.end.y}
    "
  />`:"";g(k(i),document.body);const d=document.querySelector(".drawing-area"),v=B(d,i);i.panZoom=v;v.setScaleXY({x:[0,40],y:[0,40]});const z=e=>{i.bounds=e,v.setScaleXY({x:[e.d1.min,e.d1.max],y:[e.d2.min,e.d2.max]})};window.setBounds=z;Z(i);T(d);L(d,i);E(d,i);j(d,i);C(d,i);O(d,i);D(d,i);d.addEventListener("mousedown",e=>{e.detail===2&&e.preventDefault()});const P=()=>{let e=window.innerHeight*.01,o=window.innerWidth*.01;document.documentElement.style.setProperty("--vh",`${e}px`),document.documentElement.style.setProperty("--vw",`${o}px`),g(k(i),document.body),window.requestAnimationFrame(P)};function H(){window.setPaths&&window.setPaths(i.paths)}window.onload=e=>{Object.keys(w).map(o=>{i.theme[o]=w[o],document.documentElement.style.setProperty(o,i.theme[o])}),i.dispatch=H};window.requestAnimationFrame(P);
