'use strict';

angular.module('demoAppApp')
  .controller('HealthcareCtrl', function ($scope, Auth, themeFactory) {
  	   $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

   	 $scope.contentHereHealthcare = [
   	 {
      'size' : 'w5',
      'name' : 'EHR',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa fa-file-pdf-o', 'fa fa-bell-o', 'fa fa-print', 'fa fa-envelope-o'],
      'flipAction' : '',
      'nativeContent' : '',
      'sides' : [
        {
          'title' : 'Electronic Health Record',
          'content' : '<div class="ehrWrap"><div class="formHeader">Demographics</div><form><div class="ehrForm"><md-text-float label="First Name" ng-model="user.firstName"> </md-text-float><md-text-float label="Last Name" ng-model="user.lastName" class="long"> </md-text-float><md-text-float label="DOB" ng-model="user.dob"> </md-text-float><md-text-float label="Address" ng-model="user.address"> </md-text-float><md-text-float label="City" ng-model="user.city"> </md-text-float><md-text-float label="State" ng-model="user.state"> </md-text-float><md-text-float label="Postal Code" ng-model="user.postalCode"> </md-text-float><md-text-float label="Country" ng-model="user.country" > </md-text-float><md-text-float label="Email" ng-model="user.email" type="email"></md-text-float><md-text-float label="Employer" ng-model="user.company" > </md-text-float><md-text-float label="Pharmacy" ng-model="user.pharmacy" > </md-text-float></div></form>  <div class="clear"></div><div class="formHeader">Diagnosis    </div><form><div class="ehrForm"><md-text-float label="Diagnosis" ng-model="user.diagnosis"> </md-text-float><md-text-float label="Status Date" ng-model="user.statusDate"> </md-text-float><md-text-float label="Symptoms" ng-model="user.symptoms"> </md-text-float><textarea placeholder="notes" ng-model="user.diagNotes"></textarea></div><div class="clear"></div><div class="formHeader">Procedures    </div><form><div class="ehrForm"><md-text-float label="Procedure" ng-model="user.procedure"> </md-text-float><md-text-float label="Date" ng-model="user.procedureDate"> </md-text-float><md-text-float label="Status" ng-model="user.procStatus"> </md-text-float><md-text-float label="CPT" ng-model="user.cpt"> </md-text-float></div><div class="clear"></div>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur id ligula eu posuere. Vestibulum viverra nisi tellus, at porttitor purus imperdiet ac. Ut sagittis ante sit amet ligula tristique, in dignissim libero efficitur. Integer egestas sit amet augue eu tincidunt. Etiam eget faucibus lectus, nec venenatis quam. Sed cursus odio commodo, posuere nisi et, malesuada nulla. Nullam vulputate dui velit, pulvinar feugiat mi rhoncus ac. Etiam lacus leo, euismod eget dolor in, sollicitudin ornare eros. Nullam leo mauris, lacinia dapibus mauris id, cursus interdum velit. Ut consequat purus non quam ullamcorper lacinia.</p><p>Ut viverra ante turpis, et luctus mi laoreet congue. Suspendisse nisl nulla, dignissim non convallis non, tempor quis sem. In id tincidunt augue. Mauris id libero rutrum, aliquam leo suscipit, ornare ante. Curabitur sed sagittis dui, quis condimentum nisl. Ut rutrum quis orci congue venenatis. Curabitur varius ligula erat, et fringilla nisl facilisis at. Aenean at ligula nec nisi mollis imperdiet sit amet ut augue. Cras eu bibendum odio. Aenean id dictum nisl. Etiam ligula sem, pretium et sem a, eleifend auctor neque. Sed pellentesque dui pharetra eleifend pulvinar. Donec ullamcorper consequat efficitur.</p><p>Maecenas id maximus ligula. Ut tempus consequat nunc, sed mollis neque pulvinar eget. Vestibulum efficitur mi mauris. Suspendisse in risus orci. Curabitur nec sodales ipsum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus ac urna ante. Nam pulvinar erat eu nunc convallis suscipit. Nulla convallis rhoncus est. Vivamus et neque mollis, imperdiet augue id, aliquam arcu. Aenean sit amet semper ligula. Integer placerat nunc ante, et pharetra erat interdum scelerisque. In a risus accumsan, maximus mauris vitae, pretium erat. Nullam at sagittis elit. Nulla tristique vitae nisi eu vulputate. Etiam eu tristique nunc.</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
      {
      'size' : 'w2',
      'name' : 'Appointments',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['mdi-drafts', 'mdi-speaker-notes', 'fa fa-print'],
      'flipAction' : '',
      'sides' : [
        {
          'title' : 'Appointments',
          'content' : '<div class="appointmentsApp"><md-toolbar><div class="md-toolbar-tools"><h3><span>My Appointments</span></h3></div></md-toolbar><md-content style="height:400px;"><md-list><md-item ng-repeat="item in appointments"><md-item-content><div class="md-tile-content"><h3>{{item.when}}</h3><h4>{{item.where}}</h4><p>{{item.notes}}</p></div></md-item-content><md-divider inset></md-divider></md-item></md-list></md-content></div>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Points can be used for -</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
       {
      'size' : 'w3',
      'name' : 'Track Equipment Shipment',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'flipAction' : '',
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
      'sides' : [
        {
          'title' : 'Track Equipment Shipment',
           'content': '<ui-gmap-google-map center="map.center" zoom="map.zoom"></ui-gmap-google-map>',
           'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Track Trucks',
          'content': 'dasdsa',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Track Shipments',
          'content': 'dsadas',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
      
       {
      'size' : 'w6',
      'name' : 'Calender',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
      'flipAction' : '',
      'nativeContent' : '<div class="mobileScheduling"><md-tabs class="md-accent" md-selected="data.selectedIndex"><md-tab id="tab1" aria-controls="tab1-content">Shift Calender</md-tab><md-tab id="tab2" aria-controls="tab2-content" >Schedule Shift</md-tab><md-tab id="tab3" aria-controls="tab3-content">Shift Points</md-tab></md-tabs><ng-switch on="data.selectedIndex" class="tabpanel-container"><div role="tabpanel" id="tab1-content" aria-labelledby="tab1" ng-switch-when="0" md-swipe-left="next()" md-swipe-right="previous()"><div class="calenderWrap"><h2 class="text-center">{{ calendarControl.getTitle() }}</h2><mwl-calendar calendar-events="events" calendar-view="calendarView"calendar-current-day="calendarDay" calendar-control="calendarControl" calendar-event-click="eventClicked($event)" calendar-edit-event-html="edit" calendar-delete-event-html="delete" calendar-edit-event-click="eventEdited($event)" calendar-delete-event-click="eventDeleted($event)" calendar-auto-open="true"></mwl-calendar><div class="clear"></div></div><div class="calender_nav"><md-button class="md-raised" ng-click="calendarControl.prev()">Previous</md-button ><md-button class="md-raised" ng-click="setCalendarToToday()">Today</md-button ><md-button class="md-raised" ng-click="calendarControl.next()">Next</md-button ></div><div class="calender_sort"><md-radio-group ng-model="calendarView"><md-radio-button value="year" aria-label="Year">Year</md-radio-button><md-radio-button value="month" aria-label="Month"> Month </md-radio-button><md-radio-button value="week" aria-label="Week"> Week </md-radio-button><md-radio-button value="day" aria-label="Day"> Day </md-radio-button></md-radio-group></div></div><div role="tabpanel" id="tab2-content" aria-labelledby="tab2" ng-switch-when="1" md-swipe-left="next()" md-swipe-right="previous()"><div class="date_select_mobile">Month<br/><select><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select></div><div class="date_select_mobile">Day<br/><select><option>1</option></select></div><div class="date_select_mobile"><md-checkbox aria-label="Shift">Shift 1</md-checkbox><md-checkbox aria-label="Shift">Shift 2</md-checkbox><md-checkbox aria-label="Shift">Shift 3</md-checkbox></div><div class="date_select_mobile"><textarea placeholder="Comments"></textarea></div><md-button class="md-raised">Submit Shift(s)</md-button></div><div role="tabpanel" id="tab3-content" aria-labelledby="tab3" ng-switch-when="2" md-swipe-left="next()" md-swipe-right="previous()"><div class="shift_point_mobile"><h5>19</h5></div><p style="text-align: center;margin-top: 35px;">You are 14th out of 22 with 19 points.</p></div></ng-switch></div>',
      'sides' : [
        {
          'title' : 'Shift Calender',
          'content' : '<div class="calenderWrap"><h2 class="text-center">{{ calendarControl.getTitle() }}</h2><mwl-calendar calendar-events="events" calendar-view="calendarView"calendar-current-day="calendarDay" calendar-control="calendarControl" calendar-event-click="eventClicked($event)" calendar-edit-event-html="edit" calendar-delete-event-html="delete" calendar-edit-event-click="eventEdited($event)" calendar-delete-event-click="eventDeleted($event)" calendar-auto-open="true"></mwl-calendar><div class="clear"></div></div><div class="calender_nav"><md-button class="md-raised" ng-click="calendarControl.prev()">Previous</md-button ><md-button class="md-raised" ng-click="setCalendarToToday()">Today</md-button ><md-button class="md-raised" ng-click="calendarControl.next()">Next</md-button ></div><div class="calender_sort"><md-radio-group ng-model="calendarView"><md-radio-button value="year" aria-label="Year">Year</md-radio-button><md-radio-button value="month" aria-label="Month"> Month </md-radio-button><md-radio-button value="week" aria-label="Week"> Week </md-radio-button><md-radio-button value="day" aria-label="Day"> Day </md-radio-button></md-radio-group></div>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Schedule Shift',
          'content' : '<div class="inputDate"><div class="tableHolder"><datepicker ng-model="dt" min-date="minDate" show-weeks="true" class="well well-sm"></datepicker></div><div class="dateSelected" ng-if="dt">Date Selected : <b>{{dt | date:"fullDate" }}</b></div><div class="clear"></div><md-checkbox ng-model="data.cb1" aria-label="Checkbox 1" ng-show="dt">Shift 1</md-checkbox><md-checkbox ng-model="data.cb2" aria-label="Checkbox 2" ng-show="dt">Shift 2</md-checkbox><md-checkbox ng-model="data.cb3" aria-label="Checkbox 3" ng-show="dt" >Shift 3</md-checkbox><div class="clear"></div><div class="dateComment" ng-show="dt"><textarea placeholder="Additional Comments..."></textarea><div class="clear"></div><md-button class="md-raised" ng-if="dt" ng-click="addShift(dt)">Submit</md-button></div><p ng-if="!dt">Please select a date to begin</p></div> ',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
      {
      'size' : 'w5',
      'name' : 'Training Video',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'flipAction' : '',
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
      'sides' : [
        {
          'title' : 'Training Video',
          'content' : '<videogular vg-theme="config.theme"><vg-video vg-src="config.sources" vg-tracks="config.tracks"></vg-video><vg-controls><vg-play-pause-button></vg-play-pause-button><vg-timedisplay>{{ currentTime | date:"mm:ss" }}</vg-timedisplay><vg-scrubBar><vg-scrubbarcurrenttime></vg-scrubbarcurrenttime></vg-scrubBar><vg-timedisplay>{{ timeLeft | date:"mm:ss" }}</vg-timedisplay><vg-volume><vg-mutebutton></vg-mutebutton><vg-volumebar></vg-volumebar></vg-volume><vg-fullscreenButton></vg-fullscreenButton></vg-controls><vg-overlay-play></vg-overlay-play><vg-poster-image vg-url="controller.config.plugins.poster"></vg-poster-image></videogular>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Video Selection',
          'content' : '<div class="videoSelectLeft">Select videos to add to playlist.<accordion close-others="oneAtATime"><accordion-group heading="{{item.month}}" ng-repeat="item in videoSelectors"><ul><li ng-repeat="subs in item.items">{{subs}}</li></ul></accordion-group></accordion></div><div class="videoSelectRight"></div>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Help</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
     
      {
      'size' : 'w3',
      'name' : 'Lab Turnaround time',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'flipAction' : '',
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
      'sides' : [
        {
          'title' : 'Lab Turnaround time',
          'content' : '<nvd3-multi-bar-horizontal-chart data="examplePie" id="showControlsExample" responsive="true"  height="250" xAxisTickFormat="xAxisTickFormatFunction()" yAxisTickFormat="yAxisTickFormatFunction()" color="colorFunction()"showControls="true"showLegend="true"><svg></svg></nvd3-multi-bar-horizontal-chart>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '<p>Alternative graph 1</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Alternative graph 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Alternartive graph 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Documentation for graphs</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      },
       {
      'size' : '',
      'name' : 'Shift Points',
      'space' : 10,
      'published': true,
      'launch' :  true,
      'share' : true,
      'mobile' :  true,
      'native' :  true,
      'actions' : ['fa fa-suitcase', 'fa fa-bar-chart', 'fa fa-bell-o', 'fa fa-print'],
      'flipAction' : '',
      'nativeContent' : '<div class="mobileScheduling"><md-tabs class="md-accent" md-selected="data.selectedIndex"><md-tab id="tab1" aria-controls="tab1-content">Shift Calender</md-tab><md-tab id="tab2" aria-controls="tab2-content" >Schedule Shift</md-tab><md-tab id="tab3" aria-controls="tab3-content">Shift Points</md-tab></md-tabs><ng-switch on="data.selectedIndex" class="tabpanel-container"><div role="tabpanel" id="tab1-content" aria-labelledby="tab1" ng-switch-when="0" md-swipe-left="next()" md-swipe-right="previous()"><div class="calenderWrap"><h2 class="text-center">{{ calendarControl.getTitle() }}</h2><mwl-calendar calendar-events="events" calendar-view="calendarView"calendar-current-day="calendarDay" calendar-control="calendarControl" calendar-event-click="eventClicked($event)" calendar-edit-event-html="edit" calendar-delete-event-html="delete" calendar-edit-event-click="eventEdited($event)" calendar-delete-event-click="eventDeleted($event)" calendar-auto-open="true"></mwl-calendar><div class="clear"></div></div><div class="calender_nav"><md-button class="md-raised" ng-click="calendarControl.prev()">Previous</md-button ><md-button class="md-raised" ng-click="setCalendarToToday()">Today</md-button ><md-button class="md-raised" ng-click="calendarControl.next()">Next</md-button ></div><div class="calender_sort"><md-radio-group ng-model="calendarView"><md-radio-button value="year" aria-label="Year">Year</md-radio-button><md-radio-button value="month" aria-label="Month"> Month </md-radio-button><md-radio-button value="week" aria-label="Week"> Week </md-radio-button><md-radio-button value="day" aria-label="Day"> Day </md-radio-button></md-radio-group></div></div><div role="tabpanel" id="tab2-content" aria-labelledby="tab2" ng-switch-when="1" md-swipe-left="next()" md-swipe-right="previous()"><div class="date_select_mobile">Month<br/><select><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select></div><div class="date_select_mobile">Day<br/><select><option>1</option></select></div><div class="date_select_mobile"><md-checkbox aria-label="Shift">Shift 1</md-checkbox><md-checkbox aria-label="Shift">Shift 2</md-checkbox><md-checkbox aria-label="Shift">Shift 3</md-checkbox></div><div class="date_select_mobile"><textarea placeholder="Comments"></textarea></div><md-button class="md-raised">Submit Shift(s)</md-button></div><div role="tabpanel" id="tab3-content" aria-labelledby="tab3" ng-switch-when="2" md-swipe-left="next()" md-swipe-right="previous()"><div class="shift_point_mobile"><h5>19</h5></div><p style="text-align: center;margin-top: 35px;">You are 14th out of 22 with 19 points.</p></div></ng-switch></div>',
      'sides' : [
        {
          'title' : 'Shift Points',
          'content' : '<div class="shift_point_system"><div class="shift_point_top"><h5>19</h5></div><div class="shift_point_mid">You have 19 points which makes you 14th out of 22.</div>',
          'sideIs' : 'front',
          'active' : true
        },
        {
          'title' : 'Side 1',
          'content' : '',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 2',
          'content' : '<p>Side 2</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Side 3',
          'content' : '<p>Side 3</p>',
          'sideIs' : 'side',
          'active' : false
        },
        {
          'title' : 'Help',
          'content' : '<p>Points can be used for -</p>',
          'sideIs' : 'help',
          'active' : false
        }]
      }
       
      ];

    $scope.videoSelectors = [{"month":"January","items":["Improving Care Coordination through Clinical Integration","Colorectal Cancer: Is Your Patient at High Risk?","Management of Stable COPD","Patient Physician Relationship","Privacy & Confidentiality"]},{"month":"February","items":["Genetics & Reproductive Medicine","Ethical Issues in Caring for Patients at the End of Life","Research & Innovation","Professional Self-Regulation","Physicians and the Health of the Community"]},{"month":"March","items":["Promoting Healthy Families","Achieving HIPAA Security","Professional Satisfaction/Sustainability","Doing the Right Thing for Our Patients","Engaging Members of the Medical Staff "]},{"month":"April","items":["A global perspective on accountable care organizations","Leadership and the AMA Code of Medical Ethics","Negotiating your employment contract","Physician Leadership during Challenging Times"]},{"month":"May","items":["Physicians Leading Change for Better Outcomes","Principles for Physician Employment","AMA Therapeutic Insights","Quality Metrics: How to manage within a complex environment","The Aging Physician: Opportunities and Challenges"]},{"month":"June","items":["Managing Acute Uncomplicated Urinary Tract Infections","Win-Win-Win Approaches to Accountable Care","Primer on the Medicare Hospital Conditions of Participations ","Key actions for practices to prepare for regulatory mandate","Actions physicians need to be taking now"]},{"month":"July","items":["Future of the Medical Staff Organization","Care Delivery and Payment","Doing the Right Thing for Our Patients","Upper Extremities Training","Pain, Neurology, and Mental Disorders Training"]},{"month":"August","items":["Lower Extremities Training","Spine Training","Learning from the evaluation of the PI CME effort","Learning from the application of PI to patient care","Learning from current practice performance assessment"]},{"month":"September","items":["Learning from current practice performance assessment"," Food Systems and Health","Health Literacy Toolkit","Health Literacy and Patient Safety Monograph","Global Health Care: Health Care Trends"]},{"month":"October","items":["Health Care Resources and Physician Payment","Health Economics","Health Status of the US Population","Medical Education: Health Care Trends","Medical Practice and Quality"]},{"month":"November","items":["Public Health Infrastructure","Science and technology in medicine","Vendor Training","CNA Training I","CNA Training II"]},{"month":"December","items":["CNA Training III","CNA Training IV","Hospital Protocol","Hospital Volunteers","Hospital Evolution"]}];

    $scope.appointments = [{'when' : '11/21/14', 'where' : 'ENT', 'notes' : 'Annual Checkup'}, {'when' : '10/03/14', 'where' : 'Nutrition and Dietetics', 'notes' : 'Monthly Check-in'}, {'when' : '09/05/14', 'where' : 'Nutrition and Dietetics ', 'notes' : 'Monthly Check-in'}, {'when' : '08/09/14', 'where' : 'Nutrition and Dietetics ', 'notes' : 'Monthly Check-in'}, {'when' : '07/07/14', 'where' : 'Nutrition and Dietetics ', 'notes' : 'Monthly Check-in'}, {'when' : '06/15/14', 'where' : 'ER', 'notes' : 'Pain in left ear' }, {'when' : '06/05/14', 'where' : 'Nutrition and Dietetics ', 'notes' : 'Monthly Check-in'}, {'when' : '02/10/14', 'where' : 'Diagnostic Imaging', 'notes' : 'MRI'}, {'when' : '11/23/13', 'where' : 'Diagnostic Imaging', 'notes' : 'MRI'}, {'when' : '10/12/13', 'where' : 'ENT', 'notes' : 'Annual Checkup'}];

    $scope.user = {'title' : 'Dr', 'email' : 'user@user.com', 'company' : 'Volute', 'firstName' : 'Joe', 'lastName' : 'Nameson', 'address' : '640 George Hwy', 'city' : 'Lincoln', 'state' : 'RI', 'postalCode' : '02906', 'country' : 'USA' ,'dob' : '01/02/1954', 'diagnosis' : 'ACL Tear', 'statusDate' : '12/15/2014', 'pharmacy' : 'CVS#8671', 'procedure' : 'Knee Surgery','procedureDate' : '10/3/2014','procStatus' : 'Performed', 'cpt': '29881', 'symptoms' : 'Knee Pain' };
 	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

 	//flip to help
    $scope.flipHelp = function(index, parent){
        $scope.contentHereHealthcare[parent].sides[index].active = false;
       $scope.indexFind = _.findIndex($scope.contentHereHealthcare[parent].sides, function(idx){
        return idx.sideIs == 'help';
       });
       $scope.contentHereHealthcare[parent].sides[$scope.indexFind].active = true;
    };
    //flip back from help
    $scope.flipHelpBack = function(index, parent){
       $scope.contentHereHealthcare[parent].sides[index].active = false;
       $scope.indexFind = _.findIndex($scope.contentHereHealthcare[parent].sides, function(idx){
        return idx.sideIs == 'front';
       });
       $scope.contentHereHealthcare[parent].sides[$scope.indexFind].active = true;
    };
    //flip right
    $scope.flipSideRight = function(index, parent){
     

      $scope.contentHereHealthcare[parent].sides[index].active = false;
      var idx = index + 1;
      if(idx >= $scope.contentHereHealthcare[parent].sides.length){
         idx = 0;
      }else{}
      if($scope.contentHereHealthcare[parent].sides[idx].sideIs == 'help'){
           $scope.flipSideRight(idx, parent); //Added to skip over to next item
           $scope.contentHereHealthcare[parent].sides[index].active = false;
           return; // Added to skip execution of following line of codes incase of recursion
      }else{}
      $scope.contentHereHealthcare[parent].sides[index].active = false;
      $scope.contentHereHealthcare[parent].sides[idx].active = true;
    };

    //flip left
    $scope.flipSideLeft = function(index, parent){

      var idx = index - 1;
      if (idx < 0) {
       idx = $scope.contentHereHealthcare[parent].sides.length - 1;
      }else{}
      if($scope.contentHereHealthcare[parent].sides[idx].sideIs == 'help'){
           $scope.flipSideLeft(idx, parent); //Added to skip over to next item
           $scope.contentHereHealthcare[parent].sides[index].active = false;
           return; // Added to skip execution of following line of codes incase of recursion
      }else{}
      $scope.contentHereHealthcare[parent].sides[index].active = false;
      $scope.contentHereHealthcare[parent].sides[idx].active = true;
    };

    $scope.nativeWidgHealth = function(index){

      $scope.prepForSend = $scope.contentHereHealthcare[index];
      themeFactory.setModal($scope.prepForSend);

    };
  });
