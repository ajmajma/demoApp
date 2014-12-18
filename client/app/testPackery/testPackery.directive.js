'use strict';

angular.module('demoAppApp')
  .directive('testPackery', function ($rootScope) {
    return {
    	restrict: 'A',
        link: function(scope, element, attrs) {
            if($rootScope.packery === undefined || $rootScope.packery === null){

                $rootScope.packery = new Packery(element[0].parentElement, {
					gutter: '.gutter-sizer',
					columnWidth: '.grid-sizer',
					rowHeight: 300,
					itemSelector: '.item'
         		 });
                 
					var draggable2 = new Draggabilly(element[0] );
            		$rootScope.packery.bindDraggabillyEvents(draggable2);
                $rootScope.packery.bindResize();
                $rootScope.packery.appended(element[0]);

                $rootScope.packery.items.splice(1,1); // hack to fix a bug where the first element was added twice in two different positions
            }
            else{
                $rootScope.packery.appended(element[0]);
                var draggable2 = new Draggabilly(element[0] );
            		$rootScope.packery.bindDraggabillyEvents(draggable2);

            }

            $rootScope.packery.layout();
        }
    
    };
  });