(function() {
  var cson, loadConfig, yaml;

  loadConfig = require('load-config-file');

  yaml = require('js-yaml');

  cson = require('cson');

  loadConfig.register(['.yaml', '.yml'], yaml.safeLoad);

  loadConfig.register('.cson', cson.parseCSONString.bind(cson));

  loadConfig.register('.json', JSON.parse);

}).call(this);

//# sourceMappingURL=register-config-file-format.js.map
