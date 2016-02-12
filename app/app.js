angular.module('myApp', []).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/barChart', {
            templateUrl: '../barChart.html',
            controller: 'HomeController'
        });
}]);