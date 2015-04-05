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
			// $scope.annonsText = data.platsannons.annons.annonstext;
			// $scope.kontakt = data.platsannons.ansokan.epostadress;
			// $scope.sistaAnsokningsdag = data.platsannons.ansokan.sista_ansokningsdag;
			$scope.loading = false;
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
					$scope.$apply();
					Jobb.removePendingID();
				} else {
					alert("Din session har tagit slut, du kommer nu loggas ut.");
					$scope.$parent.logout();
				}
			}
		})
		
	}
});