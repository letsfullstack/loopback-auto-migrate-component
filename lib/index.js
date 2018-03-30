(function() {
  'use strict';
  var debug;

  debug = require('debug')('loopback:component:autoMigrate:main');

  module.exports = function(app, options) {
    var autoMigrate, autoMigrateDone, loopback, loopbackMajor, migration, raiseError;
    debug('initializing component');
    loopback = app.loopback;
    loopbackMajor = loopback && loopback.version && loopback.version.split('.')[0] || 1;
    if (loopbackMajor < 2) {
      throw new Error('loopback-component-auto-migrate requires loopback 2.0 or newer');
    }
    if (!options || options.enabled !== false) {
      migration = (options && options.migration) || 'auto-update';
      autoMigrate = require('./' + migration);
      raiseError = options && options.migration;
      app.set('loopback-component-auto-migrate-status', 'loaded');
      autoMigrateDone = autoMigrate(app, options).asCallback(function(err) {
        if (err) {
          app.set('loopback-component-auto-migrate-error', err);
          app.set('loopback-component-auto-migrate-status', 'failed');
          debug(migration + ' failed: %O', err);
          if (raiseError) {
            throw err;
          }
        } else {
          return app.set('loopback-component-auto-migrate-status', 'done');
        }
      });
      app.set('loopback-component-auto-migrate-done', autoMigrateDone);
      return autoMigrateDone;
    } else {
      return debug('component not enabled');
    }
  };

}).call(this);

//# sourceMappingURL=index.js.map
