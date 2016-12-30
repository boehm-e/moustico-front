var GROUND = new THREE.Object3D();
var D = 14; // FIELD OF VIEW
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;


/******************************/
/*     LOAD 3D OBJECTS        */
/******************************/
var loader = new THREE.ObjectLoader();
var JSON_rose = new Promise((resolve, reject) => {
  loader.load('./assets/objects/rose/rose.json',function ( obj ) {
    obj.scale.set(0.03,0.03,0.03)
    return resolve(obj);
  });
});

var loader = new THREE.ObjectLoader();
var JSON_tree = new Promise((resolve, reject) => {
  loader.load('./assets/objects/tree/tree.json',function ( obj ) {
    obj.scale.set(0.3,0.3,0.3)
    return resolve(obj);
  });
});

var loader = new THREE.ObjectLoader();
var JSON_house = new Promise((resolve, reject) => {
  loader.load('./assets/objects/bloodhouse/bloodhouse.json',function ( obj ) {
    // obj.scale.set(0.5,0.5,0.5)
    return resolve(obj);
  });
});

var loader = new THREE.ObjectLoader();
var JSON_caserne = new Promise((resolve, reject) => {
  loader.load('./assets/objects/caserne/caserne.json',function ( obj ) {
    // obj.scale.set(0.5,0.5,0.5)
    return resolve(obj);
  });
});

var loader = new THREE.ObjectLoader();
var JSON_redbull = new Promise((resolve, reject) => {
  loader.load('./assets/objects/redbull/redbull.json',function ( obj ) {
    // obj.scale.set(0.3,0.3,0.3)
    return resolve(obj);
  });
});


/******************************/
/*      LOAD TEXTURES         */
/******************************/
var texture = THREE.ImageUtils.loadTexture('./assets/images/herbe.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var GrassMaterial = new THREE.MeshLambertMaterial( { map: texture });

var texture = THREE.ImageUtils.loadTexture('./assets/images/water.png');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var WaterMaterial = new THREE.MeshLambertMaterial( { map: texture });

var texture = THREE.ImageUtils.loadTexture('./assets/images/selected.png');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var SelectedMaterial = new THREE.MeshLambertMaterial( { map: texture });

var texture = THREE.ImageUtils.loadTexture( "./assets/images/clouds.png" );
var material = new THREE.MeshLambertMaterial({ map : texture, transparent: true });
var CloudMaterial = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), material);



// init renderer
var renderer	= new THREE.WebGLRenderer({
  antialias	: true,
  alpha		: true,
});
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFShadowMap;

renderer.setClearColor(new THREE.Color('black'), 0)
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// array of functions for the rendering loop
var onRenderFcts= [];

// init scene and camera
var scene = new THREE.Scene()


var camera	= new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 100);
camera.position.z = 2;























