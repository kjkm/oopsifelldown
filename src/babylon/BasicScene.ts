import * as BABYLON from '@babylonjs/core';

export class BasicScene {

    MAP_WIDTH: number = 100;
    MAP_DEPTH: number = 100;
    WALL_WIDTH: number = 1;
    WALL_HEIGHT: number = 15;

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
        const ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:this.MAP_WIDTH, height:this.MAP_DEPTH}, this.scene);
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter:1}, this.scene);
        const walls: BABYLON.Mesh[] = [];
        walls[0] = BABYLON.MeshBuilder.CreateBox("wall1", {height:this.WALL_HEIGHT, width:this.MAP_WIDTH, depth:this.WALL_WIDTH}, this.scene);
        walls[0].position = new BABYLON.Vector3(0, 0, this.MAP_DEPTH/2 - this.WALL_WIDTH/2);
        walls[1] = BABYLON.MeshBuilder.CreateBox("wall2", {height:this.WALL_HEIGHT, width:this.WALL_WIDTH, depth:this.MAP_DEPTH}, this.scene);
        walls[1].position = new BABYLON.Vector3(this.MAP_WIDTH/2 - this.WALL_WIDTH/2, 0, 0);
        walls[2] = BABYLON.MeshBuilder.CreateBox("wall3", {height:this.WALL_HEIGHT, width:this.MAP_WIDTH, depth:this.WALL_WIDTH}, this.scene);
        walls[2].position = new BABYLON.Vector3(0, 0, -this.MAP_DEPTH/2 + this.WALL_WIDTH/2);
        walls[3] = BABYLON.MeshBuilder.CreateBox("wall4", {height:this.WALL_HEIGHT, width:this.WALL_WIDTH, depth:this.MAP_DEPTH}, this.scene);
        walls[3].position = new BABYLON.Vector3(-this.MAP_WIDTH/2 + this.WALL_WIDTH/2, 0, 0);

        sphere.position = new BABYLON.Vector3(0, 1, 0);
        camera.position = new BABYLON.Vector3(0, 1, -10);
        return scene;
    }
}