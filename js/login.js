var socket;
function request_Login() {

  var request = new XMLHttpRequest();
  var url = 'http://localhost:4242/api/v1/login';

  request.open('POST', url);

  request.setRequestHeader('Content-Type', 'application/json');

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status == 200) {
      document.getElementsByClassName("form")[0].className += ' hidden';
      document.body.style.background = 'none';

      /******************************/
      /* INIT MAP when global ready */
      /******************************/
      var data = JSON.parse(this.response).data;
      console.log(data);
      socket = io("http://localhost:4242", { query: "token="+data.token });
      socket.on('blood', function(data) {
        console.log("blood : ", data);
      })
      init_map(data.map);
    }
  };

  var body = {
    'email': document.getElementById("email").value,
    'password': document.getElementById("password").value
  };

  request.send(JSON.stringify(body));
}

function request_Register() {

  var request = new XMLHttpRequest();
  var url = 'http://localhost:4242/api/v1/register';

  request.open('POST', url);

  request.setRequestHeader('Content-Type', 'application/json');

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status == 200) {
      document.getElementsByClassName("form")[0].className += ' hidden';
      document.body.style.background = 'none';
    }
  };

  var body = {
    'email': document.getElementById("email_create").value,
    'firstname': document.getElementById("firstname_create").value,
    'lastname': document.getElementById("lastname_create").value,
    'password': document.getElementById("password_create").value
  };

  request.send(JSON.stringify(body));
}

function init_modal(name) {
  var _obj;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, 200/200, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( 200, 200 );
  var id = Math.random().toString().split('.')[1]
  var main = $('.model3D').append(`
    <div class="row">
            <div class="col s12">
              <div class="card">
                <div class="card-image" id="${id}">
                  <span class="card-title">${name}</span>
                </div>
                <div class="card-action">
                  <a href="#" onclick="ADD_OBJECT='${name}';$('#modal1').modal('close');">Choose</a>
                </div>
              </div>
            </div>
          </div>
    `)
    $(`#${id}`).append(renderer.domElement);
  scene.background = new THREE.Color( 0xfafafa );
  light = new THREE.PointLight(0xffffff, 5, 39);
  light.position.set(10, 20, 15);
  scene.add(light);

  var loader = new THREE.ObjectLoader();
  loader.load(`./assets/objects/${name}/${name}.json`,function ( obj ) {
    _obj = obj;
    _obj.position.y = -1;
    obj.scale.set(1.5,1.5,1.5)
    scene.add( _obj );
  });

  camera.position.z = 5;
  var render = function () {
    requestAnimationFrame( render );
    if (_obj)
      _obj.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  render();
  $('.modal').modal()
}


(function() {
  var p = document.getElementById("button_login");
  var q = document.getElementById("button_create");
  var create = document.getElementById("create_account");
  var login = document.getElementById("login");
  p.onclick = function() {
    request_Login();
  };
  q.onclick = function() {
    request_Register();
  };
  create.onclick = function() {
    document.getElementsByClassName("login-form")[0].className = "login-form hidden";
    document.getElementsByClassName("register-form")[0].className = "register-form visible";
  }
  login.onclick = function() {
    document.getElementsByClassName("login-form")[0].className = "login-form visible";
    document.getElementsByClassName("register-form")[0].className = "register-form hidden";
  }
  init_modal("bloodhouse")
  init_modal("caserne")
  init_modal("rose")
  init_modal("tree")
  init_modal("bloodhouse")
  init_modal("caserne")
  init_modal("rose")
  init_modal("tree")
  init_modal("bloodhouse")
  init_modal("caserne")
  init_modal("rose")
  init_modal("tree")
})();
