function isNotEmpty(field){
	var searchVal = field.value;
	var notEmpty = true;

	if (searchVal == "" || searchVal.length == 0){
		alert("The search bar must not be empty");
		notEmpty = false;
	}

	return notEmpty;
}


function isNumber(field){
	var isLegal = true;
	var illegals = ['+', '-', '*', '/', '%'];
	var searchVal = field.value;

	for(var i = 0; i < illegals.length; i++){
		if(isLegal){
			if(searchVal.includes(illegals[i]))
				isLegal = false;
		}
	}

	if(!isLegal){
		alert("No operators allowed");
	}
	else if(isNaN(searchVal)){
		alert("Must be a number, if you're searching for the price");
		isLegal = false;
	}

	return isLegal;	
}

function isNotHackText(field){
	var illegals = ['"', "'", '<', '>'];
	var searchVal = field.value;
	var isLegal = true;

	for(var i = 0; i < illegals.length; i++){
		if(isLegal){
			if(searchVal.includes(illegals[i]))
				isLegal = false;
		}
	}

	if(!isLegal)
		alert("No, you don't get to drop any tables");

	return isLegal;
}

function isNotHackConstraint(field){
	var legals = ["<", "<=", "=", ">=", ">"]
	var conVal = field.value;
	var isLegal = false;

	for(var i = 0; i < legals.length; i++){
		if(!isLegal){
			if(conVal == legals[i])
				isLegal = true;
		}
	}

	if(!isLegal){
		alert("No, you don't get to drop any tables");
	}

	return isLegal;
}

function isNotHackCategory(field){
	var legals = ["name", "category", "price"]
	var catVal = field.value;
	var isLegal = false;

	for(var i = 0; i < legals.length; i++){
		if(!isLegal){
			if(conVal == legals[i])
				isLegal = true;
		}
	}

	if(!isLegal){
		alert("No, you don't get to drop any tables");
	}
	
	return isLegal;
}

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
	xhttp.open("POST", "php/productDB.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("search="+s+"&searchBy="+b+"&searchCon="+c);
}

function validate(form){
	var isGood = false;

	if(form.searchBy == "price"){
		if(isNotEmpty(form.search) && 
			isNumber(form.search) && 
			isNotHackText(form.search) && 
			isNotHackConstraint(form.searchCon) &&
			isNotHackCategory(form.searchBy))
			isGood = true;
	}
	else{
		if(isNotEmpty(form.search) &&
		   isNotHackText(form.search) && 
		   isNotHackConstraint(form.searchCon) &&
		   isNotHackCategory(form.searchBy))
			isGood = true;
	}
	
	if(isGood)
		loadDoc();
	
	return isGood;
}