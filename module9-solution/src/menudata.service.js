(function () {
    'use strict';

    angular.module('data',)
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
        var data = this;

        // HTTP call to get menu items
        data.getAllCategories = function() {
            return $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json",
            }).then(function (result) {
                // Get all categories
                var allCategories = result.data;

                //Return all categories
                return allCategories;
            });
            
        }

        // HTTP call to get menu items
        data.getItemsForCategory = function(categoryShortName) {
            return $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/{categoryShortName}.json",
            }).then(function (result) {
                // Get items for given category
                var allItems = result.data;

                //Return items
                return allItems;
            });
            
        }
    };
    
})();