(function() {
    'use strict';
    angular.module('scale')
        .factory('cameraService', cameraService);

    function cameraService($q, $ionicActionSheet, $cordovaFileTransfer, Configurations, $ionicLoading, $rootScope) {
        var service = {};
        service.changePic = function() {
                var q = $q.defer();
                var hideSheet = $ionicActionSheet.show({
                    buttons: [{
                        text: '<p class="text-center"><i class="ion-images"></i> Gallery</p>'
                    }, {
                        text: '<p class="text-center"><i class="ion-camera"></i> Camera</p>'
                    }],
                    titleText: 'Profile photo',
                    cancelText: 'Cancel',
                    cancel: function() {},
                    buttonClicked: function(index) {
                        $ionicLoading.show({
                            template: 'Loading...'
                        });
                        var options = {
                            quality: 50,
                            "destinationType": Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                            allowEdit: true,
                            encodingType: Camera.EncodingType.JPEG,
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: false
                        };

                        service.getPicture(index).then(function(imageBase64) {
                        var name = new Date().valueOf() + '.png';
                         imageBase64=imageBase64;
                          var blob = service.baseUpload(imageBase64, name);
                            console.log(blob);
                            q.resolve(blob);
                        }, function(err) {
                            console.log(err)
                            q.reject(err);
                        });
                        return true;
                    }
                });
                return q.promise;
            },



            service.getPicture = function(index) {
                var q = $q.defer();
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 100,
                    destinationType: Camera.DestinationType.DATA_URL,
                    correctOrientation: true,
                    // allowEdit: true,
                    sourceType: index
                });

                function onSuccess(imageData) {
                    q.resolve(imageData);
                }

                function onFail(message) {
                    q.reject(message);
                }
                return q.promise;
            };

        service.baseUpload = function (imageBase64, name) {
           var imageBase = imageBase64.replace(/^data:image\/(png|jpeg);base64,/, "");
           console.log(imageBase)
                var binary = service.fixBinary(atob(imageBase));
                var blob = new Blob([binary], {type: 'image/png', name: 'png'});
                blob.name = 'png';
                blob.$ngfName = 'png';
               return blob;
       };
       
        service.fixBinary = function (bin) {
           var length = bin.length;
           var buf = new ArrayBuffer(length);
           var arr = new Uint8Array(buf);
           for (var i = 0; i < length; i++) {
               arr[i] = bin.charCodeAt(i);
           }
           return buf;
       };
        return service;
    };

})();