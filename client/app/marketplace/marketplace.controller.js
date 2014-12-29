'use strict';

angular.module('demoAppApp')
  .controller('MarketplaceCtrl', function ($scope, $modal, themeFactory) {
    //page transition style
	  	     $scope.pageClass = 'page-market';
	  	     //bundle scope
	  	     $scope.marketItems = [{name: 'education', url: 'education', img: 'education'},{name: 'Field Services', url: 'hr', img: 'field'},{name: 'insurance', url: 'insurance', img: 'insurance'},{name: 'healthcare', url: 'bi', img: 'healthcare'},{name: 'manufacturing', url: 'manufacturing', img: 'inventory'},{name: 'retail', url: 'retail', img: 'retail'},{name: 'hospitality', url: 'hospitality', img: 'hospitality'},{name: 'finance', url: 'finance' , img: 'finance'},{name: 'banking', url: 'banking', img: 'banking'},{name: 'erp', url: 'erp', img: 'finance'}];
	    	$scope.marketItemsTest = [{name: 'education', url: 'education', img: 'education'},{name: 'Field Services', url: 'hr', img: 'field'},{name: 'insurance', url: 'insurance', img: 'insurance'},{name: 'healthcare', url: 'bi', img: 'healthcare'},{name: 'manufacturing', url: 'manufacturing', img: 'inventory'},{name: 'retail', url: 'retail', img: 'retail'},{name: 'hospitality', url: 'hospitality', img: 'hospitality'},{name: 'finance', url: 'finance' , img: 'finance'},{name: 'banking', url: 'banking', img: 'banking'},{name: 'ERP', url: 'erp', img: 'erp'},{name: 'CRM', url: 'crm', img: 'crm'},{name: 'BI', url: 'banking', img: 'bi'}];
	    
	    	$scope.myBundles = [{name: 'education', url: 'education', img: 'education'},{name: 'Field Services', url: 'hr', img: 'field'},{name: 'insurance', url: 'insurance', img: 'insurance'},{name: 'healthcare', url: 'bi', img: 'healthcare'},{name: 'manufacturing', url: 'manufacturing', img: 'inventory'},{name: 'retail', url: 'retail', img: 'retail'},{name: 'hospitality', url: 'hospitality', img: 'hospitality'},{name: 'finance', url: 'finance' , img: 'finance'},{name: 'banking', url: 'banking', img: 'banking'},{name: 'ERP', url: 'erp', img: 'erp'},{name: 'CRM', url: 'crm', img: 'crm'},{name: 'BI', url: 'banking', img: 'bi'}];



	    //start these off fasle
	    $scope.publicActive = true;
	    $scope.myWidgActive = false;
	    $scope.privateActive = false;

	    //control item limits for marketplace row
		var sizeCheck2 = window.innerWidth;
		if(sizeCheck2 >= 2250){
			$scope.sizeControl = 8;
		}else if(sizeCheck2 < 2250 && sizeCheck2 >= 1900){
			$scope.sizeControl = 6;
		}else if(sizeCheck2 < 1900 && sizeCheck2 >= 1420){
			$scope.sizeControl = 5;
		}else if(sizeCheck2 < 1420 && sizeCheck2 >= 1050){
			$scope.sizeControl = 4;
		}else if(sizeCheck2 < 1050 && sizeCheck2 >= 670){
			$scope.sizeControl = 3;
		}else if(sizeCheck2 < 670 && sizeCheck2 >= 490){
			$scope.sizeControl = 2;
		}else if(sizeCheck2 < 490){
			$scope.sizeControl = 1;
		}

		 //control item limits for marketplace row
	    $(window).resize(function(){
			var sizeCheck = window.innerWidth;
			$scope.$apply(function(){
				if(sizeCheck >= 2250){
					$scope.sizeControl = 8;
				}else if(sizeCheck < 2250 && sizeCheck >= 1900){
					$scope.sizeControl = 6;
				}else if(sizeCheck < 1900 && sizeCheck >= 1420){
					$scope.sizeControl = 5;
				}else if(sizeCheck < 1420 && sizeCheck >= 1050){
					$scope.sizeControl = 4;
				}else if(sizeCheck < 1050 && sizeCheck >= 670){
					$scope.sizeControl = 3;
				}else if(sizeCheck < 670 && sizeCheck >= 490){
					$scope.sizeControl = 2;
				}else if(sizeCheck < 490){
					$scope.sizeControl = 1;
				}
			});
		});

		$scope.parentIndexForFilter = "";

		//tracker for how many levels deep we are in marketplace browsing
	    $scope.levelTracker = 0;

	    $scope.backToParent = function(index){
	    	$scope.levelTracker = 0;
	    	$scope.marketItemsTest2[index].onlyMe = false;
	    };
	    //view all for highest level
		$scope.viewAllSub1 = function(index){
			$scope.levelTracker = 1;
			$scope.marketItemsTest2[index].onlyMe = true;

		};

		$scope.aloneNow = function(index){
			//if no other 
			var here = _.findIndex($scope.marketItemsTest2, 'onlyMe');
			if(here == -1){
				return true;
			}else if(here == index){
				return true;
			}else{
				return false;
			}
		};

		$scope.openBundle = function(index, parent){
		
			$scope.marketItemsTest2[parent].onlyMe = true;
			$scope.levelTracker = 3;
			$scope.whichSub = index;

		};

		$scope.fullInfoBundle = function(item){
			//pass item to modal
			var modalInstance = $modal.open({
		      templateUrl: 'marketModal.html',
		      controller: 'MarketModalCtrl',
		      windowClass: 'marketModal',
		      size: 'lg',
		      resolve: {
		        widget: function () {
		          return item;
		        }
		      }
		    });
		    modalInstance.result.then(function () {
		     
		    }, function () {
		   });

		};
			//array for build list
		$scope.itemsForBuild = [];

		$scope.addToSelect = function(item){
			var result = _.some($scope.itemsForBuild, function(topic) {
			     return topic === item;
			 });	
			if(!result){
				$scope.itemsForBuild.push(item);
			}else{
				   $scope.shareSuccess = {'type' : 3 , 'content': 'Already In List'};
      				themeFactory.setAlert($scope.shareSuccess);
			}
		};
		$scope.removeBuildItem = function(item){
			$scope.itemsForBuild.splice(item, 1);

		}

		//array for build list
		$scope.itemsForBuild = [];

		$scope.marketItemsTest2 = [
		{
			name: 'Education', 
			url: 'education', 
			img: 'education',
			onlyMe: false,
			subs: [
				{
					name: 'Teaching Resources', 
					url: 'education', 
					img: 'education',
					subs: [
							{
								name: 'Teaching Resources sub1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'Teaching Resources APP 1-1', 
									url: 'app1', 
									img: 'education'
									}
								]
							}
					],
					apps: [
							{
								name: 'Teaching Resources APP sub 1', 
								url: 'app1', 
								img: 'education'
							}
					]
				},
				{
					name: 'Learning Resources', 
					url: 'education', 
					img: 'education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Financial Administration', 
					url: 'education', 
					img: 'education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Staff Resources', 
					url: 'education', 
					img: 'education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Student Resources', 
					url: 'education', 
					img: 'education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Program Management', 
					url: 'education', 
					img: 'education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Room Scheduling', 
					url: 'education', 
					img: 'education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Managing Student', 
					url: 'education', 
					img: 'education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Reporting', 
					url: 'education', 
					img: 'education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Parent Resources', 
					url: 'education', 
					img: 'education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				}
			]
		},
		{
			name: 'Healthcare', 
			url: 'education', 
			img: 'healthcare',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'education', 
					img: 'healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Electronic Health Records', 
					url: 'education', 
					img: 'healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'HIPPA & Security', 
					url: 'education', 
					img: 'healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Staff Management', 
					url: 'education', 
					img: 'healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Supply Chain Management', 
					url: 'education', 
					img: 'healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Patient Flow Management', 
					url: 'education', 
					img: 'healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				}
			]
		},
		{
			name: 'Field Services', 
			url: 'education', 
			img: 'field',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Electronic Health Records', 
					url: 'education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'HIPPA & Security', 
					url: 'education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Staff Management', 
					url: 'education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Supply Chain Management', 
					url: 'education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Patient Flow Management', 
					url: 'education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				}
			]
		},
		{
			name: 'Insurance', 
			url: 'education', 
			img: 'insurance',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'education', 
					img: 'insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Electronic Health Records', 
					url: 'education', 
					img: 'insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'HIPPA & Security', 
					url: 'education', 
					img: 'insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Staff Management', 
					url: 'education', 
					img: 'insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Supply Chain Management', 
					url: 'education', 
					img: 'insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Patient Flow Management', 
					url: 'education', 
					img: 'insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				}
			]
		},
		{
			name: 'Manufacturing', 
			url: 'education', 
			img: 'inventory',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Electronic Health Records', 
					url: 'education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'HIPPA & Security', 
					url: 'education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Staff Management', 
					url: 'education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Supply Chain Management', 
					url: 'education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Patient Flow Management', 
					url: 'education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				}
			]
		},
		{
			name: 'Retail', 
			url: 'education', 
			img: 'retail',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'education', 
					img: 'retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Electronic Health Records', 
					url: 'education', 
					img: 'retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'HIPPA & Security', 
					url: 'education', 
					img: 'retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Staff Management', 
					url: 'education', 
					img: 'retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Supply Chain Management', 
					url: 'education', 
					img: 'retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Patient Flow Management', 
					url: 'education', 
					img: 'retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				}
			]
		},
		{
			name: 'Hospitality', 
			url: 'education', 
			img: 'hospitality',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'education', 
					img: 'hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Electronic Health Records', 
					url: 'education', 
					img: 'hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'HIPPA & Security', 
					url: 'education', 
					img: 'hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Staff Management', 
					url: 'education', 
					img: 'hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Supply Chain Management', 
					url: 'education', 
					img: 'hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Patient Flow Management', 
					url: 'education', 
					img: 'hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				}
			]
		},
		{
			name: 'Finance', 
			url: 'education', 
			img: 'finance',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'education', 
					img: 'finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Electronic Health Records', 
					url: 'education', 
					img: 'finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'HIPPA & Security', 
					url: 'education', 
					img: 'finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Staff Management', 
					url: 'education', 
					img: 'finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Supply Chain Management', 
					url: 'education', 
					img: 'finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Patient Flow Management', 
					url: 'education', 
					img: 'finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				}
			]
		},
		{
			name: 'Banking', 
			url: 'education', 
			img: 'banking',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'education', 
					img: 'banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Electronic Health Records', 
					url: 'education', 
					img: 'banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'HIPPA & Security', 
					url: 'education', 
					img: 'banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Accounting', 
					url: 'education', 
					img: 'banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Staff Management', 
					url: 'education', 
					img: 'banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Supply Chain Management', 
					url: 'education', 
					img: 'banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				},
				{
					name: 'Patient Flow Management', 
					url: 'education', 
					img: 'banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'education', 
								img: 'education',
								apps: [
									{
									name: 'app1 sub 1-1', 
									url: 'app1', 
									img: 'app1'
									}
								]
							}
					],
					apps: [
							{
								name: 'app1 sub 1', 
								url: 'app1', 
								img: 'app1'
							}
					]
				}
			]
		}
	];



  });
