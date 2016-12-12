(function() {
  'use strict';
  angular
    .module('app')
    .factory('AuthenticationService', ['$http', '$localStorage', function($http, $localStorage) {
      return {
        login: function(username, password, callback) {
          return $http.post('/api/users/token', {
              username: username,
              password: password
            })
            .then(function(response) {
              // login successful if there's a token in the response
              if (response.data.token) {
                // store username and token in local storage to keep user logged in between page refreshes
                $localStorage.currentUser = {
                  username: username,
                  token: response.data.token
                };
                // execute callback with true to indicate successful login
                callback(true);
              } else {
                // execute callback with false to indicate failed login
                callback(false);
              }
            }, function(response) {
              console.error('Errroorr', response);
              callback(false);
            });
        },
        logout: function() {
          // remove user from local storage and clear http auth header
          delete $localStorage.currentUser;
          return true;
        },
        getStoredToken: function() {
          return $localStorage.currentUser ? $localStorage.currentUser.token : $localStorage.currentUser;
        }
      };
    }]);
})();
