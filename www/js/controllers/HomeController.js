angular.module('app.controllers', []).controller('HomeController',
function($scope, $state, $interval) {
  this.watch = null;
  this.vector = [0,0,0];
  this.acceleration = 0;
  this.updateInterval = 1000;

  if (navigator.accelerometer === undefined) {
      $state.go('no-accelerometer');
      return;
  }

  this.updateAcceleration = function () {
    this.acceleration = this.vector.reduce(function (a,b) { return a + b; }, 0);
  }.bind(this);

  var enableWatch = function () {
    var onSuccess = function (acceleration) {
      this.vector = [acceleration.x, acceleration.y, acceleration.z];
      this.updateAcceleration();
    }.bind(this);
    var onError = function () {
      console.log('Read failed');
    };
    this.watch = navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: this.updateInterval });
  }.bind(this);

  var disableWatch = function () {
    if (this.watch === null) {
      return;
    }
    navigator.accelerometer.clearWatch(this.watch);
  }.bind(this);

  $scope.$on('$ionicView.enter', enableWatch);
  $scope.$on('$ionicView.leave', disableWatch);
  $scope.$on('$destroy', disableWatch);
});
