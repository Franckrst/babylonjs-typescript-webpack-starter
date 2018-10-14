import {Tuil} from "../tuil";
import * as BABYLON from "babylonjs";

export class TuilEscalier extends Tuil {

    public render() : this {
        let material = new BABYLON.StandardMaterial("wall", this._scene);
        let color : number = Math.random();
        material.diffuseColor = new BABYLON.Color3(color, color, color);

        let a = BABYLON.Mesh.CreateBox('scene_elem', 1, this._scene);
        a.position = this._vector.add(new BABYLON.Vector3(0,0.5,0.4));
        a.material = material;
        a.scaling.y = 2;
        a.scaling.z = 0.2;
        this.meshs.push(a);

        let b = BABYLON.Mesh.CreateBox('scene_elem', 1, this._scene);
        b.position = this._vector.add(new BABYLON.Vector3(0,0.5,0.2));
        b.scaling.y = 1.8;
        b.scaling.z = 0.2;
        b.material = material;
        this.meshs.push(b);

        let c = BABYLON.Mesh.CreateBox('scene_elem', 1, this._scene);
        c.position = this._vector.add(new BABYLON.Vector3(0,0.5,0.0));
        c.scaling.y = 1.6;
        c.scaling.z = 0.2;
        c.material = material;
        this.meshs.push(c);

        let d = BABYLON.Mesh.CreateBox('scene_elem', 1, this._scene);
        d.position = this._vector.add(new BABYLON.Vector3(0,0.5,-0.2));
        d.scaling.y = 1.4;
        d.scaling.z = 0.2;
        d.material = material;
        this.meshs.push(d);

        let e = BABYLON.Mesh.CreateBox('scene_elem', 1, this._scene);
        e.position = this._vector.add(new BABYLON.Vector3(0,0.5,-0.4));
        e.scaling.y = 1.4;
        e.scaling.z = 0.2;
        e.material = material;
        this.meshs.push(e);

        return this;
    }
}