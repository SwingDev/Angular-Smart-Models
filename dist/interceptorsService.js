(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('SwingDev.SmartModels').provider('ModelInterceptor', function ($httpProvider) {
  var _this = this;

  var allSymbol = Symbol('ALL');

  this.registerInterceptor = function (config) {

    var methods = config.methods || allSymbol;
    var urlRegex = config.url;
    var model = config.model;
    var collectionClass = config.collection || undefined;
    var collectionKey = config.collectionKey || '';
    if (!config.model || !config.model.create) {
      throw new Error('You have to provide valid model in ModelInterceptor');
    }

    $httpProvider.interceptors.push(function () {
      return {
        'response': function response(_response) {
          if (urlRegex.test(_response.config.url) && (methods === allSymbol || methods.indexOf(_response.config.method) > -1)) {
            if (angular.isArray(_response.data)) {
              if (collectionClass) {
                (function () {
                  var collection = collectionClass.create(collectionKey);
                  while (collection.length) {
                    collection.pop();
                  }
                  _response.data.forEach(function (item) {
                    return collection.push(model.create(item));
                  });
                  _response.data = collection;
                })();
              } else {
                _response.data = _response.data.map(function (item) {
                  return model.create(item);
                });
              }
            } else {
              _response.data = model.create(_response.data);
            }
          }
          return _response;
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

  this.$get = function () {
    return _this;
  };
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rdWxhay9zd2luZy9hbmd1bGFyLXNtYXJ0LW1vZGVscy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva3VsYWsvc3dpbmcvYW5ndWxhci1zbWFydC1tb2RlbHMvc3JjL2Zha2VfYmZjYzg1MDcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE9BQU8sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FDckMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLFVBQVMsYUFBYSxFQUFFOzs7QUFHcEQsTUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBOztBQUU3QixNQUFJLENBQUMsbUJBQW1CLEdBQUcsVUFBQyxNQUFNLEVBQUs7O0FBRXJDLFFBQUksT0FBTyxHQUFRLE1BQU0sQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBQy9DLFFBQUksUUFBUSxHQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDOUIsUUFBSSxLQUFLLEdBQVUsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNoQyxRQUFJLGVBQWUsR0FBSyxNQUFNLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQztBQUN2RCxRQUFJLGFBQWEsR0FBRSxNQUFNLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztBQUM5QyxRQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ3hDLFlBQU0sSUFBSSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztLQUN4RTs7QUFFRCxpQkFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBVztBQUN6QyxhQUFPO0FBQ0wsa0JBQVUsRUFBRSxrQkFBUyxTQUFRLEVBQUU7QUFDN0IsY0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsQUFBRSxFQUFFO0FBQ2pILGdCQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2pDLGtCQUFHLGVBQWUsRUFBRTs7QUFDbEIsc0JBQUksVUFBVSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkQseUJBQU0sVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUN2Qiw4QkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO21CQUNsQjtBQUNELDJCQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7MkJBQUssVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO21CQUFBLENBQUMsQ0FBQztBQUNyRSwyQkFBUSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7O2VBQzVCLE1BQU07QUFDTCx5QkFBUSxDQUFDLElBQUksR0FBRyxTQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7eUJBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7aUJBQUEsQ0FBQyxDQUFDO2VBQ2pFO2FBQ0YsTUFBTTtBQUNMLHVCQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdDO1dBQ0Y7QUFDRCxpQkFBTyxTQUFRLENBQUM7U0FDakI7T0FDRixDQUFDO0tBQ0gsQ0FBQyxDQUFDO0dBQ0osQ0FBQzs7QUFFRixRQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7QUFDakMsY0FBVSxFQUFFLEtBQUs7QUFDakIsZ0JBQVksRUFBRSxLQUFLO0FBQ25CLFlBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBSyxFQUFFLFNBQVM7R0FDakIsQ0FBQyxDQUFDOztBQUVILE1BQUksQ0FBQyxJQUFJLEdBQUc7O0dBQVUsQ0FBQztDQUV4QixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiYW5ndWxhci5tb2R1bGUoJ1N3aW5nRGV2LlNtYXJ0TW9kZWxzJylcbi5wcm92aWRlcignTW9kZWxJbnRlcmNlcHRvcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHtcblxuXG4gIGxldCBhbGxTeW1ib2wgPSBTeW1ib2woJ0FMTCcpXG5cbiAgdGhpcy5yZWdpc3RlckludGVyY2VwdG9yID0gKGNvbmZpZykgPT4ge1xuXG4gICAgbGV0IG1ldGhvZHMgICAgICA9IGNvbmZpZy5tZXRob2RzIHx8IGFsbFN5bWJvbDtcbiAgICBsZXQgdXJsUmVnZXggICAgID0gY29uZmlnLnVybDtcbiAgICBsZXQgbW9kZWwgICAgICAgID0gY29uZmlnLm1vZGVsO1xuICAgIGxldCBjb2xsZWN0aW9uQ2xhc3MgICA9IGNvbmZpZy5jb2xsZWN0aW9uIHx8IHVuZGVmaW5lZDtcbiAgICBsZXQgY29sbGVjdGlvbktleT0gY29uZmlnLmNvbGxlY3Rpb25LZXkgfHwgJyc7XG4gICAgaWYoIWNvbmZpZy5tb2RlbCB8fCAhY29uZmlnLm1vZGVsLmNyZWF0ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgaGF2ZSB0byBwcm92aWRlIHZhbGlkIG1vZGVsIGluIE1vZGVsSW50ZXJjZXB0b3InKTtcbiAgICB9XG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3Jlc3BvbnNlJzogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBpZih1cmxSZWdleC50ZXN0KHJlc3BvbnNlLmNvbmZpZy51cmwpICYmIChtZXRob2RzID09PSBhbGxTeW1ib2wgfHwgbWV0aG9kcy5pbmRleE9mKHJlc3BvbnNlLmNvbmZpZy5tZXRob2QpID4gLTEgKSkge1xuICAgICAgICAgICAgaWYoYW5ndWxhci5pc0FycmF5KHJlc3BvbnNlLmRhdGEpKSB7XG4gICAgICAgICAgICAgIGlmKGNvbGxlY3Rpb25DbGFzcykge1xuICAgICAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uID0gY29sbGVjdGlvbkNsYXNzLmNyZWF0ZShjb2xsZWN0aW9uS2V5KTtcbiAgICAgICAgICAgICAgICB3aGlsZShjb2xsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbi5wb3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5mb3JFYWNoKChpdGVtKSA9PiBjb2xsZWN0aW9uLnB1c2gobW9kZWwuY3JlYXRlKGl0ZW0pKSk7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IGNvbGxlY3Rpb247XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtKSA9PiBtb2RlbC5jcmVhdGUoaXRlbSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXNwb25zZS5kYXRhID0gbW9kZWwuY3JlYXRlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdBTEwnLCB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgdmFsdWU6IGFsbFN5bWJvbFxuICB9KTtcblxuICB0aGlzLiRnZXQgPSAoKSA9PiB0aGlzO1xuXG59KTtcbiJdfQ==
