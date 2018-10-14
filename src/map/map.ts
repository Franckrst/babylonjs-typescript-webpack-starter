import * as BABYLON from 'babylonjs';
import {IMapCell, IMapDescriptor, IMapLine, IMapTuil} from "./IMapDescriptor";
import axios from 'axios';
import {Cell} from "./cell";
import {bound} from "../tools/decorators/bound";

export class Map {

    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.HemisphericLight;
    private _cell : Cell[] = [];

    constructor(private _scene : BABYLON.Scene) {
        // Create canvas and engine
    }

    public build() : Promise<void> {
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this._light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this._scene);
        // run the render loop
        return axios.get('./assets/map.json').then((data)=>{
            this.load(data.data);
            this._scene.onPointerDown = this.onPointerDown;
        })

    }

    public load(map_json : IMapDescriptor) : void {
        let lineOffset : number = 0;
        map_json.forEach((line : IMapLine) => {
            lineOffset ++;
            let collOffset : number = 0;
            line.forEach((cell : IMapCell) => {
                this._cell.push(new Cell(this._scene, cell, new BABYLON.Vector3(lineOffset, 0 , collOffset)).render());
                collOffset ++;
            })
        });
    }

    @bound
    private onPointerDown (evt: PointerEvent, pickInfo: BABYLON.PickingInfo, type: BABYLON.PointerEventTypes){
        if(pickInfo.hit){
            console.log(this._cell.filter((cell : Cell) =>  cell.pick(pickInfo)));
        }

    }

}