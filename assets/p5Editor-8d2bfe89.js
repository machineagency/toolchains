import{y}from"./lit-html-b7b68613.js";import{n as g,e as k}from"./ref-056edc85.js";import{S as w,v,w as S,E as a,x,o as l,e as E,g as $,y as P,l as C}from"./editor-5ed85bb6.js";import{j as F}from"./index-e839cebc.js";import"./index-929da322.js";const s=w.define(),c=v.define({create:()=>!1,update(t,e){for(let n of e.effects)n.is(s)&&(t=n.value);return t},provide:t=>S.from(t,e=>e?T:null)});function T(t){let e=document.createElement("div");return e.textContent="F1: Toggle the help panel",e.className="cm-help-panel",{top:!0,dom:e}}const I=[{key:"F1",run(t){return t.dispatch({effects:s.of(!t.state.field(c))}),!0}}],R=a.baseTheme({".cm-help-panel":{padding:"5px 10px",color:"var(--black)",backgroundColor:"#fffa8f",fontFamily:"monospace"}});function A(){return[c,x.of(I),R]}const L=[l("function ${name}(${params}) {\n	${}\n}",{label:"function",detail:"definition",type:"keyword"}),l(`function setup() {
	\${}
}

function draw() {
	\${}
}`,{label:"function",detail:"sketch skeleton",type:"keyword"})];function j(t){let e=t.matchBefore(/\w*/);return e.from==e.to&&!t.explicit?null:{from:e.from,options:[{label:"HALF_PI",type:"constant"},{label:"PI",type:"constant"},{label:"QUARTER_PI",type:"constant"},{label:"TAU",type:"constant"},{label:"TWO_PI",type:"constant"},{label:"DEGREES",type:"constant"},{label:"RADIANS",type:"constant"},{label:"arc",type:"function",info:"https://p5js.org/reference/#/p5/arc"},{label:"ellipse",type:"function"},{label:"circle",type:"function"},{label:"line",type:"function"},{label:"point",type:"function"},{label:"quad",type:"function"},{label:"rect",type:"function"},{label:"square",type:"function"},{label:"triangle",type:"function"}]}}const q={inports:{},outports:{sketch:{type:"string",value:null}},state:{sketch:`function setup() {
  createCanvas(windowWidth, windowHeight);
  background(102);
}

function draw() {
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}`},ui:{displayName:"P5 Sketch Editor",width:500,height:400,resize:"both"}};function H(t,e,n,p){let i=k(),r;function u(){return a.updateListener.of(o=>{n.sketch=o.state.doc.toString(),e.sketch.value=o.state.doc.toString()})}function f(o){return E.create({doc:o,extensions:[$,F(),P({override:[j,C(L)]}),A(),u()]})}function d(){r=new a({parent:i.value,state:f(n.sketch)})}function m(){r.requestMeasure()}function b(){r.requestMeasure()}function h(){let o=p.panZoom.scale();return y`
      <style>
        #editor {
          height: 100%;
          display: flex;
          overflow: auto;
        }
        .cm-editor {
          flex: 1;
        }
        .cm-editor.cm-focused {
          outline: none;
        }

        /* Prepare yourself for the jankiest CSS ever written */
        /* This is because Codemirror doesn't behave properly when
         inside something that has been transformed with CSS */
        .cm-gutter {
          transform-origin: 0 0;
          transform: scale(${1/o});
        }
        .cm-gutter > * {
          transform-origin: 0 0;
          transform: scale(${o});
        }
        .cm-cursorLayer {
          transform-origin: 0 0;
          transform: scale(${1/o});
        }
        .cm-selectionLayer {
          transform-origin: 0 0;
          transform: scale(${1/o});
        }

        /* Works on Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: blue var(--purple);
        }

        /* Works on Chrome, Edge, and Safari */
        *::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }

        *::-webkit-scrollbar-track {
          background: var(--black);
        }

        *::-webkit-scrollbar-thumb {
          background-color: var(--purple);
          border: none;
        }
      </style>
      <div id="editor" ${g(i)}></div>
    `}return{render:h,postInit:d,onResize:m,onZoom:b}}const M={config:q,tool:H};export{M as default};