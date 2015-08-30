var url = 'http://localhost:3000/';
angular.module('starter.controllers', ['ngSanitize'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function ($scope, $ionicPopover) {

})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})

.controller('PostCtrl', function ($scope, $http) {
        $http.get(url + 'posts').success(function (data) {
            $scope.posts = data;
        });
    })
    .controller('PCtrl', function ($scope, $http, $stateParams) {
        $http.get(url + 'posts/' + $stateParams.postId).success(function (data) {
            $scope.post = data;
        });
        $http.get(url + 'replies/filterByPost?postId=' + $stateParams.postId).success(function (data) {
            $scope.replies = data;
        });
    })
    .controller('CreatePostCtrl', function ($scope, $http) {
        $scope.post = {};
        $http.get(url + 'categories').success(function (data) {
            $scope.cats = data;
        });
        $scope.getSub = function (id) {
            $http.get(url + 'subcategories/filterwithcategory?categoryId=' + id).success(function (data) {
                $scope.subcats = data;
                console.log(data)
            });
        };
        $scope.tags = [];
        $scope.addTag = function (tag) {
            $scope.tags.push(tag);
            $scope.tagText = '';
        };
        $scope.removeTag = function (tag) {
            $scope.tags.splice(tag, 1);
        };
        $scope.create = function () {
            console.log($scope.post);
            $http.post(url + 'posts', $scope.post).success(function (data) {
                alert('a');
            });
        }
    });