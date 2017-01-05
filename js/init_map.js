function init_map(map) {
  console.log("MAPPPPPPPP", map);

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
  // camera.position.set(20, 20, 20);
  // camera.rotation.set(0 * Math.PI / 180, 0 * Math.PI / 180, 90 * Math.PI / 180);
  // camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
