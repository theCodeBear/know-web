'use strict';

angular.module('know')

.directive('knowHeaderButton', knowHeaderButton);

knowHeaderButton.$inject = ['$state'];

function knowHeaderButton($state) {

  return {
    restrict: 'E',
    template: "<button ng-class='classes' class='btn btn-link'>{{text}}</button>",
    scope: {
      text: '@',
      routeTo: '@',
      classes: '@',
      currentState: '='
    },
    link(scope, elem, attrs) {
      elem.bind('click', () => {
        if (scope.routeTo !== scope.currentState)
          $state.go(scope.routeTo);
      });
    }
  };  

}

