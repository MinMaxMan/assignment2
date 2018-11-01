<?php
$host = "localhost";
$user = "X33111219";
$pass = "X33111219";
$dbna = "X33111219";
$table = "A2Products";

$dbc = mysqli_connect($host, $user, $pass, $dbna);

if(mysqli_connect_errno()){
	echo "Failed to connect to MySQL (" . mysqli_connect_error() . ")";
}
else{
	$searchQu = htmlspecialchars($_REQUEST["search"]);
	$searchBy = $_REQUEST["searchBy"];
	
	$query = "SELECT ProdID, ProdName, ProdPrice, Weight FROM $table WHERE ";
	switch ($searchBy){
		case "name":
			$query .= "ProdName LIKE '%$searchQu%';";
			break;
		case "category":
			$query .= "Category LIKE '%$searchQu%';";
			break;
		case "price":
			$searchCon = $_REQUEST["searchCon"];
			$query .= "ProdPrice $searchCon $searchQu;";
			break;
		default:
			break;
	}
	

	$result = mysqli_query($dbc, $query);

	while($row = mysqli_fetch_array($result, MYSQLI_NUM)){
		for($i = 0; $i < count($row) - 1; $i++){
			if($i == 0)
				$toEcho = "$row[$i] | ";
			else
				$toEcho .= "$row[$i] | ";
		}
		$toEcho .= "$row[$i]<br>";
	}
	
	echo $toEcho;
}


