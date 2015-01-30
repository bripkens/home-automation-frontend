(function() {
  'use strict';

  var module = angular.module('HomeAutomation', [
    'HomeAutomation.sockets',
    'HomeAutomation.admin',
    'ionic'
  ]);

  module.config(function($stateProvider,
                         $urlRouterProvider) {
    $stateProvider
    .state('tabs', {
      abstract: true,
      templateUrl: 'partials/tabs.html'
    })
    .state('error', {
      url: '/error',
      templateUrl: 'partials/error.html'
    });

    $urlRouterProvider.otherwise('/sockets');
  });
})();
