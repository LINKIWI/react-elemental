/**
 * Utility to compose, from left-to-right, a variable-argument list of functions into a single
 * function.
 *
 * @param {...Function} funcs Variable argument list of functions to compose.
 * @returns {Function} Single function that applies the result of the last function to that of the
 *                     previous function, recursively for all passed functions.
 */
const compose = (...funcs) => {
  if (funcs.length === 0) {
    return (func) => func;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

export default compose;
