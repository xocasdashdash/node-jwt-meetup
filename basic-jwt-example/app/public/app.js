(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage', 'angular-jwt'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider,$httpProvider, jwtOptionsProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.view.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            });
            // Please note we're annotating the function so that the $injector works when the file is minified
            jwtOptionsProvider.config({
              tokenGetter: ['AuthenticationService', function(authService) {
                return authService.getStoredToken();
              }]
            });
            //EXAMPLE
            //$httpProvider.interceptors.push('jwtInterceptor');
    }

    function run($rootScope, $http, $location, $localStorage) {
        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();
