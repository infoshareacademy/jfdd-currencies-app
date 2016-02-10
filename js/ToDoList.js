(function () {
    var app = angular.module('Planer', []);

    //var statuses = {
    //    isPlanned: {},
    //    isDone: {},
    //    isAnnuled: {}
    //};

    app.controller('ToDoList', function ($scope) {
        $scope.taskList = [
            {date: '2016-01-14', task: 'Sprzedać 300 USD', status: "isDone", itemStyle: {"color":"green"}},
            {date: '2016-02-01', task: 'Sprzedać 1000 JPY, kupić 200 USD', status: "isDone", itemStyle: {"color":"green"}},
            {date: '2016-02-01', task: 'Sprzedać 2000 JPY, kupić 1500 USD', status: "isPlanned", itemStyle: {"color":"blue"}},
            {date: '2016-02-01', task: 'Sprzedać 1000 JPY, kupić 700 USD', status: "isPlanned", itemStyle: {"color":"blue"}},
            {date: '2016-02-01', task: 'Sprzedać 200 JPY, kupić 500 USD', status: "isAnnuled", itemStyle: {"color":"orange"}},
            {date: '2016-02-20', task: 'Kupić 2000 EUR 300 USD', status: "isAnnuled", itemStyle: {"color":"orange"}}
        ];

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;

        //
        //var taskColor = "deeppink";
        //
        //$scope.myStyle = {
        //    "color": taskColor
        //};
        //
        //
        //$scope.myStyle = myStyle;
        //
        //var myStyle = function () {
        //    if (item.status == "isDone") {
        //        taskColor = "blue";
        //        return {"color": taskColor};
        //    }
        //
        //
        //    var myColor = 'pink';
        //    $scope.mycolor = 'pink';
        //    $scope.setTaskColor = function () {
        //
        //        if (item.status = "isDone") {
        //            taskColor = "green";
        //        }
        //        else if (item.status = "isAnnuled") {
        //            taskColor = "orange";
        //        }
        //        else {
        //            taskColor = "blue";
        //        }
        //        return taskColor;
        //
        //    };
        //    $scope.taskColor = taskColor
        //    setTaskColor();


            $scope.newItem = {date: '', task: '', status: "isPlanned", itemStyle: {"color":"blue"}};

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

            $scope.statusIntoDone = function (item) {
                item.status = "isDone";
                item.itemStyle= {"color":"green"}
            };
            $scope.statusIntoPlanned = function (item) {
                item.status = "isPlanned";
                item.itemStyle ={"color":"blue"};
                item.date = today;
            };
            $scope.statusIntoAnnuled = function (item) {
                item.status = "isAnnuled";
                item.itemStyle = {"color":"orange"}
            };

        }
        ).directive('changeList', function () {
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