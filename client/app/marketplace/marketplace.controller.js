'use strict';

angular.module('demoAppApp')
  .controller('MarketplaceCtrl', function ($scope) {
    //page transition style
	  	     $scope.pageClass = 'page-market';
	  	     //bundle scope
	  	     $scope.marketItems = [{name: 'education', url: 'education', img: 'education'},{name: 'Field Services', url: 'hr', img: 'field'},{name: 'insurance', url: 'insurance', img: 'insurance'},{name: 'healthcare', url: 'bi', img: 'finance'},{name: 'manufacturing', url: 'manufacturing', img: 'inventory'},{name: 'retail', url: 'retail', img: 'retail'},{name: 'hospitality', url: 'hospitality', img: 'hospitality'},{name: 'finance', url: 'finance' , img: 'finance'},{name: 'banking', url: 'banking', img: 'banking'},{name: 'erp', url: 'erp', img: 'finance'}];
	    	$scope.marketItemsTest = [{name: 'education', url: 'education', img: 'education'},{name: 'Field Services', url: 'hr', img: 'field'},{name: 'insurance', url: 'insurance', img: 'insurance'},{name: 'healthcare', url: 'bi', img: 'finance'},{name: 'manufacturing', url: 'manufacturing', img: 'inventory'},{name: 'retail', url: 'retail', img: 'retail'},{name: 'hospitality', url: 'hospitality', img: 'hospitality'},{name: 'finance', url: 'finance' , img: 'finance'},{name: 'banking', url: 'banking', img: 'banking'},{name: 'Marketing', url: 'marketing', img: 'finance'},{name: 'education', url: 'education', img: 'finance'},{name: 'Field Services', url: 'hr', img: 'finance'},{name: 'insurance', url: 'insurance', img: 'finance'},{name: 'healthcare', url: 'bi', img: 'finance'},{name: 'manufacturing', url: 'manufacturing', img: 'finance'},{name: 'retail', url: 'retail', img: 'finance'},{name: 'hospitality', url: 'hospitality', img: 'finance'},{name: 'finance', url: 'finance' , img: 'finance'},{name: 'Finance', url: 'finance', img: 'finance'},{name: 'Marketing', url: 'marketing', img: 'finance'},{name: 'education', url: 'education', img: 'finance'},{name: 'Field Services', url: 'hr', img: 'finance'},{name: 'insurance', url: 'insurance', img: 'finance'},{name: 'healthcare', url: 'bi', img: 'finance'},{name: 'manufacturing', url: 'manufacturing', img: 'finance'},{name: 'retail', url: 'retail', img: 'finance'},{name: 'hospitality', url: 'hospitality', img: 'finance'},{name: 'finance', url: 'finance' , img: 'finance'},{name: 'Finance', url: 'finance', img: 'finance'},{name: 'Marketing', url: 'marketing', img: 'finance'},{name: 'education', url: 'education', img: 'finance'},{name: 'Field Services', url: 'hr', img: 'finance'},{name: 'insurance', url: 'insurance', img: 'finance'},{name: 'healthcare', url: 'bi', img: 'finance'},{name: 'manufacturing', url: 'manufacturing', img: 'finance'},{name: 'retail', url: 'retail', img: 'finance'},{name: 'hospitality', url: 'hospitality', img: 'finance'},{name: 'finance', url: 'finance' , img: 'finance'},{name: 'Finance', url: 'finance', img: 'finance'},{name: 'Marketing', url: 'marketing', img: 'finance'}];
	    //start these off fasle
	    $scope.publicActive = true;
	    $scope.myWidgActive = false;
	    $scope.privateActive = false;
  });
