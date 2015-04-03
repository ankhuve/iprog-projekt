var jobbaExtraApp = angular.module('jobbaExtra', ['ngRoute','ngResource', 'ngCookies']);
jobbaExtraApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl as sc'
      }).
      when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl'
      }).
      when('/company', {
        templateUrl: 'partials/company.html',
        controller: 'CompanyCtrl'
      }).
      when('/createJob', {
        templateUrl: 'partials/createJob.html',
        controller: 'CreateJobCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]).run(function($rootScope, $location, Jobb){
    $rootScope.$on("$routeChangeStart", function(event, next, current){
      var guestSites = ["partials/home.html", "partials/search.html", "partials/login.html"];
      
      var userSites = guestSites.slice();
      userSites.push("partials/profile.html");

      var companySites = guestSites.slice();
      companySites.push("partials/company.html", "partials/createJob.html");
      
      var role  = Jobb.getRole();

      if(next.templateUrl === undefined){
        $location.path("/home");
      } else {
        if(role == "admin"){
          //No changes, full access
        } else if(role == "company"){
          if(companySites.indexOf(next.templateUrl)<0){
            Jobb.setLoginMessage("Du har tyvärr inte access.");
            $location.path("/login");
          }
        } else if(role == "user"){
          if(userSites.indexOf(next.templateUrl)<0){
            Jobb.setLoginMessage("Du har tyvärr inte access.");
            $location.path("/login");
          }
        } else { // Guest user
          if(guestSites.indexOf(next.templateUrl)<0){
            Jobb.setLoginMessage("Du har tyvärr inte access.");
            $location.path("/login");
          }
        }
      }

    })
  });

