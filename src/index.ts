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
    let player : Player = new Player(scene, 'him', 'assets/babylon/','dude.babylon',new Vector3(1,0.7,4));
    player.load();
    let interaction : Interaction = new Interaction(map,player);
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