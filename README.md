# Gpio

[![Build Status](https://travis-ci.org/jeandesravines/env-cleaner.svg)](https://travis-ci.org/jeandesravines/env-cleaner)
[![Coverage Status](https://coveralls.io/repos/github/jeandesravines/env-cleaner/badge.svg?branch=master)](https://coveralls.io/github/jeandesravines/env-cleaner?branch=master)

Environment cleaner for Node.js and Mocha.  
Can be used to clean `process.env` and `require.cache` between each tests.


## Table of contents

* [Setup](#setup)
* [Usage](#usage)
* [API](#api)
  * [Methods](#methods) 
* [Example](#example)
 

## Setup

This module can then be installed with npm:
```shell
npm install @jdes/env-cleaner
```


## Usage

Import module:

```javascript
/**
 * @class {EnvCleaner}
 */
const EnvCleaner = require('@jdes/env-cleaner');
```


## API

### Methods

#### EnvCleaner.register(name: string): undefined

* `name`: Module's name or path

Register a module to clean.

Example:

```javascript
const EnvCleaner = require('@jdes/env-cleaner');

EnvCleaner.register(require.resolve('../modules/module-one'));
EnvCleaner.register(require.resolve('../modules/module-two'));
```

#### EnvCleaner.clean(): undefined

Clean `process.env` and `require.cache`.

Example:

```javascript
const EnvCleaner = require('@jdes/env-cleaner');

EnvCleaner.clean();
```


## Example

This example comes from the `index.js` file of the `@jdes/gpio` module tests.  
It cleans the cache before and after each Mocha test

```javascript
// /test/index.js

const {before, beforeEach, afterEach} = require('mocha');
const EnvCleaner = require('@jdes/env-cleaner');

/* ********************************** */

before('Register modules to clean', () => {
  // Register the configuration file by default because it depends on process.env
  // wich can be override in any test
  EnvCleaner.register(require.resolve('../lib/configuration/configuration'));
});

beforeEach('Clean require.cache', EnvCleaner.clean);
afterEach('Clean require.cache', EnvCleaner.clean);
```
