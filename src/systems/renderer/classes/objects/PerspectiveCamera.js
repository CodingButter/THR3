import { Obj } from "./Obj";
export class PerspectiveCamera extends Obj {
  static DEFAULTS = {
    fov: 76,
  };
  constructor(props) {
    super(props);
    Object.assign(this, { ...this, ...PerspectiveCamera.DEFAULTS, ...props });
  }
}
