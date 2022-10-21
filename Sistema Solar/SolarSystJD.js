import * as THREE from "../../libs/three.js/three.module.js"
import { OrbitControls } from '../../libs/three.js/controls/OrbitControls.js';

let renderer = null, scene = null, camera = null;

let SolSyst = null;

let 
Sun = null,
Mercury = null, 
Venus = null, 
Earth = null,
EarthMoon = null,
Mars = null,
Phobos = null,
Deimos = null,
Jupiter = null,
Saturn= null,
Uranus = null,
Neptune = null,
Pluto = null;

let 
SunGroup = null,
MercuryGroup = null, 
VenusGroup = null, 
EarthGroup = null, 
MarsGroup = null, 
JupiterGroup = null, 
SaturnGroup = null, 
UranusGroup = null,
NeptuneGroup = null, 
PlutoGroup = null;

let 
MercurySunGroup = null, 
VenusSunGroup = null, 
EarthSunGroup = null, 
MarsSunGroup = null, 
JupiterSunGroup = null, 
SaturnSunGroup = null, 
UranusSunGroup = null, 
NeptuneSunGroup = null, 
PlutoSunGroup = null;

let 
EarthMoonGroup = null, 
MarsPhobosGroup = null, 
MarsDeimosGroup;

let 
MercuryOrbit = null, 
VenusOrbit = null, 
EarthOrbit = null, 
MarsOrbit = null,
AsteroidBelt = null, 
JupiterOrbit = null, 
SaturnOrbit = null, 
UranusOrbit = null, 
NeptuneOrbit = null, 
PlutoOrbit = null;

let orbitControls = null;

let materials = {}

let DateTime = Date.now();
let OrbitLength = 9800;

function main(){
    const canvas = document.getElementById("webglcanvas");
    createScene(canvas);
    update();
}

function animate(){
    let atm = Date.now();
    let difference = atm - DateTime;
    DateTime = atm;
    let div = difference / OrbitLength;
    let rot = Math.PI * 2 * div;
    Sun.rotation.y += rot 
    Mercury.rotation.y += rot 
    Venus.rotation.y += rot 
    Earth.rotation.y += rot 
    Mars.rotation.y += rot 
    Jupiter.rotation.y += rot 
    Saturn.rotation.y += rot 
    Uranus.rotation.y += rot 
    Neptune.rotation.y += rot 
    Pluto.rotation.y += rot
    MercurySunGroup.rotation.y -= rot/1.5
    VenusSunGroup.rotation.y -= rot/3
    EarthSunGroup.rotation.y -= rot/4.5
    MarsSunGroup.rotation.y -= rot/6
    JupiterSunGroup.rotation.y -= rot/7.5
    SaturnSunGroup.rotation.y -= rot/9
    UranusSunGroup.rotation.y -= rot/10.5
    NeptuneSunGroup.rotation.y -= rot/12
    PlutoSunGroup.rotation.y -= rot/13.5

    EarthMoonGroup.rotation.y += rot 
    MarsPhobosGroup.rotation.y += rot
    MarsDeimosGroup.rotation.x += rot
}

function update(){
    requestAnimationFrame(function() { update(); });
    renderer.render( scene, camera );
    animate()
    orbitControls.update();
}


