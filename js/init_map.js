const map =
[[1,1,1,1,1,1],
[1,0,0,0,0,1],
[1,0,0,0,0,1],
[1,0,0,0,0,1],
[1,0,0,0,0,1],
[1,1,1,1,1,1]]


// Create ThreeJS scene
var scene, renderer, camera, controls;

init();
animate();

function init()
{
	basicScene();

    var geometry = new THREE.BoxGeometry(5,0.1,5);
    var cube = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial( { color: 0x00ffff }));
    scene.add( cube );

    camera.position.x=5;
    camera.position.y=5;
    camera.position.z=5;
    console.log(cube.position);
    camera.lookAt( cube.position );
}

function animate()
{
    requestAnimationFrame ( animate );
	renderer.render (scene, camera);
}

function basicScene() {

 	renderer = new THREE.WebGLRenderer( {antialias:true} );
	var width = window.innerWidth;
	var height = window.innerHeight;

    renderer.setSize (width, height);
    // background color
    renderer.setClearColor( 0x55ff55, 1);

	document.body.appendChild (renderer.domElement);

	scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera(-3,3,3,-3, 0, 100);

	var aL = new THREE.AmbientLight ( 0x222222 );
	scene.add( aL );

    var dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 50 );
    scene.add( dirLight );

	var gridXZ = new THREE.GridHelper(100, 10);
	gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
	scene.add(gridXZ);

}
