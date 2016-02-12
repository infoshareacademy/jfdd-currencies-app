angular.module('myApp', []).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/barChart', {
            templateUrl: 'barChart.html'
        }).
    when('/desc', {
        templateUrl: 'desc.html'
    }).
    when('/table', {
        templateUrl: 'table.html'

    }). when('/lineHistoricChart', {
        templateUrl: 'lineHistoricChart.html'

    }).when('/ToDoList', {
        templateUrl: 'ToDoList.html'

    })


}]);