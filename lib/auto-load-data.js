(function() {
  var Promise, autoupdate, isString, isUndefined, loadDataFrom, loadModelsFrom, modelNames;

  Promise = require('bluebird');

  isUndefined = require('util-ex/lib/is/type/undefined');

  isString = require('util-ex/lib/is/type/string');

  autoupdate = require('./auto-update');

  loadDataFrom = require('./load-data-from');

  modelNames = require('./model-names');

  loadModelsFrom = require('./load-models-from');

  module.exports = function(aApp, aOptions) {
    var aDataFolder, raiseError, vModels;
    aDataFolder = aOptions && aOptions.fixtures;
    if (!aDataFolder) {
      return Promise.reject(new TypeError('Missing data folder'));
    }
    vModels = (aOptions && aOptions.models) || modelNames;
    if (isString(vModels)) {
      vModels = loadModelsFrom(aApp, vModels);
    }
    vModels = vModels.map(function(model) {
      return aApp.models[model];
    });
    raiseError = aOptions != null ? aOptions.raiseError : void 0;
    return vModels = Promise.map(vModels, function(model, index) {
      return loadDataFrom(aApp, model, aDataFolder, raiseError);
    });
  };

}).call(this);

//# sourceMappingURL=auto-load-data.js.map
