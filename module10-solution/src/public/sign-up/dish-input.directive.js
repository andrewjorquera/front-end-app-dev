(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
    var $ctrl = this;

    $ctrl.completed = false;

    $ctrl.submit = function () {
    MenuService.getMenuItems($ctrl.favoriteDish).then(function (items) {
        $ctrl.items = items;

        if ($ctrl.items == null) {
            $ctrl.dishError = true;
            $ctrl.completed = false;
        } else {
            $ctrl.dishError = false;
            $ctrl.completed = true;
        }
    });
    }
}


})();
    
angular.module('public')
.directive('validDish', ['MenuService', function(MenuService) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.validDish = function(modelValue, viewValue) {
        var value = modelValue || viewValue;
        return MenuService.getMenuItems(value).then(function(result) {
          if (!result) {
            return Promise.reject(); // invalid dish
          }
          return true; // valid dish
        });
      };
    }
  };
}]);


