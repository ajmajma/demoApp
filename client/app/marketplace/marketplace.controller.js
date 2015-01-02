'use strict';

angular.module('demoAppApp')
  .controller('MarketplaceCtrl', function ($scope, $modal, themeFactory) {
    //page transition style
	  	     $scope.pageClass = 'page-market';
	  	     //bundle scope
	  	     $scope.marketItems = [{name: 'Education', url: 'Education', img: 'Education'},{name: 'Field Services', url: 'hr', img: 'field'},{name: 'Insurance', url: 'Insurance', img: 'Insurance'},{name: 'Healthcare', url: 'bi', img: 'Healthcare'},{name: 'Manufacturing', url: 'Manufacturing', img: 'inventory'},{name: 'Retail', url: 'Retail', img: 'Retail'},{name: 'Hospitality', url: 'Hospitality', img: 'Hospitality'},{name: 'Finance', url: 'Finance' , img: 'Finance'},{name: 'Banking', url: 'Banking', img: 'Banking'},{name: 'erp', url: 'erp', img: 'Finance'}];
	    	$scope.marketItemsTest = [{name: 'Education', url: 'Education', img: 'Education'},{name: 'Field Services', url: 'hr', img: 'field'},{name: 'Insurance', url: 'Insurance', img: 'Insurance'},{name: 'Healthcare', url: 'bi', img: 'Healthcare'},{name: 'Manufacturing', url: 'Manufacturing', img: 'inventory'},{name: 'Retail', url: 'Retail', img: 'Retail'},{name: 'Hospitality', url: 'Hospitality', img: 'Hospitality'},{name: 'Finance', url: 'Finance' , img: 'Finance'},{name: 'Banking', url: 'Banking', img: 'Banking'},{name: 'ERP', url: 'erp', img: 'erp'},{name: 'CRM', url: 'crm', img: 'crm'},{name: 'BI', url: 'Banking', img: 'bi'}];
	    
	    	$scope.myBundles = [{name: 'Education', url: 'Education', img: 'Education'},{name: 'Field Services', url: 'hr', img: 'field'},{name: 'Insurance', url: 'Insurance', img: 'Insurance'},{name: 'Healthcare', url: 'bi', img: 'Healthcare'},{name: 'Manufacturing', url: 'Manufacturing', img: 'inventory'},{name: 'Retail', url: 'Retail', img: 'Retail'},{name: 'Hospitality', url: 'Hospitality', img: 'Hospitality'},{name: 'Finance', url: 'Finance' , img: 'Finance'},{name: 'Banking', url: 'Banking', img: 'Banking'},{name: 'ERP', url: 'erp', img: 'erp'},{name: 'CRM', url: 'crm', img: 'crm'},{name: 'BI', url: 'Banking', img: 'bi'}];



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
			url: 'Education', 
			img: 'Education',
			onlyMe: false,
			subs: [
				{
					name: 'Teaching Resources', 
					url: 'Education', 
					img: 'Education',
					subs: [
							{
								name: 'Teaching Resources sub1-1', 
								url: 'Education', 
								img: 'Education',
								apps: [
									{
									name: 'Teaching Resources APP 1-1', 
									url: 'app1', 
									img: 'Education'
									}
								]
							}
					],
					apps: [
							{
								name: 'Teaching Resources APP sub 1', 
								url: 'app1', 
								img: 'Education'
							}
					]
				},
				{
					name: 'Learning Resources', 
					url: 'Education', 
					img: 'Education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Education',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
			url: 'Education', 
			img: 'Healthcare',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'Education', 
					img: 'Healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Healthcare',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
			url: 'Education', 
			img: 'field',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'Education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'field',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
			url: 'Education', 
			img: 'Insurance',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'Education', 
					img: 'Insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Insurance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
			url: 'Education', 
			img: 'inventory',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'Education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'inventory',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
			url: 'Education', 
			img: 'Retail',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'Education', 
					img: 'Retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Retail',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
			url: 'Education', 
			img: 'Hospitality',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'Education', 
					img: 'Hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Hospitality',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
			url: 'Education', 
			img: 'Finance',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'Education', 
					img: 'Finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Finance',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
			url: 'Education', 
			img: 'Banking',
			onlyMe: false,
			subs: [
				{
					name: 'Patient Administration', 
					url: 'Education', 
					img: 'Banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
					url: 'Education', 
					img: 'Banking',
					subs: [
							{
								name: 'Ed Sub 1-1', 
								url: 'Education', 
								img: 'Education',
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
