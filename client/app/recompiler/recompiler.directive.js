'use strict';

angular.module('demoAppApp')
  .directive('recompiler', function ($compile) {
	  return {
	    restrict: 'A',
	     transclude: true,
	    replace: true,
	    link: function (scope, ele, attrs) {
	      scope.$watch(attrs.recompiler, function(html) {
	        ele.html(html);
	        $compile(ele.contents())(scope);
	      });
	    }
	  };
	});