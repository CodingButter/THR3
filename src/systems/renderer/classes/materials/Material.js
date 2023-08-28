import { Texture } from "../textures/Texture";
export class Material {
  static DEFAULTS = {
    textures:{
    diffuse: new Texture(),
    specular: new Texture(),
    glossiness: new Texture(),
    roughness: new Texture(),
    }
  };
  constructor(props) {
    Object.assign(this, { ...this, ...Material.DEFAULTS, ...props });
  }
}
