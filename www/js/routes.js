var routes = angular.module("starter.routes", ['ionic']);

routes.config(function($stateProvider, $urlRouterProvider)
{

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html'
        }
      }
    })
 .state('app.host', {
      url: '/host',
      views: {
        'menuContent': {
          templateUrl: 'templates/host.html'
        }
      }
   })
 .state('app.calendar', {
      url: '/calendar',
      views: {
        'menuContent': {
          templateUrl: 'templates/calendar.html'
        }
      }

   })
 .state('app.findevents', {
      url: '/findevents',
      views: {
        'menuContent': {
          templateUrl: 'templates/findevents.html'
        }
      }
    })
 .state('app.savedevents', {
      url: '/savedevents',
      views: {
        'menuContent': {
          templateUrl: 'templates/savedevents.html'
        }
      }
    })
 .state('app.applieddevents', {
      url: '/applieddevents',
      views: {
        'menuContent': {
          templateUrl: 'templates/applieddevents.html'
        }
      }
    })
 .state('app.supportus', {
      url: '/supportus',
      views: {
        'menuContent': {
          templateUrl: 'templates/supportus.html'
        }
      }
    })
    $urlRouterProvider.otherwise('/app/home');
})
