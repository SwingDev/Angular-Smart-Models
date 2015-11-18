(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('SwingDev.SmartModels', []).service('SmartModel', window.SmartModel).service('RollbackableSmartModel', window.RollbackableSmartModel).service('Collection', window.Collection);

require('./interceptorsService.js');

},{"./interceptorsService.js":2}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rdWxhay9zd2luZy9hbmd1bGFyLXNtYXJ0LW1vZGVscy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva3VsYWsvc3dpbmcvYW5ndWxhci1zbWFydC1tb2RlbHMvc3JjL2Zha2VfZDc0OGU1OWQuanMiLCIvVXNlcnMva3VsYWsvc3dpbmcvYW5ndWxhci1zbWFydC1tb2RlbHMvc3JjL2ludGVyY2VwdG9yc1NlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE9BQU8sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQ3pDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUN4QyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQ2hFLE9BQU8sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUxQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs7Ozs7QUNMcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUNyQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsVUFBUyxhQUFhLEVBQUU7OztBQUdwRCxNQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7O0FBRTdCLE1BQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBSzs7QUFFckMsUUFBSSxPQUFPLEdBQVEsTUFBTSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUM7QUFDL0MsUUFBSSxRQUFRLEdBQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUM5QixRQUFJLEtBQUssR0FBVSxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2hDLFFBQUksZUFBZSxHQUFLLE1BQU0sQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDO0FBQ3ZELFFBQUksYUFBYSxHQUFFLE1BQU0sQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO0FBQzlDLFFBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDeEMsWUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0tBQ3hFOztBQUVELGlCQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFXO0FBQ3pDLGFBQU87QUFDTCxrQkFBVSxFQUFFLGtCQUFTLFNBQVEsRUFBRTtBQUM3QixjQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxPQUFPLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxBQUFFLEVBQUU7QUFDakgsZ0JBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDakMsa0JBQUcsZUFBZSxFQUFFOztBQUNsQixzQkFBSSxVQUFVLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN2RCx5QkFBTSxVQUFVLENBQUMsTUFBTSxFQUFFO0FBQ3ZCLDhCQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7bUJBQ2xCO0FBQ0QsMkJBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTsyQkFBSyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7bUJBQUEsQ0FBQyxDQUFDO0FBQ3JFLDJCQUFRLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQzs7ZUFDNUIsTUFBTTtBQUNMLHlCQUFRLENBQUMsSUFBSSxHQUFHLFNBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTt5QkFBSyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztpQkFBQSxDQUFDLENBQUM7ZUFDakU7YUFDRixNQUFNO0FBQ0wsdUJBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0M7V0FDRjtBQUNELGlCQUFPLFNBQVEsQ0FBQztTQUNqQjtPQUNGLENBQUM7S0FDSCxDQUFDLENBQUM7R0FDSixDQUFDOztBQUVGLFFBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUNqQyxjQUFVLEVBQUUsS0FBSztBQUNqQixnQkFBWSxFQUFFLEtBQUs7QUFDbkIsWUFBUSxFQUFFLEtBQUs7QUFDZixTQUFLLEVBQUUsU0FBUztHQUNqQixDQUFDLENBQUM7O0FBRUgsTUFBSSxDQUFDLElBQUksR0FBRzs7R0FBVSxDQUFDO0NBRXhCLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJhbmd1bGFyLm1vZHVsZSgnU3dpbmdEZXYuU21hcnRNb2RlbHMnLCBbXSlcbi5zZXJ2aWNlKCdTbWFydE1vZGVsJywgd2luZG93LlNtYXJ0TW9kZWwpXG4uc2VydmljZSgnUm9sbGJhY2thYmxlU21hcnRNb2RlbCcsIHdpbmRvdy5Sb2xsYmFja2FibGVTbWFydE1vZGVsKVxuLnNlcnZpY2UoJ0NvbGxlY3Rpb24nLCB3aW5kb3cuQ29sbGVjdGlvbik7XG5cbnJlcXVpcmUoJy4vaW50ZXJjZXB0b3JzU2VydmljZS5qcycpOyIsImFuZ3VsYXIubW9kdWxlKCdTd2luZ0Rldi5TbWFydE1vZGVscycpXG4ucHJvdmlkZXIoJ01vZGVsSW50ZXJjZXB0b3InLCBmdW5jdGlvbigkaHR0cFByb3ZpZGVyKSB7XG5cblxuICBsZXQgYWxsU3ltYm9sID0gU3ltYm9sKCdBTEwnKVxuXG4gIHRoaXMucmVnaXN0ZXJJbnRlcmNlcHRvciA9IChjb25maWcpID0+IHtcblxuICAgIGxldCBtZXRob2RzICAgICAgPSBjb25maWcubWV0aG9kcyB8fCBhbGxTeW1ib2w7XG4gICAgbGV0IHVybFJlZ2V4ICAgICA9IGNvbmZpZy51cmw7XG4gICAgbGV0IG1vZGVsICAgICAgICA9IGNvbmZpZy5tb2RlbDtcbiAgICBsZXQgY29sbGVjdGlvbkNsYXNzICAgPSBjb25maWcuY29sbGVjdGlvbiB8fCB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbGxlY3Rpb25LZXk9IGNvbmZpZy5jb2xsZWN0aW9uS2V5IHx8ICcnO1xuICAgIGlmKCFjb25maWcubW9kZWwgfHwgIWNvbmZpZy5tb2RlbC5jcmVhdGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGhhdmUgdG8gcHJvdmlkZSB2YWxpZCBtb2RlbCBpbiBNb2RlbEludGVyY2VwdG9yJyk7XG4gICAgfVxuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdyZXNwb25zZSc6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYodXJsUmVnZXgudGVzdChyZXNwb25zZS5jb25maWcudXJsKSAmJiAobWV0aG9kcyA9PT0gYWxsU3ltYm9sIHx8IG1ldGhvZHMuaW5kZXhPZihyZXNwb25zZS5jb25maWcubWV0aG9kKSA+IC0xICkpIHtcbiAgICAgICAgICAgIGlmKGFuZ3VsYXIuaXNBcnJheShyZXNwb25zZS5kYXRhKSkge1xuICAgICAgICAgICAgICBpZihjb2xsZWN0aW9uQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25DbGFzcy5jcmVhdGUoY29sbGVjdGlvbktleSk7XG4gICAgICAgICAgICAgICAgd2hpbGUoY29sbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24ucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuZm9yRWFjaCgoaXRlbSkgPT4gY29sbGVjdGlvbi5wdXNoKG1vZGVsLmNyZWF0ZShpdGVtKSkpO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSBjb2xsZWN0aW9uO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSByZXNwb25zZS5kYXRhLm1hcCgoaXRlbSkgPT4gbW9kZWwuY3JlYXRlKGl0ZW0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IG1vZGVsLmNyZWF0ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnQUxMJywge1xuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICAgIHZhbHVlOiBhbGxTeW1ib2xcbiAgfSk7XG5cbiAgdGhpcy4kZ2V0ID0gKCkgPT4gdGhpcztcblxufSk7XG4iXX0=
