const g={inports:{width:{type:"number",value:null},height:{type:"number",value:null},r:{type:"array",value:null},g:{type:"array",value:null},b:{type:"array",value:null},a:{type:"array",value:null}},outports:{imageData:{type:"object",value:null}},ui:{displayName:"Construct Image"}};function c(a,v){function r(){const u=a.width.value,n=a.height.value;if(u===null||n===null)return;let e=new ImageData(u,n),t=0;for(let l=0;l<e.data.length;l+=4)e.data[l+0]=a.r.value?a.r.value[t]:0,e.data[l+1]=a.g.value?a.g.value[t]:0,e.data[l+2]=a.b.value?a.b.value[t]:0,e.data[l+3]=a.a.value?a.a.value[t]:255,t+=1;v.imageData.value=e}return{inportsUpdated:r}}const d={config:g,tool:c};export{d as default};
