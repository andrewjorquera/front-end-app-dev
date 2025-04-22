(function () {
    'use strict';

    angular.module('MenuApp')
    .component('items', {
        templateUrl: 'src/items.component.html',
        controller: ItemsComponentController,
        bindings: {
            prop1: '<',
            prop2: '@',
            onAction: '&'
        }
    });

    ItemsComponentController.$inject = ['items'];
    function ItemsComponentController(items) {
        var $ctrl = this;

        // Initialize items
        $ctrl.items = items;
    };
    
})();