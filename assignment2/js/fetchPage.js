function loadDoc(){
	var s = document.getElementById("search");
	var b = document.getElementById("searchBy");
	var c = document.getElementById("searchCon");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("searchresult").innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", "php/productDB.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("search="+s+"&searchBy="+b+"&searchCon="+c);
}