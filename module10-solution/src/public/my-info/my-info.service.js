(function () {
"use strict";

angular.module('public')
.service('MyInfoService', MyInfoService);

function MyInfoService() {
  var service = this;

  service.firstName = "";
  service.lastName = "";
  service.email = "";
  service.phoneNumber = "";
  service.favoriteDish = "";
  service.category = "";
  service.item = {};
  service.registered = false;

  service.getInfo = function () {
    return {
      firstName: service.firstName,
      lastName: service.lastName,
      email: service.email,
      phoneNumber: service.phoneNumber,
      category: service.category,
      item: service.item,
      registered: service.registered
    }
  };

  service.setInfo = function (firstName, lastName, email, phoneNumber, category, item) {
    service.firstName = firstName;
    service.lastName = lastName;
    service.email = email;
    service.phoneNumber = phoneNumber;
    service.category = category;
    service.item = item;
    service.registered = true;
  };
}

})();