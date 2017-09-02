/**
 * Clip a number to be between a minimum and maximum value.
 *
 * @param {number} min Lower acceptable bound for clipping.
 * @param {number} max Higher acceptable bound for clipping.
 * @returns {Function} Unary function that can be applied to a number to clip its value.
 */
export const clip = (min, max) => (val) => Math.min(max, Math.max(min, val));

export default undefined;
