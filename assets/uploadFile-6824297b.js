import{y as d}from"./lit-html-b7b68613.js";const c={inports:{},outports:{dataUrl:{type:"dataurl",value:null}},state:{file:null},ui:{displayName:"Upload File",width:150,height:50,icon:"upload"}};function u(s,t,n){function i(e){let r=e.target.files[0];const l=new FileReader;l.readAsDataURL(r),l.onload=()=>{n.file=l.result,t.dataUrl.value=l.result}}function o(){t.dataUrl.value=n.file}function a(){let e=document.createElement("input");e.setAttribute("type","file"),e.style.display="none",document.body.appendChild(e),e.click(),e.onchange=i,document.body.removeChild(e)}return{render:()=>d`<style>
        .container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .fileBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          background-color: var(--blue);
          font-weight: 600;
        }
        .fileBtn:hover {
          cursor: pointer;
          background-color: var(--purple);
        }
      </style>
      <div class="container">
        <div class="fileBtn" @click=${a}>
          <span>Upload File</span>
        </div>
      </div>`,init:o}}const y={config:c,tool:u};export{y as default};
