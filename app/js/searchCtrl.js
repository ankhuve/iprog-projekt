jobbaExtraApp.controller('SearchCtrl', function ($scope,Jobb) {
	$scope.showingResults = false;
	$scope.sida = 1
	$scope.toggledFilter = false;

	$scope.addPending = function(annonsID){
		Jobb.addPendingID(annonsID);
	}

	$scope.toggleFilter = function(){
		if($scope.toggledFilter){
			$scope.toggledFilter = false;
		} else {
			$scope.toggledFilter = true;
		}
		// console.log("mjao");
	}

	$scope.search = function(keyword,sida){
		$scope.loading = true;
		$scope.sida = sida;
		Jobb.getJobs.get({nyckelord:keyword,antalrader:10,sida:sida},function(data){
			console.log(data);
			// var options = "";
			$scope.sidor = [];
			for(var i = 1; i <= data.matchningslista.antal_sidor; i ++){
				if(i != $scope.sida){
					$scope.sidor.push(i);
				}
				
			// 	options += '<option>'+i+'</option>';
			}
			console.log($scope.sidor);
			// document.getElementById('sidePicker').innerHTML = options;
			
			$scope.antalAnnonser = data.matchningslista.antal_platsannonser;
			$scope.jobs = data.matchningslista.matchningdata;
			console.log(data.matchningslista.matchningdata);
			$scope.loading = false;
			$scope.showingResults = true;
			Jobb.addSearchResults(data.matchningslista.matchningdata);

		});
	}

	if(Jobb.getPendingQuery()!=undefined){
		$scope.search(Jobb.getPendingQuery(),$scope.sida);
		$scope.query = Jobb.getPendingQuery();
		Jobb.removePendingQuery();
	}

});