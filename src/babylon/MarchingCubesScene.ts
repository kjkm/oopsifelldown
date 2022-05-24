import * as BABYLON from '@babylonjs/core';
import { PerlinNoise2D } from './PerlinNoise';
import { Chunk } from './Chunk';
import { BabylonFileLoaderConfiguration, Color3, PBRMaterial, Texture, Vector3 } from '@babylonjs/core';


export class MarchingCubesScene{
    MAP_WIDTH = 100;
    MAP_DEPTH = 100;
    WALL_WIDTH = 1;
    WALL_HEIGHT = 15;

    scene: BABYLON.Scene;
    engine: BABYLON.Engine;

    constructor(private canvas: HTMLCanvasElement){
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


        const mesh: BABYLON.Mesh[] = [];
        const chunk: Chunk[] = []; 
        const noise = new PerlinNoise2D(40);
        const pointCloud = noise.makeNoise3D(1);

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                    chunk.push(new Chunk(new Vector3(i * 16,j * 16, k * 16),"chunk",16, pointCloud, this.scene));
                    const goonies = chunk[(i * 2) + (j * 2) + (k)].BuildMesh(); 
                    if (goonies) {
                        mesh.push(goonies);
                    }
                }
            }
        }

        for (let i = 0; i < mesh.length; i++) {
            mesh[i].material = this.CreateMagic(); 
        }

        return scene;

    }

    CreateMagic(): PBRMaterial {
        const pbr = new PBRMaterial("pbr", this.scene); 
    
        pbr.albedoTexture = new Texture("./textures/triangle/triangle_albedo.png", this.scene);
        pbr.bumpTexture = new Texture("./textures/triangle/triangle_normal.png", this.scene);
    
        pbr.invertNormalMapX = true;
        pbr.invertNormalMapY  = true; 
    
        pbr.emissiveColor = new Color3(1,1,1); 
        pbr.emissiveTexture = new Texture("./textures/triangle/triangle_emissive.png", this.scene); 
    
        pbr.roughness = 1; 
    
        return pbr; 
      }
}