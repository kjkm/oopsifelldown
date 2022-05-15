import * as BABYLON from '@babylonjs/core';
import { meshUboDeclaration } from '@babylonjs/core/Shaders/ShadersInclude/meshUboDeclaration';
import { MarchingCubes } from './MarchingCubes';

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

        const mesh = new MarchingCubes(this.scene, new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(16, 16, 16), 8, false);
        mesh.Polygonize((x: number, y: number, z: number) => {
            return x ** 2 + y ** 2 + z ** 2;
        }, 64);
        return scene;

    }
}