export const durations = {
  alpha: '120ms',
  beta: '170ms',
  gamma: '220ms',
  epsilon: '270ms',
};

/**
 * Factory function for generating a transition style with predefined a easing function.
 *
 * @param {String} property Name of the CSS property to which a transition should be applied.
 * @param {String} duration Duration constant or CSS expression describing the desired transition
 *                          duration.
 * @returns {Object} Style object with a transition property.
 */
export const transitionStyle = (property = 'all', duration = 'beta') => ({
  transition: [
    property,
    durations[duration] || duration,
    'cubic-bezier(0, .75, .34, 1)',
  ].join(' '),
});
