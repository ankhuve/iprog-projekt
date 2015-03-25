<?php
	$nyckelord = urlencode(utf8_decode($_GET['nyckelord']));
	$sida = urlencode($_GET['sida']);
	$antalRader = urlencode($_GET['antalrader']);
	$service_url = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?anstallningstyp=2&nyckelord='.$nyckelord.'&sida='.$sida.'&antalrader='.$antalRader;
	$curl = curl_init($service_url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl,CURLOPT_HTTPHEADER,array (
         'Accept: application/json',
         'Accept-Language:sv-se,sv',
         'Content-Type: application/json;charset=UTF-8'
     ));

	$curl_response = curl_exec($curl);

	curl_close($curl);
	echo $curl_response;
?>