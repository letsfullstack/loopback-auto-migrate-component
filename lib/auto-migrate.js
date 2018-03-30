(function() {
  var Promise, appRoot, debug, isFunction, isUndefined, modelNames, models, path;

  Promise = require('bluebird');

  path = require('path');

  isFunction = require('util-ex/lib/is/type/function');

  isUndefined = require('util-ex/lib/is/type/undefined');

  debug = require('debug')('loopback:component:autoMigrate:autoMigrate');

  appRoot = require('app-root-path');

  models = require(appRoot + '/server/model-config.json');

  modelNames = require('./model-names');

  module.exports = function(app, options) {
    var vModelNames, vModels;
    vModels = [];
    vModelNames = (options && options.models) || modelNames;
    return Promise.map(vModelNames, function(model) {
      var ds, result;
      ds = app.dataSources[models[model].dataSource];
      ds.setMaxListeners(0);
      if (ds.connected) {
        return result = ds.automigrate(model);
      } else {
        return new Promise(function(resolve, reject) {
          return ds.once('connected', function() {
            return resolve(ds.automigrate(model));
          });
        });
      }
    }).each(function(item, index) {
      if (!item) {
        item = vModelNames[index];
      }
      debug('Model ' + item + ' automigrated');
      return vModels.push(app.models[item]);
    }).then(function(results) {
      debug('total ' + results.length + ' models migrated.');
      return vModels;
    });
  };

}).call(this);

//# sourceMappingURL=auto-migrate.js.map
