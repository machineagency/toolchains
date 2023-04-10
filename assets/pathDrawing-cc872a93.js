import{y as c}from"./lit-html-b7b68613.js";import{n as m,e as f}from"./ref-377bfd4e.js";import"./index-528b6888.js";const a={uniqueName:[[20.79754361906341,31.322407527271597],["cubic",[.9120304496474905,19.653355994896398],[8.254315681576973,12.328390371306426],[15.59660091350645,5.003424747716446]],[20.558624076962715,17.70405649374295],["cubic",[26.651046206275865,5.399755956633573],[32.86292636035573,11.49217459337945],[39.07480651443559,17.58459323012533]],[20.79754361906341,31.322407527271597]]},b={inports:{bounds:{type:"domain2D",value:null}},outports:{paths:{type:"array",value:a}},state:{paths:a},ui:{displayName:"Path",width:500,height:400,resize:"both"}};function y(d,p,i){let n=f(),o;function s(){o(d.bounds.value)}function r(t){i.paths=t,p.paths.value=t}function l(){let t=document.createElement("iframe");t.src="./tools/path/pdi/index.html",t.onload=()=>{let e=t.contentWindow;e.state.paths=i.paths,e.setPaths=r,o=h=>e.setBounds(h)},n.value.appendChild(t)}function u(){return c`<style>
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
      <div id="pdi" ${m(n)}></div>`}return{render:u,postInit:l,inportsUpdated:s}}const P={config:b,tool:y};export{P as default};
