(function() {
  var debug, fs, inflection, loadConfig, path;

  require('./register-config-file-format');

  fs = require('fs');

  inflection = require('inflection');

  path = require('path');

  debug = require('debug')('loopback:component:autoMigrate:loadModelsFrom');

  loadConfig = require('load-config-file');

  loadConfig = loadConfig.load;

  module.exports = function(app, folder) {
    return JSON.parse(fs.readFileSync(path.resolve(folder), 'utf8'));
  };

}).call(this);

//# sourceMappingURL=load-models-from.js.map
