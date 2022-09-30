"use strict"; 

import * as THREE from "../libs/three.js/three.module.js"
import {addMouseHandler} from "./sceneHandlers.js"

let renderer = null, scene = null, camera = null, Shoulder = null, muscle = null, Elbow = null, Forearm = null, Wrist = null, Hand= null ;
let armGroup = null, muscleGroup= null, bowGroup = null, foreGroup = null, wristGroup = null, handGroup = null;
let GroundGroup= null;

let mapUrl = "../images/checker_large.gif";

const duration = 5000;
let currentTime = Date.now();

function main(){
    const canvas = document.getElementById("webglcanvas");
    createScene(canvas);
    update();
    controls();
}

function animate() {
    const now = Date.now();
    const deltat = now - currentTime;
    currentTime = now;
    /*const fract = deltat / duration;
    const angle = Math.PI * 2 * fract;*/
}

function controls(){
    document.getElementById("ForearmYSlider").oninput = function(event) {
        document.getElementById("ForearmY").innerHTML = "Forearm in Y axis: " + event.target.value;
        foreGroup.rotation.y = event.target.value;
    };
    
    document.getElementById("WristXSlider").oninput = function(event) {
        document.getElementById("WristX").innerHTML = "Wrist in X axis: " + event.target.value;
        wristGroup.rotation.x = event.target.value;
    };
    
    document.getElementById("HandXSlider").oninput = function(event) {
        document.getElementById("HandX").innerHTML = "Hand in X axis: " + event.target.value;
        handGroup.rotation.x = event.target.value;
    };

    document.getElementById("HandZSlider").oninput = function(event) {
        document.getElementById("HandZ").innerHTML = "Hand in Z axis: " + event.target.value;
        handGroup.rotation.z = event.target.value;
    };
    
    document.getElementById("ShoulderXSlider").oninput = function(event) {
        document.getElementById("ShoulderX").innerHTML = "Shoulder in X axis: " + event.target.value;
        armGroup.rotation.x = event.target.value;
    };

    document.getElementById("ElbowXSlider").oninput = function(event) {
        document.getElementById("ElbowX").innerHTML = "Elbow in X axis: " + event.target.value;
        bowGroup.rotation.x = event.target.value;
    };

    document.getElementById("ShoulderZSlider").oninput = function(event) {
        document.getElementById("ShoulderZ").innerHTML = "Shoulder in Z axis: " + event.target.value;
        armGroup.rotation.z = event.target.value;
    };

}

function update(){
    requestAnimationFrame(function() { update(); });
    renderer.render( scene, camera );
    animate();
}

function createScene(canvas){   
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer.setSize(canvas.width, canvas.height);

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0.2, 0.3, 0.3);

    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.z = 20;
    scene.add(camera);

    armGroup = new THREE.Object3D;

    scene.add(armGroup);

    console.log(armGroup.position);

    const light = new THREE.DirectionalLight( 0xffffff, 1.0);

    light.position.set(-.5, .2, 1);
    light.target.position.set(0,-2,0);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    let faceColors = [
       [1.0, 1.0, 1.0], 
       [0.0, 0.0, 0.0], 
       [0.0, 1.0, 0.0], 
       [1.0, 1.0, 1.0], 
       [0.0, 0.0, 1.0], 
       [1.0, 0.0, 1.0]  
    ];
       let vertexColors = [];
       faceColors.forEach(color =>{
           for (let i = 0; i < 4; i++)
               vertexColors.push(...color);
       });
   
       const colorsAttr = new THREE.Float32BufferAttribute(vertexColors, 3);
   
       geometry.setAttribute('color', colorsAttr);
   
       const material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});
   
       Shoulder = new THREE.Mesh(geometry, material);

       armGroup.add( Shoulder );
   
       armGroup.position.set(0, 1, 0);
   
       muscleGroup = new THREE.Object3D;
       armGroup.add(muscleGroup);
   
       geometry = new THREE.BoxGeometry(2.5, 1, 1);
       geometry.setAttribute('color', colorsAttr);
   
       muscle = new THREE.Mesh(geometry, material);
       muscleGroup.position.set(-1.5 ,0,0);
       muscleGroup.add(muscle);
   
       bowGroup = new THREE.Object3D;
       muscleGroup.add(bowGroup);
   
       geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
       geometry.setAttribute('color', colorsAttr);
   
       Elbow = new THREE.Mesh(geometry, material);
       bowGroup.position.set(-1.5 ,0,0);
       bowGroup.add(Elbow);
   
       foreGroup = new THREE.Object3D;
       bowGroup.add(foreGroup);
   
       geometry = new THREE.BoxGeometry(0.75, 2.5, 1);
       geometry.setAttribute('color', colorsAttr);
   
       Forearm = new THREE.Mesh(geometry, material);
       foreGroup.position.set(-0.25 ,1.5,0);
       foreGroup.add(Forearm);
   
       wristGroup = new THREE.Object3D;
       foreGroup.add(wristGroup);
   
       geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
       geometry.setAttribute('color', colorsAttr);
   
       Wrist = new THREE.Mesh(geometry, material);
       wristGroup.position.set(0.5 ,1.5,0);
       wristGroup.rotation.z = -0.75
       wristGroup.add(Wrist);
   
       handGroup = new THREE.Object3D;
       wristGroup.add(handGroup);
   
       geometry = new THREE.BoxGeometry(0.65, 1, 1);
       geometry.setAttribute('color', colorsAttr);
   
       Hand = new THREE.Mesh(geometry, material);
       handGroup.position.set(0.5,0.65,0);
       handGroup.rotation.z = -0.75
       handGroup.add(Hand);
   
       GroundGroup = new THREE.Object3D;
       scene.add(GroundGroup)
   
       const map = new THREE.TextureLoader().load(mapUrl);
       map.wrapS = map.wrapT = THREE.RepeatWrapping;
       map.repeat.set(8, 8);

       geometry = new THREE.PlaneGeometry(200, 200, 50, 50);
       let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({map:map, side:THREE.DoubleSide}));
   
       mesh.rotation.x = -Math.PI / 2;
       mesh.position.y = -4.02;
       mesh.castShadow = false;
       mesh.receiveShadow = true;
       GroundGroup.add( mesh );

       let AllGroup= new THREE.Object3D;
       scene.add(AllGroup)
       AllGroup.add(armGroup)
       AllGroup.add(GroundGroup)

    

    addMouseHandler(canvas, AllGroup);
}

main();