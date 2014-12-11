'use strict';

angular.module('demoAppApp')
  .directive('packeryAngular', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        //console.log("link called on", element[0]);
        scope.element = element;
        if (!$rootScope.packery) {
          $rootScope.packery = new Packery(element[0].parentElement, {
            gutter: '.gutter-sizer',
            columnWidth: '.grid-sizer',
  			rowHeight: 300,
            itemSelector: '.item'
          });

          var draggable1 = new Draggabilly(element[0]);
          $rootScope.packery.bindDraggabillyEvents(draggable1);

          var orderItems = function() {
            var itemElems = ($rootScope.packery && $rootScope.packery.getItemElements) ? $rootScope.packery.getItemElements() : [];
       
          };

          $rootScope.packery.on('layoutComplete', orderItems);
          $rootScope.packery.on('dragItemPositioned', orderItems);


        } else {
          // console.log("else", element[0]);
         
          $timeout(function() {
            $rootScope.packery.appended(element[0]);
          });
          var draggable2 = new Draggabilly(element[0], {handle: '.handle'} );
          $rootScope.packery.bindDraggabillyEvents(draggable2);


        }
        $timeout(function() {
          $rootScope.packery.layout();
        });


        // watch for destroying an item
        scope.$on('$destroy', function() {
          if($rootScope.packery && $rootScope.packery.remove) { 
            $rootScope.packery.remove(scope.element[0]);
          scope.packery.layout();
            $rootScope.packery = null; // add this line
          }
        });


      }
    };

  }
]);