jobbaExtraApp.controller('AppCtrl', function ($scope,Jobb) {
	$scope.loggedIn = Jobb.isLoggedIn();

	$scope.logout = function(){
		// console.log("mjao");
		Jobb.terminateSession;
		Jobb.killSession();
		$scope.loggedIn = false;
		$scope.username = "";
	}
})