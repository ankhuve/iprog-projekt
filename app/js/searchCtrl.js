jobbaExtraApp.controller('SearchCtrl', function ($scope,Jobb) {
	// $scope.showingResults = false;
	$scope.counties = Jobb.getCountyList();
	$scope.sida = 1;
	$scope.toggledFilter = false;
	$scope.selectedCounty = "";

	$scope.showingResults = function(){
		if(Jobb.getSearchResults().length>0){
			$("#numSearchResults").animate({opacity: 1}, 300);
			return true;
		} else {
			return false;
		}
	}

	$scope.getSelectedCountyID = function(){
		return($scope.selectedCounty['id']);
	};

	$scope.jobs = function(){
		return Jobb.getSearchResults();
	};

	$scope.searchOptions = {
		nyckelord:"",
		antalrader:10,
		sida:$scope.sida,
	};

	$scope.updateSearchOptions = function(param, val){
		$scope.searchOptions[param] = val;
	};

	$scope.addPending = function(annonsID){
		Jobb.addPendingID(annonsID);
	};

	$scope.toggleFilter = function(){
		if($scope.toggledFilter){
			$(".searchFilter").removeClass("searchFilterAnimation");
			$(".filters").removeClass("filtersAnimation");
			$("#filterToggleArrow").removeClass("glyphicon-chevron-up");
			$("#filterToggleArrow").addClass("glyphicon-chevron-down");
			$scope.toggledFilter = false;
		} else {
			$(".searchFilter").addClass("searchFilterAnimation");
			$(".filters").addClass("filtersAnimation");
			$("#filterToggleArrow").removeClass("glyphicon-chevron-down");
			$("#filterToggleArrow").addClass("glyphicon-chevron-up");
			$scope.toggledFilter = true;
		}
	}

	$scope.antalAnnonser = function(){
		return Jobb.getNumHits();
	}

	$scope.search = function(keyword,sida){
		$scope.loading = true;
		$scope.searchOptions["nyckelord"] = keyword;
		console.log($scope.selectedCounty['id']);
		console.log($scope.searchOptions);
		Jobb.getJobs.get($scope.searchOptions, function(data){
			Jobb.setNumHits(data.matchningslista.antal_platsannonser);

			// $scope.antalAnnonser = data.matchningslista.antal_platsannonser;
			$scope.loading = false;
			// $scope.showingResults = true;
			
			Jobb.addSearchResults(data.matchningslista.matchningdata);
		});
	}

	if(Jobb.getPendingQuery()!=undefined){
		$scope.search(Jobb.getPendingQuery(),$scope.sida);
		$scope.query = Jobb.getPendingQuery();
		Jobb.removePendingQuery();
	}
	
	$scope.getCountyNames = function(){
		console.log($scope.counties);
  		// return $scope.counties;
	}

	$scope.setChosenCounty = function(county){
		console.log(county);
	}
});