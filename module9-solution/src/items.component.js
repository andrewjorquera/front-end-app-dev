(function () {
    'use strict';

    angular.module('MenuApp')
    .component('itemsComponent', {
        templateUrl: 'items.component.html',
        controller: ItemsComponentController,
        bindings: {
            prop1: '<',
            prop2: '@',
            onAction: '&'
        }
    });

    ItemsComponentController.$inject = ['MenuDataService'];
    function ItemsComponentController(MenuDataService) {
        var items = this;

        // Initialize found items array
        items.allItems = [];

        // Call get items with button
        items.getItems = function (categoryShortName) {
            var promise = MenuDataService.getItemsForCategory(categoryShortName);
            promise.then(function(foundItems) {
                // Set items array
                items.allItems = foundItems;
            }).catch(function(error) {
                console.error("Error occurred:", error);
            });
        };
    };
    
})();