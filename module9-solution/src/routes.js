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
                template: '<categories categories="$resolve.categories"></categories>',
                controller: 'CategoriesController',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            
            .state('items', {
                url: '/items/{category}',
                template: '<items items="$resolve.items"></items>',
                controller: 'ItemsController',
                resolve: {
                    items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getAllCategories().then(function (categories) {
                            var category = categories.find(e => e.short_name == $stateParams.category);
                            return MenuDataService.getItemsForCategory(category.short_name);
                        });
                    }]
                }
            });
    }
    
})();