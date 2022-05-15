import * as BABYLON from "@babylonjs/core";
import { MarchingCubes } from "./MarchingCubes";

export class BasicScene {
  MAP_WIDTH = 100;
  MAP_DEPTH = 100;
  WALL_WIDTH = 1;
  WALL_HEIGHT = 15;

  scene: BABYLON.Scene;
  engine: BABYLON.Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): BABYLON.Scene {
    // Camera configuration
    const scene = new BABYLON.Scene(this.engine);
    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    camera.attachControl();
    camera.position = new BABYLON.Vector3(0, 1, -10);

    //create ground and light
    const light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 0.5;

    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground1",
      { width: this.MAP_WIDTH, height: this.MAP_DEPTH },
      this.scene
    );

    // Create a sphere
    var sphereMaterial = new BABYLON.StandardMaterial("mat", scene);
    sphereMaterial.backFaceCulling = true;
    sphereMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
    sphereMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.PLANAR_MODE;
    sphereMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    sphereMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    

    const sphere: BABYLON.Mesh[] = [];
    sphere[0] = BABYLON.MeshBuilder.CreateSphere("sphere0", { diameter: 1 }, this.scene);
    sphere[0].position = new BABYLON.Vector3(-2, 2, 0);
    sphere[0].material = sphereMaterial;
    sphere[1] = BABYLON.MeshBuilder.CreateSphere("shape", {diameter: 2}, this.scene);
    sphere[1].position = new BABYLON.Vector3(0, 2, 0);
    sphere[1].material = sphereMaterial;	
    sphere[2] = BABYLON.MeshBuilder.CreateSphere("shape", {diameter: 1}, this.scene);
    sphere[2].position = new BABYLON.Vector3(2, 2, 0);
    sphere[2].material = sphereMaterial;


    sphere[0].setParent(sphere[1]);
    sphere[0].setPivotMatrix(BABYLON.Matrix.Translation(4, 0, 0), false);
    sphere[1].setPivotMatrix(BABYLON.Matrix.Translation(3, 0, 0), false);
    sphere[2].setParent(sphere[1]);
    sphere[2].setPivotMatrix(BABYLON.Matrix.Translation(-4, 0, 0), false);

    sphere[0].material.diffuseColor = new BABYLON.Color3(0.9, 0.7, 0.2);
    sphere[0].material.specularColor = new BABYLON.Color3(0, 0.5, 1);

    const walls: BABYLON.Mesh[] = [];
    walls[0] = BABYLON.MeshBuilder.CreateBox(
      "wall1",
      {
        height: this.WALL_HEIGHT,
        width: this.MAP_WIDTH,
        depth: this.WALL_WIDTH,
      },
      this.scene
    );
    walls[0].position = new BABYLON.Vector3(
      0,
      0,
      this.MAP_DEPTH / 2 - this.WALL_WIDTH / 2
    );
    walls[1] = BABYLON.MeshBuilder.CreateBox(
      "wall2",
      {
        height: this.WALL_HEIGHT,
        width: this.WALL_WIDTH,
        depth: this.MAP_DEPTH,
      },
      this.scene
    );
    walls[1].position = new BABYLON.Vector3(
      this.MAP_WIDTH / 2 - this.WALL_WIDTH / 2,
      0,
      0
    );
    walls[2] = BABYLON.MeshBuilder.CreateBox(
      "wall3",
      {
        height: this.WALL_HEIGHT,
        width: this.MAP_WIDTH,
        depth: this.WALL_WIDTH,
      },
      this.scene
    );
    walls[2].position = new BABYLON.Vector3(
      0,
      0,
      -this.MAP_DEPTH / 2 + this.WALL_WIDTH / 2
    );
    walls[3] = BABYLON.MeshBuilder.CreateBox(
      "wall4",
      {
        height: this.WALL_HEIGHT,
        width: this.WALL_WIDTH,
        depth: this.MAP_DEPTH,
      },
      this.scene
    );
    walls[3].position = new BABYLON.Vector3(
      -this.MAP_WIDTH / 2 + this.WALL_WIDTH / 2,
      0,
      0
    );

    const skybox = BABYLON.MeshBuilder.CreateBox(
      "skyBox",
      { size: 1000.0 },
      this.scene
    );
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      "textures/skybox",
      this.scene
    );
    skyboxMaterial.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    //const pomegranate = BABYLON.SceneLoader.Append("", "scenes/models/marble_bust/marble_bust_01_1k.babylon", this.scene)!;

    const surface = new MarchingCubes(this.scene, new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(32, 32, 32), 32, false);
    surface.Polygonize((x: number, y: number, z: number) => {
      return (x-8) ** 2 + (y-8) ** 2 + (z-8) ** 2;
    }, 64);
    const union = BABYLON.Mesh.MergeMeshes(surface.meshes)!;
    union.material = sphereMaterial;
    union.position.y = 0.5;
    union.position.x = 0;
    union.position.z = 0;


    scene.registerBeforeRender(function () {
      sphere[0].rotation.y += 0.01;
      sphere[1].rotation.y += 0.01;
      sphere[2].rotation.y += 0.01;
    });

    return scene;
  }
}
