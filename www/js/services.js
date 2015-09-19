var services = angular.module('starter.services', ['firebase', 'ionic', 'ionic-material', 'starter.config'])

services.factory("Auth", function($firebaseAuth, FIREBASE_URL) {
    var usersRef = new Firebase(FIREBASE_URL + "/users");
    return $firebaseAuth(usersRef);
})

services.factory('Profiles', function($firebaseArray, FIREBASE_URL)
{
    var ref = new Firebase(FIREBASE_URL + "/users");
    var profiles = $firebaseArray(ref);

    return {
        all: function()
        {
            return profiles;
        },
        get: function(profileId)
        {
            return profiles.$getRecord(profileId);
        },
        create: function(authData)
        {
            ref.child(authData.uid).set(
            {
                display_name: authData.facebook.displayName,
                avatar: authData.facebook.profileImageURL
            })
        }
    };
});

services.factory('Events', function($firebaseArray, FIREBASE_URL)
{
    var ref = new Firebase(FIREBASE_URL + "/events");
    var events = $firebaseArray(ref);

    return {
        all: function() {
            return events;
        },
        get: function(eventId) {
            return events.$getRecord(eventId);
        }
    };
})