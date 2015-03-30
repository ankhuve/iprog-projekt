<?php
	function queryDb($conn, $query){
		if (($result = mysqli_query($conn, $query)) === false) {
	       printf("Query failed: %s<br />\n%s", $query, mysqli_error($conn));
	       exit();
	    }
	    return $result;		
	}

	function checkLogin($conn, $email, $password){
		$loggedInQuery = "SELECT id FROM je_user WHERE email=".$email." AND password = ".$hashedPassword.";";
		$resultObj = queryDb($conn, $loggedInQuery);
		echo $resultObj->fetch_object();
		// echo "Logged in!";
	}
?>