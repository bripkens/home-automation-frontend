(function() {
  'use strict';

  var module = angular.module('HomeAutomation.sockets', ['ionic']);

  module.service('SocketService', function($http) {
    this.getAll = function() {
      return $http.get('/api/sockets')
      .then(function(response) {
        return response.data;
      });
    };

    this.activate = function(socket) {
      return $http.post(socket['@links'].activate.href);
    };

    this.deactivate = function(socket) {
      return $http.post(socket['@links'].deactivate.href);
    };
  });

  module.config(function($stateProvider) {
    $stateProvider.state('tabs.sockets', {
      url: '/sockets',
      views: {
        'tab-sockets': {
          controller: 'SocketsController as ctrl',
          templateUrl: 'partials/sockets.html',
          resolve: {
            sockets: function(SocketService) {
              return SocketService.getAll();
            }
          }
        }
      }
    });
  });

  module.controller('SocketsController', function(sockets, SocketService) {
    var ctrl = this;
    ctrl.sockets = sockets;

    ctrl.activate = function(socket) {
      SocketService.activate(socket);
    };

    ctrl.deactivate = function(socket) {
      SocketService.deactivate(socket);
    };
  });

})();
