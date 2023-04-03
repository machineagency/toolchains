import numpy as np
import math

# write code to generate vase gcode
# write code to change extrusion rate based on ??
# change extrusion rate based on input image


start_snippet = """M82
G92 E0
G28
M104 S175
M190 S60
M109 S200
G1 Z2.0 F3000
G1 X0.1 Y20 Z0.3 F5000.0
G1 X0.1 Y200.0 Z0.3 F1500.0
G1 X0.4 Y200.0 Z0.3 F5000.0
G1 X0.4 Y20 Z0.3 F1500.0 E30
G92 E0
G1 Z2.0 F3000
G1 X5 Y20 Z0.3 F5000.0
G92 E0
G1 F1500 E-6.5
M107"""

end_snippet = """G1 F1500 E201.14919
M107
G91
G1 E-2 F2700
G1 E-2 Z0.2 F2400
G1 X5 Y5 F3000
G1 Z10
G90
G1 X0 Y220
M106 S0
M104 S0
M140 S0
M84 X Y E
M82
M104 S0"""

commands = {"extrudeRel": "M83"}
nozzleRadius = 0.4 / 2
filamentRadius = 1.75 / 2


class Velocity:
    def __init__(self):
        self.pos = [0, 0, 0]
        self.nozzleRadius = 0.4 / 2
        self.filamentRadius = 1.75 / 2
        self.program = []

    def dist(self, newPos):
        dx = abs(newPos[0] - self.pos[0])
        dy = abs(newPos[1] - self.pos[1])
        dz = abs(newPos[2] - self.pos[2])
        dxy = math.sqrt(dx**2 + dy**2)
        dxyz = math.sqrt(dxy**2 + dz**2)
        return dxyz

    def calc_extrude(self, newPos, multiplier):
        # todo: add thickness in here
        filament_ratio = self.nozzleRadius / self.filamentRadius
        extrude = self.dist(newPos) * filament_ratio**2
        ret = extrude + extrude * abs(multiplier)
        return ret

    def cmd(self, command):
        self.program.append(command)

    def moveExtrude(self, x, y, z, e):
        x = round(x, 3)
        y = round(y, 3)
        z = round(z, 3)
        e = round(e, 3)
        self.cmd(f"G1 X{x} Y{y} Z{z} E{e}")
        self.pos = [x, y, z]

    def move(self, x, y, z):
        x = round(x, 3)
        y = round(y, 3)
        z = round(z, 3)
        self.cmd(f"G1 X{x} Y{y} Z{z} E0")  # move
        self.pos = [x, y, z]

    def moveRetract(self, x, y, z):
        e = 8
        x = round(x, 3)
        y = round(y, 3)
        z = round(z, 3)
        self.cmd(f"G1 E{-1*e}")  # retract
        self.cmd(f"G1 X{x} Y{y} Z{z} E0")  # move
        self.cmd(f"G1 E{e}")  # prime
        self.pos = [x, y, z]


if __name__ == "__main__":
    r = 10  # 10mm
    layer_height = 0.2  # mm
    num_layers = 50  # 10mm
    center = [50, 50]

    vel = Velocity()

    vel.cmd(start_snippet)
    vel.cmd(commands["extrudeRel"])
    vel.cmd("G1 F1500 E0")

    z_current = layer_height

    for layer in range(num_layers):
        angles = np.linspace(0, 2 * math.pi, 60)  # make angles

        vel.move(center[0] + r, center[1], z_current)  # move to circle start

        for i, theta in enumerate(angles[1:]):
            x = r * np.cos(theta) + center[0]
            y = r * np.sin(theta) + center[1]
            if (i % 10) < 5:
                ex_ratio = 0
            else:
                ex_ratio = 3
            e = vel.calc_extrude([x, y, z_current], ex_ratio)
            vel.moveExtrude(x, y, z_current, e)

        z_current += layer_height

    vel.cmd(end_snippet)

    f = open("vase.gcode", "w")
    f.write("\n".join(vel.program))
    f.close()
