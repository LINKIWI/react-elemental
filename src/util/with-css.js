import React, { Component } from 'react';
import injectCSS from 'util/inject-css';

// Module-scoped store to statefully track if component CSS has been injected into the document.
// Used to ensure that (uniquely keyed) CSS is only injected into the document once.
const isInjected = {};

/**
 * Higher-order component factory that generates an HOC that wraps injection of global CSS into the
 * document head.
 *
 * @param {string} key Unique key for the CSS. It must be unique; it should not clash with keys for
 *                     the CSS of any other components.
 * @param {Function} css Thunk for a CSS literal to inject into the document head. Note that all
 *                       injected CSS has global scope.
 * @returns {Function} HOC factory that takes a component class or function as a parameter and
 *                     returns an HOC wrapping the specified component.
 */
const withCSS = ({ key, css }) => (WrappedComponent) =>
  class WithCSSHOC extends Component {
    componentWillMount() {
      if (!isInjected[key]) {
        injectCSS(css());
        isInjected[key] = true;
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };

export default withCSS;
