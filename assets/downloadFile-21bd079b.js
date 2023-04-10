import{y as i}from"./lit-html-b7b68613.js";const a={inports:{contents:{type:"string",value:null}},outports:{},state:{filename:null},ui:{displayName:"Download File",width:150,height:50,icon:"download"}};function d(o,r,n){function t(){const e=document.createElement("a");e.href="data:text/plain;charset=utf-8,"+encodeURIComponent(o.contents.value),e.download=n.filename,document.body.appendChild(e),e.click(),document.body.removeChild(e)}function l(e){n.filename=e.target.value}return{render:()=>i`<style>
        .container {
          height: 100%;
          display: flex;
          flex-direction: column;
          font-family: inherit;
        }
        .fileBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          background-color: var(--blue);
          font-weight: 600;
          border-top: 1px solid var(--black);
        }
        .fileBtn:hover {
          cursor: pointer;
          background-color: var(--purple);
        }
        .fname {
          display: flex;
          border: none;
          padding: 0.3rem;
        }
      </style>
      <div class="container">
        <input
          class="fname"
          value=${n.filename}
          placeholder="Enter file name"
          @input=${l}
          type="text" />
        <div class="fileBtn" @click=${t}>
          <span>Download</span>
        </div>
      </div>`}}const s={config:a,tool:d};export{s as default};
