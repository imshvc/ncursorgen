// file: src/utils/hexreverse.js

/**
 * Reverse bytes in a hexadecimal string
 * @param {string} str Hexadecimal string
 * @returns Reversed hexadecimal string
 */
function hexreverse(str) {
  return str.match(/.{1,2}/g).reverse().join('');
}
