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