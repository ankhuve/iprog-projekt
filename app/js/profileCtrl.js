jobbaExtraApp.controller('ProfileCtrl',function ($scope, Jobb) {
  $scope.username = Jobb.getLoggedInUser();
})