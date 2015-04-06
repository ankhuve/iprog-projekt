jobbaExtraApp.controller('JobCtrl', function ($scope, $location, $http, Jobb) {
	$scope.loggedIn = Jobb.isLoggedIn();
	$scope.annonsID = Jobb.getPendingID();

	$scope.loading = true;
	$scope.jobSaved = false;

	if($scope.annonsID != undefined){
		$scope.jobb = Jobb.getJob.get({id:$scope.annonsID},function(data){
			console.log(data.platsannons);
			$scope.jobb = data.platsannons;
			$scope.annonsrubrik = data.platsannons.annons.annonsrubrik;
			$scope.loading = false;
			// console.log({"jobID":$scope.jobb.annons.annonsid, "jobHeader":$scope.jobb.annons.annonsrubrik});
		})
	} else {
		$location.path("/search");
	}

	$scope.saveJob = function(annonsID, annonsrubrik){
		$.ajax({
			type: "post",
			url: "php/saveJob.php",
			data: {annonsID: annonsID, annonsrubrik:annonsrubrik},
			dataType: "json",
			success: function(data){
				console.log(data);
				if(data["valid"]){
					$scope.jobSaved = true;
					Jobb.addSavedJob({"jobID":$scope.jobb.annons.annonsid, "jobHeader":$scope.jobb.annons.annonsrubrik});
					Jobb.removePendingID();
					$scope.$apply();
				} else {
					alert("Din session har tagit slut, du kommer nu loggas ut.");
					$scope.$parent.logout();
				}
			}
		})
		
	}
});