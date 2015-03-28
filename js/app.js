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
        controller: 'SearchCtrl'
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
      if(Jobb.loggedIn ===  false){
        if(next.templateUrl ==  "partials/login.html"){
          // Already heading to login, no change needed
        } else {
          $location.path("/login");
        }
      }
      // console.log(Jobb.loggedIn);
    })
  });

// angular.module(...)
//  .config( ['$routeProvider', function($routeProvider) {...}] )
//  .run( function($rootScope, $location) {

//     // register listener to watch route changes
//     $rootScope.$on( "$routeChangeStart", function(event, next, current) {
//       if ( $rootScope.loggedUser == null ) {
//         // no logged user, we should be going to #login
//         if ( next.templateUrl == "partials/login.html" ) {
//           // already going to #login, no redirect needed
//         } else {
//           // not going to #login, we should redirect now
//           $location.path( "/login" );
//         }
//       }         
//     });
//  })