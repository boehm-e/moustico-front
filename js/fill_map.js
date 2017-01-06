function fill_map(map) {
  GLOBAL.map = map;
  var _cubes = [];
  var geometry = new THREE.BoxGeometry(1, 0.1, 1);
  var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  var floor = new THREE.Mesh( geometry, material );
  floor.scale.set(100,100,100)
  floor.position.z = -10
  floor.position.x = -10
  floor.position.y = -10
  // GLOBAL.GROUND.add(floor)
  GLOBAL.GROUND.rotation.y = Math.PI / 2;
  for (var i = -map.length/2; i < map.length/2; i++) {
    for (var j = -(map[i + map.length / 2].length)/2; j < (map[i + map.length / 2]).length/2; j++) {
      var type = map[i + map.length/2][map[i + map.length/2].length/2 + j];
      var cube
      switch (type) {
        case 0: // herbe, materiel basique
          cube = new THREE.Mesh(geometry, GrassMaterial);
          cube.type = "grass"
          break;
        case 1: // wall
          cube = new THREE.Mesh(geometry, GrassMaterial);
          cube.type = "water"
          cube.add(GLOBAL.objects.wall.clone())
          break;
        case 2: // eau
          cube = new THREE.Mesh(geometry, WaterMaterial);
          cube.type = "water"
          break;
        case 42: // banque de sang
          cube = new THREE.Mesh(geometry, GrassMaterial);
          cube.type = "water"
          cube.add(GLOBAL.objects.bloodhouse.clone())
          break;
        case 43: // caserne
          cube = new THREE.Mesh(geometry, GrassMaterial);
          cube.type = "water"
          cube.add(GLOBAL.objects.caserne.clone())
          break;
        case 44: // banque de sang
          cube = new THREE.Mesh(geometry, GrassMaterial);
          cube.type = "water"
          cube.add(GLOBAL.objects.tree.clone())
          break;
        case 45: // banque de sang
          cube = new THREE.Mesh(geometry, GrassMaterial);
          cube.type = "wall"
          cube.add(GLOBAL.objects.wall.clone())
          break;
        case 46: // banque de sang
          cube = new THREE.Mesh(geometry, GrassMaterial);
          cube.type = "tower"
          cube.add(GLOBAL.objects.tower.clone())
          break;
        case 47: // banque de sang
          cube = new THREE.Mesh(geometry, GrassMaterial);
          cube.type = "redbull"
          cube.add(GLOBAL.objects.redbull.clone())
          break;
        case 48: // banque de sang
          cube = new THREE.Mesh(geometry, GrassMaterial);
          cube.type = "canon"
          cube.add(GLOBAL.objects.canon.clone())
          break;
      }

      if (cube) {
        cube.coordinate = [i + map.length/2, j+(map[i + map.length / 2].length)/2]
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
