<?php
	$credentials = $_GET;
	$return['username'] = $credentials['username'];
	$return['password'] = $credentials['password'];
	$return['sessionID'] = 1203010;
	$return['userID'] = 1;
	$return['role'] = "Admin";
	$return['valid'] = true;

	echo json_encode($return);

?>