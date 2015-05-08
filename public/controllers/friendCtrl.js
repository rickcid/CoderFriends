var app = angular.module('CoderFriends');

app.controller('friendCtrl', function($scope, events) {

  $scope.events = events;

});