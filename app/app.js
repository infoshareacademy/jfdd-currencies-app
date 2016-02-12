angular.module('myApp', ['ngRoute','Planer']).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/barChart', {
            templateUrl: 'barChart.html'
        }).when('/desc', {
        templateUrl: 'desc.html'
    }).when('/table', {
        templateUrl: 'table.html'
    }).when('/lineHistoricChart', {
        templateUrl: 'lineHistoricChart.html'
    }).when('/trends', {
        templateUrl: 'trends.html'
    //}).when('/logger', {
    //    templateUrl: 'logger.html'
    }).when('/ToDoList', {
        templateUrl: 'ToDoList.html',
        controller:'ToDoList'
    }).
    otherwise({
        redirectTo: '/desc'
    });
}]);