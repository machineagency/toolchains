import{createListener as y}from"./utils-c498b33b.js";function m(f,n){const s=y(f);let e=null,l=null;const r=()=>{e=null,l=null,n.selectBox.start=e,n.selectBox.end=l};s("mousedown","",t=>{t.shiftKey&&(e=n.panZoom.svgPoint({x:t.offsetX,y:t.offsetY}))}),s("mousemove","",t=>{if(!t.shiftKey){r();return}e!==null&&(l=n.panZoom.svgPoint({x:t.offsetX,y:t.offsetY}),n.selectBox.start=e,n.selectBox.end=l)});function c(t,u){let{start:o,end:i}=u;return t.x>o.x&&t.x<i.x&&t.y>o.y&&t.y<i.y||t.x>o.x&&t.x<i.x&&t.y<o.y&&t.y>i.y||t.x<o.x&&t.x>i.x&&t.y>o.y&&t.y<i.y||t.x<o.x&&t.x>i.x&&t.y<o.y&&t.y>i.y}s("mouseup","",t=>{if(e&&l){const u={start:e,end:l};h(Object.entries(n.paths)).forEach(o=>{let[i,x]=o;x={x:x[0],y:x[1]},c(x,u)&&document.querySelector(`[data-index="${i}"]`).getAttribute("display")!=="none"&&n.selectedPts.add(i)})}r()})}function h(f){const n=[];return f.forEach(([s,e])=>n.push(...a(e,s))),n}function a(f,n){const s=[];return f.forEach((e,l)=>{const r=`${n},${l}`;if(e.length===2&&s.push([r,e]),e.length===4){const[c,t,u,o]=e;l!==0&&s.push([`${r},1`,t]),s.push([`${r},2`,u]),l!==f.length-1&&s.push([`${r},3`,o])}}),s}export{m as addSelectBox};
