angular.module('App', ['ionic','ngSanitize'])
//var myAppModule = angular.module('App', ['ui.ace']);
.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.controller('MainCtrl', ['$scope','$sce', '$sceDelegate', function ($scope,$sce,$sceDelegate) {
  $scope.output = "";
  $scope.$watch('fields', function (fields) {
    console.log('"fields": ' + JSON.stringify(fields, null, '\t'));
  }, true);
  $scope.updateEditor = function (id) {
    var element = document.getElementById(id);
    element.style.height = element.scrollHeight + "px";
    resize();
  };
  $scope.update = function () {
    var element = document.getElementById('fields.a');
    element.readOnly= !$scope.fields.a.edit;
  };
  $scope.resize = function () {
    $scope.$broadcast('scroll.resize');
  };
  $scope.updateEditor = function (id) {
    var element = document.getElementById(id);
    element.style.height = element.scrollHeight + "px";
  };
  $scope.parse = function (){
    $scope.output=$sceDelegate.trustAs($sce.HTML, $scope.fields.a.text);
  }
}]);
