(function() {
  var Promise, debug, inflection, isArray, isFunction, isString, loadConfig, loadData, path;

  require('./register-config-file-format');

  Promise = require("bluebird");

  inflection = require('inflection');

  path = require('path');

  isFunction = require('util-ex/lib/is/type/function');

  isArray = require('util-ex/lib/is/type/array');

  isString = require('util-ex/lib/is/type/string');

  debug = require('debug')('loopback:component:autoMigrate:loadDataFrom');

  loadData = require('./load-data');

  loadConfig = require('load-config-file');

  loadConfig = loadConfig.load;

  module.exports = function(app, Model, folder, raiseError, done) {
    var vName;
    if (isString(Model)) {
      Model = app.models[Model];
    }
    if (!Model) {
      return Promise.reject(new TypeError('Missing Model')).asCallback(done);
    }
    vName = './' + inflection.transform(Model.modelName, ['underscore', 'dasherize']);
    return loadConfig(path.resolve(folder, vName)).then(function(data) {
      if (data) {
        data = loadData(Model, data, raiseError);
      }
      return data;
    }).asCallback(done);
  };

}).call(this);

//# sourceMappingURL=load-data-from.js.map
