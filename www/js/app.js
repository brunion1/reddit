(function(){
  
  var app = angular.module('reddit', ['ionic', 'angularMoment']);

  app.controller('redditCtrl', function($scope, $http){
    $scope.stories = [];
    
    $scope.loadOlderStories = function(){
      var params = {};
      if($scope.stories.length > 0){
        params['after'] = $scope.stories[$scope.stories.length - 1].name;
      }
      
      $http.get('http://www.reddit.com/r/android/new.json?sort=new', {params:params})
      .success(function(response){
        angular.forEach(response.data.children, function(child){
          $scope.stories.push(child.data);
          
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
        console.log($scope.stories);
      })
    };
    
  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });


  
}());