;(function(){
		var object3d	= new THREE.AmbientLight(0x101010)
		object3d.name	= 'Ambient light'
		scene.add(object3d)
		var object3d	= new THREE.DirectionalLight('white', 1)
		object3d.position.set(-3,1,-3).setLength(10)
		object3d.name	= 'Back light'
		scene.add(object3d)
		//
		var object3d	= new THREE.DirectionalLight('white', 1)
		object3d.position.set(-3, 3, 3).setLength(4)
		object3d.name 	= 'Key light'
		scene.add(object3d)
		//
		var object3d	= new THREE.DirectionalLight('white', 1)
		object3d.position.set(3, 1, 3)
		object3d.name	= 'Fill light'
    scene.add(object3d)
	})()



	var mesh = new THREE.AxisHelper
	scene.add( mesh );


	//////////////////////////////////////////////////////////////////////////////////
	//		Load and start hatsune miku
	//////////////////////////////////////////////////////////////////////////////////
	;(function(){
		// model
		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

		var onError = function ( xhr ) {
		};


		THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

		var loader = new THREE.MMDLoader();
		loader.load( 'models/miku/miku_v2.pmd', 'models/miku/wavefile_v2.vmd', function ( object3d ) {

			object3d.scale.set(1,1,1).multiplyScalar(1/20)
			object3d.rotation.x = Math.PI/2

			scene.add( object3d );
			window.miku = object3d

			var animation = new THREE.Animation(object3d, object3d.geometry.animation);
			animation.play();

			onRenderFcts.push(function(delta, now){
				// THREE.AnimationHandler.update(clock.getDelta()/(1/30));
				THREE.AnimationHandler.update(delta*1000 / 30);
			})

		}, onProgress, onError );

	})()

	//////////////////////////////////////////////////////////////////////////////////
	//		render the whole thing on the page
	//////////////////////////////////////////////////////////////////////////////////

	// handle window resize
	window.addEventListener('resize', function(){
		renderer.setSize( window.innerWidth, window.innerHeight )
		camera.aspect	= window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	}, false)


	// build sceneAR
	var sceneAR	= new THREE.Scene();
	sceneAR.add(scene)
  sceneAR.scale.x = 0.1
  sceneAR.scale.y = 0.1
  sceneAR.scale.z = 0.1

	// render the sceneAR
	onRenderFcts.push(function(){
		renderer.render( sceneAR, camera );
	})

	// run the rendering loop
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(deltaMsec/1000, nowMsec/1000)
		})
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		shim party
	//////////////////////////////////////////////////////////////////////////////////

	// shim
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	window.URL = window.URL || window.webkitURL;

	//////////////////////////////////////////////////////////////////////////////////
	//		shim party
	//////////////////////////////////////////////////////////////////////////////////


