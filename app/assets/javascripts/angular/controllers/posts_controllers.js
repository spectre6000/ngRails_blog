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

//Controllers
  //Index action
    myApp.controller( 'PostListCtr', [ '$scope', '$resource', 'Posts', 'Post', '$location', function( $scope, $resource, Posts, Post, $location) {
      $scope.posts = Posts.query(); //getting post collection

      $scope.deletePost = function( userId ) {
        if( confirm( "Are you sure you want to delete this post?" )) {
          Post.delete( { id: postId }, function() {
            $scope.posts = Posts.query(); //back to index after delete
            $location.path('/');
          });
        }
      };
    }]);
  //Create action
    myApp.controller( 'PostAddCtr', [ '$scope', '$resource', 'Posts', '$location', function( $scope, $resource, Posts, $locaiton) {
      $scope.save = function() {
        if ( $scope.postForm.$valid ) {
          Posts.create( { post: $scope.post }, function() {
            $location.path('/');
          }, function( error ) {
            console.log( error );
          });
        }
      }
    }]);
  //Update action
    myApp.controller( 'PostUpdateCtr', [ '$scope', '$resource', 'Post', '$location', '$routeParams', function( $scope, $resource, Post, $location, $routeParams) {
      $scope.post = Post.get( { id: $routeParams.id } )
      $scope.update = function() {
        if ( $scope.postForm.$valid ) {
          Post.update( $scope.post, function() {
            $location.path('/');
          }, function( error ) {
            console.log( error );
          });
        }
      };
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