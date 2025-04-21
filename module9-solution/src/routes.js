(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        
        $stateProvider
            .state('home', {
                url: '/home',
                template: '<h1>Welcome to our Restaurant.</h1>'
            })    

            .state('categories', {
                url: '/categories',
                templateUrl: 'src/categories.component.html',
                controller: 'CategoriesComponentController as categories',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            
            .state('items', {
                url: '/items',
                templateUrl: 'src/items.component.html',
                controller: 'ItemsComponentController as items',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getItemsForCategory(category);
                    }]
                }
            });
    }
    
})();