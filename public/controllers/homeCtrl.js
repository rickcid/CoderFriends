var app = angular.module('CoderFriends');

app.controller('homeCtrl', function($scope, friends) {

  $scope.friends = friends;

});