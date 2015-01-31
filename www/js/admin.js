(function() {
  'use strict';

  var module = angular.module('HomeAutomation.admin', [
    'HomeAutomation.common',
    'ionic'
  ]);

  module.service('AdminService', function($http, routes) {
    this.restart = function() {
      return $http.post(routes.stop);
    };

    this.getStatistics = function() {
      return $http.get(routes.stats)
      .then(function(response) {
        return response.data;
      });
    };

    this.ping = function() {
      return $http.get(routes.ping);
    };
  });

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

  module.controller('AdminController',
      function(AdminService, $ionicLoading, $interval, $window) {
    var ctrl = this;

    ctrl.restart = function() {
      $ionicLoading.show({
        template: 'Restarting...'
      });
      // TODO show waiting and continuously call ping until service is
      // restarted, then reload page to refresh UI
      AdminService.restart();

      var interval = $interval(function() {
        AdminService.ping()
        .then(function() {
          $interval.cancel(interval);
          $window.location.reload(true);
        });
      }, 1000);
    };
  });

})();
