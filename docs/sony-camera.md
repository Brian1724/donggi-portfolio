# Sony A7C II Web Model

Source: user-provided Sony_A7C_II.blend. The source is never saved or modified by the export script.

- Export: public/media/Sony_A7C_II.glb, 1,764,052 bytes, 30,080 triangles.
- 95 meshes and two LCD hinge nodes; labels converted to geometry.
- Evaluated bevels and weighted normals retained. No added modeling detail.
- Four rubber surfaces have 512px tangent-space normal maps baked from their procedural bump shaders; textures are embedded.
- Reference image empties, lights, and the render camera are excluded.
- Blender Z-axis swing becomes glTF Y; the nested X-axis swivel remains X. Both open by 180 degrees, sequentially.
- Preview is a WebP conversion of the supplied render, used while loading and on failure.
- Three.js presents the camera as an editorial object study with no visible viewer controls.
- Rendering is on demand and stops offscreen. Pixel ratio is capped at 1.5. Scroll changes the viewing angle by five degrees total; reduced-motion keeps it still.

Re-export with Blender in background mode, source file open, using `--python scripts/export-sony-camera.py -- public/media/Sony_A7C_II.glb`.
Validate the artifact with `node scripts/check-camera-model.mjs`.
