(function () {
"use strict";

angular.module('public')
.directive('validDish', ['MenuService', '$q', function (MenuService, $q) {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      ngModelCtrl.$asyncValidators.validDish = function (modelValue, viewValue) {
        const value = modelValue || viewValue;
        const regex = /([A-Za-z]+)(\d+)/;
        const match = value.match(regex);

        if (!match) {
          return $q.reject();
        }

        const category = match[1];
        const number = match[2];

        return MenuService.getMenuItem(category, number).then(function (item) {
          if (item) {
            return true;
          } else {
            return $q.reject();
          }
        });
      };
    }
  };
}]);

})();
