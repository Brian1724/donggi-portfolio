"""Run in background Blender with the source blend open; never saves the source."""
import bpy
import math
import sys
from pathlib import Path

output = Path(sys.argv[sys.argv.index('--') + 1]).resolve()
output.parent.mkdir(parents=True, exist_ok=True)
scene = bpy.context.scene
objects = [o for o in scene.objects if o.type in {'MESH', 'FONT'} or o.name.startswith('LCD Hinge')]
bpy.ops.object.select_all(action='DESELECT')
for obj in objects:
    obj.hide_set(False)
    obj.hide_viewport = False
    obj.select_set(True)

# Convert evaluated geometry individually, keeping the original parent transforms.
for obj in objects:
    if obj.type not in {'MESH', 'FONT'}:
        continue
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.convert(target='MESH')

scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 8
scene.render.bake.use_selected_to_active = False
scene.render.bake.normal_space = 'TANGENT'
scene.render.bake.margin = 8
rubber = [o for o in objects if o.type == 'MESH' and any(m and m.name.startswith('Rubber') for m in o.data.materials)]
for index, obj in enumerate(rubber):
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(island_margin=0.025)
    bpy.ops.object.mode_set(mode='OBJECT')
    material = obj.data.materials[0].copy()
    obj.data.materials[0] = material
    image = bpy.data.images.new(f'Rubber_normal_{index}', width=512, height=512, alpha=False)
    image.colorspace_settings.name = 'Non-Color'
    nodes = material.node_tree.nodes
    target = nodes.new('ShaderNodeTexImage')
    target.image = image
    nodes.active = target
    target.select = True
    bpy.ops.object.bake(type='NORMAL')
    principled = next(n for n in nodes if n.type == 'BSDF_PRINCIPLED')
    normal = nodes.new('ShaderNodeNormalMap')
    material.node_tree.links.new(target.outputs['Color'], normal.inputs['Color'])
    material.node_tree.links.new(normal.outputs['Normal'], principled.inputs['Normal'])
    image.pack()

for name, role in [('LCD Hinge | swing about Z', 'swing'), ('LCD Hinge | swivel about X', 'swivel')]:
    obj = bpy.data.objects[name]
    obj.rotation_euler = (0, 0, 0)
    obj['lcdRole'] = role
    obj['openAngle'] = math.pi

bpy.ops.object.select_all(action='DESELECT')
for obj in objects:
    obj.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(output), export_format='GLB', use_selection=True,
    export_apply=True, export_extras=True, export_cameras=False, export_lights=False,
    export_animations=False, export_yup=True)
print(f'EXPORTED {output} ({output.stat().st_size} bytes); {len(objects)} nodes, {len(rubber)} baked rubber surfaces')
