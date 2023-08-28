import { Vec2, Vec3 } from "../libs/matrix";
import { Triangle } from "../classes/geometries/Triangle";
export class Renderer {
  static DEFAULTS = {
    clear_color: "white",
    context: "2d",
    title: "A Game",
    fps: 30,
    parent: document.body,
    size: { width: 1200, height: 800 },
  };

  constructor(props) {
    const { title, parent, clear_color, context, fps, size } = {
      ...Renderer.DEFAULTS,
      ...props,
    };
    this.title = document.title = title;
    this.parent = parent;
    this.fps = fps;
    this.clear_color = clear_color;
    this.context = context;
    this.is_running = false;
    this.can_render = true;
    this.last_time = 0;
    this.canvas = document.createElement("canvas");
    this.canvas.width = size.width;
    this.canvas.height = size.height;
    this.center = new Vec2(this.canvas.width / 2, this.canvas.height / 2);
    this.canvas.style.width = `100%`;
    this.canvas.style.height = `100%`;
    this.parent.appendChild(this.canvas);
    this.pencil = this.canvas.getContext(context);
    this.pencil.lineWidth = 1;
  }

  /**
   * Render Scene
   * @description: Renders a given scene from the view of a camera
   * @returns: void
   */

  transform_points(mesh, camera) {
    const triangles = [];
    mesh.geometry.faces.forEach((face) => {
      const points = [];
      face.forEach((point_index) => {
        const v = mesh.geometry.vertices[point_index[0] - 1];
        var transformed_point = v.clone();
        /*-------------------------------------------
        // Rotate The Points
        ---------------------------------------------*/
        transformed_point.rotateX([1, 0, 0], mesh.rotation.x);
        transformed_point.rotateY([0, 1, 0], mesh.rotation.y);
        
        transformed_point.rotateZ([0, 0, 1], mesh.rotation.z);
        /*--------------------------------------------------------
        -- Scale and Translate
        ---------------------------------------------------------*/
        transformed_point.mul(mesh.scale);
        //console.log(JSON.stringify(transformed_point.values,null,2))
        transformed_point.add(mesh.position);
        transformed_point.x -= camera.position.x;
        transformed_point.y += camera.position.y;
        transformed_point.z -= camera.position.z;

        points.push(transformed_point);
      });

      //console.log(points)
      const triangle = new Triangle(...points);
      if (this.is_facing_camera(triangle, camera)) {
        triangles.push(triangle);
      }
    });
    return triangles;
  }

  project_triangles(triangles) {
    triangles.forEach((triangle) => {
      triangle.points.forEach((point) => {
        point[0] = this.center[0] + (point[0] / point[2]) * 100;
        point[1] = this.center[1] + (point[1] / point[2]) * 100;
      });
    });
    return triangles;
  }

  is_facing_camera(triangle, camera) {
    const vector_a = triangle.points[0];
    const vector_b = triangle.points[1];
    const vector_c = triangle.points[2];
    const vector_ab = Vec3.sub(vector_a, vector_b);
    const vector_ac = Vec3.sub(vector_a, vector_c);

    // compute the face normal (using the cross product to find perpendicular)
    const normal = Vec3.cross(vector_ab, vector_ac);
    Vec3.normalize(normal);
    // find the vector between a point in the triangle and the camera origin
    const center_point = Vec3.add(vector_a, vector_b);
    center_point.add(vector_c);
    center_point.div(center_point.size);
    const camera_ray = Vec3.sub(camera.position, center_point);
    camera_ray.normalize();
    const dot_normal_camera = normal.dot(camera_ray);
    return dot_normal_camera > 0;
  }

  render(scene, camera) {
    this.pencil.fillStyle = "black";
    this.pencil.fillRect(0, 0, this.canvas.width, this.canvas.height);
    //this.pencil.strokeStyle = "yellow";
    scene.meshes.forEach((mesh) => {
      const color = mesh.material.textures.diffuse.color;
      this.pencil.strokeStyle = `rgba(${color.r * 255},${color.g * 255},${color.b * 255
        },${color.a * 255})`;
      const transformed_triangles = this.transform_points(mesh, camera);
      const projected_triangles = this.project_triangles(transformed_triangles);
      this.renderTriangle(projected_triangles);
    });
  }

  renderTriangle(triangles) {
    this.renderEdges(triangles);
  }

  renderEdges(triangles) {
    triangles?.forEach((triangle) => {
      this.pencil.beginPath();
      const point = triangle.points[0];
      this.pencil.moveTo(point.x, point.y);
      for (var i = 1; i < triangle.points.length; i++){
        const point = triangle.points[i];
        this.pencil.lineTo(point.x, point.y);
      }
      this.pencil.lineTo(point.x, point.y);

      this.pencil.stroke();
      this.pencil.closePath();
    });
  }
}
