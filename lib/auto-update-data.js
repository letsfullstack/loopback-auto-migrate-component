(function() {
  var Promise, autoupdate, loadDataFrom, modelNames;

  Promise = require('bluebird');

  autoupdate = require('./auto-update');

  loadDataFrom = require('./load-data-from');

  modelNames = require('./model-names');

  module.exports = function(aApp, aOptions) {
    var aDataFolder, raiseError, result;
    aDataFolder = aOptions && aOptions.fixtures;
    result = autoupdate(aApp, aOptions);
    raiseError = aOptions != null ? aOptions.raiseError : void 0;
    if (aDataFolder) {
      result = result.then(function(models) {
        var vModelNames;
        vModelNames = (aOptions != null ? aOptions.models : void 0) || modelNames;
        models = Promise.map(vModelNames, function(model, index) {
          return loadDataFrom(aApp, model, aDataFolder, raiseError);
        });
        return models;
      });
    }
    return result;
  };

}).call(this);

//# sourceMappingURL=auto-update-data.js.map
