(function(angular) {
  'use strict';
function OrdersAppController() {

}

angular.
  module('OrdersApp').
  component('ordersList', {
    templateUrl: 'ordersList.html',
    controller: OrdersAppController,
    bindings: {
        orders: '<'
    }
  });
})(window.angular);