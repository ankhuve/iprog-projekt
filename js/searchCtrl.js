jobbaExtraApp.controller('SearchCtrl', function ($scope,Jobb) {
	
	$scope.showingResults = false;
	$scope.sida = 1;

	$scope.search = function(keyword,sida){
		$scope.loading = true;
		console.log(keyword);
		Jobb.getJobs.get({nyckelord:keyword,antalrader:10,sida:sida},function(data){
			var options = "";
			for(var i = 1; i <= data.matchningslista.antal_sidor; i ++){
				options += '<option>'+i+'</option>';
				}
			document.getElementById('sidePicker').innerHTML = options;
			
			$scope.antalAnnonser = data.matchningslista.antal_platsannonser;
			$scope.jobs = data.matchningslista.matchningdata;
			console.log(data.matchningslista.matchningdata);
			$scope.loading = false;
			$scope.showingResults = true;
			Jobb.addSearchResults(data.matchningslista.matchningdata);

		});
	}
});