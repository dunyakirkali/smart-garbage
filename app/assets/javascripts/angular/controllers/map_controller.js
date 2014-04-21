sgApp.controller('MapController', ['$scope', '$rootScope', '$element', 'map_overlay',
function ($scope, $rootScope, $element, map_overlay) {

  $scope.path;
  $scope.containers;
  $scope.cost = 0;
  $scope.complete = false;

  $scope.init = function() {
    $scope.complete = (Math.random() > 0.5);

    $scope.center = new google.maps.LatLng(39.89139, 32.78472)
    $scope.map_options = {
      zoom: 11,
      center: $scope.center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: $scope.map_style(),
      disableDefaultUI: true
    }
    $scope.map = new google.maps.Map($element.find(".map_canvas")[0], $scope.map_options);
    $scope.overlay = new map_overlay($scope.map);
    $scope.overlay.setMap($scope.map);

    google.maps.event.addListener($scope.map, 'bounds_changed', $scope.redraw);

    $rootScope.$on('tick', function (event, data) {
      if(!$scope.complete) {
        $scope.time = data;
        $scope.cost = $scope.time * 0.134;
        $scope.$apply();
        $scope.overlay.setTime(data);
      }
    });

  }

  $scope.redraw = function() {
    $scope.overlay.draw();
  }


  $scope.map_style = function() {
    return [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}];
  }

  $scope.init();
}]);
