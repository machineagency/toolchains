import{y as p}from"./lit-html-b7b68613.js";const h={inports:{dataurl:{type:"dataurl",value:null}},outports:{pixelData:{type:"array",value:null}},state:{},ui:{displayName:"Pixel Data",width:200,height:200,resize:"both"}};function x(r,o,y){function c(a,e,t){let n=Array(t).fill().map(()=>Array(e).fill(0));for(let l=0;l<t;l++)for(let i=0;i<e;i++){const s=a.getImageData(i,l,1,1);let[g,m,f,w]=s.data;n[l][i]=.299*g+.587*m+.114*f}o.pixelData.value=n}function u(){const a=document.createElement("canvas"),e=a.getContext("2d",{willReadFrequently:!0}),t=new Image;t.onload=function(){a.width=t.width,a.height=t.height,e.drawImage(t,0,0),c(e,t.width,t.height)},t.src=r.dataurl.value}function d(){return p`<style>
        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          display: block;
          image-rendering: pixelated;
        }
      </style>
      <img draggable="false" src=${r.dataurl.value} />`}return{render:d,inportsUpdated:u}}const D={config:h,tool:x};export{D as default};
