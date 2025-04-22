(function () {
    'use strict';

    angular.module('MenuApp')
    .component('categories', {
        templateUrl: 'categories.component.html',
        controller: CategoriesComponentController
    });

    CategoriesComponentController.$inject = ['categories'];
    function CategoriesComponentController(categories) {
        var $ctrl = this;


        console.log($ctrl);
        console.log(categories);

        // Initialize categories
        $ctrl.categories = categories;
    };
    
})();