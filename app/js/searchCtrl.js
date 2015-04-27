jobbaExtraApp.controller('SearchCtrl', function ($scope,Jobb) {
	
	$scope.forceShowResults = false;
	$scope.sida = 1;
	$scope.toggledFilter = false;
	$scope.selectedCounty = "";
	$scope.selectedLineOfWork = "";

	Jobb.getCategory.get(
		{type:'lan'},
		function(data){
			$scope.counties = data.soklista.sokdata;
		}
	);

	Jobb.getCategory.get(
		{type:'yrkesomraden'},
		function(data){
			$scope.linesOfWork = data.soklista.sokdata;
		}
	);

	$scope.showingResults = function(){
		if(Jobb.getSearchResults().length>0){
			$("#numSearchResults").animate({opacity: 1}, 300);
			return true;
		} else {
			return false;
		}
	}

	$scope.countySelected = function(){
		if($scope.searchOptions.lanid === undefined){
			return false;
		} else {
			return true;
		}
	}

	$scope.lineOfWorkSelected = function(){
		if($scope.searchOptions.yrkesomradeid === undefined){
			return false;
		} else {
			return true;
		}
	}

	$scope.getSelectedID = function(type){
		if(type==='county'){
			return($scope.selectedCounty['id']);
		} else if(type==='municipality'){
			return($scope.selectedMunicipality['id']);
		} else if(type==='lineOfWork'){
			return($scope.selectedLineOfWork['id']);
		} else if(type='profession'){
			return($scope.selectedProfession['id']);
		}else {
			console.log("Error when getting selected id!");
		}
	}

	$scope.jobs = function(){
		return Jobb.getSearchResults();
	};

	$scope.searchOptions = {
		nyckelord:"",
		antalrader:10,
		sida:$scope.sida,
	};

	$scope.resetFilters = function(){
		$scope.searchOptions = {
			nyckelord: $scope.query,
			antalrader:10,
			sida:$scope.sida
		}
		$scope.selectedCounty = "";
		$scope.selectedLineOfWork = "";
	}

	$scope.updateSearchOptions = function(param, val){
		//Om det är Län som väljs så hämta alla kommuner för detta län. 
		if(param === 'lanid'){
			Jobb.getKommun.get(
				{lanid: $scope.getSelectedID('county')}, 
				function(data){
					$scope.municipalties = data.soklista.sokdata; 
				}
			);
		}
		if(param === 'yrkesomradeid'){
			Jobb.getYrkesgrupper.get(
				{yrkesomradeid:$scope.getSelectedID('lineOfWork')},
				function(data){
					$scope.professions = data.soklista.sokdata;
				}
			)
		}
		console.log("Adding param to searchOptions...");
		console.log("Param: "+param+", val: "+val);
		$scope.searchOptions[param] = val;
	};

	$scope.addPending = function(annonsID){
		console.log(annonsID);
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
		console.log($scope.searchOptions);
		Jobb.getJobs.get($scope.searchOptions, function(data){
			console.log(data);
			Jobb.setNumHits(data.matchningslista.antal_platsannonser);
			$scope.loading = false;
			if(data.matchningslista.antal_platsannonser === 0){
				Jobb.addSearchResults([]);
			} else {
				Jobb.addSearchResults(data.matchningslista.matchningdata);
			}
			$scope.forceShowResults = true;
		});
	}

	if(Jobb.getPendingQuery()!=undefined){
		$scope.search(Jobb.getPendingQuery(),$scope.sida);
		$scope.query = Jobb.getPendingQuery();
		Jobb.removePendingQuery();
	}
});