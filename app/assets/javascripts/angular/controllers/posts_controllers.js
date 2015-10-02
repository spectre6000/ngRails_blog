//module declaration
  var myApp = angular.module( 'myapplication', [ 'ngRoute', 'ngResource' ]);

//Factory
  myApp.factory( 'Posts', [ '$resource', function( $resource ) {
    return $resource('/posts.json', {}, {
      query: { method: 'GET', isArray: true },
      create: { method: 'POST' }
    });
  }]);

  myApp.factory( 'Post', [ '$resource', function( $resource ){
    return $resource( '/posts/:id.json', {} {
      show: { method: 'GET' },
      update: { method: 'PUT', params: { id: '@id' } },
      delete: { method: 'DELETE', params: { id: '@id' } }
    });
  }]);

//Routes
  myApp.config([
    '$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ) {
      $routeProvider.when( '/posts', {
        templateUrl: '/templates/posts/index.html',
        controller: 'PostListCtr'
      });
      $routeProvider.when( '/posts/new', {
        templateUrl: '/templates/posts/new.html',
        controller: 'PostAddCtr'
      });
      $routeProvider.when( 'posts/:id/edit', {
        templateUrl: '/templates/posts/edit.html',
        controller: 'PostUpdateCtr'
      });
      $routeProvider.otherwise({
        redirectTo: '/posts'
      });
    }
  ]);