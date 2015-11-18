angular.module('SwingDev.SmartModels', [])
.service('SmartModel', window.SmartModel)
.service('RollbackableSmartModel', window.RollbackableSmartModel)
.service('Collection', window.Collection);

require('./interceptorsService.js');