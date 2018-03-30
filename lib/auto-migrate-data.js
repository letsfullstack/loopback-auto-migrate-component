(function() {
  var Promise, automigrate, loadDataFrom;

  Promise = require('bluebird');

  automigrate = require('./auto-migrate');

  loadDataFrom = require('./load-data-from');

  module.exports = function(aApp, aOptions) {
    var aDataFolder, raiseError, result;
    result = automigrate(aApp, aOptions);
    aDataFolder = aOptions && aOptions.fixtures;
    raiseError = aOptions != null ? aOptions.raiseError : void 0;
    if (aDataFolder) {
      result = result.then(function(models) {
        if (aDataFolder) {
          models = Promise.map(models, function(model, index) {
            return loadDataFrom(aApp, model, aDataFolder, raiseError);
          });
        }
        return models;
      });
    }
    return result;
  };

}).call(this);

//# sourceMappingURL=auto-migrate-data.js.map
