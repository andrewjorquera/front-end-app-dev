(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MyInfoService'];
function MyInfoController(MyInfoService) {
  var myinfoCtrl = this;

  myinfoCtrl.$onInit = function () {
    myinfoCtrl.info = MyInfoService.getInfo();
    console.log(myinfoCtrl.info);
  };
}

})();
    