var delayCreateScene = function () {
    var scene = new BABYLON.Scene(engine);

    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var box1 = BABYLON.Mesh.CreateBox("Box1", 10.0, scene);

    var materialBox = new BABYLON.StandardMaterial("mat", scene);
    materialBox.diffuseColor = new BABYLON.Color3(0, 1, 0);

    box1.material = materialBox;

    //Create a scaling animation at 30 FPS
    var animationBox = new BABYLON.Animation("tutoAnimation", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    // Animation keys
    var keys = [];
    //At the animation key 0, the value of scaling is "1"
    keys.push({
        frame: 0,
        value: 10
    });

    //At the animation key 20, the value of scaling is "0.2"
    keys.push({
        frame: 20,
        value: 0.2
    });

    //At the animation key 100, the value of scaling is "1"
    keys.push({
        frame: 100,
        value: 10
    });

    animationBox.setKeys(keys);

    var animationBoxb = new BABYLON.Animation("tutoAnimatioan", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keysb = [];
    //At the animation key 0, the value of scaling is "1"
    keysb.push({
        frame: 20,
        value: 10
    });

    //At the animation key 20, the value of scaling is "0.2"
    keysb.push({
        frame: 100,
        value: 0.2
    });

    animationBoxb.setKeys(keysb);

    box1.animations.push(animationBox);
    box1.animations.push(animationBoxb);

    setTimeout(async () => {
        var anim = scene.beginAnimation(box1, 0, 100, false);

    console.log("before");
    await anim.waitAsync();
    console.log("after");
},5000);

    return scene;
}