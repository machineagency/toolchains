import{createListener as i}from"./utils-c498b33b.js";const f=(t,o)=>{i(t)("pointermove","",e=>{const{x:n,y:s}=o.panZoom.svgPoint({x:e.offsetX,y:e.offsetY});o.mouse=[n,s]})};export{f as addMouseTracking};
