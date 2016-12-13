function init_map() {
  const map =
  [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,42,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]

  function mousewheel(e) {
    if (camera.fov > 5 && e.deltaY > 0)
    camera.fov -= e.deltaY / 100;
    if (camera.fov < 18 && e.deltaY < 0)
    camera.fov -= e.deltaY / 100;
  }

  document.body.addEventListener( 'mousewheel', mousewheel, false );
  document.body.addEventListener( 'DOMMouseScroll', mousewheel, false );
  document.body.appendChild(renderer.domElement);

  GLOBAL._cubes = fill_map(map);
  // load_clouds();



  light = new THREE.PointLight(0xffffff, 5, 39);
  light.position.set(10, 20, 15);
  scene.add(light);

  camera.position.set(20, 20, 20);
  camera.rotation.set(0 * Math.PI / 180, 0 * Math.PI / 180, 0 * Math.PI / 180);
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

function load_clouds() {
  geometry = new THREE.Geometry();

  // loading texture
  var texture = THREE.ImageUtils.loadTexture('./assets/images/clouds.png');

  // preparing fog
  // var fog = new THREE.Fog(0x251d32, - 100, 5000);

  // preparing planeMesh
  // for (i = 0; i < 100; i++) {
  //   plane = GLOBAL.materials.cloud.clone();
  //   plane.position.x = Math.random() + i * 2
  //   plane.position.y = - Math.random() * Math.random() * 10
  //   plane.position.z = i;
  //   plane.rotation.z = Math.random() * Math.PI;
  //   plane.scale.x = plane.scale.y = plane.scale.z =  0.05;
  //   GLOBAL.GROUND.add(plane);
  // }
}
