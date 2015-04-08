jobbaExtraApp.controller('HomeCtrl', function ($scope,$location,Jobb) {
	$scope.query = "";

	$scope.registerUserTypes = ["user","company"];

	$scope.search = function(query){
		Jobb.addPendingQuery(query);
		$location.path("/search");	
	}

	$scope.setRegisterType = function(type){
		Jobb.setRequestedUserType(type);
	}
});