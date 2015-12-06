# Angular Smart Models

## Overview
Angular Smart Models is a angular wrapper for Smart Model library. It also provides interceptors for Angular $http so you can plug it to your project with almost no configuration.


## Installation
You can install Angular Smart Model from bower and npm.
### NPM
```npm install angular-smart-models```
### Bower
```bower install angular-smart-models```

Then include Smart Model and Angular Smart Model scripts after the angular
```html
<head>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/smart-models/dist/smart-models.js"></script>
<script src="bower_components/angular-smart-models/dist/angular-smart-models.js"></script>
</head>
```

### Usage


### Basic Example
```javascript

class User extends SmartModel { }

angular.module('MyApp', [])
.config(function(ModelInterceptorProvider) {
	ModelInterceptorProvider.registerInterceptor({
		model: User,
		url: '/user/',
		method: ModelInterceptorProvider.ALL
	});
});

angular.module('MyApp')
.controller('MainController', function($http) {
	$http.get('/user/1').success(function(user) {
		// user is of type User
	});
});
```

### Usage with Collections
You can also provide the collection name and key in interceptor configuration. When the backend response with array of objects, the library will simply pack everything into the Collection of that type.
```javascript
class Post extends SmartModel { }
class PostsCollection extends Collection { }
angular.module('MyApp', [])
.config(function(ModelInterceptorProvider) {
	ModelInterceptorProvider.registerInterceptor({
		model: Post,
		url: '/my-post/',
		method: ModelInterceptorProvider.ALL,
		collection: PostsCollection,
		collectionKey: 'MyPosts'
	});
})
.controller('MyPostsController', function($http) {
	$scope.posts = PostsCollection.create('MyPosts'); // notice that we use the same collection class and collection key here

	$http.get('my-posts'); // and that's all we have to do here! We no longer need to call .success, the Collection will be filled with data in the interceptor and attached to $scope.posts !
});
```

## Tests
The code is covered with tests, you can run them using `npm test`.
