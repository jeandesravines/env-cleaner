/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

/**
 * Class used to clean require.cache and process.env
 * @class EnvCleaner
 */
class EnvCleaner {
  /**
   * Clean require.cache
   * @static
   */
  static clean() {
    Object.keys(process.env).forEach((key) => {
      if (EnvCleaner.keys.includes(key) === false) {
        Reflect.deleteProperty(process.env, key);
      }
    });

    EnvCleaner.registered.forEach((key) => {
      Reflect.deleteProperty(require.cache, key);
    });
  }

  /**
   * Register a module
   * @param {string} name The modules to register
   * @static
   */
  static register(name) {
    const resolved = require.resolve(name);

    if (EnvCleaner.registered.includes(resolved) === false) {
      EnvCleaner.registered.push(resolved);
    }
  }
}

/**
 * process.env's keys at the initialization
 * @type {Array.<string>}
 * @readonly
 */
EnvCleaner.keys = Object.keys(process.env);

/**
 * Local registered modules
 * @type {Array.<string>}
 * @readonly
 */
EnvCleaner.registered = [];


module.exports = EnvCleaner;
