jobbaExtraApp.controller('ProfileCtrl',function ($scope, $http, $location, Jobb) {
  	$scope.username = Jobb.getLoggedInUser();
  	$scope.savedJobs = Jobb.getSavedJobs();
  	$scope.savedJobs.length;
  	if($scope.savedJobs.length === 0){
	  	$http.get('php/getSavedJobs.php').success(function(data){
	  		if(data["valid"]){
	  			for(var job in data.savedJobs){
	  				Jobb.addSavedJob(data.savedJobs[job]);
	  			}
	  		} else {
	  			Jobb.killSession();
		    	Jobb.terminateSession.get({},function(data){
	      			$location.path("/login");
	      		});
	  		}
	  	})
  	}



	$scope.addPendingID = function(id){
		Jobb.addPendingID(id);
	}

	$scope.removeSaved = function(id){
		$.ajax({
			type: "POST",
			url: "php/deleteSavedJob.php",
			data: {id:id},
			dataType: "json",
			success: function(data){
				if(data["valid"]){
					Jobb.removeSavedJob(id);
				} else{
					alert("Din session har löpt ut och du kommer nu att loggas ut!");
					$scope.$parent.logout();
				}
				$scope.$apply();
			}
		})
	}
})