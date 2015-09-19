var controllers = angular.module('starter.controllers', ['starter.services', 'ionic', 'firebase', 'ionic-material'])


controllers.controller("AppCtrl", function($scope, Auth, $ionicModal, ionicMaterialInk, Profiles)
{
    $scope.loginData = {};

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
        if (authData != null) {

            if (!Profiles.get(authData.uid))
            {
                Profiles.create(authData);
            }
        }

        $scope.authData = authData; // This will display the user's name in our view
    });

    $scope.logout = function()
    {
        Auth.$unauth();
    }

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

controllers.controller('ProfileEditCtrl', function($scope, ionicMaterialInk, $timeout, ionicMaterialMotion, Profiles)
{
    $scope.$parent.clearFabs();


    ionicMaterialInk.displayEffect();
})