function createMaterials(){
    let Sunmap =  "Assets/sunmap.jpg";
    let Mercurymap = "Assets/mercurymap.jpg"
    let Venusmap = "Assets/venusmap.jpg"
    let Earthmap = "Assets/earthmap.jpg"
    let EarthMoonmap = "Assets/moonmap.jpg"
    let Marsmap = "Assets/marsmap.jpg"
    let Phobosmap = "Assets/phobosbump.jpg"
    let Deimosmap = "Assets/deimosbump.jpg"
    let Jupitermap = "Assets/jupitermap.jpg"
    let Saturnmap = "Assets/saturnmap.jpg"
    let Uranusmap = "Assets/uranusmap.jpg"
    let Neptunemap = "Assets/neptunemap.jpg"
    let Plutomap = "Assets/plutomap.jpg"

    const TextureSun = new THREE.TextureLoader().load(Sunmap);
    materials["Sun"] = new THREE.MeshBasicMaterial({ map: TextureSun });

    const TextureMercury = new THREE.TextureLoader().load(Mercurymap);
    materials["Mercury"] = new THREE.MeshPhongMaterial({ map: TextureMercury});

    const TextureVenus = new THREE.TextureLoader().load(Venusmap);
    materials["venus"] = new THREE.MeshPhongMaterial({ map: TextureVenus});

    const TextureEarth = new THREE.TextureLoader().load(Earthmap);
    materials["Earth"] = new THREE.MeshPhongMaterial({ map: TextureEarth });

    const TextureEarthMoon = new THREE.TextureLoader().load(EarthMoonmap);
    materials["EarthMoon"] = new THREE.MeshPhongMaterial({ map: TextureEarthMoon });

    const TextureMars = new THREE.TextureLoader().load(Marsmap);
    materials["Mars"] = new THREE.MeshPhongMaterial({ map: TextureMars });

    const TexturePhobos = new THREE.TextureLoader().load(Phobosmap);
    materials["Phobos"] = new THREE.MeshPhongMaterial({map: TexturePhobos})

    const TextureDeimos = new THREE.TextureLoader().load(Deimosmap);
    materials["Deimos"] = new THREE.MeshPhongMaterial({map: TextureDeimos})

    const TextureJupiter = new THREE.TextureLoader().load(Jupitermap);
    materials["Jupiter"] = new THREE.MeshPhongMaterial({ map: TextureJupiter });

    const TextSaturn = new THREE.TextureLoader().load(Saturnmap);
    materials["Saturn"] = new THREE.MeshPhongMaterial({ map: TextSaturn });

    const TextUranus = new THREE.TextureLoader().load(Uranusmap);
    materials["Uranus"] = new THREE.MeshPhongMaterial({ map: TextUranus });

    const TextNeptune = new THREE.TextureLoader().load(Neptunemap);
    materials["Neptune"] = new THREE.MeshPhongMaterial({ map: TextNeptune });

    const TextPluto = new THREE.TextureLoader().load(Plutomap);
    materials["Pluto"] = new THREE.MeshPhongMaterial({ map: TextPluto });
    
    materials["Orbit"] = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
}

