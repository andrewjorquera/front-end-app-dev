(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'MyInfoService'];
function SignUpController(MenuService, MyInfoService) {
  var signupCtrl = this;

  signupCtrl.completed = false;

  signupCtrl.submit = function () {
    const regex = /([A-Za-z]+)(\d+)/;
    const match = signupCtrl.favoriteDish.match(regex);
    const category = match[1];
    const number = match[2];

    MenuService.getMenuItem(category, number).then(function (item) {
      signupCtrl.item = item;
      MyInfoService.setInfo(signupCtrl.firstName, signupCtrl.lastName, signupCtrl.email, signupCtrl.phoneNumber, category, item);
      signupCtrl.completed = true;
    });
  }
}

})();
