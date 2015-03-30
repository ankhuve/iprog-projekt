<?php
	session_start();
	include_once("config.php");
	include_once("functions.php");

	$credentials = $_GET;
	$return['username'] = $credentials['username'];
	$return['password'] = $credentials['password'];

	$return['sessionID'] = session_id();

	checkLogin($conn, $credentials['email'], $credentials['password']);
	$return['userID'] = 1;
	$return['role'] = "Admin";
	$return['valid'] = true;

	echo json_encode($return);

?>