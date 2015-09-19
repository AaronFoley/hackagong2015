var controllers = angular.module('starter.controllers', ['starter.firebase', 'ionic', 'firebase'])


controllers.controller("MenuCtrl", function($scope, Auth)
{
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
    }
})