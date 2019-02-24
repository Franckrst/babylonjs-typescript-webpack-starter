/*
import { Game } from './game';
import 'babylonjs-materials';
import 'babylonjs-loaders';
import CANNON = require('cannon');

window.addEventListener('DOMContentLoaded', () => {
  // Set global variable for cannonjs physics engine
  window.CANNON = CANNON;
  let game = new Game('renderCanvas');
  game.createScene();
  game.animate();
});
 */
import { Map } from './map/map';
import {Player} from "./Player/player";
import * as BABYLON from "babylonjs";
import {ManhattenHeuristic} from "./AStar/Heuristics/ManhattenHeuristic";
import {AStar} from "./AStar/AStar";
import Vector3 = BABYLON.Vector3;
import {Interaction} from "./map/Interaction";

window.addEventListener('DOMContentLoaded', () => {

    let canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('renderCanvas')
    let engine : BABYLON.Engine = new BABYLON.Engine(canvas, true);
    let scene : BABYLON.Scene= new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -0.5, 0);
    scene.collisionsEnabled = true;
    let map : Map = new Map(scene);
    let player : Player = new Player(scene, 'him', 'assets/babylon/','dude.babylon',new Vector3(1,0.7,3));
    player.load();
    let interaction : Interaction = new Interaction(map,player);
    showWorldAxis(4, scene);
    let camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 30, BABYLON.Vector3.Zero(), this._scene);
    camera.attachControl(canvas, true);
    map.build().then(()=>{
        engine.runRenderLoop(() => {
            scene.render();
        });
    });

    let astart = new AStar(new ManhattenHeuristic());
    astart.load([
        [ 0, 0, 0, 0 ],
        [ 0, 5, 5, 0 ],
        [ 0, 5, 5, 0 ],
        [ 0, 0, 0, 0 ]
    ]);

    console.log(astart.path(astart.getNode(0,0),astart.getNode(3,3)));

});

function showWorldAxis(size, scene) {
    let makeTextPlane = function(text, color, size) {
        let dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
        let plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
        plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        plane.material.backFaceCulling = false;
        return plane;
    };
    let axisX = BABYLON.Mesh.CreateLines("axisX", [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    let xChar = makeTextPlane("X", "red", size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
    let axisY = BABYLON.Mesh.CreateLines("axisY", [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
    ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    let yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    let axisZ = BABYLON.Mesh.CreateLines("axisZ", [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
    ], scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    let zChar = makeTextPlane("Z", "blue", size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
};