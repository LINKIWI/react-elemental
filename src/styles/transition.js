export const durations = {
  alpha: '80ms',
  beta: '120ms',
  gamma: '170ms',
  epsilon: '220ms',
  iota: '270ms',
};

export const timing = {
  default: 'cubic-bezier(0, .75, .35, 1)',
  ease: 'cubic-bezier(.75, 0, .35, 1)',
};

/**
 * Factory function for generating a transition style with predefined a timing function.
 *
 * @param {String} property Name of the CSS property to which a transition should be applied.
 * @param {String} duration Duration constant or CSS expression describing the desired transition
 *                          duration.
 * @param {String} timingFunc Timing function alias or CSS expression literal to use.
 * @returns {Object} Style object with a transition property.
 */
export const transitionStyle = (
  property = 'all',
  duration = 'gamma',
  timingFunc = 'default',
) => ({
  transition: [
    property,
    durations[duration] || duration,
    timing[timingFunc] || timingFunc,
  ].join(' '),
});