;(function(){
	//////////////////////////////////////////////////////////////////////////////////
	//		Comments
	//////////////////////////////////////////////////////////////////////////////////

	var videoElement = document.createElement('video')
	window.videoElement = videoElement
	document.body.appendChild(videoElement)
	videoElement.style.position = 'absolute'
	videoElement.style.top = '0px'
	videoElement.style.left = '0px'
	videoElement.style.width = '100%'
	videoElement.style.height = '100%'
	videoElement.style.zIndex = -1;




	var constraints = {video:true}
	navigator.getUserMedia(constraints, function (stream){
		videoElement.src = URL.createObjectURL(stream);
		videoElement.play();
	}, function(error){
		console.log("An error occured! ");
		console.dir(error)
	});
})()

	//////////////////////////////////////////////////////////////////////////////////
	//		Comments
	//////////////////////////////////////////////////////////////////////////////////

	var canvasElement = document.createElement('canvas')
	// canvasElement.width	= 320
	// canvasElement.height	= 240
	// canvasElement.width	= 320*2
	// canvasElement.height	= 240*2
	document.body.appendChild(canvasElement)
	canvasElement.style.position = 'absolute'
	canvasElement.style.top = '0px'
	canvasElement.style.left = '0px'
	canvasElement.style.opacity = 0.2

	var context = canvasElement.getContext("2d");

	//////////////////////////////////////////////////////////////////////////////////
	//		Comments
	//////////////////////////////////////////////////////////////////////////////////

	var modelSize = 35.0; // millimeter

	onRenderFcts.push(function(){
		// if no new image for videoElement do nothing
		if (videoElement.readyState !== videoElement.HAVE_ENOUGH_DATA) return

		canvasElement.width	= videoElement.videoWidth/2
		canvasElement.height = videoElement.videoHeight/2

		// get imageData from videoElement
		context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
		var imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height);

		// detect markers
		var detector = new AR.Detector();
		var markers = detector.detect(imageData);

		// display markers on canvas for debug
		drawCorners(markers, canvasElement)

		scene.visible = true
		// scene.visible = false

		// if no marker got detected
		if (markers.length  ===  0) return

		var marker = markers[0]

		if( marker.id === 265 ){
			var pose = markerToPose(marker)
			if( pose !== null ){
				poseToObject(pose, scene);
				scene.visible = true
			}
		}
	});
	//////////////////////////////////////////////////////////////////////////////////
	//		Comments
	//////////////////////////////////////////////////////////////////////////////////

	function poseToObject(pose, object3d){
		var rotation = pose.bestRotation
		var translation = pose.bestTranslation

		object3d.scale.x = modelSize;
		object3d.scale.y = modelSize;
		object3d.scale.z = modelSize;

		object3d.rotation.x = -Math.asin(-rotation[1][2]);
		object3d.rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
		object3d.rotation.z =  Math.atan2(rotation[1][0], rotation[1][1]);

		object3d.position.x =  translation[0];
		object3d.position.y =  translation[1];
		object3d.position.z = -translation[2];
	}

	function markerToPose(marker){
		// convert corners coordinate - not sure why
		var corners = []//marker.corners;
		for (var i = 0; i < marker.corners.length; ++ i){
			corners.push({
				x : marker.corners[i].x - (canvasElement.width / 2),
				y : (canvasElement.height / 2) - marker.corners[i].y,
			})
		}
		// compute the pose
		var posit = new POS.Posit(modelSize, canvasElement.width);
		var pose = posit.pose(corners);

		// return the computed pose
		return pose
	}


	/**
	* draw corners on a canvas - useful to debug
	*
	* @param {Object[]} markers - array of found markers
	*/
	function drawCorners(markers, canvasElement){
		var context = canvasElement.getContext("2d");
		context.lineWidth = 3;

		for (var i = 0; i < markers.length; ++ i){
			var marker = markers[i]
			var corners = marker.corners;

			context.strokeStyle = "red";
			context.beginPath();

			for (var j = 0; j < corners.length; ++ j){
				var corner = corners[j];
				context.moveTo(corner.x, corner.y);
				corner = corners[(j + 1) % corners.length];
				context.lineTo(corner.x, corner.y);
			}

			context.stroke();
			context.closePath();

			context.strokeStyle = "green";
			context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
			// console.log('marker', marker.id)

			context.fillStyle = "blue";
			context.font = "bold 10px Arial";
			context.fillText("id: "+marker.id, corners[0].x, corners[0].y);
		}
	};

	//////////////////////////////////////////////////////////////////////////////////
	//		Comments
	//////////////////////////////////////////////////////////////////////////////////
	function updateObject(object3d, rotation, translation){
		object3d.scale.x = modelSize;
		object3d.scale.y = modelSize;
		object3d.scale.z = modelSize;

		object3d.rotation.x = -Math.asin(-rotation[1][2]);
		object3d.rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
		object3d.rotation.z = Math.atan2(rotation[1][0], rotation[1][1]);

		object3d.position.x = translation[0];
		object3d.position.y = translation[1];
		object3d.position.z = -translation[2];
	};


















/******************************/
/*     DEFINE GLOBALES        */
/******************************/

var GLOBAL = {};
GLOBAL.materials = {};
GLOBAL.materials.water = WaterMaterial;
GLOBAL.materials.grass = GrassMaterial;
GLOBAL.materials.selected = SelectedMaterial;
GLOBAL.materials.cloud = CloudMaterial;
GLOBAL.WIDTH = WIDTH;
GLOBAL.HEIGHT = HEIGHT;
GLOBAL.aspect = GLOBAL.WIDTH / GLOBAL.HEIGHT;
GLOBAL.D = D;
GLOBAL.GROUND = GROUND;
GLOBAL.GROUND.rotation.x = Math.PI / 2
GLOBAL.scene = scene;
GLOBAL.camera = camera;

Promise.all([JSON_rose, JSON_tree, JSON_house, JSON_caserne, JSON_redbull]).then((valeurs) => {
  GLOBAL.objects = {};
  GLOBAL.objects.rose = valeurs[0];
  GLOBAL.objects.tree = valeurs[1];
  GLOBAL.objects.house = valeurs[2];
  GLOBAL.objects.caserne = valeurs[3];
  GLOBAL.objects.redbull = valeurs[4];
});
