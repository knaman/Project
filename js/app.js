angular.module('myApp', [
    'ngRoute',
    'myApp.controllers'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'MainCtrl'});
    $routeProvider.when('/member/:memberId', {templateUrl: 'partials/member.html', controller: 'MemberCtrl'});
    $routeProvider.when('/project/:projectId', {templateUrl: 'partials/project.html', controller: 'PrjCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);
