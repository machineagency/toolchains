import{y as h}from"./lit-html-b7b68613.js";import{n as c,e as m}from"./ref-07f75f10.js";import"./main-1ec7c7df.js";const f={uniqueName:[[20.79754361906341,31.322407527271597],["cubic",[.9120304496474905,19.653355994896398],[8.254315681576973,12.328390371306426],[15.59660091350645,5.003424747716446]],[20.558624076962715,17.70405649374295],["cubic",[26.651046206275865,5.399755956633573],[32.86292636035573,11.49217459337945],[39.07480651443559,17.58459323012533]],[20.79754361906341,31.322407527271597]]},b={inports:{bounds:{type:"domain2D",value:null}},outports:{paths:{type:"array",value:!1}},state:{paths:f},ui:{displayName:"Path",width:500,height:400,resize:"both"}};function y(a,d,i){let n=m(),o;function s(){o(a.bounds.value)}function p(t){i.paths=t,d.paths.value=t}function r(){let t=document.createElement("iframe");t.src="./tools/pdi/index.html",t.onload=()=>{let e=t.contentWindow;e.state.paths=i.paths,e.setPaths=p,o=u=>e.setBounds(u)},n.value.appendChild(t)}function l(){return h`<style>
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
      <div id="pdi" ${c(n)}></div>`}return{render:l,postInit:r,inportsUpdated:s}}const P={config:b,tool:y};export{P as default};
