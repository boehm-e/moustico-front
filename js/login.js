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
      GLOBAL.data = data;
      setStats(GLOBAL.data.factory);
      socket = io("http://localhost:4242", { query: "token="+data.token });
      socket.on('blood', function(data) {
        console.log("blood : ", data);
        setStats(data);
      })
      socket.on('mapUpdate', function() {
        Materialize.toast('Map mise a jour :)', 2000)
      })
      socket.on('enroleUpdate', function(data) {
        Materialize.toast(`Vous avez maintenant ${data.number} moustiques`, 2000)
      })
      socket.on('enroleFail', function(data) {
        Materialize.toast(`Vous n'avez pas assez de sang`, 2000)
      })
      init_map(data.user.map);

      // SET MAP DISPLAY
      $('.hideInGame').css('display', 'none')
      document.getElementsByClassName('circle-container')[0].style.display = 'block'
      var ingame = document.getElementsByClassName('showInGame');
      for (var i=0; i<ingame.length; i++) {
        ingame[i].style.visibility = 'visible'
      }
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

function setStats(factory) {
  const lvl = GLOBAL.data.factory.level;
  const percentA = factory.blood_A / (lvl * 10);
  const percentB = factory.blood_B / (lvl * 10);
  const percentAB = factory.blood_AB / (lvl * 10);
  const percentO = factory.blood_O / (lvl * 10);
  console.log("PERCENT A : ", percentA);
  console.log("PERCENT B : ", percentB);
  console.log("PERCENT AB : ", percentAB);
  console.log("PERCENT O : ", percentO);
  setBloodA(percentA);
  setBloodB(percentB);
  setBloodAB(percentAB);
  setBloodO(percentO);
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
    /*********************							POUR ERWAN 						 **************************/
    if (false) {
      var titre = document.getElementById("titre");
      var all_titre = document.getElementById("all_titre");
      titre.keyboard("html", 50, 100, "Hey jeune mousaillon,", function() {
        all_titre.keyboard("html", 20, 100, "Enfin tu te reveille petit paresseux.... !! Sa fait un moment que tu n'as pas BzzzBzzzzzz, le monde a beaucoup changé depuis. De nous alien on apparu, les 'HUMAINS' se sont de géant créature avec des raquette electrique et de la citronelle. Mais nous avons réussie à sauver une dizaine de moustico guerrier pour pouvoir reconstruire notre village.", function() {});
      })
      $('.all_body').css('display', 'none');
    }
    else {
      $('.paragraph').css('display', 'none');
    }
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
    init_modal("redbull")
    init_modal("caserne")
    init_modal("rose")
    init_modal("tree")
    init_modal("wall")
    init_modal("tower")
  })();
