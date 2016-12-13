function fill_map(map) {
  var _cubes = [];
  var geometry = new THREE.BoxGeometry(1, 0.1, 1);
  var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  var floor = new THREE.Mesh( geometry, material );
  floor.scale.set(100,100,100)
  floor.position.z = -10
  floor.position.x = -10
  floor.position.y = -10
  GLOBAL.GROUND.add(floor)
  for (var i = -map.length/2; i < map.length/2; i++) {
    for (var j = -(map[i + map.length / 2].length)/2; j < (map[i + map.length / 2]).length/2; j++) {
      var z = map[i + map.length/2].length/2 + j;
      var type = map[i + map.length/2][map[i + map.length/2].length/2 + j];
      var cube
      switch (type) {
        case 0:
        cube = new THREE.Mesh(geometry, GrassMaterial);
        break;
        case 1:
        cube = new THREE.Mesh(geometry, WaterMaterial);
        cube.add(GLOBAL.objects.tree.clone())
        break;
        case 42:
        cube = new THREE.Mesh(geometry, WaterMaterial);
        cube.add(GLOBAL.objects.house.clone())
        break;
        case 8: // CLOUDS
        // cube = GLOBAL.materials.cloud.clone();
        // cube.scale.x = cube.scale.y = cube.scale.z =  0.1 * Math.random();
        break;
      }
      if (cube) {
        cube.id2 = [i + map.length/2, j+(map[i + map.length / 2].length)/2]
        cube.position.z = j * 1//.05
        cube.position.x = i * 1//.05
        _cubes.push(cube)
        GLOBAL.GROUND.add( cube );
      }
    }
  }
  scene.add(GROUND);
  return _cubes
}