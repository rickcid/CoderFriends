var app = angular.module('CoderFriends');

app.service('GithubService', function($http, $q) {

  this.getFollowing = function() {
    return $http({
      method: 'GET',
      url: "api/github/following"
    })
    .then(function(response) {
      return response.data;
    })
  }

  this.getFriendActivity = function(username) {
    var deferred = $q.defer();
    $http({
      method: 'GET', 
      url: "api/github/" + username + "/activity"
    })
    .then(function(response) {
      deferred.resolve(response.data);
    }, function(err) {
      deferred.reject(err);
    })
    return deferred.promise;
  }

});