function createScene(canvas){   
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer.setSize(canvas.width, canvas.height);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(100, 100, 900);
    scene.add(camera);
    orbitControls = new OrbitControls(camera, renderer.domElement);
    const PointLight = new THREE.PointLight(0xffffff, 1.0, 1000);
    scene.add(PointLight);
    
    createMaterials();

    let geometry = new THREE.SphereGeometry(21.4, 36, 36);
    let geometryMoon= new THREE.SphereGeometry(1.8, 30, 30);
    let geometryOrbit = new THREE.RingGeometry(31, 30.9, 40)
    SolSyst = new THREE.Object3D;
    SolSyst.position.set(0, 0, 0);
    
    SunGroup = new THREE.Object3D;
    SolSyst.add(SunGroup);
    Sun = new THREE.Mesh(geometry, materials["Sun"]);
    SunGroup.position.set(0, 0, 0);
    SunGroup.add(Sun);

    MercuryGroup = new THREE.Object3D;
    MercurySunGroup = new THREE.Object3D;
    SunGroup.add(MercurySunGroup)
    MercurySunGroup.add(MercuryGroup)
    geometry = new THREE.SphereGeometry(6, 30, 30);

    Mercury = new THREE.Mesh(geometry, materials["Mercury"]);
    MercuryGroup.position.set(31, 0, 0);
    MercuryGroup.add(Mercury);
    MercuryOrbit = new THREE.Mesh(geometryOrbit , materials["Orbit"]);
    MercuryOrbit.position.set(0, 0, 0)
    MercuryOrbit.rotation.x = Math.PI/2
    SunGroup.add(MercuryOrbit)
    
    VenusGroup = new THREE.Object3D;
    VenusSunGroup = new THREE.Object3D;
    SunGroup.add(VenusSunGroup)
    VenusSunGroup.add(VenusGroup);

    geometry = new THREE.SphereGeometry(6, 30, 30);

    Venus = new THREE.Mesh(geometry, materials["venus"]);
    VenusGroup.position.set(54, 0, 0);
    VenusGroup.add(Venus);
    geometryOrbit = new THREE.RingGeometry(54, 53.9, 62)
    VenusOrbit = new THREE.Mesh(geometryOrbit , materials["Orbit"]);
    VenusOrbit.position.set(0, 0, 0)
    VenusOrbit.rotation.x = Math.PI/2
    SunGroup.add(VenusOrbit)

    EarthGroup = new THREE.Object3D;
    EarthSunGroup = new THREE.Object3D;
    SunGroup.add(EarthSunGroup)
    EarthSunGroup.add(EarthGroup);
    geometry = new THREE.SphereGeometry(6, 30, 30);
    Earth = new THREE.Mesh(geometry, materials["Earth"]);
    EarthGroup.position.set(77, 0, 0);
    EarthGroup.add(Earth);
    EarthMoonGroup = new THREE.Object3D;
    EarthGroup.add(EarthMoonGroup)
    EarthMoon = new THREE.Mesh(geometryMoon, materials["EarthMoon"]);
    EarthMoon.position.set(11,0,0);
    EarthMoonGroup.add(EarthMoon);
    geometryOrbit = new THREE.RingGeometry(77, 76.9, 32)
    EarthOrbit = new THREE.Mesh(geometryOrbit , materials["Orbit"]);
    EarthOrbit.position.set(0, 0, 0)
    EarthOrbit.rotation.x = Math.PI/2
    SunGroup.add(EarthOrbit)

    MarsGroup = new THREE.Object3D;
    MarsSunGroup = new THREE.Object3D;
    SunGroup.add(MarsSunGroup)
    MarsSunGroup.add(MarsGroup);

    geometry = new THREE.SphereGeometry(6, 30, 30);

    Mars = new THREE.Mesh(geometry, materials["Mars"]);
    MarsGroup.position.set(100, 0, 0);
    MarsGroup.add(Mars);
    MarsPhobosGroup = new THREE.Object3D;
    MarsDeimosGroup = new THREE.Object3D;
    MarsGroup.add(MarsPhobosGroup)
    MarsGroup.add(MarsDeimosGroup)
    geometryMoon = new THREE.SphereGeometry(2, 30, 30)
    Phobos = new THREE.Mesh(geometryMoon, materials["Phobos"]);
    Deimos = new THREE.Mesh(geometryMoon, materials["Deimos"]);
    Phobos.position.set(12, 12, 0);
    Deimos.position.set(12, -12, 0);
    MarsPhobosGroup.add(Phobos);
    MarsDeimosGroup.add(Deimos);
    geometryOrbit = new THREE.RingGeometry(100,99.9,100)
    MarsOrbit = new THREE.Mesh(geometryOrbit , materials["Orbit"]);
    MarsOrbit.position.set(0, 0, 0)
    MarsOrbit.rotation.x = Math.PI/2
    SunGroup.add(MarsOrbit)
    
//AsteroidBelt (No me salió :( )
    geometryOrbit = new THREE.RingGeometry(123,122.9,60)
    AsteroidBelt = new THREE.Mesh(geometryOrbit , materials["Orbit"]);
    AsteroidBelt.position.set(0,0,0)
    AsteroidBelt.rotation.x = Math.PI/2
    SunGroup.add(AsteroidBelt)

    JupiterGroup = new THREE.Object3D;
    JupiterSunGroup = new THREE.Object3D;
    SunGroup.add(JupiterSunGroup)
    JupiterSunGroup.add(JupiterGroup);

    geometry = new THREE.SphereGeometry(6, 30, 30);

    Jupiter = new THREE.Mesh(geometry, materials["Jupiter"]);
    JupiterGroup.position.set(146, 0, 0);
    JupiterGroup.add(Jupiter);
    geometryOrbit = new THREE.RingGeometry(146, 145.9, 60)
    JupiterOrbit = new THREE.Mesh(geometryOrbit , materials["Orbit"]);
    JupiterOrbit.position.set(0, 0, 0)
    JupiterOrbit.rotation.x = Math.PI/2
    SunGroup.add(JupiterOrbit)

    SaturnGroup = new THREE.Object3D;
    SaturnSunGroup = new THREE.Object3D;
    SunGroup.add(SaturnSunGroup)
    SaturnSunGroup.add(SaturnGroup);

    geometry = new THREE.SphereGeometry(6, 30, 30);

    Saturn = new THREE.Mesh(geometry, materials["Saturn"]);
    SaturnGroup.position.set(169, 0, 0);
    SaturnGroup.add(Saturn);

    geometryOrbit = new THREE.RingGeometry(169,168.9,100)
    SaturnOrbit = new THREE.Mesh(geometryOrbit , materials["Orbit"]);
    SaturnOrbit.position.set(0, 0, 0)
    SaturnOrbit.rotation.x = Math.PI/2
    SunGroup.add(SaturnOrbit)

    UranusGroup = new THREE.Object3D;
    UranusSunGroup = new THREE.Object3D;
    SunGroup.add(UranusSunGroup)
    UranusSunGroup.add(UranusGroup);

    geometry = new THREE.SphereGeometry(6, 30, 30);

    Uranus = new THREE.Mesh(geometry, materials["Uranus"]);
    UranusGroup.position.set(192, 0, 0);
    UranusGroup.add(Uranus);

    geometryOrbit = new THREE.RingGeometry(192,191.9,100)
    UranusOrbit = new THREE.Mesh(geometryOrbit , materials["Orbit"]);
    UranusOrbit.position.set(0, 0, 0)
    UranusOrbit.rotation.x = Math.PI/2
    SunGroup.add(UranusOrbit)

    NeptuneGroup = new THREE.Object3D;
    NeptuneSunGroup = new THREE.Object3D;
    SunGroup.add(NeptuneSunGroup)
    NeptuneSunGroup.add(NeptuneGroup);

    geometry = new THREE.SphereGeometry(6, 30, 30);

    Neptune = new THREE.Mesh(geometry, materials["Neptune"]);
    NeptuneGroup.position.set(215, 0, 0);
    NeptuneGroup.add(Neptune);

    geometryOrbit = new THREE.RingGeometry(215, 214.9, 100)
    NeptuneOrbit = new THREE.Mesh(geometryOrbit , materials["Orbit"]);
    NeptuneOrbit.position.set(0, 0, 0)
    NeptuneOrbit.rotation.x = Math.PI/2
    SunGroup.add(NeptuneOrbit)

    PlutoGroup = new THREE.Object3D;
    PlutoSunGroup = new THREE.Object3D;
    SunGroup.add(PlutoSunGroup)
    PlutoSunGroup.add(PlutoGroup);

    geometry = new THREE.SphereGeometry(6, 30, 30);

    Pluto = new THREE.Mesh(geometry, materials["Pluto"]);
    PlutoGroup.position.set(228, 0, 0);
    PlutoGroup.add(Pluto);

    geometryOrbit = new THREE.RingGeometry(228, 227.9, 100)
    PlutoOrbit = new THREE.Mesh(geometryOrbit, materials["Orbit"]);
    PlutoOrbit.position.set(0, 0, 0)
    PlutoOrbit.rotation.x = Math.PI/2
    SunGroup.add(PlutoOrbit)
    
    scene.add(SolSyst);
}
main();