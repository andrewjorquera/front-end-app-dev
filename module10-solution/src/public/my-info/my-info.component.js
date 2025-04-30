(function () {
"use strict";

angular.module('public')
.component('myInfo', {
  templateUrl: 'src/public/my-info/my-info.html?' + Date.now(),
  controller: 'MyInfoController',
  controllerAs: 'myinfoCtrl'
});

})();
