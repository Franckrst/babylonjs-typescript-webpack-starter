import * as BABYLON from 'babylonjs';

export class Map {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.HemisphericLight;

    constructor(canvasElement: string) {
        // Create canvas and engine
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    public render() : void {
        this._scene = new BABYLON.Scene(this._engine);
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this._camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 30, BABYLON.Vector3.Zero(), this._scene);
        this._camera.attachControl(this._canvas, true);
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this._light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this._scene);

        let material = new BABYLON.StandardMaterial("wall", this._scene);
        material.diffuseColor = new BABYLON.Color3(.7, .7, .7);

        let shape = BABYLON.Mesh.CreateBox('scene_elem', 0.5, this._scene);
        shape.material = material;
        let shape2 = BABYLON.Mesh.CreateBox('scene_elem', 0.5, this._scene);
        shape2.position.x = 0.5;
        shape2.position.z = 0.5;
        shape2.material = material;
        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

    }

}