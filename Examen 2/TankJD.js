"use strict"; 

import * as THREE from './libs/three.module.js'
import { OrbitControls } from './libs/controls/OrbitControls.js';
import { GUI } from "./libs/dat.gui.module.js"
import { OBJLoader } from './libs/loaders/OBJLoader.js';

let renderer = null, scene = null, camera = null, orbitControls = null;

let ambientLight = null;

let mapUrl = "./checker_large.gif";

let PointLight = null;

let 
TankGrp = null, 
TurretGrp = null, 
DownGrp= null;

let objectModelUrl = {obj:'Tank/Tank.obj', map:'Tank/Tank_texture.jpg', obj1:'Tank/Turret.obj'};

let SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;

function main(){
    const canvas = document.getElementById("webglcanvas");
    createScene(canvas);
    update();
    createGUI();
}

function createGUI(){
    let gui = new GUI({width:300});
    let settings={
        TurretY: 0.0,
        TankY: 0.0
    };
    gui.add(settings,"TurretY",0, 10, 0.01).onChange((x)=>{
        TurretGrp.rotation.y = x
    })
    gui.add(settings,"TankY",0, 10, 0.01).onChange((x)=>{
        TankGrp.rotation.y = x
    })
}

async function loadObj(objectModelUrl){
    try{
        const object = await new OBJLoader().loadAsync(objectModelUrl.obj, onProgress, onError);
        const object2 = await new OBJLoader().loadAsync(objectModelUrl.obj1, onProgress, onError);
        let texture = objectModelUrl.hasOwnProperty('map') ? new THREE.TextureLoader().load(objectModelUrl.map) : null;
            for(const child of object.children){
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = texture;
                child.material.color.set(0x5F9EA0)
            }
        object.scale.set(10, 10.6, 15);
        object.position.x = 0;
        object.position.y = 0;
        object.position.z = 0;
        DownGrp.add(object);
        for(const child of object2.children){
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.map = texture;
            child.material.color.set(0x5F9EA0)
        }
        object2.scale.set(10, 10.6, 15);
        object2.position.x = 0;
        object2.position.y = 3.6;
        object2.position.z = 0;
        TurretGrp.add(object2);
    }
    catch (err){
        onError(err);
    }
}

function onError ( err ){ console.error( err ); };

function onProgress( xhr ){
    if ( xhr.lengthComputable ) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( xhr.target.responseURL, Math.round( percentComplete, 2 ) + '% downloaded' );
    }
}

function update(){
    requestAnimationFrame(function() { update(); });
    renderer.render( scene, camera );
    orbitControls.update();
}

async function createScene(canvas){
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer.setSize(canvas.width, canvas.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, 6, 30);
    orbitControls = new OrbitControls(camera, renderer.domElement);
    ambientLight = new THREE.AmbientLight ( 0x444444, 0.8);
    scene.add(ambientLight);
    PointLight = new THREE.PointLight( 0xffffff, 1, 1000);
    PointLight.position.set( -3, 9, 20);
    PointLight.castShadow = true;
    PointLight.shadow.camera.near = 1;
    PointLight.shadow. camera.far = 200;
    PointLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    PointLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
    scene.add( PointLight );
    const map = new THREE.TextureLoader().load(mapUrl);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(8, 8);
    let geometry = new THREE.PlaneGeometry(200, 200, 50, 50);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({map:map, side:THREE.DoubleSide}));
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -4.02;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    scene.add( mesh );

    TankGrp = new THREE.Object3D;
    TankGrp.position.set(0,0,0)
    DownGrp = new THREE.Object3D; 
    TurretGrp = new THREE.Object3D; 
    loadObj(objectModelUrl);
    TankGrp.add(DownGrp)
    TankGrp.add(TurretGrp)
    scene.add(TankGrp)
}
main();