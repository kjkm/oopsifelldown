import * as BABYLON from '@babylonjs/core';
import { PerlinNoise2D } from './PerlinNoise';
import { Chunk } from './Chunk';
import { Vector3 } from '@babylonjs/core';


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
        
        const noise = new PerlinNoise2D(40);
        const pointCloud = noise.makeNoise3D(1);
        console.log(pointCloud);
        const chunk0 = new Chunk(new Vector3(0, 0, 0), "chunk", 16, pointCloud, this.scene);
        chunk0.BuildMesh();
        const chunk1 = new Chunk(new Vector3(16, 0, 0), "chunk", 16, pointCloud, this.scene);
        chunk1.BuildMesh();
        const chunk2 = new Chunk(new Vector3(16, 0, 16), "chunk", 16, pointCloud, this.scene);
        chunk2.BuildMesh();
        const chunk3 = new Chunk(new Vector3(0, 0, 16), "chunk", 16, pointCloud, this.scene);
        chunk3.BuildMesh();
        const chunk4 = new Chunk(new Vector3(0, 0, 32), "chunk", 16, pointCloud, this.scene);
        chunk4.BuildMesh();
        const chunk5 = new Chunk(new Vector3(16, 0, 32), "chunk", 16, pointCloud, this.scene);
        chunk5.BuildMesh();
        const chunk6 = new Chunk(new Vector3(32, 0, 16), "chunk", 16, pointCloud, this.scene);
        chunk6.BuildMesh();
        const chunk7 = new Chunk(new Vector3(32, 0, 0), "chunk", 16, pointCloud, this.scene);
        chunk7.BuildMesh();
        const chunk8 = new Chunk(new Vector3(32, 0, 32), "chunk", 16, pointCloud, this.scene);
        chunk8.BuildMesh();
        const chunk9 = new Chunk(new Vector3(0, 16, 0), "chunk", 16, pointCloud, this.scene);
        chunk9.BuildMesh();
        const chunk10 = new Chunk(new Vector3(16, 16, 0), "chunk", 16, pointCloud, this.scene);
        chunk10.BuildMesh();
        const chunk11 = new Chunk(new Vector3(16, 16, 16), "chunk", 16, pointCloud, this.scene);
        chunk11.BuildMesh();
        const chunk12 = new Chunk(new Vector3(0, 16, 16), "chunk", 16, pointCloud, this.scene);
        chunk12.BuildMesh();
        const chunk13 = new Chunk(new Vector3(0, 16, 32), "chunk", 16, pointCloud, this.scene);
        chunk13.BuildMesh();
        const chunk14 = new Chunk(new Vector3(16, 16, 32), "chunk", 16, pointCloud, this.scene);
        chunk14.BuildMesh();
        const chunk15 = new Chunk(new Vector3(32, 16, 16), "chunk", 16, pointCloud, this.scene);
        chunk15.BuildMesh();
        const chunk16 = new Chunk(new Vector3(32, 16, 0), "chunk", 16, pointCloud, this.scene);
        chunk16.BuildMesh();
        const chunk17 = new Chunk(new Vector3(32, 16, 32), "chunk", 16, pointCloud, this.scene);
        chunk17.BuildMesh();

        return scene;

    }
}