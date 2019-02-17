import {IMapTuil} from "./interfaces/IMapDescriptor";
import {MapOffSet} from "./mapOffSet";
import * as BABYLON from 'babylonjs';

export class Tuil {

    public id : number;
    public x : number;
    public y : number;
    public z : number;
    public meshs : BABYLON.AbstractMesh[] = [];
    public picked : boolean = false;
    public isInterave : boolean = true;
    public canMoveOn : number = 0;
    protected color: BABYLON.Color3;

    constructor(protected _scene : BABYLON.Scene, _data : IMapTuil, protected _vector : BABYLON.Vector3){
        this.x = _data.x;
        this.z = _data.z;
        this.y = _data.y;
        this.id = _data.id;
        if(_data.color) {
            console.log(_data);
            this.color = new BABYLON.Color3(_data.color[0], _data.color[1], _data.color[2]);
        }else{
            this.color = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        }
    }

    public render() : this {
        return this;
    }

    public setPicked(val : boolean) : this {
        this.picked = val;
        return this;
    }
}