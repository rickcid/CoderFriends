var app = angular.module('CoderFriends', ['ngRoute']);


app.config(function($routeProvider, $httpProvider){

  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $httpProvider.interceptors.push('myHttpInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: '/templates/login.html',
    })
    .when('/home', {
      templateUrl: '/templates/home.html',
      controller: 'homeCtrl',
      resolve: {
        friends: function(GithubService) {
          return GithubService.getFollowing();
        }
      }
    })
    .when('/friend/:github_username', {
      templateUrl: '/templates/friend.html',
      controller: 'friendCtrl',
      resolve: {
        events: function(GithubService, $route) {
          return GithubService.getFriendActivity($route.current.params.github_username);
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.factory('myHttpInterceptor', function($q) {
    return {
        // optional method
        'responseError': function(rejection) {
            if (rejection.status == 403) {
                document.location = '/';
                return;
            }
            return $q.reject(rejection);
        }
    };
});