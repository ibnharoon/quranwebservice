var quranApp = angular.module("quranApp", ['ngAnimate', 'ngTouch', 'LocalStorageModule']);

quranApp.config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('quranApp');
}]);