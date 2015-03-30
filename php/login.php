<?php
	include_once("config.php");
	include_once("functions.php");

	$credentials = $_GET;
	$userInfo = checkLogin($conn, $credentials['email'], $credentials['password']);

	if($userInfo["valid"]){
		session_start();
		$return['email'] = $credentials['email'];
		$return['sessionID'] = session_id();
		$return['userID'] = $userInfo["id"];
		$return['role'] = $userInfo["role"];
		$return['username'] = $userInfo["username"];
		$return['valid'] = true;
	} else {
		$return["valid"] = false;
	}

	echo json_encode($return);

?>