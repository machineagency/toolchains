const ENDER_START = `; Ender 3 Custom Start G-code
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
G1 F1500 E-6.5`;

const ENDER_END = `
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
M104 S0`;

export class Printer {
  constructor(
    nozzleRadius = 0.4 / 2,
    filamentRadius = 1.75 / 2,
    retract = 6.5
  ) {
    this.pos = [0, 0, 0];
    this.nozzleRadius = nozzleRadius;
    this.filamentRadius = filamentRadius;
    this.retract = retract;
    this.program = [];
    this.speeds = {
      layer_up: 125,
      wall_outer: 10,
      travel: 150,
      initial: 20,
    };
  }

  start(snippet = ENDER_START) {
    this.cmd(snippet);
  }

  end(snippet = ENDER_END) {
    this.cmd(snippet);
  }

  sec_to_min(val) {
    return val * 60;
  }

  fixNum(x) {
    return Number.parseFloat(x.toFixed(3));
  }

  dist(newPos) {
    let dx = Math.abs(newPos[0] - this.pos[0]);
    let dy = Math.abs(newPos[1] - this.pos[1]);
    let dz = Math.abs(newPos[2] - this.pos[2]);
    let dxy = Math.sqrt(dx * dx + dy * dy);
    let dxyz = Math.sqrt(dxy * dxy + dz * dz);
    return dxyz;
  }

  calcExtrude(newPos) {
    let filament_ratio = this.nozzleRadius / this.filamentRadius;
    return this.dist(newPos) * filament_ratio ** 2;
  }

  cmd(command) {
    this.program.push(command);
  }

  moveExtrude(x, y, z = null, e = null) {
    if (!z) {
      z = this.pos[2];
    }
    if (!e) {
      e = this.calcExtrude([x, y, z]);
    }
    x = this.fixNum(x);
    y = this.fixNum(y);
    z = this.fixNum(z);
    e = this.fixNum(e);

    this.cmd(`G1 X${x} Y${y} Z${z} E${e}`);
    this.pos = [x, y, z];
  }

  extrude_xy(x, y, e = null) {
    if (!e) {
      e = this.calcExtrude([x, y, this.pos[2]]);
    }
    x = this.fixNum(x);
    y = this.fixNum(y);
    e = this.fixNum(e);
    this.cmd(`G1 X${x} Y${y} E${e}`);
    this.pos = [x, y, this.pos[2]];
  }

  move(x, y, z) {
    x = this.fixNum(x);
    y = this.fixNum(y);
    z = this.fixNum(z);
    this.cmd(`G0 X${x} Y${y} Z${z}`);
    this.pos = [x, y, z];
  }

  moveRetract(x, y, z) {
    x = this.fixNum(x);
    y = this.fixNum(y);
    z = this.fixNum(z);
    this.cmd(`G1 E${-1 * this.retract}`);
    this.cmd(`G0 X${x} Y${y} Z${z} E0`);
    this.cmd(`G1 E${this.retract}`);
    this.pos = [x, y, z];
  }

  extrude_rel() {
    this.cmd("M83");
  }

  setFeedrate(feedRate) {
    this.cmd(`G0 F${this.sec_to_min(feedRate)}`);
  }

  addComment(comment) {
    this.program[this.program.length - 1] += ` ; ${comment}`;
  }

  setTemp(temp) {
    this.cmd(`M104 S${temp}`);
  }

  setFan(fan) {
    this.cmd(`M106 S${fan}`);
  }

  fanOn() {
    this.cmd("M106");
  }

  fanOff() {
    this.cmd("M107");
  }

  zInc(hop = 0.2) {
    let feed_rate = this.sec_to_min(this.speeds["layer_up"]);
    this.pos[2] = this.fixNum(this.pos[2] + hop);
    this.cmd(`G0 F${feed_rate} Z${this.pos[2]}`);
    this.setFeedrate(this.speeds["wall_outer"]);
  }

  gcode() {
    return this.program.join("\n");
  }
}
