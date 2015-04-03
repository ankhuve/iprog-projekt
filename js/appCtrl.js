jobbaExtraApp.controller('AppCtrl', function ($scope,Jobb) {
	$scope.loggedIn = Jobb.isLoggedIn();
	console.log(Jobb.isLoggedIn());
	// $scope.username = Jobb.getSession()["username"];
// Övergripande controller som kommer finnas över alla sidor.
	// $scope.loggedIn = Jobb.isLoggedIn;
	var active = false;
	$scope.toggleMenu = function(){
		if(!active){
			$(".navLinks").addClass("navLinksAnimation");
			$(".navLink").addClass("navLinkAnimation");
			active = true;;
		}else{
			$(".navLinks").removeClass("navLinksAnimation");
			$(".navLink").removeClass("navLinkAnimation");
			active = false;
		}
	}

	$scope.closeMenu = function(){
		$(".navLinks").removeClass("navLinksAnimation");
		$(".navLink").removeClass("navLinkAnimation");
		active = false;
	}		
	
})