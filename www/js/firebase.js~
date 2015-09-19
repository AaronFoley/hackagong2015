var firebase = angular.module('starter.firebase', ['firebase', 'starter.config'])


firebase.factory("Auth", function($firebaseAuth, FIREBASE_URL) {
  var usersRef = new Firebase(FIREBASE_URL + "/users");
  return $firebaseAuth(usersRef);
})