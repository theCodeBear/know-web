'use strict';

angular.module('know', ['ui.router']).run(run).config(config);

run.$inject = ['Flashcard'];

function run(Flashcard) {
  Flashcard.getFromLocalStorage();
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'states/home/home.html',
    controller: 'HomeCtrl as vmHome'
  }).state('createSet', {
    url: '/createSet',
    templateUrl: 'states/createSet/createSet.html',
    controller: 'CreateSetCtrl as vmCreateSet'
  }).state('viewSets', {
    url: '/viewSets',
    templateUrl: 'states/viewSets/viewSets.html',
    controller: 'ViewSetsCtrl as vmViewSets'
  }).state('editSet', {
    url: '/editSet/:setTitle',
    templateUrl: 'states/editSet/editSet.html',
    controller: 'EditSetCtrl as vmEditSet'
  }).state('viewCards', {
    url: '/cards/:setTitle',
    templateUrl: 'states/viewCards/viewCards.html',
    controller: 'ViewCardsCtrl as vmViewCards'
  });

  $urlRouterProvider.otherwise('/');
};