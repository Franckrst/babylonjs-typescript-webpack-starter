import {Tuil} from "../tuil";
import * as BABYLON from "babylonjs";

export class TuilCube extends Tuil {

    private _cube : BABYLON.Mesh;
    private _material : BABYLON.StandardMaterial;

    public render() : this {
        this._material = new BABYLON.StandardMaterial("wall", this._scene);
        let color : number = Math.random();
        this._material.diffuseColor = new BABYLON.Color3(color, color, color);
        this._cube = BABYLON.Mesh.CreateBox('scene_elem', 1, this._scene);
        this._cube.position = this._vector;
        //this._cube.position.y = Math.random() * (0.5 - 0) + 0;
        this._cube.material = this._material;
        this._cube.checkCollisions = true;
        console.log('cell ++');
        this.meshs.push(this._cube);
        return this;
    }

    public setPicked (val : boolean) : this {
        this._material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        return super.setPicked(val);
    }
}