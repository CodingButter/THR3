import { Loader } from "./Loader";
import { Mesh } from "../../classes/objects/Mesh";
import { Vec3 } from "../matrix";
import { Geometry } from "../../classes/geometries/Geometry";

export class OBJLoader extends Loader {
  load(path, callback) {
    fetch(path)
      .then(async (response) => response.text())
      .then((data) => {
        const obj = this.buildOBJ(data);
        callback(obj);
      });
  }
  buildOBJ(data) {
    const lines = data.split("\n");
    const geometry = this.buildGeometry(lines);
    return new Mesh({ geometry })
  }
  getObjects(data) {
    const objectsSections = data.split("o ");
    return objectsSections.map((objectSection) => {
      const lines = objectSection.split("\n")
      return this.buildGeometry(lines)
    })
  }
  buildGeometry(lines) {
    const vertices = this.parseVertices(lines);
    const normals = this.parseNormals(lines);
    const text_coords = this.parseTextCoords(lines);
    const faces = this.parseFaces(lines)
    return new Geometry({ vertices, text_coords, faces, normals });
  }
  parseNormals(lines) {
    return lines
      .filter((line) => line.startsWith("vn "))
      .map((nLine) => {
        const parts = nLine.replace("vn ", "").trim().split(" ");
        return new Vec3(parts[0], parts[1], parts[2]);
      });
  }
  parseTextCoords(lines) {
    return lines
      .filter((line) => line.startsWith("vt "))
      .map((vtLine) => {
        const parts = vtLine.replace("vn ", "").trim().split(" ");
        return new Vec3(parts[0], parts[1], parts[2]);
      });
  }
  parseVertices(lines) {
    return lines
      .filter((line) => line.startsWith("v "))
      .map((vLine) => {
        const parts = vLine.replace("v ", "").trim().split(" ");
        return new Vec3(parts[0], parts[1], parts[2]);
      });
  }
  parseFaces(lines) {
    return lines.filter((line) => line.startsWith("f ")).map((fLine) => {
      const face = []
      const faceSlashes = fLine.replace("f ", "").trim().split(" ");
      
      faceSlashes.forEach((slashes) => {
        const vt = slashes.split("/")
        face.push([
          parseInt(vt[0]), // Vertex index
          parseInt(vt[1]), // text coords index
          parseInt(vt[2]), // vt normals index
        ]);
      })
      return face;
    })
  }

}
