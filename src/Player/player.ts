import {KeyMapEvent, KeyMapSingleton} from "../ui/keyMap.singleton";
import * as BABYLON from "babylonjs";
import Vector3 = BABYLON.Vector3;
import {IMapObj} from "../map/interfaces/IMapObj";


export class Player implements IMapObj{

    //(meshes: AbstractMesh[], particleSystems: ParticleSystem[], skeletons: Skeleton[], animationGroups: AnimationGroup[])

    private meshes : BABYLON.AbstractMesh[];
    private particleSystems : BABYLON.ParticleSystem[];
    private skeletons : BABYLON.Skeleton[];
    private animationGroups : BABYLON.AnimationGroup[];

    constructor(protected _scene : BABYLON.Scene ,
                public id : string,
                public path : string,
                public file : string,
                public vector : BABYLON.Vector3) {
        KeyMapSingleton.getInstance().add(KeyMapEvent.KEY_DOWN, (event)=>{

            let forward = new BABYLON.Vector3(0,0.5, 0.1);
            forward = forward.negate();
            this.meshes[0].moveWithCollisions(forward);
            console.log('==>',event.keyCode == 90 )
        });

    }

    public load () : this {
        BABYLON.SceneLoader.ImportMesh(this.id, this.path, this.file, this._scene, (meshes, particleSystems, skeletons, animationGroups) => {
            this.meshes = meshes;
            this.meshes[0].scaling = new Vector3(0.02,0.02,0.02);
            this.meshes[0].position = this.vector;
            this.particleSystems = particleSystems;
            this.skeletons = skeletons;
            this.animationGroups = animationGroups;

            this.meshes[0].isPickable = false;
            this.meshes[0].checkCollisions = true;
            const curiousValue : number = 15;
            this.meshes[0].ellipsoid = new BABYLON.Vector3(20, curiousValue, 24);
            this.meshes[0].ellipsoidOffset = new BABYLON.Vector3(4, curiousValue, 0);
            this.drawEllipsoid(this.meshes[0]);
            this.walk();
        });
        return this;
    }
    public drawEllipsoid(mesh) {
        mesh.computeWorldMatrix(true);
        const ellipsoidMat = new BABYLON.StandardMaterial("__ellipsoidMat__", mesh.getScene());
//                ellipsoidMat.wireframe = true;
        ellipsoidMat.emissiveColor = BABYLON.Color3.Green();
        ellipsoidMat.specularColor = BABYLON.Color3.Black();
        const ellipsoid = BABYLON.Mesh.CreateSphere("__ellipsoid__", 9, 1, mesh.getScene());
        ellipsoid.scaling = mesh.ellipsoid.clone();
        ellipsoid.position.y += mesh.ellipsoidOffset.y;
        ellipsoid.scaling.y *= 2;
        ellipsoid.scaling.x *= 2;
        ellipsoid.scaling.z *= 2;
        ellipsoid.material = ellipsoidMat;
        ellipsoid.parent = mesh;
        ellipsoid.computeWorldMatrix(true);
    }


    public walk () : this {
        this._scene.beginAnimation(this.skeletons[0], 0, 100, true, 1);
        return this;
    }

}
/*





  var animationBox = new BABYLON.Animation("myAnimation",
                                           this.anim_param(vector),
                                           25,
                                           BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                           BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

  var keys = [
    { frame: 0, value: this.anim_value_old(vector) },
    { frame: 15, value: this.anim_value_new(vector) }
  ];

  animationBox.setKeys(keys);
  this.main_mesh.animations.push(animationBox);

  this.scene.beginAnimation(this.main_mesh, 0, 15, true);
  this.moving = true;
  this.queue_walkcycle();

  var _this = this;
  setTimeout(function(){
    _this.moving = false;
  }, 600);

  this.main_mesh.animations.pop(animationBox);

 */
