
angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key, defaultValue) {
      return JSON.parse($window.localStorage[key] || JSON.stringify(defaultValue));
    }
  }
}]);

angular.module('App', ['ionic','ngSanitize', 'ionic.utils'])

//var myAppModule = angular.module('App', ['ui.ace']);
.run(function ($ionicPlatform, $localstorage) {
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


.controller('MainCtrl', ['$scope','$sce', '$sceDelegate', '$localstorage', function ($scope,$sce,$sceDelegate,$localstorage) {
  $scope.fields = $localstorage.getObject('fields', {
    a: {text: ''},
    b: {text: ''}
  });
  $scope.output = "";
  $scope.$watch('fields', function (fields) {
    console.log('"fields": ' + JSON.stringify(fields, null, '\t'));
  }, true);
  $scope.updateEditor = function (id) {
    var element = document.getElementById(id);
    element.style.height = element.scrollHeight + "px";
    resize();
  };
  $scope.save = function () {
    $localstorage.setObject('fields', $scope.fields);
  };
  $scope.resize = function () {
    $scope.$broadcast('scroll.resize');
  };
  $scope.parse = function (){
    $scope.output=$sceDelegate.trustAs($sce.HTML, $scope.fields.a.text);
  }
}]);