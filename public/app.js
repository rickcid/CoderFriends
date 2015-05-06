var app = angular.module('CoderFriends', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html',
    })
    .when('/home', {
      templateUrl: 'templates/home.html',
    })
    .when('/friend/:github_username', {
      templateUrl: 'templates/friend.html',
    })
    //Test url for main.html link to github authentication
    .when('/auth/github', {
      templateUrl: 'templates/github.html',
    })
    .otherwise({
      redirectTo: '/'
    });
});