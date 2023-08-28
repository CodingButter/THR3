export class Scene {
  constructor() {
    this._meshes = new Set();
  }
  add(mesh) {
    this._meshes.add(mesh);
  }

  get meshes() {
    return [...this._meshes];
  }
}
