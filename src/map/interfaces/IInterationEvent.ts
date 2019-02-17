import * as BABYLON from "babylonjs";
import {Cell} from "../cell";

export interface IInterationEvent {

    click( cell : Cell ):void;
}