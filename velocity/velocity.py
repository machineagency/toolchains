import numpy as np
import math

ender_start = """
; Ender 3 Custom Start G-code
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
G1 F1500 E-6.5
"""

ender_end = """G1 F1500 E201.24404
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
M104 S0"""


class Printer:
    def __init__(self, nozzleRadius=0.4/2, filamentRadius=1.75/2, retract=6.5):
        self.pos = [0, 0, 0]
        self.nozzleRadius = nozzleRadius
        self.filamentRadius = filamentRadius
        self.retract = retract
        self.program = []
        self.speeds = {
            "layer_up": 125,
            "wall_outer": 10,
            "travel": 150,
            "initial": 20
        }

    def sec_to_min(self, val):
        return val*60

    def dist(self, newPos):
        dx = abs(newPos[0] - self.pos[0])
        dy = abs(newPos[1] - self.pos[1])
        dz = abs(newPos[2] - self.pos[2])
        dxy = math.sqrt(dx**2 + dy**2)
        dxyz = math.sqrt(dxy**2 + dz**2)
        return dxyz

    def calc_extrude(self, newPos):
        filament_ratio = self.nozzleRadius / self.filamentRadius
        return self.dist(newPos) * filament_ratio**2

    def cmd(self, command):
        self.program.append(command)

    def moveExtrude(self, x, y, z=None, e=None):
        if not z:
            z = self.pos[2]
        if not e:
            e = self.calc_extrude([x, y, z])
        x = round(x, 3)
        y = round(y, 3)
        z = round(z, 3)
        e = round(e, 3)
        self.cmd(f"G1 X{x} Y{y} Z{z} E{e}")
        self.pos = [x, y, z]

    def extrude_xy(self, x, y, e=None):
        if not e:
            e = self.calc_extrude([x, y, self.pos[2]])
        x = round(x, 3)
        y = round(y, 3)
        e = round(e, 3)
        self.cmd(f"G1 X{x} Y{y} E{e}")
        self.pos = [x, y, self.pos[2]]

    def fan_on(self):
        self.cmd("M106")

    def fan_off(self):
        self.cmd("M107")

    def move(self, x, y, z):
        x = round(x, 3)
        y = round(y, 3)
        z = round(z, 3)
        self.cmd(f"G0 X{x} Y{y} Z{z}")  # move
        self.pos = [x, y, z]

    def dwell(self, time):
        # time in ms
        self.cmd(f"G4 P{time}")

    def moveRetract(self, x, y, z):
        x = round(x, 3)
        y = round(y, 3)
        z = round(z, 3)
        self.cmd(f"G1 E{-1*self.retract}")  # retract
        self.cmd(f"G0 X{x} Y{y} Z{z} E0")  # move
        self.cmd(f"G1 E{self.retract}")  # prime
        self.pos = [x, y, z]

    def extrude_rel(self):
        self.cmd("M83")

    def feed_rate(self, feed_rate):
        new_feed = self.sec_to_min(feed_rate)

        self.cmd(f"G0 F{new_feed}")

    def flowPercentage(self, percentage):
        self.cmd(f"M221 S{percentage}")

    def comment(self, comment):
        self.program[-1] += f" ; {comment}"

    def set_temp(self, temp):
        self.cmd(f"M104 S{temp}")

    def set_fan(self, fan_speed):
        self.cmd(f"M106 S{fan_speed}")

    def z_hop(self, hop=0.2):
        feed_rate = self.sec_to_min(self.speeds["layer_up"])
        self.pos[2] += hop
        self.cmd(f"G0 F{feed_rate} Z{self.pos[2]}")
        self.feed_rate(self.speeds["wall_outer"])

if __name__ == "__main__":
    r = 10  # 10mm
    layer_height = 0.2  # mm
    num_layers = 25  # 10mm
    center = [100, 100]
    speed_low = 6
    speed_high = 50

    p = Printer()

    p.cmd(ender_start)
    p.extrude_rel()


    z_current = layer_height

    for layer in range(num_layers):
        if (layer == 0):
            p.fan_off()
            p.comment("fan off")
            p.move(center[0] + r, center[1], z_current)
            p.comment("move to circle start")
            p.cmd("G1 F1500 E6.5") #prime nozzle
            p.set_temp(215)
            p.feed_rate(p.speeds["wall_outer"])

        if (layer == 1):
            p.set_fan(85)
            p.feed_rate(p.speeds["wall_outer"])

        if (layer == 2):
            p.set_fan(170)

        if (layer == 3):
            p.set_fan(255)

        angles = np.linspace(0, 2 * math.pi, 60)

        for i, theta in enumerate(angles[1:]):
            if layer>5:
                if (i==0):
                    p.feed_rate(speed_high)
                if (i==10):
                    p.feed_rate(speed_low)
                if (i==20):
                    p.feed_rate(speed_high)

            x = r * np.cos(theta) + center[0]
            y = r * np.sin(theta) + center[1]
            p.extrude_xy(x, y)

        p.z_hop()
        z_current += layer_height

    p.cmd(ender_end)

    f = open("vase.gcode", "w")
    f.write("\n".join(p.program))
    f.close()
