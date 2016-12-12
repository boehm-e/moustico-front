const map =
[[1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1]]



var D, aspect, camera, cube, geometry, height, light, material, renderer, scene;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
aspect = WIDTH / HEIGHT;
D = 5;
scene = new THREE.Scene();
camera = new THREE.OrthographicCamera(-D * aspect, D * aspect, D, -D, 1, 1000);
renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);
geometry = new THREE.BoxGeometry(1, 0.1, 1);

material = new THREE.MeshPhongMaterial({
  ambient: 0x555555,
  color: 0x555555,
  specular: 0xffffff,
  shininess: 50,
  shading: THREE.SmoothShading
});

var _cubes = [];
scene.add(new THREE.AmbientLight(0x4000ff));
for (var i = -map.length/2; i < map.length/2; i++) {
    for (var j = -(map[i + map.length / 2].length)/2; j < (map[i + map.length / 2]).length/2; j++) {
      cube = new THREE.Mesh(geometry, material);
      cube.position.z = j * 1.1
      cube.position.x = i * 1.1
      _cubes.push(cube)
      scene.add(cube);
    }
}




light = new THREE.PointLight(0xffffff, 6, 40);
light.position.set(10, 20, 15);
scene.add(light);
camera.position.set(30, 20, 30);
camera.lookAt(scene.position);
renderer.render(scene, camera);
