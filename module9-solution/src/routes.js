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
                template: '<categories/>',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            
            .state('items', {
                url: '/items/{category}',
                templateUrl: 'src/items.component.html',
                controller: 'ItemsComponentController as items',
                resolve: {
                    items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getAllCategories().then(function (categories) {
                            return categories[$stateParams.category];
                        });
                    }]
                }
            });
    }
    
})();