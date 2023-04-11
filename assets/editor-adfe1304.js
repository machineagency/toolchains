import{y as p}from"./lit-html-b7b68613.js";import{n as f,e as g}from"./ref-3aef6325.js";import{E as a,e as h,g as b}from"./editor-5ed85bb6.js";import{j as w}from"./index-e839cebc.js";import"./index-539b5a58.js";const v={inports:{},outports:{program:{type:"string",value:null}},state:{language:"javascript",program:`console.log('hello world!');
`},ui:{displayName:"Editor",resize:"both",width:200,height:500}};function k(S,n,t,s){let o=g(),e;function l(){return a.updateListener.of(r=>{t.program=r.state.doc.toString(),n.program.value=r.state.doc.toString()})}function i(){return h.create({doc:t.program,extensions:[b,w(),l()]})}function c(){e=new a({parent:o.value,state:i()})}function d(){e.setState(i())}function m(){e.requestMeasure()}function u(){let r=s.panZoom.scale();return p`
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
          transform: scale(${1/r});
        }
        .cm-gutter > * {
          transform-origin: 0 0;
          transform: scale(${r});
        }
        .cm-cursorLayer {
          transform-origin: 0 0;
          transform: scale(${1/r});
        }
        .cm-selectionLayer {
          /* transform-origin: 0 0; */
          transform: scale(${1/r});
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
      <div id="editor" ${f(o)}></div>
    `}return{render:u,postInit:c,inportsUpdated:d,onZoom:m}}const C={config:v,tool:k};export{C as default};
