'use strict';

angular.module('know')

.controller('ViewSetsCtrl', ViewSetsCtrl);

ViewSetsCtrl.$inject = ['$state', 'Flashcard'];

function ViewSetsCtrl($state, Flashcard) {

  let vmViewSets = this;


  vmViewSets.stateName = $state.current.name;
  vmViewSets.sets = Flashcard.get();

}