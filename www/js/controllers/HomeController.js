angular.module('app.controllers', []).controller('HomeController',
function($scope, $interval) {
  this.watch = null;
  this.vector = [0,0,0];
  this.acceleration = 0;
  this.updateInterval = 1000;

  this.updateAcceleration = function () {
    this.acceleration = this.vector.reduce(function (a,b) { return a + b; }, 0);
  }.bind(this);

  var enableWatch = function () {
    if (navigator.accelerometer) {
      var onSuccess = function (acceleration) {
        this.vector = [acceleration.x, acceleration.y, acceleration.z];
        this.updateAcceleration();
      }.bind(this);
      var onError = function () {
        console.log('Read failed');
      };
      this.watch = navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: this.updateInterval });
    } else {
      this.watch = $interval(function () {
        this.vector = [Math.random(), 0, 0];
        this.updateAcceleration();
      }.bind(this), this.updateInterval);
    }
  }.bind(this);

  var disableWatch = function () {
    if (this.watch === null) {
      return;
    }
    if (navigator.accelerometer) {
      navigator.accelerometer.clearWatch(this.watch);
    } else {
      $interval.cancel(this.watch);
    }
  }.bind(this);

  $scope.$on('$ionicView.enter', enableWatch);
  $scope.$on('$ionicView.leave', disableWatch);
  $scope.$on('$destroy', disableWatch);
});
