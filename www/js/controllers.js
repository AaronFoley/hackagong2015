var controllers = angular.module('starter.controllers', ['starter.services', 'ionic', 'firebase', 'ionic-material', 'starter.config'])


controllers.controller("AppCtrl", function($scope, Auth, $ionicModal, ionicMaterialInk, Profiles, FIREBASE_URL, profile, $state)
{
    $scope.authData = {};
    $scope.profile = profile;

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length) {
            fabs[0].remove();
        }
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };


    ////////////////////////////////////////
    // Login
    ////////////////////////////////////////

    // Create the login modal that we will use later

    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.showLogin = function() {
      $scope.modal.show();
    };

    $scope.login = function(method)
    {
        Auth.$authWithOAuthRedirect(method).then(function(authData) {
        }).catch(function(error) {
            if (error.code === 'TRANSPORT_UNAVAILABLE') {
                Auth.$authWithOAuthPopup(method).then(function(authData) {
            });
            } else {
                console.log(error);
            }
        });

        Auth.$requireAuth().then(function(auth){
            $scope.modal.hide();
        }, function(error)
        {
            return;
        })
    }

    Auth.$onAuth(function(authData) {
        $scope.authData = authData;

        if (authData)
        {
            var usersRef = new Firebase(FIREBASE_URL + '/users/');

            usersRef.once('value', function(snapshot) {
                if (!snapshot.hasChild(authData.uid)) {

                    usersRef.child(authData.uid).set(
                    {
                        display_name: authData.facebook.displayName,
                        avatar: authData.facebook.profileImageURL,
                        fields:
                        {
                            Description: ''
                        }
                    })
                }
            });
        }
    });

    $scope.logout = function()
    {
        Auth.$unauth();
        $state.go('app.events');
    };

    $scope.getProfile = function()
    {
        // if (!$scope.authData) return null;
        // return Profiles.get($scope.authData.uid);

        return null;
    };

    ionicMaterialInk.displayEffect();
})


controllers.controller('ProfileCtrl', function($scope, ionicMaterialInk, $timeout, ionicMaterialMotion, profile)
{
    $scope.profile = profile

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    ionicMaterialInk.displayEffect();
});

controllers.controller('ProfileEditCtrl', function($state, $scope, ionicMaterialInk, profile, authData, Profiles)
{
    $scope.$parent.clearFabs();

    $scope.profile = profile;

    $scope.save = function()
    {

        $scope.profile.$save();
        $state.go('app.profile', {profileId: authData.uid});
    }

    ionicMaterialInk.displayEffect();
})

controllers.controller('EventsListCtrl', function($scope,ionicMaterialInk, ionicMaterialMotion, $timeout, events, $state)
{
    $scope.$parent.clearFabs();

    $scope.events = events;

    $scope.openEvent = function(eventid)
    {
        $state.go('app.events-view', {eventid: eventid});
    }

    ionicMaterialInk.displayEffect();
})

controllers.controller('EventsViewCtrl', function($scope,ionicMaterialInk, event, ionicMaterialMotion, $timeout, Events, authData)
{
    $scope.$parent.clearFabs();

    $scope.authData = authData;
    $scope.event = event;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    $scope.isJoined = function()
    {
        Events.isJoined(event.$id,authData.uid )
    }

    $scope.join = function()
    {
        Events.join(event.$id,authData.uid)
    }

    ionicMaterialInk.displayEffect();
})

controllers.controller('EventsEditCtrl', function($scope,ionicMaterialInk)
{
    $scope.$parent.clearFabs();


    ionicMaterialInk.displayEffect();
})

controllers.controller('EventsCreateCtrl', function($scope, ionicMaterialInk, authData, Events, $state)
{
    $scope.$parent.clearFabs();

    $scope.party = {};

    $scope.save = function()
    {
        $scope.party.host = authData.uid;

        $scope.party.start = moment(moment($scope.party.startdate).format('YYYY-MM-DD') + ' ' + moment($scope.party.starttime).format('HH:mm'), "YYYY-MM-DD HH:mm").utc().toString();
        $scope.party.end   = moment(moment($scope.party.enddate).format('YYYY-MM-DD') + ' ' + moment($scope.party.endtime).format('HH:mm'), "YYYY-MM-DD HH:mm").utc().toString();

        delete $scope.party['startdate'];
        delete $scope.party['starttime'];
        delete $scope.party['enddate'];
        delete $scope.party['endtime'];

        Events.all().$add($scope.party).then(function(ref) {
            $state.go('app.events-view', {eventId: ref.key()})
        });
    }

    ionicMaterialInk.displayEffect();
})

controllers.controller('EventsAppliedCtrl', function($scope,ionicMaterialInk)
{
    $scope.$parent.clearFabs();

    ionicMaterialInk.displayEffect();
})

controllers.controller('EventsHostedCtrl', function($scope,ionicMaterialInk)
{
    ionicMaterialInk.displayEffect();
})

controllers.controller('SupportUsCtrl', function($scope,ionicMaterialInk)
{
    $scope.$parent.clearFabs();

    ionicMaterialInk.displayEffect();
})