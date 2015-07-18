// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform, $rootScope, $location, $ionicPopup, $ionicPopover) {
    $rootScope.go = function (val) {
        $location.path(val);
    };
    $rootScope.tip = function (val) {
        var alertPopup = $ionicPopup.alert({
            title: 'Help Tip!',
            template: val,
            buttons: [
                {
                    text: 'Thanks!',
                    type: 'button-royal',
                }
            ]
        });
        alertPopup.then(function (res) {
            console.log('a');
        });
    };
    $rootScope.menu = {
        login: "<span class='ion-log-in'></span>",
        browse: "<span class='ion-ios-browsers'></span>",
        search: "<span class='ion-ios-search'></span>",
        users: "<span class='ion-ios-people'></span>",
        posts: "<span class='ion-android-list'></span>",
        categories: "<span class='ion-android-folder-open'></span>",
        create: "<span class='ion-ios-compose'></span>",
        edit: "<span class='ion-compose'></span>",
        post: "<span class='ion-ios-book'></span>"
    };
    $ionicPopover.fromTemplateUrl('templates/partials/popover-header-menu.html', {
        scope: $rootScope
    }).then(function (popover) {
        $rootScope.popover = popover;
    });
    $rootScope.openPopover = function ($event) {
        $rootScope.popover.show($event);
    };
    $rootScope.closePopover = function () {
        $rootScope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $rootScope.$on('$destroy', function () {
        $rootScope.popover.remove();
    });

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.create', {
            url: '/create',
            views: {
                'menuContent': {
                    templateUrl: 'templates/create.html',
                    controller: 'CreatePostCtrl'
                }
            }
        })
        .state('app.edit', {
            url: '/edit/:postId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/edit.html'
                }
            }
        })
        .state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/browse.html'
                }
            }
        })
        .state('app.posts', {
            url: '/posts',
            views: {
                'menuContent': {
                    templateUrl: 'templates/posts.html',
                    controller: 'PlaylistsCtrl'
                }
            }
        })

    .state('app.single', {
            url: '/posts/:postId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/post.html',
                    controller: 'PlaylistCtrl'
                }
            }
        })
        .state('app.categories', {
            url: '/categories',
            views: {
                'menuContent': {
                    templateUrl: 'templates/categories.html'
                }
            }
        })
        .state('app.users', {
            url: '/users',
            views: {
                'menuContent': {
                    templateUrl: 'templates/users.html'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/posts');
});