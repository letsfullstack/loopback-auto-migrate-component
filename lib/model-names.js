(function() {
  var appRoot, datasources, isUndefined, models;

  isUndefined = require('util-ex/lib/is/type/undefined');

  appRoot = require('app-root-path');

  models = require(appRoot + '/server/model-config.json');

  datasources = require(appRoot + '/server/datasources.json');

  module.exports = Object.keys(models).filter(function(model) {
    return !(isUndefined(models[model].dataSource) || isUndefined(datasources[models[model].dataSource]));
  });

}).call(this);

//# sourceMappingURL=model-names.js.map
