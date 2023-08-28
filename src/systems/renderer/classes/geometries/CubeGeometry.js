
import { Geometry } from "./Geometry";
import { Vec3 } from "../../libs/matrix";

const verts = [
  /* 1 */ new Vec3(-1, 1, -1), //Front->Top->Left
  /* 2 */ new Vec3(1, 1, -1), //Front->Top->Right
  /* 3 */ new Vec3(-1, -1, -1), //Front->Bottom->Left
  /* 4 */ new Vec3(1, -1, -1), //Front->Bottom->Right

  /* 5 */ new Vec3(-1, 1, 1), //Back->Top->Right -- mirror left
  /* 6 */ new Vec3(1, 1, 1), //Back->Top->Left -- mirror right
  /* 7 */ new Vec3(-1, -1, 1), //Back->Bottom->Right -- mirror left
  /* 8 */ new Vec3(1, -1, 1), //Back->Bottom->Left -- mirror right
];

const faces = [
  //Front Faces
  [new Vec3(1, 2, 3)], //top-left
  [new Vec3(2, 4, 3)], //bottom-right
  //Back Faces
  [new Vec3(5, 6, 7)], //top-right
  [new Vec3(6, 8, 7)], //bottom-left
  //Left Faces
  [new Vec3(1, 3, 7)], //bottom-right
  [new Vec3(1, 7, 5)], //top-left
  //Right Faces
  [new Vec3(2, 8, 4)], //top-left
  [new Vec3(2, 6, 8)], //bottom-right
  //Top Faces
  [new Vec3(2, 1, 6)], //top-left
  [new Vec3(1, 5, 6)], //bottom-right
  //Bottom Faces
  [new Vec3(3, 4, 7)], //top-left
  [new Vec3(4, 8, 7)], //bottom-right
];
export class CubeGeometry extends Geometry {
  constructor(width = 1, height = 1, depth = 1) {
    const vertices = verts.map((v) => {
      return Vec3.mul(
        v,
        new Vec3(width / 2, height / 2, depth / 2)
      );
    });
    super({ vertices, faces });
  }
}
