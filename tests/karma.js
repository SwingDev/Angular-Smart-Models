module.exports = function(config){
  config.set({

    basePath : '../',
    urlRoot: '/',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/smart-models/dist/smart-models.js',
      'src/angular-smart-models.js',
      
      'src/*.spec.js',
    ],
    preprocessors: {
      'src/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [ ['babelify', {optional: ['runtime' ] } ] ]
    },

    autoWatch : false,
    singleRun: true,
    port: '9876',
    reporters: ['spec'],
    loggers: [{
      type: 'console'
    }],

    frameworks: ['browserify', 'jasmine'],
    browsers: ['Chrome'],

    plugins : [
            require('karma-chrome-launcher'),
            require('karma-jasmine'),
            require('karma-spec-reporter'),
            require('karma-browserify')
            ],
  });
};
