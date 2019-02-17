import {IMapCell, IMapTuil} from "./interfaces/IMapDescriptor";
import {MapOffSet} from "./mapOffSet";
import {Tuil} from "./tuil";
import * as BABYLON from 'babylonjs';
import {TuilFactory} from "./tuil.factory";

export class Cell {

    public tuils : Tuil[] = [];
    private _isInterative : boolean;
    public set isInteractive (val : boolean) {
        this._isInterative = val;
    }
    public get isInteractive () : boolean {
        return this.tuils.every((tuil)=>tuil.isInterave);
    }
    private _canMoveOn : number;
    public set canMoveOn (val : number) {
        this._canMoveOn = val;
    }
    public get canMoveOn () : number {
        return this.tuils.reduce((ev,tuil)=>ev + tuil.canMoveOn,0);
    }

    constructor(
        private _scene : BABYLON.Scene,
        private _data : IMapCell,
        public vector : BABYLON.Vector3){
    }

    public render() : this {
        this._data.forEach((tuil : IMapTuil) => {
            this.tuils.push(TuilFactory.getIntance(this._scene,tuil,this.vector).render());
        });
        return this;
    }
    public setActive( val : boolean){
        this.tuils.forEach((tuil)=>{
            tuil.setPicked(val);
        })
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