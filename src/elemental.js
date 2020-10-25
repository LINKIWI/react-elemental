/* eslint-disable no-underscore-dangle */

import PropTypes from 'prop-types';
import { Component } from 'react';
import bootstrap from 'bootstrap';

/**
 * Component that declaratively wraps logic for idempotently bootstrapping the library. Client code
 * can be contained within the children of this component at the highest level of the application.
 */
export default class Elemental extends Component {
  static propTypes = {
    fontOpts: PropTypes.shape({
      primary: PropTypes.shape({
        regular: PropTypes.string,
        bold: PropTypes.string,
      }),
      secondary: PropTypes.shape({
        regular: PropTypes.string,
        bold: PropTypes.string,
      }),
    }),
    colorOpts: PropTypes.shape({
      primary: PropTypes.string,
      primaryLight: PropTypes.string,
      primaryDark: PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    fontOpts: {},
    colorOpts: {},
  };

  componentDidMount() {
    const { fontOpts, colorOpts } = this.props;

    // Idempotent bootstrapping by caching initialization state in a global key
    if (!window.__REACT_ELEMENTAL_BOOTSTRAPPED__) {
      bootstrap(fontOpts, colorOpts);

      window.__REACT_ELEMENTAL_BOOTSTRAPPED__ = true;
    }
  }

  render() {
    return this.props.children;
  }
}
