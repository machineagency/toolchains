import{y as M}from"./lit-html-b7b68613.js";const $=`; Ender 3 Custom Start G-code
G92 E0 ; Reset Extruder
G28 ; Home all axes
M104 S175 ; Start heating up the nozzle most of the way
M190 S60 ; Start heating the bed, wait until target temperature reached
M109 S215 ; Finish heating the nozzle
G1 Z2.0 F3000 ; Move Z Axis up little to prevent scratching of Heat Bed
G1 X0.1 Y20 Z0.3 F5000.0 ; Move to start position
G1 X0.1 Y200.0 Z0.3 F1500.0 E15 ; Draw the first line
G1 X0.4 Y200.0 Z0.3 F5000.0 ; Move to side a little
G1 X0.4 Y20 Z0.3 F1500.0 E30 ; Draw the second line
G92 E0 ; Reset Extruder
G1 Z2.0 F3000 ; Move Z Axis up little to prevent scratching of Heat Bed
G1 X5 Y20 Z0.3 F5000.0 ; Move over to prevent blob squish
G92 E0
G92 E0
G1 F1500 E-6.5`,b=`
G1 F1500 E201.24404
M107
G91 ;Relative positioning
G1 E-2 F2700 ;Retract a bit
G1 E-2 Z0.2 F2400 ;Retract and raise Z
G1 X5 Y5 F3000 ;Wipe out
G1 Z10 ;Raise Z more
G90 ;Absolute positioning

G1 X0 Y220 ;Present print
M106 S0 ;Turn-off fan
M104 S0 ;Turn-off hotend
M140 S0 ;Turn-off bed

M84 X Y E ;Disable all steppers but Z

M82 ;absolute extrusion mode
M104 S0`;class E{constructor(t=.4/2,e=1.75/2,i=6.5){this.pos=[0,0,0],this.nozzleRadius=t,this.filamentRadius=e,this.retract=i,this.program=[],this.speeds={layer_up:125,wall_outer:10,travel:150,initial:20}}start(t=$){this.cmd(t)}end(t=b){this.cmd(t)}sec_to_min(t){return t*60}fixNum(t){return Number.parseFloat(t.toFixed(3))}dist(t){let e=Math.abs(t[0]-this.pos[0]),i=Math.abs(t[1]-this.pos[1]),a=Math.abs(t[2]-this.pos[2]),r=Math.sqrt(e*e+i*i);return Math.sqrt(r*r+a*a)}calcExtrude(t){let e=this.nozzleRadius/this.filamentRadius;return this.dist(t)*e**2}cmd(t){this.program.push(t)}moveExtrude(t,e,i=null,a=null){i||(i=this.pos[2]),a||(a=this.calcExtrude([t,e,i])),t=this.fixNum(t),e=this.fixNum(e),i=this.fixNum(i),a=this.fixNum(a),this.cmd(`G1 X${t} Y${e} Z${i} E${a}`),this.pos=[t,e,i]}extrude_xy(t,e,i=null){i||(i=this.calcExtrude([t,e,this.pos[2]])),t=this.fixNum(t),e=this.fixNum(e),i=this.fixNum(i),this.cmd(`G1 X${t} Y${e} E${i}`),this.pos=[t,e,this.pos[2]]}move(t,e,i){t=this.fixNum(t),e=this.fixNum(e),i=this.fixNum(i),this.cmd(`G0 X${t} Y${e} Z${i}`),this.pos=[t,e,i]}moveRetract(t,e,i){t=this.fixNum(t),e=this.fixNum(e),i=this.fixNum(i),this.cmd(`G1 E${-1*this.retract}`),this.cmd(`G0 X${t} Y${e} Z${i} E0`),this.cmd(`G1 E${this.retract}`),this.pos=[t,e,i]}extrude_rel(){this.cmd("M83")}setFeedrate(t){this.cmd(`G0 F${this.sec_to_min(t)}`)}addComment(t){this.program[this.program.length-1]+=` ; ${t}`}setTemp(t){this.cmd(`M104 S${t}`)}setFan(t){this.cmd(`M106 S${t}`)}fanOn(){this.cmd("M106")}fanOff(){this.cmd("M107")}zInc(t=.2){let e=this.sec_to_min(this.speeds.layer_up);this.pos[2]=this.fixNum(this.pos[2]+t),this.cmd(`G0 F${e} Z${this.pos[2]}`),this.setFeedrate(this.speeds.wall_outer)}gcode(){return this.program.join(`
`)}}const F={inports:{pixelArr:{type:"array",value:null}},outports:{gcode:{type:"string",value:null}},state:{fast:30,slow:5,radius:20,height:35},ui:{displayName:"Velocity",width:200,height:100}};function N(c,t,e){function i(){let r=e.radius,p=.2,m=e.height/p,o=[100,100],f=4*Math.PI*r,l=c.pixelArr.value;console.log(l);let s=new E;s.start(),s.extrude_rel();let u=0;for(let n=0;n<m;n++){n==0?(s.fanOff(),s.move(o[0]+r,o[1],p),s.cmd("G1 F1500 E6.5"),s.setTemp(215),s.setFeedrate(s.speeds.wall_outer)):n==1?(s.setFan(85),s.setFeedrate(s.speeds.wall_outer)):n==2?s.setFan(170):n==3&&s.setFan(255);let h=0;for(let d=0;d<2*Math.PI;d+=Math.PI/f){if(n>5){let G=l[Math.floor(u)][Math.floor(h)]>125?e.fast:e.slow;s.setFeedrate(G),h+=.5,h>l[0].length-1&&(h=0)}let v=r*Math.cos(d)+o[0],x=r*Math.sin(d)+o[1];s.extrude_xy(v,x)}n>5&&(u+=.5,u>l.length-1&&(u=0)),s.zInc()}s.end();let g=s.gcode();t.gcode.value=g}function a(){return M`<style>
        .container {
          display: grid;
          grid-template-columns: auto auto auto;
          width: fit-content;
          grid-gap: 0.2rem;
          margin: 0.2rem auto;
        }
        input[type="number"] {
          width: 50px;
        }
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          background-color: var(--blue);
          font-weight: 600;
          border-top: 1px solid var(--black);
          padding: 0.3rem;
        }
        .btn:hover {
          cursor: pointer;
          background-color: var(--purple);
        }
      </style>
      <div class="container">
        <span>Slowest</span>
        <input
          type="number"
          value=${e.slow}
          @change=${r=>e.slow=Number(r.target.value)} />
        <span>mm/s</span>
        <span>Fastest</span>
        <input
          type="number"
          value=${e.fast}
          @change=${r=>e.fast=Number(r.target.value)} />
        <span>mm/s</span>
        <span>Radius</span>
        <input
          type="number"
          value=${e.radius}
          @change=${r=>e.radius=Number(r.target.value)} />
        <span>mm</span>
        <span>Height</span>
        <input
          type="number"
          value=${e.height}
          @change=${r=>e.height=Number(r.target.value)} />
        <span>mm</span>
      </div>
      <div class="btn" @click=${i}>
        <span>Make G-code</span>
      </div>`}return{render:a}}const w={config:F,tool:N};export{w as default};
