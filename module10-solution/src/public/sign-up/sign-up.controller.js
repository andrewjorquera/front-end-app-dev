(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'MyInfoService'];
function SignUpController(MenuService, MyInfoService) {
  var signupCtrl = this;

  signupCtrl.completed = false;

  signupCtrl.submit = function () {

    // Check for short name pattern
    const regex = /([A-Za-z]+)(\d+)/;
    const match = signupCtrl.favoriteDish.match(regex);

    if (match) {
      const category = match[1];
      const number = match[2];

      MenuService.getMenuItem(category, number).then(function (item) {
      
        signupCtrl.item = item;

        if (signupCtrl.item == null) {
          signupCtrl.dishError = true;
          signupCtrl.completed = false;
        } else {
          MyInfoService.setInfo(signupCtrl.firstName, signupCtrl.lastName, signupCtrl.email, signupCtrl.phoneNumber, category, signupCtrl.item)
          signupCtrl.dishError = false;
          signupCtrl.completed = true;
        }
      });
    } else {
      signupCtrl.dishError = true;
      signupCtrl.completed = false;
    }

    
  }
}

})();
