jobbaExtraApp.controller('SearchCtrl', function ($scope,Jobb) {
	
	$scope.forceShowResults = false;
	$scope.toggledFilter = false;

	var initiateCounties = function(){
		if(Jobb.getCounties().length === 0){ // First page load, no counties selected
			Jobb.getCategory.get( // Get all the counties listed by arbetsförmedlingen
				{type:'lan'},
				function(data){
					Jobb.addCounties(data.soklista.sokdata);
					$scope.selectedCounty = $scope.counties()[0];
				}
			)
		} else { // Counties already added to model, no need for second call to API.
			if(Jobb.getSearchParams().lanid){ // User had selected a county before.
				var counties = Jobb.getCounties();
				var selectedCountyID = Jobb.getSearchParams().lanid;

				for(county in counties){
					if(counties[county].id === selectedCountyID){
						$scope.selectedCounty = counties[county];
					}
				}
			} else {
				$scope.selectedCounty = Jobb.getCounties()[0];
			}
		}
	}

	initiateCounties();

	var initiateLinesOfWork = function(){
		if(Jobb.getLinesOfWork().length === 0){
			Jobb.getCategory.get( // Get all the lines of work listed by arbetsförmedlingen
				{type:'yrkesomraden'},
				function(data){
					Jobb.addLinesOfWork(data.soklista.sokdata);
					$scope.selectedLineOfWork = $scope.linesOfWork()[0];
				}
			);
		} else {
			if(Jobb.getSearchParams().yrkesomradeid){
				var linesOfWork = Jobb.getLinesOfWork();
				var selectedLineOfWork = Jobb.getSearchParams().yrkesomradeid;

				for(lineOfWork in linesOfWork){
					if(linesOfWork[lineOfWork].id === selectedLineOfWork){
						$scope.selectedLineOfWork = linesOfWork[lineOfWork];
					}
				}
			} else {
				$scope.selectedLineOfWork = Jobb.getLinesOfWork()[0];
			}
		}
	}

	initiateLinesOfWork();


	$scope.showingResults = function(){
		if(Jobb.getSearchResults().length>0){
			$("#numSearchResults").animate({opacity: 1}, 300);
			return true;
		} else {
			return false;
		}
	};

	$scope.countySelected = function(){
		if(Jobb.getSearchParams().lanid === undefined){
			return false;
		} else {
			if(!Jobb.getSearchParams().lanid){
				return false;
			} else {
				return true;
			}
		}
	};

	$scope.lineOfWorkSelected = function(){
		if(Jobb.getSearchParams().yrkesomradeid === undefined){
			return false;
		} else {
			return true;
		}
	};

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
	};

	$scope.jobs = function(){
		return Jobb.getSearchResults();
	};


	$scope.resetFilters = function(){

		console.log("----------------------------");
		console.log("Search params before reset:");
		console.log(Jobb.getSearchParams());
		console.log("----------------------------");
		Jobb.resetSearchParams();
		Jobb.addSearchParam('nyckelord',"");
		Jobb.addSearchParam('antalrader',10);
		Jobb.addSearchParam('sida',Jobb.getCurrentPage());

		console.log("Search params after reset:");
		console.log(Jobb.getSearchParams());
		console.log("----------------------------");

		$scope.selectedCounty = $scope.counties()[0];
		$scope.selectedLineOfWork = $scope.linesOfWork()[0];
		Jobb.addMunicipalities([]);
		Jobb.addProfessions([]);
		console.log($scope.selectedCounty);
	};

	$scope.updateSearchOptions = function(param, val){
		if(param === 'lanid'){ // If the user chooses county, get all the municipalties in that county
			if($scope.getSelectedID('county')){ // Fail-safe for when the user has chosen the "Välj län..." option
				Jobb.getKommun.get(
					{lanid: $scope.getSelectedID('county')}, 
					function(data){
						Jobb.addMunicipalities(data.soklista.sokdata);
					}
				);
			}
		}
		if(param === 'yrkesomradeid'){ // If the user chooses line of work, get all the professions within that line of work
			if($scope.getSelectedID('lineOfWork')){
				Jobb.getYrkesgrupper.get(
					{yrkesomradeid:$scope.getSelectedID('lineOfWork')},
					function(data){
						Jobb.addProfessions(data.soklista.sokdata);
					}
				)
			}
		}
		Jobb.addSearchParam(param,val);
	};

	$scope.municipalities = function(){
		return Jobb.getMunicipalities();
	};

	$scope.professions = function(){
		return Jobb.getProfessions();
	};

	$scope.counties = function(){
		return Jobb.getCounties();
	}

	$scope.linesOfWork = function(){
		return Jobb.getLinesOfWork();
	}

	$scope.addPending = function(annonsID){ // Add pending job id for single job view
		Jobb.addPendingID(annonsID);
	};

	$scope.antalAnnonser = function(){
		return Jobb.getNumHits();
	}

	$scope.numPages = function(){
		return Jobb.getNumPages();
	}

	$scope.sida = function(){
		return Jobb.getCurrentPage();
	}

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

	$scope.search = function(keyword,pageChange){
		if(!pageChange){
			Jobb.setCurrentPage(1);
			$scope.updateSearchOptions("sida",1);
		}
		$scope.loading = true;
		Jobb.addSearchParam('nyckelord',keyword);
		console.log(Jobb.getSearchParams());
		Jobb.getJobs.get(Jobb.getSearchParams(), function(data){
			$scope.loading = false;
			Jobb.setNumPages(data.matchningslista.antal_sidor);
			Jobb.setNumHits(data.matchningslista.antal_platsannonser);
			
			if(Jobb.getNumHits() === 0){
				Jobb.addSearchResults([]);
			} else {
				Jobb.addSearchResults(data.matchningslista.matchningdata);
			}

			$scope.forceShowResults = true; // Show number of hits, even when there are 0 hits.
		});
	}

	$scope.isFirstPage = function(){
		if($scope.sida() === 1){
			return true;
		} else {
			return false;
		}
	}

	$scope.isLastPage = function(){
		if($scope.sida() === $scope.numPages()){
			return true;
		} else {
			return false;
		}
	}

	$scope.changePage = function(target){
		if(target === 'next'){
			Jobb.setCurrentPage(Jobb.getCurrentPage() + 1);
		} else if(target === 'previous'){
			Jobb.setCurrentPage(Jobb.getCurrentPage() - 1);
		} else if(target === 'first'){
			Jobb.setCurrentPage(1);
		} else {
			Jobb.setCurrentPage(Jobb.getNumPages());
		}
		$scope.updateSearchOptions("sida",$scope.sida());
		$scope.search($scope.query,true);
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
				infoText: $scope.sida()+" / "+$scope.numPages()
			}
		} else {
			$scope.buttonMessages = {
				previous: "Föregående",
				first: "Första",
				next: "Nästa",
				last: "Sista",
				infoText: "Visar sida "+$scope.sida()+" av "+$scope.numPages()
			}
		}
		return $scope.buttonMessages;
	}

	$scope.pageNavSizeTest(); // Determine the size of the navigation buttons of the bottom of the menu depending of the screen size. 

	// Check if the model contains any search params
	if(Object.keys(Jobb.getSearchParams()).length === 0){ // No search params in model
		Jobb.addSearchParam('nyckelord',"");
		Jobb.addSearchParam('antalrader',10);
		Jobb.addSearchParam('sida',1);

	} else {
		var searchParams = Jobb.getSearchParams();
		for(param in searchParams){
			console.log(param);
			console.log(searchParams[param]);
		}
		if(Object.keys(Jobb.getSearchParams()).length > 3){
			$scope.toggleFilter();
		}
	}

	if(Jobb.getPendingQuery()!=undefined){ // If you search from the home page, run the query.
		$scope.query = Jobb.getPendingQuery();
		$scope.search(Jobb.getPendingQuery(),false);
		Jobb.removePendingQuery();
	}
});