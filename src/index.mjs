
import {
  Renderer,
  PerspectiveCamera,
  Scene,
  CubeGeometry,
  MeshBasicMaterial,
  Mesh,
  libs,
} from "./systems/renderer/THR3";
import { Vec3 , Vec4 } from "./systems/renderer/libs/matrix";
//const objPath ="https://raw.githubusercontent.com/CodingButter/electron-r3f-titan-engine/main/public/assets/10680_Dog_v2.obj";
const objPath = "https://upnow-prod.ff45e40d1a1c8f7e7de4e976d0c9e555.r2.cloudflarestorage.com/f5EfD7wiXfWVEUwgIa3mSvR59PU2/af4c4b9c-8ea3-42ca-b203-acd63d98739f?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cdd12e35bbd220303957dc5603a4cc8e%2F20230828%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20230828T013358Z&X-Amz-Expires=43200&X-Amz-Signature=adfc23e111e4c4d0c298c3211cc17dea38ca7a55ae5112a2ac1abb0f0606d1bf&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22WWI_Pilot_bust.obj%22";
const loader = new libs.loaders.OBJLoader();
loader.load(objPath, (dog) => {

  console.log(dog)
  const scene = new Scene();
  const renderer = new Renderer({ clear_color: "black", context: "2d" });
  const camera = new PerspectiveCamera({ position: new Vec3(0,1,-7) });
  //const material = new MeshBasicMaterial();
  dog.material.textures.diffuse.color = new Vec4(1, 0, 0, 1);

  dog.scale.set(.5)
  scene.add(dog)
  dog.rotation.x = Math.PI / 2;
  function render() {
    // dog.rotation[0] = (Date.now() * 0.0001) % (2 * Math.PI);
    dog.rotation.y = (Date.now() * 0.001) % (2 * Math.PI);
    // dog.rotation[2] = (Date.now() * 0.0001) % (2 * Math.PI);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
})
