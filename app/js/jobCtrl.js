jobbaExtraApp.controller('JobCtrl', function ($scope, $location, Jobb) {
	$scope.annonsID = Jobb.getPendingID();
	$scope.loading = true;
	if($scope.annonsID != undefined){
		$scope.jobb = Jobb.getJob.get({id:$scope.annonsID},function(data){
			console.log(data.platsannons);
			$scope.annonsRubrik = data.platsannons.annons.annonsrubrik;
			$scope.annonsText = data.platsannons.annons.annonstext;
			$scope.kontakt = data.platsannons.ansokan.epostadress;
			$scope.sistaAnsokningsdag = data.platsannons.ansokan.sista_ansokningsdag;
			$scope.loading = false;
		})
	} else {
		$location.path("/search");
	}
});