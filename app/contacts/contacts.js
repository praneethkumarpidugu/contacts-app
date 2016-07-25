'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

//contacts controller
.controller('ContactsCtrl', ['$scope','$firebaseArray', function($scope, $firebaseArray) {
  //Init Firebase
  var ref = new Firebase('https://mycontacts-application12.firebaseio.com/contacts');

  //get contacts
  $scope.contacts = $firebaseArray(ref);

  //console.log($scope.contacts);

  //Show Add Form
  $scope.showAddForm = function () {
    $scope.addFormShow = true;
  }

  //Hide Forms
  $scope.hide = function () {
    $scope.addFormShow = false;
  }

  //Submit Contacts
  $scope.addFormSubmit = function () {
    console.log('Adding contact');

    // Assign values
    if ($scope.name){
      var name = $scope.name
    } else {
      var name = null;
    }
    if ($scope.email){
      var email = $scope.email
    } else {
      var email = null;
    }
    if ($scope.company){
      var company = $scope.company
    } else {
      var company = null;
    }
    if ($scope.mobile_phone){
      var mobile_phone = $scope.mobile_phone
    } else {
      var mobile_phone = null;
    }
    if ($scope.home_phone){
      var home_phone = $scope.home_phone
    } else {
      var home_phone = null;
    }
    if ($scope.work_phone){
      var work_phone = $scope.work_phone
    } else {
      var work_phone = null;
    }
    if ($scope.street_address){
      var street_address = $scope.street_address
    } else {
      var street_address = null;
    }
    if ($scope.city){
      var city = $scope.city
    } else {
      var city = null;
    }
    if ($scope.state){
      var state = $scope.state
    } else {
      var state = null;
    }
    if ($scope.zipcode){
      var zipcode = $scope.zipcode
    } else {
      var zipcode = null;
    }

    //Build Object
    $scope.contacts.$add({
      name: name,
      email: email,
      company: company,
      phones: [{
        mobile: mobile_phone,
        home: home_phone,
        work: work_phone
      }],
      address: [{
        street_address: street_address,
        city: city,
        state: state,
        zipcode: zipcode
      }]

    }).then(function (ref) {
      var id = ref.key();
      console.log('Added contact with ID: '+ id);

      //clear form
      clearFields();

      //hide Form
      $scope.addFormShow = false;

      //send Message
      $scope.msg = "Contact Added";
    });
  }

  //clear $scope Fields
  function clearFields(){
    console.log('clearing all fields');
    $scope.name = '';
    $scope.email = '';
    $scope.company = '';
    $scope.mobile_phone = '';
    $scope.home_phone = '';
    $scope.work_phone = '';
    $scope.street_address = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zipcode = '';
  }
}]);