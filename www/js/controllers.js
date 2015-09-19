var controllers = angular.module('starter.controllers', ['starter.services', 'ionic', 'firebase', 'ionic-material', 'starter.config'])


controllers.controller("AppCtrl", function($scope, Auth, $ionicModal, ionicMaterialInk, Profiles, FIREBASE_URL)
{
    $scope.authData = {};
    $scope.profile  = {};

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

        $scope.modal.hide();
    }

    Auth.$onAuth(function(authData) {
        $scope.authData = authData;

        var usersRef = new Firebase(FIREBASE_URL + '/users/');

        usersRef.once('value', function(snapshot) {
            if (!snapshot.hasChild(authData.uid)) {
                usersRef.child(authData.uid).set(
                {
                    display_name: authData.facebook.displayName,
                    avatar: authData.facebook.profileImageURL
                })
            }
        });
    });

    $scope.logout = function()
    {
        Auth.$unauth();
    };

    $scope.getProfile = function()
    {
        return Profiles.get($scope.authData.uid);
    };

    ionicMaterialInk.displayEffect();
})


controllers.controller('ProfileCtrl', function($scope, ionicMaterialInk, $timeout, ionicMaterialMotion, $stateParams, Profiles)
{
    $scope.profile = Profiles.get($stateParams.profileId);

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

controllers.controller('ProfileEditCtrl', function($state, $scope, ionicMaterialInk, Auth, Profiles)
{
    $scope.$parent.clearFabs();

    $scope.profile = Profiles.get($scope.$parent.authData.uid);

    $scope.save = function()
    {
        Profiles.save($scope.$parent.authData,$scope.profile);
        $state.go('app.profile', {profileId: $scope.$parent.authData.uid});
    }

    ionicMaterialInk.displayEffect();
})

controllers.controller('EventsListCtrl', function($scope,ionicMaterialInk)
{
    $scope.$parent.clearFabs();


    ionicMaterialInk.displayEffect();
})

controllers.controller('EventsViewCtrl', function($scope,ionicMaterialInk)
{
    $scope.$parent.clearFabs();


    ionicMaterialInk.displayEffect();
})

controllers.controller('EventsEditCtrl', function($scope,ionicMaterialInk)
{
    $scope.$parent.clearFabs();


    ionicMaterialInk.displayEffect();
})

controllers.controller('EventsCreateCtrl', function($scope,ionicMaterialInk)
{
    $scope.$parent.clearFabs();


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