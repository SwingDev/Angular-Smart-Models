describe('InterceptorsService', function() {

  let SmartModel = window.SmartModel;
  let Collection = window.Collection;
  let inj = {};


  it('should setup data for the rest of the tests', function() {

    class User extends SmartModel { };
    class UsersCollection extends Collection { }

    let fakeModule = angular.module('testModule', ['SwingDev.SmartModels']);
    fakeModule.config(function(ModelInterceptorProvider) {
      inj.ModelInterceptorProvider = ModelInterceptorProvider;
      inj.ModelInterceptorProvider.registerInterceptor({
        methods: inj.ModelInterceptorProvider.ALL,
        url: /user/,
        model: User,
        collection: UsersCollection,
        collectionKey: 'KEY'
      });

      inj.ModelInterceptorProvider.registerInterceptor({
        methods: inj.ModelInterceptorProvider.ALL,
        url: /zzz/,
        model: User,
        // no collection provided
        // no collection key provided
      });

    });
    angular.mock.module('testModule');
    angular.mock.inject(function($httpBackend, $http) {
      $httpBackend.whenGET('/user').respond(function(method, url, data, headers) {
        return [200, { id: 1, name: 'Gwen', lastname: 'Cooper'}];
      });

      $httpBackend.whenGET('/user2').respond(function(method, url, data, headers) {
        return [200, { id: 1, name: 'Gwen', lastname: 'Williams'}];
      });

      $httpBackend.whenGET('/users').respond(function(method, url, data, headers) {
        return [200, [{id: 1, name: 'Gwen'}, {id:2, name: 'Owen'}, {id:3, name: 'Jack'}]];
      });

      $httpBackend.whenGET('/zzz').respond(function(method, url, data, headers) {
        return [200, [{id: 1, name: 'Gwen'}, {id:2, name: 'Owen'}, {id:3, name: 'Jack'}]];
      });

      inj.$http = $http;
      inj.$httpBackend = $httpBackend;
      expect(inj.$http).toBeDefined();
      expect(inj.$httpBackend).toBeDefined();
    });
  });

  beforeEach(function() {
    SmartModel.clearCache();
  });

  it('Should test interceptor', function() {
    inj.$http.get('/user').then(function(response) {
      expect(response.data.constructor.name).toEqual('User');
    })

  });

  it('Should test SmartModel abilities with interceptor', function() {

    inj.$http.get('/user').then(function(response) {
      let user1 = response.data;
      expect(user1.constructor.name).toEqual('User');
      expect(user1.name).toEqual('Gwen');
      expect(user1.lastname).toEqual('Cooper');
      inj.$http.get('/user2').then(function(response) {
        let user2 = response.data;
        expect(user2.constructor.name).toEqual('User');
        expect(user2.name).toEqual('Gwen');
        expect(user2.lastname).toEqual('Williams');
        expect(user1.lastname).toEqual('Williams'); // !!!
      });
    });
    inj.$httpBackend.flush();

  });

  it('Should test interceptor when result is an array', function() {
    inj.$http.get('/zzz').then(function(response) {
      let users = response.data;
      expect(users.constructor.name).toEqual('Array');
      for(let user of users) {
        expect(user.constructor.name).toEqual('User');
      }
    });
    inj.$httpBackend.flush();
  });

  it('Should test interceptor when result is an array and is transformed to Collection', function() {
    inj.$http.get('/users').then(function(response) {
      let users = response.data;
      expect(users.constructor.name).toEqual('UsersCollection');
      for(let user of users) {
        expect(user.constructor.name).toEqual('User');
      }
    });
  })

});
