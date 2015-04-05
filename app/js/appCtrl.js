jobbaExtraApp.controller('AppCtrl', function ($scope,$location,Jobb) {
	
	$scope.loggedIn = Jobb.isLoggedIn();
	$scope.username = Jobb.getLoggedInUser();

	var active = false;

	$scope.toggleMenu = function(){
		if(!active){
			$(".navLinks").addClass("navLinksAnimation");
			$(".navLink").addClass("navLinkAnimation");
			active = true;
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

	$scope.logout = function(){
		$scope.loggedIn = false;
		$scope.username = "";
		Jobb.terminateSession.get();
		Jobb.killSession();
	    Jobb.setLoggedIn(false);
    	Jobb.setRole("guest");
    	Jobb.terminateSession.get({},function(data){
      		console.log(data)});
    	Jobb.killSession();
    	$location.path("/home");
	}
})