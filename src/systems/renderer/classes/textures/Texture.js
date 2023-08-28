import { Vec3,Vec4 } from "../../libs/matrix";

export class Texture {
  static DEFAULTS = {
    strength: 1,
    contrast: 1,
    hue: new Vec3(1),
    color: new Vec4(1),
    asset: false,
  };
  constructor(props) {
    Object.assign(this, { ...this, ...Texture.DEFAULTS, ...props });
  }
}
