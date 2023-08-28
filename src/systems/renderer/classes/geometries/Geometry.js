export class Geometry {
  static DEFAULTS = {
    vertices: [],
    normals:[],
    text_coords:[],
    faces: [],
  };
  constructor(props) {
    Object.assign(this, { ...this, ...Geometry.DEFAULTS, ...props });
  }
}
