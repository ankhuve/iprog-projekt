jobbaExtraApp.controller('AppCtrl', function ($scope,Jobb) {
	$scope.loggedIn = Jobb.isLoggedIn();
	console.log(Jobb.isLoggedIn());
	// $scope.username = Jobb.getSession()["username"];
// Övergripande controller som kommer finnas över alla sidor.
	// $scope.loggedIn = Jobb.isLoggedIn;
})