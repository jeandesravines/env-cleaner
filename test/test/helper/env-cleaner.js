/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {before, beforeEach, afterEach, describe, it} = require('mocha');
const {expect} = require('chai');
const EnvCleaner = require('../../../lib/helper/env-cleaner');

describe('EnvCleaner', () => {
  const modules = [
    require.resolve('../../lib/mock/module-one'),
    require.resolve('../../lib/mock/module-two'),
  ];

  let registered;

  before('Save EnvCleaner.registered', () => {
    registered = EnvCleaner.registered.slice(0);
  });

  beforeEach('Register and load modules', () => {
    modules.forEach((module) => {
      EnvCleaner.register(module);
      require(module);
    });
    
    expect(EnvCleaner.registered).to.be.deep.equal(modules);
  });

  afterEach('Reset EnvCleaner.registered', () => {
    EnvCleaner.registered.forEach((key) => {
      if (registered.keys.hasOwnProperty(key) === false) {
        Reflect.deleteProperty(EnvCleaner.registered, key);
      }
    });
  });

  /* ************************************************* */

  describe('Register', () => {
    it('should only register new modules', () => {
      EnvCleaner.register(modules[0]);

      expect(EnvCleaner.registered).to.be.deep.equal(modules);
    });
  });

  describe('Clean', () => {
    it('should clean process.env', () => {
      const key = 'FLIPPI_CLEANER_TEST';

      process.env[key] = 'Test';
      EnvCleaner.clean();

      expect(process.env[key]).to.be.equal(undefined);
    });

    it('should clean require.cache', () => {
      EnvCleaner.clean();

      registered.forEach((module) => {
        expect(require.cache[module]).to.be.equal(undefined);
      });
    });
  });
});
