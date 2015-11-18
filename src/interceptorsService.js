angular.module('SwingDev.SmartModels')
.provider('ModelInterceptor', function($httpProvider) {


  let allSymbol = Symbol('ALL')

  this.registerInterceptor = (config) => {

    let methods      = config.methods || allSymbol;
    let urlRegex     = config.url;
    let model        = config.model;
    let collectionClass   = config.collection || undefined;
    let collectionKey= config.collectionKey || '';
    if(!config.model || !config.model.create) {
      throw new Error('You have to provide valid model in ModelInterceptor');
    }

    $httpProvider.interceptors.push(function() {
      return {
        'response': function(response) {
          if(urlRegex.test(response.config.url) && (methods === allSymbol || methods.indexOf(response.config.method) > -1 )) {
            if(angular.isArray(response.data)) {
              if(collectionClass) {
                let collection = collectionClass.create(collectionKey);
                while(collection.length) {
                  collection.pop();
                }
                response.data.forEach((item) => collection.push(model.create(item)));
                response.data = collection;
              } else {
                response.data = response.data.map((item) => model.create(item));
              }
            } else {
              response.data = model.create(response.data);
            }
          }
          return response;
        }
      };
    });
  };

  Object.defineProperty(this, 'ALL', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: allSymbol
  });

  this.$get = () => this;

});
