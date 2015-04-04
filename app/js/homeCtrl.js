jobbaExtraApp.controller('HomeCtrl', function ($scope,$location,Jobb) {
	$scope.query = "";

	$scope.search = function(query){
		Jobb.addPendingQuery(query);
		$location.path("/search");	
	}
});