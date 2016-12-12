(function() {
  'use strict';
  angular
    .module('app')
    .controller('Home.IndexController', ['AuthenticationService', '$location', 'jwtHelper','$http',
      function($authService, $location, $jwtHelper,$http) {
        var vm = this;
        vm.logout = function() {
          console.log('logout');
          if($authService.logout()) {
            $location.path('/login');
          }
        };
        vm.token = $jwtHelper.decodeToken($authService.getStoredToken());
        vm.views = 'Fetching...';
        vm.fetchViews = function(){
          $http.get('/api/views').then(function(r){
              vm.views = r.data.views;
          },function(r){
              console.log(r);
              vm.views = 'Problem fetching views :(';
          });
        };
        vm.fetchViews();
        vm.incViews = function(){
          $http.post('/api/views').then(function(r){
            vm.views = r.data.views;
          },function(r){
              console.log(r);
              vm.views = 'Problem increasing views :(';
          });
        };
      }
    ]);
})();
