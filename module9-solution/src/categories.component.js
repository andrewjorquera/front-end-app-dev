(function () {
    'use strict';

    angular.module('MenuApp')
    .component('categories', {
        templateUrl: 'src/categories.component.html',
        controller: CategoriesComponentController,
        bindings: {
            categories: '<'
        }
    });

    function CategoriesComponentController() {
        var $ctrl = this;

        $ctrl.onInit = function() {
            console.log("Ctrl:");
            console.log($ctrl);
            console.log("Categories:");
            console.log($ctrl.categories);
        }
    }
})();