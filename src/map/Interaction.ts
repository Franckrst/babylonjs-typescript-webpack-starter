import {Map} from "./map";
import {IInterationEvent} from "./interfaces/IInterationEvent";
import {Player} from "../Player/player";
import * as BABYLON from "babylonjs";
import {Cell} from "./cell";
import {AStar} from "../AStar/AStar";
import {ManhattenHeuristic} from "../AStar/Heuristics/ManhattenHeuristic";
import {IMapObj} from "./interfaces/IMapObj";
import {GraphNode} from "../AStar/GraphNode";

export class Interaction implements IInterationEvent {

    constructor (
        public map : Map,
        public player : Player
    ) {
        map.interactionEvent = this;
    }

    public click (cell : Cell) : void {
        switch (true){
            case cell.canMoveOn == 0:
                this.move(this.player, cell.vector);
                break;
            case cell.isInteractive :
                break;
        }
    }

    public move(obj : IMapObj, vector : BABYLON.Vector3) : void {
        let astart = new AStar(new ManhattenHeuristic());
        console.log(
            this.map.getMovingArr());
        astart.load(
            this.map.getMovingArr());
        console.log(obj.vector.z, obj.vector.x);
        let paths : GraphNode[]= astart.path(
            astart.getNode(obj.vector.x, obj.vector.z),
            astart.getNode(vector.x, vector.z));
        paths.forEach((path)=>{
            this.map.cells[path.x][path.y].setActive(true);
        });
        console.log(paths);

    }



}

/*


    let astart = new AStar(new ManhattenHeuristic());
    astart.load([
        [ 0, 0, 0, 0 ],
        [ 0, 5, 5, 0 ],
        [ 0, 5, 5, 0 ],
        [ 0, 0, 0, 0 ]
    ]);

    console.log(astart.path(astart.getNode(0,0),astart.getNode(3,3)));

 */