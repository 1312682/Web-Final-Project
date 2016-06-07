(function(angular) {
  'use strict';
function AccessoriesAppController() {

}

angular.
  module('AccessoriesApp').
  component('accessoriesList', {
    templateUrl: 'accessoriesList.html',
    controller: AccessoriesAppController,
    bindings: {
        accessories: '<'
    }
  });
})(window.angular);