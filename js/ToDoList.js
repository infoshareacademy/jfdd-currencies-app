(function () {
    var app = angular.module('Planer', []);

    var statuses = {
        isPlanned: {},
        isDone: {},
        isAnnuled: {}
    };

    app.controller('ToDoList', function ($scope) {
        $scope.taskList = [
            {date: '2016-01-14', task: 'Sprzedać 300 USD', status: statuses.isDone},
            {date: '2016-02-01', task: 'Sprzedać 1000 JPY, kupić 200 USD', status: statuses.isDone},
            {date: '2016-02-01', task: 'Sprzedać 2000 JPY, kupić 1500 USD', status: statuses.isPlanned},
            {date: '2016-02-01', task: 'Sprzedać 1000 JPY, kupić 700 USD', status: statuses.isPlanned},
            {date: '2016-02-01', task: 'Sprzedać 200 JPY, kupić 500 USD', status: statuses.isAnnuled},
            {date: '2016-02-20', task: 'Kupić 2000 EUR 300 USD', status: statuses.isAnnuled}
        ];
        var today = '2016-02-04';

        $scope.newItem = {date: '', task: ''};

        $scope.addItem = function (item) {
            item.date = item.date || today;
            if (item.task) {
                var newItem = angular.copy(item);
                newItem.status=statuses.isPlanned;
                $scope.taskList.unshift(newItem);
                console.log($scope.taskList)
            }
        };

    }).directive('changeList', function () {
        return {
            templateUrl: 'changeList.html',
            restrict: 'ACE'
        }
    }).filter('doneTasks', function () {
        return function (items) {
            return items.filter(function (item) {
                return item.status === statuses.isDone;
            });
        }
    }).filter('plannedTasks', function () {
        return function (items) {
            return items.filter(function (item) {
                return item.status === statuses.isPlanned;
            });
        }
    }).filter('annuledTasks', function () {
        return function (items) {
            return items.filter(function (item) {
                return item.status === statuses.isAnnuled;
            });
        }
    });



})();