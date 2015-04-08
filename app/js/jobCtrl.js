jobbaExtraApp.controller('JobCtrl', function ($scope, $location, $http, Jobb) {
	$scope.annonsID = Jobb.getPendingID();

	$scope.loading = true;
	if($scope.annonsID != undefined){
		$scope.jobb = Jobb.getJob.get({id:$scope.annonsID},function(data){
			// console.log(data.platsannons);
			$scope.jobb = data.platsannons;
			$scope.annonsrubrik = data.platsannons.annons.annonsrubrik;
			$scope.loading = false;
		})
	} else {
		$location.path("/search");
	}

	$scope.loggedIn = function(){
		return Jobb.isLoggedIn();
	}

	$scope.getSavedJobs = function(){
		return Jobb.getSavedJobs();
	}

	$scope.jobSaved = function(jobID){
		$scope.savedJobs = $scope.getSavedJobs();
		for(var job in $scope.savedJobs){
			if($scope.savedJobs[job].jobID == jobID){
				return true;
			}
		}
		return false;
	}

	$scope.saveJob = function(annonsID, annonsrubrik){
        $http.post("php/saveJob.php", {annonsID:annonsID, annonsrubrik:annonsrubrik}).success(function(data, status) {
        	if(data["valid"]){
        		Jobb.addSavedJob({"jobID":$scope.jobb.annons.annonsid, "jobHeader":$scope.jobb.annons.annonsrubrik});
        	} else {
				alert("Din session har tagit slut, du kommer nu loggas ut.");
				$scope.$parent.logout();
        	}
        })
	}

	$scope.removeSaved = function(jobID){
		Jobb.removeSavedJob(jobID);
	}
});