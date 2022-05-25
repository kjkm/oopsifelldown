# oopsifelldown

This is a final project for CS412 at PLU, Spring 2022.
Authors: Kieran Kim-Murphy and Logan Margo

Screenshots for grading purposes are located in SceneImages folder.
Presentation slides are located in the same folder as a pdf.

## Sources
[1] Paul Bourke. 1995. Polygonising a scalar field. Blog. “http://paulbourke.net/geometry/polygonise/” Accessed May, 2022.

[2] Ryan Geiss. Generating Complex Procedural Terrains Using the GPU. Blog. “https://developer.nvidia.com/gpugems/gpugems3/part-i-geometry/chapter-1-generating-complex-procedural-terrains-using-gpu” Accessed May, 2022.

[3] Matthew Fisher. 2014. Marching Cubes. Blog. “https://graphics.stanford.edu/~mdfisher/MarchingCubes.html” Accessed May, 2022.  

[4] Sebastian Lague. 2019. Coding Adventure: Marching Cubes. Video. “https://www.youtube.com/watch?v=M3iI2l0ltbE” Accessed May, 2022. 

[5] Babylon.js Documentation. “https://doc.babylonjs.com” Accessed April 2022.  

[6] Berti Kruger. 2020. Forum. “https://discourse.vtk.org/t/vtkmarchingcubes-vtkdiscretemarchingcubes-does-not-produce-a-closed-mesh-surface/4312” Accessed May, 2022. 

[7] Wim Eck and Maarten Lamers. Biological Content Generation: Evolving Game Terrains Through Living Organisms. 2015. Book.


## FirstPerson Camera Controls

W key --> forward
S key --> backward
A key --> left
D key --> right
SPACE --> jump

Left mouse click on screen to lock, look around with mouse. Press ESC to exit. 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
