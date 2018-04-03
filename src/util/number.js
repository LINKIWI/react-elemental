/**
 * Some cleverness is required to make Javascript's modulo operator return a nonnegative number for
 * modulo operations on negative integers.
 *
 * @param {number} num Number for which a modulo operation should be performed.
 * @param {number} modulus Modulus integer.
 */
export const modulo = (num, modulus) => ((num % modulus) + modulus) % modulus;

export default undefined;
