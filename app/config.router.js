/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
app
    .run([
        '$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
                $rootScope.$emit('handleStateChange', toState.data.pageTitle);
            });
        }
    ])
    .config(
        [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise("hjc/projects");

                $stateProvider
                    .state('hjc', {
                        abstract: true,
                        url: "/hjc",
                        templateUrl: "views/common/content.html"
                        
                    })
                    .state('hjc.factory', {
                        url: "/factory",
                        templateUrl: "views/demo/factory.html",
                        data: { pageTitle: 'Factory' },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['ui.checkbox', 'ui.select', 'daterangepicker', 'datatables']).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                                [{
                                                    name: 'datatables.buttons',
                                                    serie: true,
                                                    files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                                                }, {
                                                    serie: true,
                                                    files: [
                                                        'app/controllers/factory.controller.js'
                                                    ]
                                                }]);
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('hjc.file_manager', {
                        url: "/file_manager",
                        templateUrl: "views/hjc/file_manager.html",
                        data: { pageTitle: 'File manager' }
                    })
                    .state('hjc.screenshot', {
                        url: "/screenshot",
                        templateUrl: "views/hjc/screenshot.html",
                        data: { pageTitle: 'ScreenShot' },
                        resolve: {
                            loadPlugin: function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    {
                                        files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js','css/plugins/blueimp/css/blueimp-gallery.min.css']
                                    }
                                ]);
                            }
                        }
                    })
                    .state('hjc.travel_japan', {
                        url: "/travel",
                        templateUrl: "views/hjc/traveljapan.html",
                        data: { pageTitle: 'Travel ' },
                        resolve: {
                            loadPlugin: function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    {
                                        files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js','css/plugins/blueimp/css/blueimp-gallery.min.css']
                                    }
                                ]);
                            }
                        }
                    })
                    .state('hjc.skills', {
                        url: "/skills",
                        templateUrl: "views/hjc/skills.html",
                        data: { pageTitle: 'Skills' }
                    })
                    .state('hjc.projects', {
                        url: "/projects",
                        templateUrl: "views/hjc/projects.html",
                        data: { pageTitle: 'My Projects' }
                    })
                    .state('settings', {
                        abstract: true,
                        url: "/settings",
                        templateUrl: "views/common/content.html"
                    })
                    .state('settings.file_manager', {
                        url: "/file_manager",
                        templateUrl: "views/inspinia/file_manager.html",
                        data: { pageTitle: 'File manager' }
                    })
                    .state('settings.blog', {
                        url: "/blog",
                        templateUrl: "views/inspinia/blog.html",
                        data: { pageTitle: 'Blog' }
                    })
                    .state('settings.timeline_2', {
                        url: "/timeline_2",
                        templateUrl: "views/inspinia/timeline_2.html",
                        data: { pageTitle: 'Timeline version 2' }
                    })
                    .state('settings.products_grid', {
                        url: "/products_grid",
                        templateUrl: "views/inspinia/ecommerce_products_grid.html",
                        data: { pageTitle: 'E-commerce grid' }
                    })
                    .state('settings.basic_gallery', {
                        url: "/basic_gallery",
                        templateUrl: "views/inspinia/basic_gallery.html",
                        data: { pageTitle: 'Lightbox Gallery' },
                        resolve: {
                            loadPlugin: function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    {
                                        files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js','css/plugins/blueimp/css/blueimp-gallery.min.css']
                                    }
                                ]);
                            }
                        }
                    })
                    .state('settings.profile_2', {
                        url: "/profile_2",
                        templateUrl: "views/inspinia/profile_2.html",
                        data: { pageTitle: 'Profile_2'},
                        resolve: {
                            loadPlugin: function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    {
                                        files: ['js/plugins/sparkline/jquery.sparkline.min.js']
                                    }
                                ]);
                            }
                        }
                    });
                    
                    

            }
        ]
    );