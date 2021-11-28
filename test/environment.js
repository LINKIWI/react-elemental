const JSDOMEnvironment = require('jest-environment-jsdom');

/**
 * Use a customized test environment that exposes JSDOM as a global, so that the underlying DOM
 * can be modified and reconfigured at runtime in tests.
 */
class CustomTestEnvironment extends JSDOMEnvironment {
  constructor(config) {
    super(config);

    this.global.jsdom = this.dom;
  }

  teardown() {
    this.global.jsdom = null;

    return super.teardown();
  }
}

module.exports = CustomTestEnvironment;
