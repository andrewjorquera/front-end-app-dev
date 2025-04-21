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

    CategoriesComponentController.$inject = ['categories'];
    function CategoriesComponentController(categories) {
        var $ctrl = this;

        console.log(categories);

        // Initialize categories
        $ctrl.categories = categories;
    };
    
})();