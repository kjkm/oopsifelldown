import * as BABYLON from '@babylonjs/core';

export class BasicScene {

    scene: BABYLON.Scene;
    engine: BABYLON.Engine;

    constructor(private canvas:HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = this.CreateScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    CreateScene(): BABYLON.Scene {
        const scene = new BABYLON.Scene(this.engine);
        const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 1, 0), this.scene);
        camera.attachControl();
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.5;
        const ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:10, height:10}, this.scene);
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter:1}, this.scene);
        sphere.position = new BABYLON.Vector3(0, 1, 0);
        camera.position = new BABYLON.Vector3(0, 1, -10);
        return scene;
    }
}