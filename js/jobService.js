jobbaExtraApp.factory('Jobb',function ($resource, $cookieStore) {
  var savedJobs = [];
  var searchResults = [];
// http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?anstallningstyp=2&nyckelord=servit%C3%B6r

  this.getJobs = $resource('php/getShit.php');

  this.addSearchResults = function(results){
    console.log(results);
    searchResults = results;
  }

  this.getSearchResults = function(results){
    return searchResults;
  }
// http://api.arbetsformedlingen.se/af/v0platsannonser/soklista/yrkesomraden
  return this;

});