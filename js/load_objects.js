var GROUND = new THREE.Object3D();
var D = 14; // FIELD OF VIEW
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;


/******************************/
/*     LOAD 3D OBJECTS        */
/******************************/
var loader = new THREE.ObjectLoader();
var JSON_rose = new Promise((resolve, reject) => {
  loader.load('./assets/objects/rose/rose.json',function ( obj ) {
    // obj.scale.set(0.03,0.03,0.03)
    return resolve(obj);
  });
});

var loader = new THREE.ObjectLoader();
var JSON_tree = new Promise((resolve, reject) => {
  loader.load('./assets/objects/tree/tree.json',function ( obj ) {
    obj.scale.set(0.3,0.3,0.3)
    return resolve(obj);
  });
});

var loader = new THREE.ObjectLoader();
var JSON_house = new Promise((resolve, reject) => {
  loader.load('./assets/objects/bloodhouse/bloodhouse.json',function ( obj ) {
    // obj.scale.set(0.2,0.2,0.2)
    return resolve(obj);
  });
});

var loader = new THREE.ObjectLoader();
var JSON_caserne = new Promise((resolve, reject) => {
  loader.load('./assets/objects/caserne/caserne.json',function ( obj ) {
    // obj.scale.set(0.3,0.3,0.3)
    return resolve(obj);
  });
});

var loader = new THREE.ObjectLoader();
var JSON_redbull = new Promise((resolve, reject) => {
  loader.load('./assets/objects/redbull/redbull.json',function ( obj ) {
    // obj.scale.set(0.3,0.3,0.3)
    return resolve(obj);
  });
});


/******************************/
/*      LOAD TEXTURES         */
/******************************/
var texture = THREE.ImageUtils.loadTexture('./assets/images/herbe.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var GrassMaterial = new THREE.MeshLambertMaterial( { map: texture });

var texture = THREE.ImageUtils.loadTexture('./assets/images/water.png');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var WaterMaterial = new THREE.MeshLambertMaterial( { map: texture });

var texture = THREE.ImageUtils.loadTexture('./assets/images/selected.png');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var SelectedMaterial = new THREE.MeshLambertMaterial( { map: texture });

var texture = THREE.ImageUtils.loadTexture( "./assets/images/clouds.png" );
var material = new THREE.MeshLambertMaterial({ map : texture, transparent: true });
var CloudMaterial = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), material);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(D, WIDTH / HEIGHT, 1, 1000);


var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);



/******************************/
/*     DEFINE GLOBALES        */
/******************************/

var GLOBAL = {};
GLOBAL.materials = {};
GLOBAL.materials.water = WaterMaterial;
GLOBAL.materials.grass = GrassMaterial;
GLOBAL.materials.selected = SelectedMaterial;
GLOBAL.materials.cloud = CloudMaterial;
GLOBAL.WIDTH = WIDTH;
GLOBAL.HEIGHT = HEIGHT;
GLOBAL.aspect = GLOBAL.WIDTH / GLOBAL.HEIGHT;
GLOBAL.D = D;
GLOBAL.GROUND = GROUND;
GLOBAL.scene = scene;
GLOBAL.camera = camera;

Promise.all([JSON_rose, JSON_tree, JSON_house, JSON_caserne, JSON_redbull]).then((valeurs) => {
  GLOBAL.objects = {};
  GLOBAL.objects.rose = valeurs[0];
  GLOBAL.objects.tree = valeurs[1];
  GLOBAL.objects.house = valeurs[2];
  GLOBAL.objects.caserne = valeurs[3];
  GLOBAL.objects.redbull = valeurs[4];
});
