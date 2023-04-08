import{y as r}from"./lit-html-b7b68613.js";const d={inports:{},outports:{dataUrl:{type:"dataurl",value:null}},state:{file:null},ui:{displayName:"Upload File",width:150,height:50}};function c(u,l,n){function i(e){let a=e.target.files[0];const t=new FileReader;t.readAsDataURL(a),t.onload=()=>{n.file=t.result,l.dataUrl.value=t.result}}function o(){let e=document.createElement("input");e.setAttribute("type","file"),e.style.display="none",document.body.appendChild(e),e.click(),e.onchange=i,document.body.removeChild(e)}return{render:()=>r`<style>
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
        <div class="fileBtn" @click=${o}>
          <span>Upload File</span>
        </div>
      </div>`}}const f={config:d,tool:c};export{f as default};
