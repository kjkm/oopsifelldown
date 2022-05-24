import { ActionManager, Color3, PBRMaterial, RenderingManager, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import { boundingBoxRendererVertexShader } from "@babylonjs/core/Shaders/boundingBoxRenderer.vertex";

export class BasicMaterials {
  MAP_WIDTH = 50;
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

    const light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 1;
    //light.position = new BABYLON.Vector3(0,10,0);

    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground1",
      { width: this.MAP_WIDTH, height: this.MAP_DEPTH },
      this.scene
    );
    light.excludedMeshes.push(ground); 
    var groundMaterial = new BABYLON.StandardMaterial("groundTexture", this.scene); 
    groundMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/stars.jpg", this.scene);
    ground.material = groundMaterial; 
    ground.checkCollisions = true;

   
    const cylinder = BABYLON.MeshBuilder.CreateCylinder(
        "Cylinder",
        {height: this.MAP_DEPTH - 30, diameter : 20},
        this.scene
    ); 
    
    
      const skybox = BABYLON.MeshBuilder.CreateBox(
      "skyBox",
      { size: 1000.0 },
      this.scene
    );
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      "./textures/skyBox/space.jpg",
      this.scene
    );
    skyboxMaterial.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
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

  
  
  
  
  CreateWallMaterial(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene); 
    const uvScale = 2.5;
    const texArr: Texture[] = [];

    const albedoTex = new Texture("./textures/rust/wall_basecolor.png", this.scene);
    pbr.albedoTexture = albedoTex; 
    texArr.push(albedoTex); 
    const bumpTex = new Texture("./textures/rust/wall_normal.png", this.scene);
    pbr.bumpTexture = bumpTex; 
    texArr.push(bumpTex); 

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 

    pbr.metallicTexture = new Texture("./textures/rust/wall_metallic.png", this.scene); 

    pbr.roughness = 1; 

    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return pbr; 
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



  CreatePlatform(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene); 

    pbr.albedoTexture = new Texture("./textures/magic/platform_basecolor.png", this.scene);
    pbr.bumpTexture = new Texture("./textures/magic/platform_normal.png", this.scene);
    pbr.metallicTexture = new Texture("./textures/magic/platform_metallic.png", this.scene);

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 

    pbr.emissiveColor = new Color3(1,1,1); 
    pbr.emissiveTexture = new Texture("./textures/magic/platform_emissive.png", this.scene); 

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
