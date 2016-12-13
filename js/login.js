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

(function() {
	var p = document.getElementById("button_login");
	 p.onclick = function() {
		 console.log("CLICKED");
		 request_Login();
	 	};
})();
