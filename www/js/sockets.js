(function() {
  'use strict';

  var socketIcons = {
    '0': 'ion-ios7-lightbulb',
    '1': 'ion-ios7-bolt'
  };

  var module = angular.module('HomeAutomation.sockets', [
    'HomeAutomation.common',
    'ionic'
  ]);

  module.service('SocketService', function($http, routes) {
    this.getAll = function() {
      return $http.get(routes.sockets)
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

    ctrl.getSocketIcon = function(socket) {
      return socketIcons[socket.type.id];
    };
  });

})();
