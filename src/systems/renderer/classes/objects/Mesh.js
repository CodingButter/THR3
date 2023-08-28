import { Obj } from "./Obj";
import { CubeGeometry } from "../geometries/CubeGeometry";
import { MeshBasicMaterial } from "../materials/MeshBasicMaterial";

export class Mesh extends Obj {
  static DEFAULTS = {
    geometry: new CubeGeometry(),
    material: new MeshBasicMaterial(),
  };
  constructor(props) {
    super(props);
    Object.assign(this, { ...this, ...Mesh.DEFAULTS, ...props });
  }
}
