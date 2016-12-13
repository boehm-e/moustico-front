var mouse = new THREE.Vector2();

var Controls = {
  LEFT:  false,
  UP:    false,
  RIGHT: false,
  DOWN:  false
};


function onMouseMove( event ) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


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

window.addEventListener('mousemove', function( event ) {
  var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
  vector.unproject( camera );
  raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

  var intersects = raycaster.intersectObject( GLOBAL.GROUND, true );
  console.log(intersects[0].object.id2);
  if ( intersects.length > 0 ) {
    var texture = THREE.ImageUtils.loadTexture('./assets/images/selected.png');
     intersects[0].object.faceIndex = texture;
     intersects[0].object.needsUpdate = true;
    console.log(intersects[0]);
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
