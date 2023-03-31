import{y as s}from"./lit-html-b7b68613.js";import{n as p,e as d}from"./ref-48f1d6b0.js";import"./main-7c771c52.js";const h=[[0,0],["cubic",[-8,-5],[-5,-8],[-2,-11]],[0,-6],["cubic",[2,-11],[5,-8],[8,-5]],[0,0]],l={inports:{},outports:{paths:{type:"array",value:!1}},state:{paths:{uniqueName:h}},ui:{displayName:"Path",width:500,height:400,resize:"both"}};function c(u,n,e){let i=d();function o(t){e.paths=t,n.paths.value=t}function a(){let t=document.createElement("iframe");t.src="./tools/pdi/index.html",t.onload=()=>{t.contentWindow.state.paths=e.paths,t.contentWindow.setPaths=o},i.value.appendChild(t)}function r(){return s`<style>
        #pdi {
          display: block;
          border: none;
          height: 100%;
          width: 100%;
        }

        iframe {
          display: block;
          border: none;
          height: 100%;
          width: 100%;
        }
      </style>
      <div id="pdi" ${p(i)}></div>`}return{render:r,postInit:a}}const b={config:l,tool:c};export{b as default};
