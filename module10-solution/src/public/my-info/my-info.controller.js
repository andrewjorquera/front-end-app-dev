(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MyInfoService', '$scope'];
function MyInfoController(MyInfoService, $scope) {
  var myinfoCtrl = this;

  myinfoCtrl.$onInit = function () {
    myinfoCtrl.info = MyInfoService.getInfo();
  };
}

})();
    