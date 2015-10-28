angular.module('app.controllers', []).controller('HomeController',
function($cordovaBarcodeScanner, $ionicPopup) {
  this.scan = function () {
    var onSuccess = function(result) {
      if (result.cancelled) {
        return;
      }
      $ionicPopup.alert({title: 'Success', template: 'Content: "' + result.text + '"'});
    };
    var onError = function(error) {
      $ionicPopup.alert({title: 'Error', template: error});
    };
    $cordovaBarcodeScanner.scan().then(onSuccess).catch(onError);
  };
});
