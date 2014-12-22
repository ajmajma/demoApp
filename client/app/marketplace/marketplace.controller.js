'use strict';

angular.module('demoAppApp')
  .controller('MarketplaceCtrl', function ($scope) {
    //page transition style
	  	     $scope.pageClass = 'page-market';
	  	     //bundle scope
	  	     $scope.marketItems = [{name: 'education', url: 'education', img: 'education'},{name: 'Field Services', url: 'hr', img: 'field'},{name: 'insurance', url: 'insurance', img: 'insurance'},{name: 'healthcare', url: 'bi', img: 'healthcare'},{name: 'manufacturing', url: 'manufacturing', img: 'inventory'},{name: 'retail', url: 'retail', img: 'retail'},{name: 'hospitality', url: 'hospitality', img: 'hospitality'},{name: 'finance', url: 'finance' , img: 'finance'},{name: 'banking', url: 'banking', img: 'banking'},{name: 'erp', url: 'erp', img: 'finance'}];
	    	$scope.marketItemsTest = [{name: 'education', url: 'education', img: 'education'},{name: 'Field Services', url: 'hr', img: 'field'},{name: 'insurance', url: 'insurance', img: 'insurance'},{name: 'healthcare', url: 'bi', img: 'healthcare'},{name: 'manufacturing', url: 'manufacturing', img: 'inventory'},{name: 'retail', url: 'retail', img: 'retail'},{name: 'hospitality', url: 'hospitality', img: 'hospitality'},{name: 'finance', url: 'finance' , img: 'finance'},{name: 'banking', url: 'banking', img: 'banking'},{name: 'ERP', url: 'erp', img: 'erp'},{name: 'CRM', url: 'crm', img: 'crm'},{name: 'BI', url: 'banking', img: 'bi'}];
	    //start these off fasle
	    $scope.publicActive = true;
	    $scope.myWidgActive = false;
	    $scope.privateActive = false;
  });
