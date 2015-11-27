'use strict';

angular.module('know')

.factory('Flashcard', Flashcard);

Flashcard.$inject = ['$window'];

function Flashcard($window) {

  let flashcards = {};

  // {
  //   setTitle: {
  //     tags: [],
  //     cards: [
  //       { question: '', answer: ''},
  //       { question: '', answer: ''}
  //     ]
  //   },
  //   setTitle: {
  //     tags: [],
  //     cards: [
  //       { question: '', answer: ''},
  //       { question: '', answer: ''}
  //     ]
  //   }
  // }

  let service = {
    get,
    getSet,
    addSet,
    getFromLocalStorage,
    deleteSet,
    updateSet
  };

  return service;

// PUBLIC METHODS
  // for use when user goes to view sets view
  function get() {
    return flashcards;
  }

  // for use when user is navigating to show set view
  function getSet(setTitle) {
    return angular.copy(flashcards[setTitle]);
  }

  // for use when user starts creating a new set
  function addSet(set) {
    // Object.assign(flashcards, set);    // Doesn't work on mobile
    // have to use this way instead of Object.assign()
    flashcards[Object.keys(set)[0]] = set[Object.keys(set)[0]]
    saveToLocalStorage(flashcards);
  }

  // for use when application starts to get cards out of LocalStorage
  function getFromLocalStorage() {
    flashcards = JSON.parse($window.localStorage.getItem('knowFlashcards')) || {};
    return flashcards;
  }

  // for use when user deletes a set
  function deleteSet(setTitle) {
    delete flashcards[setTitle];
    saveToLocalStorage(flashcards);
  }

  // for use when user saves new cards to a set or edits the set
  function updateSet(set, setTitle) {
    flashcards[setTitle] = set;
    saveToLocalStorage(flashcards);
  }



// PRIVATE METHODS
  // service internal method for saving cards to LocalStorage
  function saveToLocalStorage(cards) {
    $window.localStorage.setItem('knowFlashcards', JSON.stringify(cards));
  }

}