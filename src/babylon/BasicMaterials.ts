import { ActionManager, Color3, PBRMaterial, RenderingManager, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import { boundingBoxRendererVertexShader } from "@babylonjs/core/Shaders/boundingBoxRenderer.vertex";

export class BasicMaterials {
  MAP_WIDTH = 20;
  MAP_DEPTH = 100;
  WALL_WIDTH = 1;
  WALL_HEIGHT = 15;

  scene: BABYLON.Scene;
  engine: BABYLON.Engine; 

  constructor(private canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.CreateController(); 

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  
  
  
  
  CreateController(): void {
    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    camera.attachControl();
    camera.position = new BABYLON.Vector3(0, 5, -(this.MAP_DEPTH / 2) + 10);

    const observer = camera.getScene().onKeyboardObservable.add((action) => {
      if (action.type === 1 && action.event.code === 'Space') {
        if (camera.position.y <= 8) {
          camera.cameraDirection.y += 0.5; 
        }
      }
    })
    
    //enables collisions and gravity
    camera.applyGravity = true; 
    camera.checkCollisions = true; 

    //creates an ellipsoid around camera object for collision detection
    camera.ellipsoid = new Vector3(1,1,1); 

    camera.minZ = 0.4;
    camera.speed = 0.4; 
    camera.angularSensibility = 4000; 

    camera.keysLeft.push(65);
    camera.keysRight.push(68);
    camera.keysUp.push(87);
    camera.keysDown.push(83); 
  }

  
  
  
  
  
  
  CreateScene(): BABYLON.Scene {
    const spawn = -(this.MAP_DEPTH / 2) + 10; 
    const scene = new BABYLON.Scene(this.engine);

    //move camera without keeping left click on
    scene.onPointerDown = (event) => {
      if (event.button === 0) this.engine.enterPointerlock(); 
      if (event.button === 1) this.engine.exitPointerlock(); 
    }

    //creating gravity
    //applied along the y axis
    //fps used to create a smooth descent
    const fps = 60; 
    const gravConst = -9.81; 
    scene.gravity = new Vector3(0, gravConst / fps, 0); 
    scene.collisionsEnabled = true; 

    /*
    const sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere1",
      { diameter: 1 },
      this.scene
    );
    sphere.position = new BABYLON.Vector3(0, 1, 0);
    sphere.material = this.CreateSphereMaterial();
    */

    const light = new BABYLON.PointLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 1;
    light.position = new BABYLON.Vector3(0,10,0);

    
    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground1",
      { width: this.MAP_WIDTH, height: this.MAP_DEPTH },
      this.scene
    );
    ground.material = this.CreateMagic();
    ground.checkCollisions = true; 

    /*
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
    geo1.material = this.CreateSphereMaterial(); 
    */

    /*
    const geo2 = BABYLON.MeshBuilder.CreateGeodesic(
        "geo2",
        {
            m: 1,
            n: 0,
            size: 2,
            updatable: true
        },
        this.scene
    )
    geo2.position = new BABYLON.Vector3(5, 5, 12.5); 
    geo2.material = this.CreateSphereMaterial(); 
    */



    const spawnBox = BABYLON.MeshBuilder.CreateBox(
      "spawnBox",
      {
        height: 0.5,
        width: 5,
        depth: 5,
        updatable: true
      },
      this.scene
    );
    spawnBox.position = new BABYLON.Vector3(0,2,spawn);
    spawnBox.material = this.CreateSphereMaterial(); 
    spawnBox.checkCollisions = true;

    
 
    
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

      for (let i = 0; i < walls.length; i++) {
        walls[i].checkCollisions = true; 
      }
    


    const platforms: BABYLON.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      platforms[i] = BABYLON.MeshBuilder.CreateBox("rotateBox",
      {
          height: 0.5,
          width: 7.5,
          depth: 2,
          updatable: true
      },
      this.scene
  );
      platforms[i].position = new BABYLON.Vector3(0,2, spawn + ((i + 1) * 8)); 
      platforms[i].material = this.CreateSphereMaterial(); 
      platforms[i].checkCollisions = true; 

      platforms[i].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
      platforms[i].rotation.y -= 0.01;
    });
    }

    
    
    
    
    
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

    
    
    
    
    
    
    
    
    
    /*
    rotateBox.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
      rotateBox.rotation.y -= 0.01;
    });

    geo1.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        geo1.rotation.y -= 0.01;
        geo1.rotation.x -= 0.01;
    }); 

    geo2.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        geo2.rotation.y -= 0.01;
        geo2.rotation.x -= 0.01;
    }); 

    rotateBox2.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
      rotateBox2.rotation.x -= 0.01;
    });
    */

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



  CreateMagic(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene); 

    pbr.albedoTexture = new Texture("./textures/magic/lava_albedo.png", this.scene);
    pbr.bumpTexture = new Texture("./textures/magic/lava_normal.png", this.scene);

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 

    pbr.emissiveColor = new Color3(1,1,1); 
    pbr.emissiveTexture = new Texture("./textures/magic/lava_emissive.png", this.scene); 

    pbr.roughness = 1; 

    return pbr; 
  }

  
  
  
  
  CreatePlankMaterial(): StandardMaterial {
    const plankMaterial = new StandardMaterial("plankMaterial", this.scene);
    const uvScale = 4;
    const texArr: Texture[] = [];

    const diffuseTex = new Texture(
      "./textures/planks/plank_diffuse.jpg",
      this.scene
    );
    plankMaterial.diffuseTexture = diffuseTex;
    texArr.push(diffuseTex);

    const normalTex = new Texture(
      "./textures/planks/plank_normal.jpg",
      this.scene
    );
    plankMaterial.bumpTexture = normalTex;
    texArr.push(normalTex);

    const aoTex = new Texture("./textures/planks/plank_ao.jpg", this.scene);
    plankMaterial.ambientTexture = aoTex;
    texArr.push(aoTex);

    const specTex = new Texture("./textures/planks/plank_spec.jpg", this.scene);
    plankMaterial.specularTexture = specTex;
    texArr.push(specTex);

    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return plankMaterial;
  }
}
