import {IMapTuil} from "./IMapDescriptor";
import {MapOffSet} from "./mapOffSet";
import * as BABYLON from 'babylonjs';

export class Tuil {

    public id : number;
    public x : number;
    public y : number;
    public z : number;
    public meshs : BABYLON.AbstractMesh[] = [];
    public picked : boolean = false;

    constructor(protected _scene : BABYLON.Scene, _data : IMapTuil, protected _vector : BABYLON.Vector3){
        this.x = _data.x;
        this.z = _data.z;
        this.y = _data.y;
        this.id = _data.id;
    }

    public render() : this {
        return this;
    }

    public setPicked(val : boolean) : this {
        this.picked = val;
        return this;
    }
}