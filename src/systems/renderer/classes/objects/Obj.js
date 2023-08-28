import { Vec3 } from "../../libs/matrix";
export class Obj {
  static DEFAULTS = {
    position: new Vec3(),
    rotation: new Vec3(),
    scale: new Vec3(1),
  };
  constructor(props) {
    Object.assign(this, { ...this, ...Obj.DEFAULTS, ...props });
  }
}
