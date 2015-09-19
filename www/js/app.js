var app = angular.module("starter", ["starter.routes","starter.controllers","ionic", 'ionic-material', "firebase"]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the leopard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Leopard) {
      cordova.plugins.Leopard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Leopard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});