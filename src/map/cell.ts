import {IMapCell, IMapTuil} from "./IMapDescriptor";
import {MapOffSet} from "./mapOffSet";
import {Tuil} from "./tuil";
import * as BABYLON from 'babylonjs';
import {TuilFactory} from "./tuil.factory";

export class Cell {

    public tuils : Tuil[] = [];

    constructor(
        private _scene : BABYLON.Scene,
        private _data : IMapCell,
        private _vector : BABYLON.Vector3){
    }

    public render() : this {
        this._data.forEach((tuil : IMapTuil) => {
            this.tuils.push(TuilFactory.getIntance(this._scene,tuil,this._vector).render());
        });
        return this;
    }

    public pick (pickInfo: BABYLON.PickingInfo) : boolean {
        if(this.tuils.filter((tuil : Tuil) => tuil.meshs.indexOf(pickInfo.pickedMesh) != -1).length){
            this.tuils.forEach((tuil : Tuil)=>tuil.setPicked(true));
            return true;
        }else{
            return false;
        }
    }
}