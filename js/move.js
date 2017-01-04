var mouse = new THREE.Vector2();
GLOBAL.previousCoordinate = [-1,-1];
GLOBAL.availableNames = ["bloodhouse","caserne","rose","tree"];

var ADD_OBJECT;

var Controls = {
  LEFT:  false,
  UP:    false,
  RIGHT: false,
  DOWN:  false
};

var camMovSpd = 0.1;
var camZoomSpd = 0.5;
var raycaster = new THREE.Raycaster();
function render() {
  requestAnimationFrame(render);

  // Update camera
  if(Controls.RIGHT) {
    GLOBAL.GROUND.position.x -= camMovSpd;
    GLOBAL.GROUND.position.z += camMovSpd;
  }
  if(Controls.LEFT) {
    GLOBAL.GROUND.position.x += camMovSpd;
    GLOBAL.GROUND.position.z -= camMovSpd;
  }
  if(Controls.UP) {
    GLOBAL.GROUND.position.x += camMovSpd;
    GLOBAL.GROUND.position.z += camMovSpd;
  }
  if(Controls.DOWN) {
    GLOBAL.GROUND.position.x -= camMovSpd;
    GLOBAL.GROUND.position.z -= camMovSpd;
  }

  raycaster.setFromCamera( mouse, camera );
  if (GLOBAL._cubes) {

  }

  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
  // stats.update();
}
render();
window.addEventListener('keydown', function(e) {
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

var previousIntersect = null;

window.addEventListener('resize', function(){
  renderer.setSize( window.innerWidth, window.innerHeight )
  camera.aspect	= window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}, false)

window.addEventListener('mousemove', function( event ) {
  var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
  vector.unproject( camera );
  raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

  var intersects = raycaster.intersectObject( GLOBAL.GROUND, true );

  if ( intersects.length > 0 && intersects[0].object.coordinate != GLOBAL.previousCoordinate && intersects[0].object.coordinate != undefined) {
    GLOBAL.previousCoordinate = intersects[0].object.coordinate
    GLOBAL._cubes.map(v => {
      if (v.needToRemoveGrass == true) {
        v.material = GLOBAL.materials.grass;
      }
      if (v.needToRemoveObject == true) {
        for (var i = 0; i < v.children.length; i++) {
          v.remove(v.children[i]);
        }
      }

    })

    if (intersects[0].object.type == "grass") {
      intersects[0].object.needToRemoveGrass = true;
      intersects[0].object.material = GLOBAL.materials.selected;

      if (ADD_OBJECT) {
        var tmp = GLOBAL.objects[ADD_OBJECT].clone();
        intersects[0].object.add(tmp);
        intersects[0].object.needToRemoveObject = true;
        intersects[0].object.traverse( function( node ) {
        previousIntersect = intersects[0];
          if( node.material ) {
            node.material.opacity = 0.5;
            node.material.transparent = true;
          }
        });
      }
    }
  }
})

window.addEventListener('mousedown', function( event ) {
  if (ADD_OBJECT) {
    previousIntersect.object.traverse( function( node ) {
      if( node.material ) {
        node.material.opacity = 1;
        node.material.transparent = true;
      }
    });
    previousIntersect.object.needToRemoveObject = false;
    for (var i = 0; i < previousIntersect.object.length; i++) {
      previousIntersect.remove(previousIntersect.object[i])
    }
    var tmp = GLOBAL.objects[ADD_OBJECT].clone();
    tmp.TYPE = ADD_OBJECT;
    tmp.userData.test = "DEF"
    previousIntersect.object.add(tmp)
    previousIntersect.test = "DDD"
  }
});
var fff;
window.addEventListener('mouseup', function( event ) {
  var abc;
  var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
  vector.unproject( camera );
  raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
  var intersects = raycaster.intersectObject( GLOBAL.GROUND, true );
  if ( intersects.length > 0 ) {
    fff = intersects[0]
    var tmp = fff.object;
    while (tmp) {
      tmp = tmp.parent
      if (!ADD_OBJECT && tmp && tmp.name && GLOBAL.availableNames.indexOf(tmp.name) > -1) {
        handleModal(tmp.name)
        break;
      }
    }
    // SET ADD_OBJECT ONCLICK ON ITEM TO ADD CUSTOM ITEM TO CLICK LOCATION
    switch (ADD_OBJECT) {
      case "bloodhouse":
      intersects[0].object.add(GLOBAL.objects.bloodhouse.clone())
      GLOBAL.map[GLOBAL.previousCoordinate[0]][GLOBAL.previousCoordinate[1]] = 42;
      break;
      case "caserne":
      intersects[0].object.add(GLOBAL.objects.caserne.clone())
      GLOBAL.map[GLOBAL.previousCoordinate[0]][GLOBAL.previousCoordinate[1]] = 43;
      break;
      case "tree":
      abc = intersects[0].object.add(GLOBAL.objects.tree.clone())
      GLOBAL.map[GLOBAL.previousCoordinate[0]][GLOBAL.previousCoordinate[1]] = 44;
      break;
      case "wall":
      abc = intersects[0].object.add(GLOBAL.objects.tree.clone())
      GLOBAL.map[GLOBAL.previousCoordinate[0]][GLOBAL.previousCoordinate[1]] = 45;
      break;
    }
    if ($('#modal1').css('display') == 'none' && ADD_OBJECT) {
      socket.emit('map', GLOBAL.map)
    }
    ADD_OBJECT = false;
  }
})

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
