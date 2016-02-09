(function () {
    var app = angular.module('Planer', []);

    //var statuses = {
    //    isPlanned: {},
    //    isDone: {},
    //    isAnnuled: {}
    //};

    app.controller('ToDoList', function ($scope) {
        $scope.taskList = [
            {date: '2016-01-14', task: 'Sprzedać 300 USD', status: "isDone"},
            {date: '2016-02-01', task: 'Sprzedać 1000 JPY, kupić 200 USD', status: "isDone"},
            {date: '2016-02-01', task: 'Sprzedać 2000 JPY, kupić 1500 USD', status: "isPlanned"},
            {date: '2016-02-01', task: 'Sprzedać 1000 JPY, kupić 700 USD', status: "isPlanned"},
            {date: '2016-02-01', task: 'Sprzedać 200 JPY, kupić 500 USD', status: "isAnnuled"},
            {date: '2016-02-20', task: 'Kupić 2000 EUR 300 USD', status: "isAnnuled"}
        ];

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }
        today = yyyy+'-'+mm+'-'+dd;


        $scope.newItem = {date: '', task: '', status:"isPlanned"};

        $scope.addItem = function (item) {
            item.date = item.date || today;
            if (item.task) {
                var newItem = angular.copy(item);
                //newItem.status=statuses.isPlanned;
                $scope.taskList.unshift(newItem);
                console.log($scope.taskList)
            }
        };
        $scope.removeItem = function (item) {
            var idx = $scope.taskList.indexOf(item);
            $scope.taskList.splice(idx, 1);
        };

        $scope.statusIntoDone = function(item)  {
            item.status = "isDone";
        };
        $scope.statusIntoPlanned = function(item)  {
            item.status = "isPlanned";
            item.date = today;
        };
        $scope.statusIntoAnnuled = function(item)  {
            item.status = "isAnnuled";
        };

    }).directive('changeList', function () {
        return {
            templateUrl: 'changeList.html',
            restrict: 'ACE'
        }
    }).filter('doneTasks', function () {
        return function (items) {
            return items.filter(function (item) {
                return item.status === "isDone";
            });
        }
    }).filter('plannedTasks', function () {
        return function (items) {
            return items.filter(function (item) {
                return item.status === "isPlanned";
            });
        }
    }).filter('annuledTasks', function () {
        return function (items) {
            return items.filter(function (item) {
                return item.status === "isAnnuled";
            });
        }
    });



})();