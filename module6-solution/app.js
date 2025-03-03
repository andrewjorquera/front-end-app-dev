(function () {
    'use strict';
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        // Initialize input and message
        $scope.lunchMenu = "";
        $scope.lunchMessage = "";

        // Initialize styles
        $scope.messageColor = "";
        $scope.textBorder = "";

        // Initialize maximum number of items
        const maxItems = 3;

        // Button function
        $scope.lunchButton = function () {
            // Get number of values from lunch menu list
            // Empty items are NOT considered as an item towards the count
            var numberOfItems = $scope.lunchMenu.split(",")
                                .filter(e => e.trim()).length;

            // If under maximum
            if (numberOfItems <= maxItems) {
                if (numberOfItems == 0) {
                    // Check if list is empty
                    $scope.lunchMessage = "Please enter data first";

                    // Add message style
                    $scope.messageColor = "text-danger";
                    $scope.textBorder = "text-border-red";
                }
                else {
                    // If not, then list is good
                    $scope.lunchMessage = "Enjoy!";

                    // Add message style
                    $scope.messageColor = "text-success";
                    $scope.textBorder = "text-border-green";
                }
            } else {
                // Over maximum
                $scope.lunchMessage = "Too much!";

                // Add message style
                $scope.messageColor = "text-success";
                $scope.textBorder = "text-border-green";
            }
        }
    };
})();
