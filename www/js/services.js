var services = angular.module('starter.services', ['firebase', 'ionic', 'ionic-material', 'starter.config'])

services.factory("Auth", function($firebaseAuth, FIREBASE_URL) {
    var usersRef = new Firebase(FIREBASE_URL);
    return $firebaseAuth(usersRef);
})

services.factory('Profiles', function($firebaseArray, FIREBASE_URL, $firebaseObject)
{
    var ref = new Firebase(FIREBASE_URL + "/users");

    return {
        all: function()
        {
            return $firebaseArray(ref);
        },
        get: function(profileId)
        {
            return $firebaseObject(ref.child(profileId));
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

services.factory('Events', function($firebaseArray, FIREBASE_URL, $firebaseObject)
{
    var ref = new Firebase(FIREBASE_URL + "/events");
    var attendeesref = new Firebase(FIREBASE_URL + "/attendees");

    return {
        all: function() {
            return $firebaseArray(ref);
        },
        get: function(eventId) {
            return $firebaseObject(ref.child(eventId));
        },
        join: function(eventid, authData)
        {
            attendeesref.child(eventid).child(authData).set(false);
        },
        isJoined: function(eventid, authid)
        {
            attendeesref.child(eventid).once("value", function(snapshot) {
                console.log(snapshot.child(authid).exists())
                return snapshot.child(authid).exists();
            })
        }
    };
})