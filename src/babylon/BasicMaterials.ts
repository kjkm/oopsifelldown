import { ActionManager, RenderingManager, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";

export class BasicMaterials {
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
    const scene = new BABYLON.Scene(this.engine);
    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    camera.attachControl();
    camera.speed = 0.25;

    const sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere1",
      { diameter: 1 },
      this.scene
    );
    sphere.position = new BABYLON.Vector3(0, 1, 0);
    camera.position = new BABYLON.Vector3(0, 1, -10);
    sphere.material = this.CreateSphereMaterial();

    const light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 1;

    
    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground1",
      { width: this.MAP_WIDTH, height: this.MAP_DEPTH },
      this.scene
    );
    ground.material = this.CreateGroundMaterial();

    
    const geo1 = BABYLON.MeshBuilder.CreateGeodesic(
        "geo1",
        {
            m: 1,
            n: 0,
            size: 2,
            updatable: true
        },
        this.scene
    )
    geo1.position = new BABYLON.Vector3(5, 5, 5); 


    const rotateBox = BABYLON.MeshBuilder.CreateBox(
        "rotateBox",
        {
            height: 0.5,
            width: 5,
            depth: 1,
            updatable: true
        },
        this.scene
    );
    rotateBox.position = new BABYLON.Vector3(2, 3, -5); 

   
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
    walls.forEach((tex) => {
        tex.material = this.CreateWallMaterial();
        tex.material = this.CreateWallMaterial();
      });
    

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
    //skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    return scene;
  }

  CreateGroundMaterial(): StandardMaterial {
    const groundMaterial = new StandardMaterial("groundMaterial", this.scene);
    const uvScale = 20;
    const texArr: Texture[] = [];

    const diffuseTex = new Texture(
      "./textures/brick/brick_diffuse.jpg",
      this.scene
    );
    groundMaterial.diffuseTexture = diffuseTex;
    texArr.push(diffuseTex);

    const normalTex = new Texture(
      "./textures/brick/brick_normal.jpg",
      this.scene
    );
    groundMaterial.bumpTexture = normalTex;
    texArr.push(normalTex);

    const aoTex = new Texture("./textures/brick/brick_ao.jpg", this.scene);
    groundMaterial.ambientTexture = aoTex;
    texArr.push(aoTex);

    const specTex = new Texture("./textures/brick/brick_spec.jpg", this.scene);
    groundMaterial.specularTexture = specTex;
    texArr.push(specTex);

    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return groundMaterial;
  }

  CreateSphereMaterial(): StandardMaterial {
    const sphereMaterial = new StandardMaterial("sphereMaterial", this.scene);
    const uvScale = 4;
    const texArr: Texture[] = [];

    const diffuseTex = new Texture(
      "./textures/metal/metal_diffuse.jpg",
      this.scene
    );
    sphereMaterial.diffuseTexture = diffuseTex;
    texArr.push(diffuseTex);

    const normalTex = new Texture(
      "./textures/metal/metal_normal.jpg",
      this.scene
    );
    sphereMaterial.bumpTexture = normalTex;
    sphereMaterial.invertNormalMapX = true;
    sphereMaterial.invertNormalMapY = true; 
    texArr.push(normalTex);

    const aoTex = new Texture("./textures/metal/metal_ao.jpg", this.scene);
    sphereMaterial.ambientTexture = aoTex;
    texArr.push(aoTex);

    const specTex = new Texture("./textures/metal/metal_spec.jpg", this.scene);
    sphereMaterial.specularTexture = specTex;
    texArr.push(specTex);

    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return sphereMaterial;
  }

  CreateWallMaterial(): StandardMaterial {
    const wallMaterial = new StandardMaterial("wallMaterial", this.scene);
    const uvScale = 4;
    const texArr: Texture[] = [];

    const diffuseTex = new Texture(
      "./textures/rust/rust_diffuse.jpg",
      this.scene
    );
    wallMaterial.diffuseTexture = diffuseTex;
    texArr.push(diffuseTex);

    const normalTex = new Texture(
      "./textures/rust/rust_normal.jpg",
      this.scene
    );
    wallMaterial.bumpTexture = normalTex;
    texArr.push(normalTex);

    const aoTex = new Texture("./textures/rust/rust_ao.jpg", this.scene);
    wallMaterial.ambientTexture = aoTex;
    texArr.push(aoTex);

    const specTex = new Texture("./textures/rust/rust_spec.jpg", this.scene);
    wallMaterial.specularTexture = specTex;
    texArr.push(specTex);

    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return wallMaterial;
  }
}
