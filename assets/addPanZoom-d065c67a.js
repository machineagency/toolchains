import{createListener as S}from"./utils-c498b33b.js";function v(y,w){const a=S(y);let x=!1,o=1,e=0,r=0,p={x:0,y:0};function m(t){t.style.transformOrigin=`${0}px ${0}px`,t.style.transform="translate("+e+"px, "+r+"px) scale("+o+")"}function i({x:t,y:n}){let s=(t-e)/o,c=(n-r)/o;return{x:s,y:c}}a("pointerdown","",t=>{t.shiftKey||(x=!0,p={x:t.offsetX-e,y:t.offsetY-r},t.detail)}),a("pointermove","",t=>{if(!x||w.transforming)return;e=t.offsetX-p.x,r=t.offsetY-p.y;const n=document.querySelectorAll(".transform-group");for(const s of n)m(s)}),a("pointerup","",t=>{x=!1}),a("wheel","",t=>{let n=(t.offsetX-e)/o,s=(t.offsetY-r)/o;Math.sign(t.deltaY)<0?o*=1.03:o/=1.03,e=t.offsetX-n*o,r=t.offsetY-s*o;const c=document.querySelectorAll(".transform-group");for(const f of c)m(f);t.preventDefault()});function Y(t){const n=y.getBoundingClientRect(),s=t.x[1]-t.x[0],c=t.y[1]-t.y[0],f=n.width/s,u=n.height/c,l=Math.min(f,u)*.9;o=l;const g={x:(t.x[0]+t.x[1])/2*l-n.width/2,y:(t.y[0]+t.y[1])/2*l-n.height/2};e=-g.x,r=-g.y;const d=document.querySelectorAll(".transform-group");for(const h of d)m(h)}function X(){const{left:t,right:n,bottom:s,top:c,width:f,height:u}=y.getBoundingClientRect(),l=i({x:f,y:u}),g=i({x:0,y:u}),d=i({x:f,y:0}),h=i({x:0,y:0});return{rt:l,lt:g,rb:d,lb:h}}return{scale:()=>o,x:()=>e,y:()=>r,corners:X,svgPoint:i,setScaleXY:Y}}export{v as addPanZoom};
