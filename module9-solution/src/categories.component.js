(function () {
    'use strict';

    angular.module('MenuApp')
    .component('categoriesComponent', {
        templateUrl: 'categories.component.html',
        controller: CategoriesComponentController,
        bindings: {
            prop1: '<',
            prop2: '@',
            onAction: '&'
        }
    });

    CategoriesComponentController.$inject = ['MenuDataService'];
    function CategoriesComponentController(MenuDataService) {
        var categories = this;

        // Initialize categories array
        categories.allCategories = [];

        // Call get all categories with button
        categories.getCategories = function () {
            var promise = MenuDataService.getAllCategories();
            promise.then(function(allCategories) {
                // Set categories array
                categories.allCategories = allCategories;
            }).catch(function(error) {
                console.error("Error occurred:", error);
            });
        };
    };
    
})();