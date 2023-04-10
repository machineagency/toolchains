import{pathToCubics as p}from"./path-64f1c30e.js";import{y as c,w as h,b as l}from"./lit-html-b7b68613.js";const u=[[0,0],["cubic",[-8,-5],[-5,-8],[-2,-11]],[0,-6],["cubic",[2,-11],[5,-8],[8,-5]],[0,0]],$={inports:{paths:{type:"array",value:!1},bounds:{type:"domain2D",value:!1}},outports:{},state:{paths:{uniqueName:u}},ui:{displayName:"Path",width:500,height:300,resize:"both"}},m=e=>{let r="";return e.forEach((i,n)=>{const[t,s,o,a]=i,d=n===0?`M ${t[0]} ${t[1]}`:"";r+=`${d} C ${s[0]} ${s[1]}, ${o[0]} ${o[1]}, ${a[0]} ${a[1]} `}),h`
    <path
      d=${r}
      stroke="var(--path)"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      class="path">
    </path>
  `};function b(e,r,i){return{render:()=>{let t=e.bounds.value;return c`<style>
        svg {
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        path {
          stroke: black;
          stroke-width: 3px;
        }
      </style>
      <svg preserveAspectRatio="xMidYMid meet">
        ${t?h`<rect x=${t.d1.min} y=${t.d2.min}
              height=${t.d2.max-t.d2.min}
              width=${t.d1.max-t.d1.min}
              fill="none"
              stroke="black"
              stroke-width="0.1"></rect>`:l}
        ${Object.entries(e.paths.value).map(([s,o],a)=>m(p(o).cubics))}
      </svg>`}}}const v={config:$,tool:b};export{v as default};
