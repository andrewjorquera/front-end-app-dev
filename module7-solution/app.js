(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('price', priceFilter);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        // Get items to buy
        toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

        // Get message
        toBuy.message = ShoppingListCheckOffService.getToBuyMessage();

        // Call check off service with button
        toBuy.checkOffItem = function (item, index) {
            ShoppingListCheckOffService.checkOffItem(item, index);
            toBuy.message = ShoppingListCheckOffService.getToBuyMessage();
        };
    };

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', '$scope'];
    function AlreadyBoughtController(ShoppingListCheckOffService, $scope) {
        var alreadyBought = this;

        // Get items already bought
        alreadyBought.items = ShoppingListCheckOffService.getItemsAlreadyBought();

        // Get message
        alreadyBought.message = ShoppingListCheckOffService.getAlreadyBoughtMessage();

        // Watch for changes to message
        $scope.$watch(function () {
            return alreadyBought.message = ShoppingListCheckOffService.getAlreadyBoughtMessage();
        });
    };

    function ShoppingListCheckOffService() {
        var checking = this;

        // Initialize items to buy
        var itemsToBuy = [
            {name: "milk", quantity: 1, pricePerItem: 3.50},
            {name: "eggs", quantity: 12, pricePerItem: 0.40},
            {name: "bread", quantity: 1, pricePerItem: 3.00},
            {name: "cereal", quantity: 2, pricePerItem: 5.00},
            {name: "apples", quantity: 5, pricePerItem: 2.00}
        ];

        // Initialize items already bought
        var itemsBought = [];

        // Initialize messages
        var toBuyMessage = "";
        var alreadyBoughtMessage = "Nothing bought yet.";

        // Move item from to-buy list to already-bought list
        checking.checkOffItem = function (item, index) {
            // Move items
            itemsToBuy.splice(index, 1);
            itemsBought.push(item);

            // Update messages
            if (itemsToBuy.length === 0) {
                toBuyMessage = "Everything is bought!";
            }
            if (itemsBought.length >= 0) {
                alreadyBoughtMessage = "";
            }
        };

        // Get items to buy
        checking.getItemsToBuy = function () {
            return itemsToBuy;
        };

        // Check if items to buy list is empty
        checking.getToBuyMessage = function () {
            return toBuyMessage;
        };

        // Get items already bought
        checking.getItemsAlreadyBought = function () {
            return itemsBought;
        };

        // Get already bought message
        checking.getAlreadyBoughtMessage = function () {
            return alreadyBoughtMessage;
        };
    };

    function priceFilter() {
        return function (pricePerItem, numItems) {
            return "$$$" + (pricePerItem * numItems).toFixed(2);
        };
    };
    
})();