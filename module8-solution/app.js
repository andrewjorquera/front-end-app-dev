(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems);
    
    NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
    function NarrowItDownController(MenuSearchService, $scope) {
        var narrow = this;

        // Initialize found items array
        narrow.found = [];

        // Initialize if found is empty
        narrow.empty = true;

        // Call narrow it down service with button
        narrow.narrowItDown = function (term) {
            var promise = MenuSearchService.getMatchedMenuItems(term);
            promise.then(function(foundItems) {
                // Set found array
                narrow.found = foundItems;
                
                // Set message if empty
                if (narrow.found.length > 0) {
                    narrow.empty = false;
                } else {
                    narrow.empty = true;
                }

                $scope.$apply();
            }).catch(function(error) {
                console.error("Error occurred:", error);
            });
        };

        narrow.removeItem = function (index) {
            narrow.found.splice(index, 1);
            // Set message if empty
            if (narrow.found.length > 0) {
                narrow.empty = false;
            } else {
                narrow.empty = true;
            }

            $scope.$apply();
        }
    };

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var search = this;

        // HTTP call to get menu items
        search.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json",
            }).then(function (result) {
                // Initialize filtered items
                var foundItems = [];

                // Exit if search term is empty
                if (searchTerm === "" || searchTerm === undefined) {
                    return foundItems;
                }

                // Get all results
                var allItems = result.data;

                // Loop through and filter out non-matches
                for (const category in allItems) {
                    // Get menu items in category
                    const menuItems = allItems[category].menu_items;

                    for (const item in menuItems) {
                        // Get menu item
                        const itemName = menuItems[item].name;

                        // If name includes search term, add to found items
                        if (itemName.toLowerCase().includes(searchTerm.toLowerCase())) {
                            foundItems.push(menuItems[item]);
                        }
                    }
                }

                //Return found items
                return foundItems;
            });
            
        }
    };

    function FoundItems() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            bindToController: true,
            controllerAs: 'narrow'
        };

        return ddo;
    };
    
})();