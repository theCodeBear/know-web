'use strict';

angular.module('know').controller('ViewCardsCtrl', ViewCardsCtrl);

ViewCardsCtrl.$inject = ['$stateParams', 'Flashcard'];

function ViewCardsCtrl($stateParams, Flashcard) {

  var vmViewCards = this;

  vmViewCards.setTitle = $stateParams.setTitle;
  vmViewCards.cards = Flashcard.getSet(vmViewCards.setTitle).cards;
  vmViewCards.side = 'question';
  vmViewCards.cardIndex = 0;
  vmViewCards.flip = function () {
    return vmViewCards.side = vmViewCards.side === 'question' ? 'answer' : 'question';
  };
  vmViewCards.next = next;
  vmViewCards.randomize = randomize;

  function next() {
    if (vmViewCards.cardIndex < vmViewCards.cards.length - 1) vmViewCards.cardIndex++;else vmViewCards.cardIndex = 0;
    vmViewCards.side = 'question';
  }

  function randomize() {
    var num = undefined,
        tempArr = [],
        length = vmViewCards.cards.length;
    for (var i = 0; i < length; i++) {
      num = Math.floor(Math.random() * vmViewCards.cards.length);
      tempArr.push(vmViewCards.cards[num]);
      vmViewCards.cards.splice(num, 1);
    }
    vmViewCards.cards = tempArr;
    vmViewCards.side = 'question';
  }
}