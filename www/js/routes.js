var routes = angular.module("starter.routes", ['ionic','ionic-material']);

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
          templateUrl: 'templates/home.html',
          controller: function(ionicMaterialInk)
          {
             ionicMaterialInk.displayEffect();
          }
        }
      }
    })
    .state('app.profile', {
      url: '/profile/:profileId',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        },
        'fabContent': {
          template: '<button id="fab-activity" ui-sref="app.edit-profile" class="button button-fab button-fab-top-right expanded button-energized-500 flap"><i class="icon ion-edit"></i></button>',
          controller: function ($timeout) {
              $timeout(function () {
                  document.getElementById('fab-activity').classList.toggle('on');
              }, 200);
          }
        }
      }
    })
    .state('app.edit-profile', {
      url: '/editprofile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile-edit.html',
          controller: 'ProfileEditCtrl'
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
