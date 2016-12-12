const map =
[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]



/* TEXTURES */
var texture = THREE.ImageUtils.loadTexture('./assets/images/herbe.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var GrassMaterial = new THREE.MeshLambertMaterial( { map: texture });

var texture = THREE.ImageUtils.loadTexture('./assets/images/water.png');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var WaterMaterial = new THREE.MeshLambertMaterial( { map: texture });




var GROUND = new THREE.Object3D();

var D, aspect, camera, cube, geometry, height, light, material, renderer, scene;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
aspect = WIDTH / HEIGHT;
D = 14;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(D, WIDTH / HEIGHT, 1, 1000);

renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);
geometry = new THREE.BoxGeometry(1, 0.1, 1);


var _cubes = [];
for (var i = -map.length/2; i < map.length/2; i++) {
    for (var j = -(map[i + map.length / 2].length)/2; j < (map[i + map.length / 2]).length/2; j++) {
        var type = map[i + map.length/2][map[i + map.length/2].length/2 + j];
        console.log(type);
        switch (type) {
            case 0:
                cube = new THREE.Mesh(geometry, WaterMaterial);
                break;
            case 1:
                cube = new THREE.Mesh(geometry, GrassMaterial);
                break;
        }
        cube.position.z = j * 1.05
        cube.position.x = i * 1.05
        _cubes.push(cube)
        GROUND.add( cube );
    }
}
scene.add(GROUND);


light = new THREE.PointLight(0xffffff, 6, 40);
light.position.set(10, 20, 15);
scene.add(light);

camera.position.set(20, 20, 20);
camera.rotation.set(0 * Math.PI / 180, 0 * Math.PI / 180, 0 * Math.PI / 180);
camera.lookAt(scene.position);


renderer.render(scene, camera);

var Controls = {
    LEFT:  false,
    UP:    false,
    RIGHT: false,
    DOWN:  false
};


var camMovSpd = 0.3;
var camZoomSpd = 0.5;
function render() {
    requestAnimationFrame(render);

    // Update camera
    if(Controls.RIGHT) {
        GROUND.position.x -= camMovSpd;
        GROUND.position.z += camMovSpd;
    }
    if(Controls.LEFT) {
        GROUND.position.x += camMovSpd;
        GROUND.position.z -= camMovSpd;
    }
    if(Controls.UP) {
        GROUND.position.x += camMovSpd;
        GROUND.position.z += camMovSpd;
    }
    if(Controls.DOWN) {
        GROUND.position.x -= camMovSpd;
        GROUND.position.z -= camMovSpd;
    }


    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
    // stats.update();
}
render();
window.addEventListener('keydown', function(e) {

    // console.log(e.keyCode);

    switch(e.keyCode) {
        case 87: // W
        case 38: // Up Arrow
        Controls.UP = true;
        break;
        case 83: // S
        case 40: // Down Arrow
        Controls.DOWN = true;
        break;
        case 65: // A
        case 37: // Left Arrow
        Controls.LEFT = true;
        break;
        case 68: // D
        case 39: // Right Arrow
        Controls.RIGHT = true;
        break;
    }
});

window.addEventListener('keyup', function(e) {
    switch(e.keyCode) {
        case 87: // W
        case 38: // Up Arrow
        Controls.UP = false;
        break;
        case 83: // S
        case 40: // Down Arrow
        Controls.DOWN = false;
        break;
        case 65: // A
        case 37: // Left Arrow
        Controls.LEFT = false;
        break;
        case 68: // D
        case 39: // Right Arrow
        Controls.RIGHT = false;
        break;
    }
});
