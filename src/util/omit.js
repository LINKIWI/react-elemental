/**
 * Omit entries from an object with certain keys.
 *
 * @param {Object} obj Input object.
 * @param {Array} paths Array of strings denoting keys in the input object to remove.
 * @return {Object} New object instance with the requested keys removed.
 */
const omit = (obj, paths = []) => Object.entries(obj)
  .filter(([key]) => !paths.includes(key))
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

export default omit;
