(function() {
  'use strict';

  var module = angular.module('HomeAutomation.admin', ['ionic']);

  module.config(function($stateProvider) {
    $stateProvider.state('tabs.admin', {
      url: '/admin',
      views: {
        'tab-admin': {
          controller: 'AdminController as ctrl',
          templateUrl: 'partials/admin.html'
        }
      }
    });
  });

  module.controller('AdminController', function() {
  });

})();
