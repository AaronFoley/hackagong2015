var routes = angular.module("starter.routes", ['ionic','ionic-material']);

routes.config(function($stateProvider, $urlRouterProvider)
{
    $stateProvider
    .state('app',
    {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        resolve:
        {
            profile: function(Profiles, Auth)
            {
                return Auth.$requireAuth().then(function(auth){
                    return Profiles.get(auth.uid).$loaded();
                }, function(error){
                    console.log(error)
                    return;
                });
            }
        }
    })
    .state('app.profile',
    {
        url: '/profile/:profileId',
        views:
        {
            'menuContent':
            {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl',
                resolve:
                {
                    profile: function(Profiles, $stateParams)
                    {
                        return Profiles.get($stateParams.profileId).$loaded();
                    }
                }
            },
            'fabContent':
            {
                template: '<button id="fab-activity" ui-sref="app.edit-profile" class="button button-fab button-fab-top-right expanded button-energized-500 flap"><i class="icon ion-edit"></i></button>',
                controller: function ($scope, $timeout, $stateParams)
                {
                    if ($stateParams.profileId != $scope.$parent.authData.uid)
                    {
                        $scope.$parent.clearFabs();
                    }

                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    .state('app.edit-profile',
    {
        url: '/editprofile',
        views:
        {
            'menuContent':
            {
                templateUrl: 'templates/profile-edit.html',
                controller: 'ProfileEditCtrl',
                resolve:
                {
                    profile: function(Profiles, Auth, $state)
                    {
                        return Auth.$requireAuth().then(function(auth){
                            return Profiles.get(auth.uid).$loaded();
                        }, function(error){
                            $state.go('/events')
                            return;
                        });
                    },
                    authData: function(Auth, $state)
                    {
                        return Auth.$requireAuth().then(function(auth){
                            return auth
                        }, function(error){
                            $state.go('/events')
                            return;
                        });
                    }
                }
            }
        }
    })
    .state('app.events',
    {
        url: '/events',
        views: {
            'menuContent': {
                templateUrl: 'templates/events.html',
                controller: 'EventsListCtrl',
                resolve:
                {
                    events: function(Events)
                    {
                        return Events.all().$loaded();
                    }
                }
            },
            'fabContent':
            {
                template: ''
            }
        }
    })
    .state('app.events-view',
    {
        url: '/events/view/:eventid',
        views:
        {
            'menuContent':
            {
                templateUrl: 'templates/events-view.html',
                controller: 'EventsViewCtrl',
                resolve:
                {
                    event: function(Events,$stateParams)
                    {
                        return Events.get($stateParams.eventid).$loaded();
                    },
                    authData: function(Auth)
                    {
                        return Auth.$requireAuth().then(function(auth){
                            return auth
                        }, function(error){
                            return;
                        });
                    }
                }
            },
            'fabContent':
            {
                template: ''
            }
        }
    })
    .state('app.events-create',
    {
        url: '/events/create',
        views:
        {
            'menuContent':
            {
                templateUrl: 'templates/events-create.html',
                controller: 'EventsCreateCtrl',
                resolve:
                {
                    authData: function(Auth, $state)
                    {
                        return Auth.$requireAuth().then(function(auth){
                            return auth
                        }, function(error){
                            $state.go('/events')
                            return;
                        });
                    }
                }
            },
            'fabContent':
            {
                template: ''
            }
        }
    })
    .state('app.events-edit',
    {
        url: '/events/create/:createid',
        views:
        {
            'menuContent':
            {
                templateUrl: 'templates/events-create.html',
                controller: 'EventsEditCtrl'
            },
            'fabContent':
            {
                template: ''
            }
        }
    })
    .state('app.applied',
    {
        url: '/applied',
        views:
        {
            'menuContent': {
                templateUrl: 'templates/events.html',
                controller: 'EventsAppliedCtrl'
            },
            'fabContent':
            {
                template: ''
            }
      }
    })
    .state('app.hosted',
    {
        url: '/hosted',
        views:
        {
            'menuContent':
            {
                templateUrl: 'templates/events.html',
                controller: 'EventsHostedCtrl'
            },
            'fabContent':
            {
                template: '<button id="fab-activity" ui-sref="app.events-create" class="button button-fab button-fab-bottom-right expanded button-energized-500 flap"><i class="icon ion-plus"></i></button>',
                controller: function ($scope, $timeout)
                {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    .state('app.supportus',
    {
        url: '/supportus',
        views:
        {
            'menuContent':
            {
                templateUrl: 'templates/supportus.html',
                controller: 'SupportUsCtrl'
            },
            'fabContent':
            {
                template: ''
            }
        }
    })

    $urlRouterProvider.otherwise('/app/events');
})
