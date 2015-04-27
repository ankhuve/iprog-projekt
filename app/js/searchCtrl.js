jobbaExtraApp.controller('SearchCtrl', function ($scope,Jobb) {
	
	$scope.forceShowResults = false;
	$scope.sida = 1;
	$scope.toggledFilter = false;
	$scope.selectedCounty = "";
	$scope.selectedLineOfWork = "";

	Jobb.getCategory.get( // Get all the counties listed by arbetsförmedlingen
		{type:'lan'},
		function(data){
			$scope.counties = data.soklista.sokdata;
		}
	);

	Jobb.getCategory.get( // Get all the lines of work listed by arbetsförmedlingen
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
		if(param === 'lanid'){ // If the user chooses county, get all the municipalties in that county
			Jobb.getKommun.get(
				{lanid: $scope.getSelectedID('county')}, 
				function(data){
					$scope.municipalties = data.soklista.sokdata; 
				}
			);
		}
		if(param === 'yrkesomradeid'){ // If the user chooses line of work, get all the professions within that line of work
			Jobb.getYrkesgrupper.get(
				{yrkesomradeid:$scope.getSelectedID('lineOfWork')},
				function(data){
					$scope.professions = data.soklista.sokdata;
				}
			)
		}

		$scope.searchOptions[param] = val;
	};

	$scope.addPending = function(annonsID){ // Add pending job id for single job view
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
			$scope.loading = false;
			$scope.numPages = data.matchningslista.antal_sidor;
			Jobb.setNumHits(data.matchningslista.antal_platsannonser);
			
			if(data.matchningslista.antal_platsannonser === 0){
				Jobb.addSearchResults([]);
			} else {
				Jobb.addSearchResults(data.matchningslista.matchningdata);
			}
			$scope.forceShowResults = true; // Show number of hits, even when there are 0 hits.
		});
	}

	if(Jobb.getPendingQuery()!=undefined){ // If you search from the home page, run the query.
		$scope.search(Jobb.getPendingQuery(),$scope.sida);
		$scope.query = Jobb.getPendingQuery();
		Jobb.removePendingQuery();
	}

	$scope.isFirstPage = function(){
		if($scope.sida === 1){
			return true;
		} else {
			return false;
		}
	}

	$scope.isLastPage = function(){
		if($scope.sida === $scope.numPages){
			return true;
		} else {
			return false;
		}
	}

	$scope.changePage = function(target){
		if(target === 'next'){
			$scope.sida++;
		} else if(target === 'previous'){
			$scope.sida--;
		} else if(target === 'first'){
			$scope.sida = 1;
		} else {
			$scope.sida = $scope.numPages;
		}
		$scope.updateSearchOptions("sida",$scope.sida);
		$scope.search($scope.query,$scope.sida);
	}

	$(window).resize(function(){ // Listen for window resize to decide size of navigation buttons
    	$scope.$apply(function(){
    		$scope.pageNavSizeTest();
    	});
	});

	$scope.pageNavSizeTest = function(){ // 
		if(window.innerWidth < 750){
			$scope.smallNavButtons = true;
		} else {
			$scope.smallNavButtons = false;
		}
	}

	$scope.pageNavButtonText = function(){
		if($scope.smallNavButtons){
			$scope.buttonMessages = {
				previous: "",
				first: "",
				next: "",
				last: "",
				infoText: $scope.sida+" / "+$scope.numPages
			}
		} else {
			$scope.buttonMessages = {
				previous: "Föregående",
				first: "Första",
				next: "Nästa",
				last: "Sista",
				infoText: "Visar sida "+$scope.sida+" av "+$scope.numPages
			}
		}
		return $scope.buttonMessages;
	}
	$scope.pageNavSizeTest();

});