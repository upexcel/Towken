(function() {
    'use strict';
    angular.module('scale')
            .constant('Configurations', {
                PlaceholderImg:"app/assets/img/pl.jpg",
                StaticServer:"app/mockdata/",
            	Hostserver:"http://54.173.90.23:7000/v1/",
                ProductImage:"app/assets/img/pizza1.png",
            	markerIcon:'app/assets/img/marker34.png',
            	userMarkerIcon:'app/assets/img/blue_marker.png',
                markerWatchTowkenIcon:"app/assets/img/rsz_markeruser1.png",
                yellowMarker:'app/assets/img/rsz_yellowmarker.png',
            	HomeMarkerIcon:'app/assets/img/blue_marker.png',
                saloonMarker:'app/assets/img/saloonmarker.png',
                restaurentMarker:'app/assets/img/restaurentmarker.png',
                shoppingMarker:'app/assets/img/shoppingmarker.png',
                saloonIcon:"icon ion-scissors",
                restaurentIcon:"icon ion-android-restaurant",
                shoppingIcon:"icon ion-ios-cart",
                smallPizza:'app/assets/img/pizza1.png',
                ImageUrl:'http://54.173.90.23:7000/v1/customer/file/',
            	GeoCoder:"https://maps.googleapis.com/maps/api/geocode/json?",
            	googleApiKey:"AIzaSyBdl3kdKg2iIoN2N_ocDi2-QAWeMXz90Jg",
                googleRedirecturl:"http://localhost",
                googleRedirecturlForPhone:"http://localhost",
                googleClientId:"157311859039-n85pqg7a8m2ih0f2ul468en1nkvjfcrc.apps.googleusercontent.com",
                googleSecret:"IoKf3eItuxbULroqQ1aJ1a1y",
                googleScope:"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me",
             
            });
})();