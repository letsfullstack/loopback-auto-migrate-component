(function() {
  var Promise, debug, isArray, isFunction, isString, loopback, path;

  Promise = require("bluebird");

  isFunction = require('util-ex/lib/is/type/function');

  isArray = require('util-ex/lib/is/type/array');

  isString = require('util-ex/lib/is/type/string');

  debug = require('debug')('loopback:component:autoMigrate:loadData');

  loopback = require('loopback');

  path = require('path');

  module.exports = function(Model, data, raiseError, done) {
    var reject, vFile;
    reject = function(err) {
      return Promise.reject(err).asCallback(done);
    };
    vFile = data.$cfgPath ? path.basename(data.$cfgPath) : 'DATA';
    if (!isArray(data)) {
      return reject(new TypeError('%s: The data should be an array.', vFile));
    }
    if (isString(Model)) {
      Model = loopback.getModel(Model);
    }
    if (!Model) {
      return reject(new TypeError('%s: Missing Model', vFile));
    }
    return Promise.map(data, function(item) {
      return Model.create(item).then(function(result) {
        var delayed, k, v, vRelation;
        if (result) {
          delayed = [];
          for (k in item) {
            v = item[k];
            vRelation = result[k];
            if (isFunction(vRelation) && isFunction(vRelation.create) && isArray(v)) {
              (function(aRelation, aData) {
                return delayed.push(Promise.map(aData, function(data) {
                  return aRelation.create(data)["catch"](function(err) {
                    if (raiseError) {
                      throw err;
                    }
                    return debug('(IGNORE) Relation %s(%s) %O', Model.modelName, k, err);
                  });
                }));
              })(vRelation, v);
            }
          }
          if (delayed.length) {
            result = Promise.all(delayed);
          }
        }
        return result;
      })["catch"](function(err) {
        if (raiseError) {
          throw err;
        }
        return debug('(IGNORE) %s %O', Model.modelName, err);
      });
    }).each(function(result, index) {
      debug('%s: %O', Model.modelName, result);
      return result;
    }).then(function(results) {
      debug(Model.modelName + ': total ' + results.length + ' data created.');
      return results;
    })["catch"](function(err) {
      err.name = vFile + ':' + err.name;
      throw err;
    }).asCallback(done);
  };

}).call(this);

//# sourceMappingURL=load-data.js.map
