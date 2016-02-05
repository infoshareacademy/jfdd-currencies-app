(function(){
    var app = angular.module('Planer', []);

    app.controller('ToDoList', function ($scope) {
        $scope.taskList = [
            {date: '2016-01-14', task: 'Sprzedać 300 USD', done: false},
            {date: '2016-02-01', task: 'Sprzedać 1000 JPY, kupić 500 USD', done: false},
            {date: '2016-02-20', task: 'Kupić 2000 EUR 300 USD', done: false}
        ];
        var today = '2016-02-04';

        $scope.newItem = {date: '', task: '', done: false};

        $scope.addItem = function (item) {
            item.date=item.date || today;
            if(item.task) {
                var newItem = angular.copy(item);
                $scope.taskList.unshift(newItem);
}
};

}).directive('changeList', function()   {
    return {
        templateUrl: 'changeList.html',
        restrict: 'ACE'
    }
})
})();