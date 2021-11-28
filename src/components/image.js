import Color from 'color';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, withForwardedRef, withToggleState } from '@linkiwi/hoc';
import Text from 'components/text';
import { transitionStyle } from 'styles/transition';
import omit from 'util/omit';

// Image is not mounted.
export const LOAD_STATE_IDLE = 'idle';
// Image is currently being fetched/loaded; network request is in progress.
export const LOAD_STATE_FETCH = 'fetch';
// Image has successfully completely loaded.
export const LOAD_STATE_DONE = 'done';
// An error was encountered while loading the image.
export const LOAD_STATE_ERROR = 'error';

/**
 * Wrapper for external images.
 */
class Image extends Component {
  static propTypes = {
    // For accessibility: image label or description text
    alt: PropTypes.string.isRequired,
    // Image placeholder background color, displayed before the image is fetched
    color: PropTypes.string,
    // Width of the image, as a CSS dimension
    width: PropTypes.string,
    // Height of the image, as a CSS dimension
    height: PropTypes.string,
    // True to lazily fetch the image (only start loading when it becomes visible in the viewport)
    lazy: PropTypes.bool,
    // True to display the image while it is in the intermediate fetching stage. If false, the image
    // is only fully rendered after it has completely finished loading.
    showIntermediate: PropTypes.bool,
    // Optional style overrides on the container element
    style: PropTypes.object,
    // Optional style overrides on the image element
    imgStyle: PropTypes.object,
    // HOC-supplied props
    isHover: PropTypes.bool.isRequired,
    handleMouseEnter: PropTypes.func.isRequired,
    handleMouseLeave: PropTypes.func.isRequired,
    forwardedRef: PropTypes.oneOfType([
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    color: 'rgb(250, 250, 250)',
    height: 'auto',
    width: 'auto',
    lazy: false,
    showIntermediate: false,
    style: {},
    imgStyle: {},
    forwardedRef: null,
  };

  constructor(props) {
    super(props);

    // If the load is lazy, wait until the image is visible in the viewport before attempting to
    // fetch and load the image. Otherwise, start fetching immediately.
    this.state = {
      load: props.lazy ? LOAD_STATE_IDLE : LOAD_STATE_FETCH,
    };
  }

  componentWillUnmount() {
    if (this.observer && this.img) {
      this.observer.unobserve(this.img);
    }
  }

  setRef = (img) => {
    if (this.img) {
      return;
    }

    this.img = img;

    // Intersection events (idle -> fetch state transitions) are only relevant for lazily loaded
    // images.
    if (!this.props.lazy) {
      return;
    }

    if (window.IntersectionObserver) {
      this.observer = new IntersectionObserver(this.handleIntersection);
      this.observer.observe(img);
    } else {
      // If the browser is unable to natively check for intersection events, always fire a "pretend"
      // positive intersection event immediately. This effectively replicates the behavior of
      // non-lazily loaded images.
      this.handleIntersection([{ isIntersecting: true }]);
    }
  };

  handleImageError = () => this.setState({ load: LOAD_STATE_ERROR });

  handleImageLoad = () => this.setState({ load: LOAD_STATE_DONE });

  handleIntersection = ([{ isIntersecting }]) => {
    const { load } = this.state;

    // Only respond to the intersection event if it brings the image from an idle state to a
    // non-idle state.
    if (isIntersecting && load === LOAD_STATE_IDLE) {
      this.setState({ load: LOAD_STATE_FETCH });
    }
  };

  render() {
    const {
      alt,
      color,
      width,
      height,
      showIntermediate,
      isHover,
      handleMouseEnter,
      handleMouseLeave,
      style: containerOverrides,
      imgStyle: imgOverrides,
      forwardedRef,
      ...props
    } = this.props;
    const { load } = this.state;

    const proxyProps = omit(props, ['lazy']);

    // Allow mounting (e.g. fetch) of the image as long as the image is not in an idle state.
    const isImageMounted = load !== LOAD_STATE_IDLE;
    // Used for styling of an in-progress (fetching) image.
    const isImageLoaded = load === LOAD_STATE_DONE;
    // The alt text is always displayed if there was an error loading the image.
    const isImageErr = load === LOAD_STATE_ERROR;
    // Dynamically determine the alt text color depending on the lightness of the background color.
    const { color: hsl } = new Color(color).hsl();
    const altTextColor = hsl[2] > 50 ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';

    const containerStyle = {
      backgroundColor: color,
      height,
      overflow: 'hidden',
      position: 'relative',
      width,
      ...transitionStyle('background-color', 'epsilon'),
      ...containerOverrides,
    };

    const annotationStyle = {
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      height: '100%',
      left: 0,
      justifyContent: 'center',
      opacity: (isHover || isImageErr) ? 1 : 0,
      padding: '10%',
      position: 'absolute',
      top: 0,
      width: '100%',
      ...transitionStyle('opacity'),
    };

    const imgStyle = {
      color: 'transparent',
      display: 'block',
      filter: `blur(${isImageLoaded ? 0 : 3}px)`,
      height,
      opacity: (showIntermediate ? isImageMounted : isImageLoaded) ? 1 : 0,
      transition: [
        transitionStyle('filter', 'epsilon').transition,
        transitionStyle('opacity', 'epsilon').transition,
      ].join(', '),
      width,
      ...imgOverrides,
    };

    return (
      <div
        ref={this.setRef}
        style={containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!isImageLoaded && (
          <div style={annotationStyle}>
            <Text color={altTextColor} size="lambda" bold>
              {alt}
            </Text>
          </div>
        )}

        {isImageMounted && (
          <img
            ref={forwardedRef}
            alt={alt}
            style={imgStyle}
            onError={this.handleImageError}
            onLoad={this.handleImageLoad}
            {...proxyProps}
          />
        )}
      </div>
    );
  }
}

export default compose(
  withForwardedRef,
  withToggleState({
    key: 'isHover',
    enable: 'handleMouseEnter',
    disable: 'handleMouseLeave',
  }),
)(Image);
