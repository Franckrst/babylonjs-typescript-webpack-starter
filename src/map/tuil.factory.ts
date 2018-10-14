import {Tuil} from "./tuil";
import {IMapCell, IMapTuil} from "./IMapDescriptor";
import {TuilCube} from "./tuil/tuilCube";
import * as BABYLON from "babylonjs";
import {TuilEscalier} from "./tuil/tuilEscalier";

export class TuilFactory {

    public static getIntance(scene : BABYLON.Scene, data : IMapTuil, vector : BABYLON.Vector3) : Tuil {
        switch (data.id) {
            case 1 :
                return new TuilCube(scene, data, vector);
            case 2 :
                return new TuilEscalier(scene, data, vector);
        }
    }
}