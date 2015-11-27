'use strict';

angular.module('know')

.controller('EditSetCtrl', EditSetCtrl);

EditSetCtrl.$inject = ['$state', '$stateParams', 'Flashcard'];

function EditSetCtrl($state, $stateParams, Flashcard) {

  let vmEditSet = this;

  vmEditSet.setTitle = $stateParams.setTitle;
  vmEditSet.set = Flashcard.getSet($stateParams.setTitle);
  vmEditSet.makeNewCard = makeNewCard;
  vmEditSet.save = save;
  vmEditSet.deleteSet = deleteSet;
  vmEditSet.deleteCard = (index) => vmEditSet.set.cards.splice(index, 1);





  function makeNewCard() {
    vmEditSet.set.cards.push({question: '', answer: ''});
  }

  function save(set) {
    set.cards = set.cards.filter((card) => {
      return card.question.trim() || card.answer.trim();
    });
    Flashcard.updateSet(set, vmEditSet.setTitle);
    $state.go('viewSets');
  }

  function deleteSet(setTitle) {
    Flashcard.deleteSet(setTitle);
    $state.go('viewSets');
  }

}