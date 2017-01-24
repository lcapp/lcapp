// Ionic Login Password Starter App

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider

  .state('config-page', {
    url: '/config',
    templateUrl: 'config/templates/config.html',
    controller: 'ConfigCtrl'
  })

  /*.state('done-page', {
    url: '/done',
    templateUrl: 'config/templates/done.html',
    controller: 'ConfigCtrl'
  })*/

  $urlRouterProvider.otherwise('/config');
});
