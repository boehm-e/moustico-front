function request_Login() {

	var request = new XMLHttpRequest();
	var url = 'http://localhost:4242/api/v1/login';

	request.open('POST', url);

	request.setRequestHeader('Content-Type', 'application/json');

	request.onreadystatechange = function () {
	  if (this.readyState === 4 && this.status == 200) {
    	console.log('Status:', this.status);
	    console.log('Headers:', this.getAllResponseHeaders());
	    console.log('Body:', this.responseText);
			document.getElementsByClassName("form")[0].className += ' hidden';
			document.body.style.background = 'none';
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
    	console.log('Status:', this.status);
	    console.log('Headers:', this.getAllResponseHeaders());
	    console.log('Body:', this.responseText);
			document.getElementsByClassName("form")[0].className += ' hidden';
			document.body.style.background = 'none';
	  }
	};

	var body = {
	  'email': document.getElementById("email").value,
	  'firstname': document.getElementById("firstname").value,
	  'lastname': document.getElementById("lastname").value,
	  'password': document.getElementById("password").value
	};

	request.send(JSON.stringify(body));
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
})();
