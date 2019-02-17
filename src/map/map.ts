import * as BABYLON from 'babylonjs';
import {IMapCell, IMapDescriptor, IMapLine, IMapTuil} from "./interfaces/IMapDescriptor";
import axios from 'axios';
import {Cell} from "./cell";
import {bound} from "../tools/decorators/bound";
import {IInterationEvent} from "./interfaces/IInterationEvent";

export class Map {

    public interactionEvent : IInterationEvent;

    private _light: BABYLON.HemisphericLight;
    public cells : Cell[][] = [];

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
            let collOffset : number = 0;
            this.cells[lineOffset] = [];
            line.forEach((cell : IMapCell) => {
                this.cells[lineOffset].push(new Cell(this._scene, cell, new BABYLON.Vector3(lineOffset, 0 , collOffset)).render());
                //this._cell.push(new Cell(this._scene, cell, new BABYLON.Vector3(lineOffset, 0 , collOffset)).render());
                collOffset ++;
            });
            lineOffset ++;
        });
        console.log(this.cells);
    }

    @bound
    private onPointerDown (evt: PointerEvent, pickInfo : BABYLON.PickingInfo, type: BABYLON.PointerEventTypes){
        if(pickInfo.hit){
            for(const cellsKey in this.cells){
                for(const cellKey in this.cells[cellsKey]){
                    if(this.cells[cellsKey][cellKey].pick(pickInfo)){
                        return (this.interactionEvent)?this.interactionEvent.click(this.cells[cellsKey][cellKey]):null;
                    }
                }
            }
        }

    }

    public getMovingArr() : number[][]{
        console.log(this.cells);
        return this.cells.map((cells)=>{
            return cells.map((cell)=>cell.canMoveOn);
        })
    }

}