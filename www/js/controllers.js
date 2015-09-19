var controllers = angular.module('starter.controllers', ['starter.firebase', 'ionic', 'firebase', 'ionic-material'])


controllers.controller("AppCtrl", function($scope, Auth, $ionicModal, ionicMaterialInk)
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
      if (authData === null) {
        console.log("Not logged in yet");
      } else {
        console.log("Logged in as", authData.uid);
      }
      $scope.authData = authData; // This will display the user's name in our view
    });

    $scope.logout = function()
    {
        Auth.$unauth();
    }

})