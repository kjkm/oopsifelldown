import { Vector2, Vector3 } from "@babylonjs/core";
import { makeNoise2D, makeNoise3D } from "fast-simplex-noise";
import { makeCuboid, makeSphereSurface } from "fractal-noise";

export class PerlinNoise2D{
    grid: Vector2[][] = [];
    nodes = 9;

    constructor(nodes:number){

        this.nodes = nodes;
        for (let i = 0; i < this.nodes; i++) {
            let row: Vector2[] = [];
            for (let j = 0; j < this.nodes; j++) {
                row.push(this.RandomVector2D());
            }
            this.grid.push(row);
        }
    }
    
    RandomVector2D(): Vector2{
        let theta = Math.random() * 2 * Math.PI;
        return new Vector2(Math.cos(theta), Math.sin(theta));
    }

    PerlinNoise(x: number, y: number): number{
        let x0 = Math.floor(x);
        let y0 = Math.floor(y);
        let x1 = x0 + 1;
        let y1 = y0 + 1;
        
        

        return 0;
    }

    makeNoise(): number[][]{
        const noiseFunction = makeNoise2D();
        const space: number[][] = [];
        for (let i = 0; i < this.nodes; i++) {
            let row: number[] = [];
            for (let j = 0; j < this.nodes; j++) {
                row.push(noiseFunction(i, j) * 10);
            }
            space.push(row);
        }
        return space;
    }

    makeNoise3D(octaves: number): number[][][]{
        const noiseFunction = makeNoise3D();
        const space: number[][][] = [];

        const field0 = makeCuboid(this.nodes, this.nodes, this.nodes, noiseFunction, {frequency: 4, amplitude: 0.25}) as unknown as number[][][];
        const field1 = makeCuboid(this.nodes, this.nodes, this.nodes, noiseFunction, {frequency: 2, amplitude: 0.5}) as unknown as number[][][];
        const field2 = makeCuboid(this.nodes, this.nodes, this.nodes, noiseFunction, {frequency: 1, amplitude: 0.75}) as unknown as number[][][];
        const field3 = makeCuboid(this.nodes, this.nodes, this.nodes, noiseFunction, {frequency: 0.5, amplitude: 1}) as unknown as number[][][];
        const field4 = makeCuboid(this.nodes, this.nodes, this.nodes, noiseFunction, {frequency: 0.25, amplitude: 1.25}) as unknown as number[][][];
        const field5 = makeCuboid(this.nodes, this.nodes, this.nodes, noiseFunction, {frequency: 0.125, amplitude: 1.5}) as unknown as number[][][];
        const field6 = makeCuboid(this.nodes, this.nodes, this.nodes, noiseFunction, {frequency: 0.0625, amplitude: 1.75}) as unknown as number[][][];
        const field7 = makeCuboid(this.nodes, this.nodes, this.nodes, noiseFunction, {frequency: 0.03125, amplitude: 2}) as unknown as number[][][];
        const field8 = makeCuboid(this.nodes, this.nodes, this.nodes, noiseFunction, {frequency: 0.015625, amplitude: 2.25}) as unknown as number[][][];
        const field9 = makeCuboid(this.nodes, this.nodes, this.nodes, noiseFunction, {frequency: 0.0078125, amplitude: 2.5}) as unknown as number[][][];
        const field10 = makeCuboid(this.nodes, this.nodes, this.nodes, noiseFunction, {frequency: 0.00390625, amplitude: 2.75}) as unknown as number[][][];

        for (let i = 0; i < this.nodes; i++) {
            space[i] = [];
            for (let j = 0; j < this.nodes; j++) {
                space[i][j] = [];
                for (let k = 0; k < this.nodes; k++) {
                    //const point = new Vector3(i, j - 16, k)
                    const radius = 15;
                    const point = new Vector3(i - radius , j, k - radius);
                    //space[i][j][k] = -point.y;

                    space[i][j][k] = radius - point.subtract(new Vector3(0, radius, 0)).length();
                    
                    space[i][j][k] -= field0[i][j][k];
                    space[i][j][k] -= field1[i][j][k];
                    space[i][j][k] -= field2[i][j][k];
                    space[i][j][k] -= field3[i][j][k];
                    space[i][j][k] -= field4[i][j][k];
                    space[i][j][k] -= field5[i][j][k];
                    space[i][j][k] -= field6[i][j][k];
                    space[i][j][k] -= field7[i][j][k];
                    space[i][j][k] -= field8[i][j][k];
                    space[i][j][k] -= field9[i][j][k];
                    space[i][j][k] -= field10[i][j][k];

                }
            }
        }

        // for (let i = 0; i < this.nodes; i++) {
        //     for (let j = 0; j < this.nodes; j++) {
        //         for (let k = 0; k < this.nodes; k++) {
        //             space[i][j][k] -= field[i][j][k];
        //         }
        //     }
        // }
        return space;
    }
    
}

