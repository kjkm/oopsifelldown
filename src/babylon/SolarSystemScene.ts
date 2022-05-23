import * as BABYLON from "@babylonjs/core";
import { Color3, CreateScreenshotUsingRenderTarget, MeshAssetTask, PBRMaterial, SceneLoader, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders";

export class SolarSystemScene {
  MAP_WIDTH = 300;
  MAP_DEPTH = 300;
  WALL_WIDTH = 1;
  WALL_HEIGHT = 15;

  scene: BABYLON.Scene;
  engine: BABYLON.Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.CreateBarrel();
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
    camera.position = new BABYLON.Vector3(0, 1, -10);
    
    //enables collisions and gravity
    camera.applyGravity = true; 
    camera.checkCollisions = true; 

    //creates an ellipsoid around camera object for collision detection
    camera.ellipsoid = new Vector3(1,1,1); 

    camera.minZ = 0.4;
    camera.speed = 0.7; 
    camera.angularSensibility = 4000; 

    

  }

  
  
  CreateScene(): BABYLON.Scene {
    // Camera configuration
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

    const saturnRings = BABYLON.MeshBuilder.CreateDisc("ring",{});
    var rings = new BABYLON.StandardMaterial("SaturnRing", this.scene);
    rings.diffuseTexture = new BABYLON.Texture("./textures/planets/SaturnRing.jpg", this.scene); 
    saturnRings.material = rings; 
    saturnRings.position = new BABYLON.Vector3(10,10,10); 

    const sphere: BABYLON.Mesh[] = []; 
    sphere[0] = BABYLON.MeshBuilder.CreateSphere("sun", {diameter: 3}, this.scene); 
    sphere[0].position = new BABYLON.Vector3(0,2,0); 
    var sunMaterial = new BABYLON.StandardMaterial("sunTexture", this.scene); 
    sunMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/sun.jpg", this.scene);
    sphere[0].material = sunMaterial; 
    light.excludedMeshes.push(sphere[0]); 
    sphere[1] = BABYLON.MeshBuilder.CreateSphere("mercury", { diameter: 1 }, this.scene);
    sphere[1].position = new BABYLON.Vector3(5, 2, 0); 
    var mercuryMaterial = new BABYLON.StandardMaterial("mercuryTexture", this.scene);
    mercuryMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/mercury.jpg", this.scene);
    sphere[1].material = mercuryMaterial; 
    sphere[2] = BABYLON.MeshBuilder.CreateSphere("venus", { diameter: 1 }, this.scene);
    sphere[2].position = new BABYLON.Vector3(10, 2, 0); 
    var venusMaterial = new BABYLON.StandardMaterial("venusTexture", this.scene);
    venusMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/venus.jpg", this.scene);
    sphere[2].material = venusMaterial; 
    sphere[3] = BABYLON.MeshBuilder.CreateSphere("earth", { diameter: 1 }, this.scene);
    sphere[3].position = new BABYLON.Vector3(15, 2, 0); 
    var earthMaterial = new BABYLON.StandardMaterial("earthTexture", this.scene);
    earthMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/earth.jpg", this.scene);
    sphere[3].material = earthMaterial; 
    sphere[4] = BABYLON.MeshBuilder.CreateSphere("mars", { diameter: 1 }, this.scene);
    sphere[4].position = new BABYLON.Vector3(20, 2, 0); 
    var marsMaterial = new BABYLON.StandardMaterial("marsTexture", this.scene);
    marsMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/mars.jpg", this.scene);
    sphere[4].material = marsMaterial; 
    sphere[5] = BABYLON.MeshBuilder.CreateSphere("jupiter", { diameter: 5 }, this.scene);
    sphere[5].position = new BABYLON.Vector3(27.5, 2, 0); 
    var jupiterMaterial = new BABYLON.StandardMaterial("jupiterTexture", this.scene);
    jupiterMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/jupiter.jpg", this.scene);
    sphere[5].material = jupiterMaterial; 
    sphere[6] = BABYLON.MeshBuilder.CreateSphere("sun", { diameter: 4 }, this.scene);
    sphere[6].position = new BABYLON.Vector3(34.5, 2, 0); 
    var saturnMaterial = new BABYLON.StandardMaterial("saturnTexture", this.scene);
    saturnMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/Saturn.jpg", this.scene);
    sphere[6].material = saturnMaterial; 
    sphere[7] = BABYLON.MeshBuilder.CreateSphere("uranus", { diameter: 2 }, this.scene);
    sphere[7].position = new BABYLON.Vector3(40.5, 2, 0); 
    var uranusMaterial = new BABYLON.StandardMaterial("uranusTexture", this.scene);
    uranusMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/uranus.jpg", this.scene);
    sphere[7].material = uranusMaterial; 
    sphere[8] = BABYLON.MeshBuilder.CreateSphere("neptune", { diameter: 2 }, this.scene);
    sphere[8].position = new BABYLON.Vector3(46.5, 2, 0); 
    var neptuneMaterial = new BABYLON.StandardMaterial("neptuneTexture", this.scene);
    neptuneMaterial.diffuseTexture = new BABYLON.Texture("./textures/planets/neptune.jpg", this.scene);
    sphere[8].material = neptuneMaterial; 

    
    sphere[1].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[1].rotation.y -= 0.01;
        sphere[1].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.01); 
    }); 
    sphere[2].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[2].rotation.y -= 0.01;
        sphere[2].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.0105);
    }); 
    sphere[3].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[3].rotation.y -= 0.01;
        sphere[3].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.011);
    }); 
    sphere[4].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[4].rotation.y -= 0.01;
        sphere[4].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.0115);
    }); 
    sphere[5].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[5].rotation.y -= 0.01;
        sphere[5].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.012);
    }); 
    sphere[6].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[6].rotation.y -= 0.01;
        sphere[6].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.0125);
    }); 
    sphere[7].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[7].rotation.y -= 0.01;
        sphere[7].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.013);
    }); 
    sphere[8].setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    scene.registerBeforeRender(function () {
        sphere[8].rotation.y -= 0.01;
        sphere[8].rotateAround(new BABYLON.Vector3(0,1,0), new BABYLON.Vector3(0,1,0), 0.0135);
    }); 
    
    
    for (var i = 1; i < sphere.length; i++) {
      sunLight.excludedMeshes.push(sphere[i]); 
    }

    for (let i = 0; i < sphere.length; i++) {
      sphere[i].checkCollisions = true; 
    }
    

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
      sunLight.excludedMeshes.push(walls[0]); 
    }

    for (let i = 0; i < walls.length; i++) {
      walls[i].checkCollisions = true;
    }
    

    return scene;
  }

  
  CreateBarrel(): void {
   
    SceneLoader.ImportMesh("","./models/","Barrel.glb", this.scene,(meshes)=>{
        console.log('meshes', meshes);
        meshes.map((mesh)=> {
          mesh.checkCollisions = true; 
        }); 
    });
   }
}
