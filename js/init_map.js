function init_map(map) {
  console.log("MAPPPPPPPP", map);

  function mousewheel(e) {
    if (camera.fov > 5 && e.deltaY > 0)
    camera.fov -= e.deltaY / 100;
    if (camera.fov < 25 && e.deltaY < 0)
    camera.fov -= e.deltaY / 100;
  }

  document.body.addEventListener( 'mousewheel', mousewheel, false );
  document.body.addEventListener( 'DOMMouseScroll', mousewheel, false );
  document.body.appendChild(renderer.domElement);

  GLOBAL._cubes = fill_map(map);

  light = new THREE.PointLight(0xffffff, 5, 39);
  light.position.set(10, 20, 15);
  scene.add(light);

  camera.position.set(20, 20, 20);
  camera.rotation.set(0 * Math.PI / 180, 0 * Math.PI / 180, 0 * Math.PI / 180);
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
