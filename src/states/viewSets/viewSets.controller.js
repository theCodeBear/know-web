'use strict';

angular.module('know')

.controller('ViewSetsCtrl', ViewSetsCtrl);

ViewSetsCtrl.$inject = ['$state', 'Flashcard'];

function ViewSetsCtrl($state, Flashcard) {

  let vmViewSets = this;


  vmViewSets.stateName = $state.current.name;
  vmViewSets.sets = Flashcard.get();
  vmViewSets.goToCards = goToCards;


  function goToCards(setTitle) {
    if (vmViewSets.sets[setTitle].cards.length)
      $state.go('viewCards', {setTitle: setTitle});
  }

}