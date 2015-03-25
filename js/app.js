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
      otherwise({
        redirectTo: '/home'
      });
  }]);