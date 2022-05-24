import * as BABYLON from "@babylonjs/core";
import { Color3, CreateScreenshotUsingRenderTarget, MeshAssetTask, PBRMaterial, SceneLoader, Texture, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders";

export class SolarSystemScene {
  MAP_WIDTH = 200;
  MAP_DEPTH = 200;
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
    camera.position = new BABYLON.Vector3(0, 9, -(this.MAP_DEPTH / 2) + 10);

    const observer = camera.getScene().onKeyboardObservable.add((action) => {
      if (action.type === 1 && action.event.code === 'Space') {
        if (camera.position.y <= 11) {
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
    camera.speed = 0.7; 
    camera.angularSensibility = 4000; 

    camera.keysLeft.push(65);
    camera.keysRight.push(68);
    camera.keysUp.push(87);
    camera.keysDown.push(83);
  }

  
  
  CreateScene(): BABYLON.Scene {
    // Camera configuration
    const scene = new BABYLON.Scene(this.engine); 


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




    //enable physics
    scene.enablePhysics()

    //create ground and light
    const light = new BABYLON.PointLight(
      "light1",
      new BABYLON.Vector3(0, 5, 0),
      this.scene
    );
    light.intensity = 10; 

    const sunLight = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 10, 0),
      this.scene
    );
    light.intensity = 0.75; 

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

    var glow = new BABYLON.GlowLayer('glow', this.scene);
    const sphere: BABYLON.Mesh[] = []; 
    sphere[0] = BABYLON.MeshBuilder.CreateSphere("sun", {diameter: 10}, this.scene); 
    sphere[0].position = new BABYLON.Vector3(0, 5,0); 
    sphere[0].material = this.CreateSun(); 
    light.excludedMeshes.push(sphere[0]); 
    sphere[1] = BABYLON.MeshBuilder.CreateSphere("mercury", { diameter: 4 }, this.scene);
    sphere[1].position = new BABYLON.Vector3(10, 4, 0); 
    var mercuryMaterial = new BABYLON.StandardMaterial("mercuryTexture", this.scene);
    mercuryMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/mercury.jpg", this.scene);
    sphere[1].material = mercuryMaterial; 
    sphere[2] = BABYLON.MeshBuilder.CreateSphere("venus", { diameter: 4 }, this.scene);
    sphere[2].position = new BABYLON.Vector3(20, 4, 0); 
    var venusMaterial = new BABYLON.StandardMaterial("venusTexture", this.scene);
    venusMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/venus.jpg", this.scene);
    sphere[2].material = venusMaterial; 
    sphere[3] = BABYLON.MeshBuilder.CreateSphere("earth", { diameter: 4 }, this.scene);
    sphere[3].position = new BABYLON.Vector3(30, 4, 0); 
    var earthMaterial = new BABYLON.StandardMaterial("earthTexture", this.scene);
    earthMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/earth.jpg", this.scene);
    sphere[3].material = earthMaterial; 
    sphere[4] = BABYLON.MeshBuilder.CreateSphere("mars", { diameter: 4 }, this.scene);
    sphere[4].position = new BABYLON.Vector3(40, 4, 0); 
    var marsMaterial = new BABYLON.StandardMaterial("marsTexture", this.scene);
    marsMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/mars.jpg", this.scene);
    sphere[4].material = marsMaterial; 
    sphere[5] = BABYLON.MeshBuilder.CreateSphere("jupiter", { diameter: 8 }, this.scene);
    sphere[5].position = new BABYLON.Vector3(50, 4, 0); 
    var jupiterMaterial = new BABYLON.StandardMaterial("jupiterTexture", this.scene);
    jupiterMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/jupiter.jpg", this.scene);
    sphere[5].material = jupiterMaterial; 
    sphere[6] = BABYLON.MeshBuilder.CreateSphere("saturn", { diameter: 6 }, this.scene);
    sphere[6].position = new BABYLON.Vector3(65, 4, 0); 
    var saturnMaterial = new BABYLON.StandardMaterial("saturnTexture", this.scene);
    saturnMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/Saturn.jpg", this.scene);
    sphere[6].material = saturnMaterial; 
    sphere[7] = BABYLON.MeshBuilder.CreateSphere("uranus", { diameter: 4 }, this.scene);
    sphere[7].position = new BABYLON.Vector3(75, 4, 0); 
    var uranusMaterial = new BABYLON.StandardMaterial("uranusTexture", this.scene);
    uranusMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/uranus.jpg", this.scene);
    sphere[7].material = uranusMaterial; 
    sphere[8] = BABYLON.MeshBuilder.CreateSphere("neptune", { diameter: 4 }, this.scene);
    sphere[8].position = new BABYLON.Vector3(85, 4, 0); 
    var neptuneMaterial = new BABYLON.StandardMaterial("neptuneTexture", this.scene);
    neptuneMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/neptune.jpg", this.scene);
    sphere[8].material = this.CreateGlacial(); 


    const asteroids: BABYLON.Mesh[] = [];
    for (let i = 0; i < 72; i++) {
      const degrees = i * 5; 
      const rad = degrees * (Math.PI / 180); 
      asteroids[i] = BABYLON.MeshBuilder.CreateSphere("asteroid", {diameter: 0.15 * Math.random()}, this.scene);
      asteroids[i].position = new BABYLON.Vector3(65 + (3.5 * Math.sin(rad)), 4, 0 + (3.5 * Math.cos(rad)));
    }
    for (let i = 0; i < 72; i++) {
      const degrees = i * 5; 
      const rad = degrees * (Math.PI / 180); 
      const ast = BABYLON.MeshBuilder.CreateSphere("asteroid", {diameter: 0.15 * Math.random()}, this.scene); 
      ast.position = new BABYLON.Vector3(65 + (4 * Math.sin(rad)), 4, 0 + (4 * Math.cos(rad)));
      asteroids.push(ast); 
    }
    for (let i = 0; i < 72; i++) {
      const degrees = i * 5; 
      const rad = degrees * (Math.PI / 180); 
      const ast = BABYLON.MeshBuilder.CreateSphere("asteroid", {diameter: 0.15 * Math.random()}, this.scene); 
      ast.position = new BABYLON.Vector3(65 + (4.5 * Math.sin(rad)), 4, 0 + (4.5 * Math.cos(rad)));
      asteroids.push(ast); 
    }
    for (let i = 0; i < 72; i++) {
      const degrees = i * 5; 
      const rad = degrees * (Math.PI / 180); 
      const ast = BABYLON.MeshBuilder.CreateSphere("asteroid", {diameter: 0.15 * Math.random()}, this.scene); 
      ast.position = new BABYLON.Vector3(65 + (5 * Math.sin(rad)), 4, 0 + (5 * Math.cos(rad)));
      asteroids.push(ast); 
    }


    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].setParent(sphere[6]); 
      asteroids[i].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0), false);
      asteroids[i].material = this.CreateAsteroid(); 
      asteroids[i].checkCollisions = true; 
      light.excludedMeshes.push(asteroids[i]); 
    }

    
    const spawn = -(this.MAP_DEPTH / 2) + 10;
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
    spawnBox.position = new BABYLON.Vector3(0,7,spawn + 2);
    spawnBox.material = this.CreateTriangle(); 
    spawnBox.checkCollisions = true;

    

    const c = 0.4; 
    sphere[0].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[0].rotation.y -= 0.0025; 
    });
    sphere[1].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[1].rotation.y -= 0.01;
        //sphere[1].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.01 * c); 
    }); 
    sphere[2].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[2].rotation.y -= 0.01;
        //sphere[2].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.0105 * c);
    }); 
    sphere[3].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[3].rotation.y -= 0.01;
        //sphere[3].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.011 * c);
    }); 
    sphere[4].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[4].rotation.y -= 0.01;
        //sphere[4].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.0115 * c);
    }); 
    sphere[5].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[5].rotation.y -= 0.01;
        //sphere[5].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.012 * c);
    }); 
    sphere[6].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[6].rotation.y -= 0.01;
        //sphere[6].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.0125 * c);
    }); 
    sphere[7].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[7].rotation.y -= 0.01;
        //sphere[7].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.013 * c);
    }); 
    sphere[8].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[8].rotation.y -= 0.01;
        //sphere[8].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.0135 * c);
    }); 

    
  
    for (var i = 1; i < sphere.length; i++) {
      sunLight.excludedMeshes.push(sphere[i]); 
    }

    for (let i = 0; i < sphere.length; i++) {
      sphere[i].checkCollisions = true; 
    }
    
    /*
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

    for (var i = 0; i < walls.length; i++) {
      sunLight.excludedMeshes.push(walls[i]); 
      walls[i].checkCollisions = true;
      walls[i].material = this.CreateTriangle(); 
    }
    */
    return scene;
  }

  
  
  CreateSun(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene); 

    pbr.albedoTexture = new Texture("./textures/galactic/sun_basecolor.png", this.scene);
    pbr.bumpTexture = new Texture("./textures/galactic/sun_normal.png", this.scene);
    pbr.metallicTexture = new Texture("./textures/galactic/sun_roughness.png", this.scene);

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 

    pbr.emissiveColor = new Color3(1,1,1); 
    pbr.emissiveTexture = new Texture("./textures/galactic/sun_emissive.png", this.scene); 

    pbr.roughness = 1; 

    return pbr; 
  }

  CreateGlacial(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene); 

    pbr.albedoTexture = new Texture("./textures/galactic/glacial_basecolor.png", this.scene);
    pbr.bumpTexture = new Texture("./textures/galactic/glacial_normal.png", this.scene);
    pbr.metallicTexture = new Texture("./textures/galactic/glacial_metallic.png", this.scene);

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 

    pbr.emissiveColor = new Color3(1,1,1); 
    pbr.emissiveTexture = new Texture("./textures/galactic/glacial_emissive.png", this.scene); 
    pbr.emissiveIntensity = 100; 

    pbr.roughness = 1; 

    return pbr; 
  }

  CreateTriangle(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene); 
    const uvScale = 20;
    const texArr: Texture[] = [];

    const albedoTex = new Texture("./textures/triangle/triangle_albedo.png", this.scene);
    pbr.albedoTexture = albedoTex; 
    texArr.push(albedoTex); 
    const bumpTex = new Texture("./textures/triangle/triangle_normal.png", this.scene);
    pbr.bumpTexture = bumpTex; 
    texArr.push(bumpTex); 

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 

    pbr.emissiveColor = new Color3(1,1,1); 
    pbr.emissiveTexture = new Texture("./textures/triangle/triangle_emissive.png", this.scene); 

    pbr.roughness = 1; 

    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return pbr; 
}


  CreateAsteroid(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene); 
    const uvScale = 1;
    const texArr: Texture[] = [];

    const albedoTex = new Texture("./textures/galactic/asteroid_basecolor.png", this.scene);
    pbr.albedoTexture = albedoTex; 
    texArr.push(albedoTex); 
    const bumpTex = new Texture("./textures/galactic/asteroid_normal.png", this.scene);
    pbr.bumpTexture = bumpTex; 
    texArr.push(bumpTex); 

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY  = true; 

    pbr.metallicTexture = new Texture("./textures/galactic/asteroid_metallic.png", this.scene); 

    pbr.roughness = 1; 

    texArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return pbr; 

  }

}
