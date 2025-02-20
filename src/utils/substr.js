// file: src/utils/substr.js

/**
 * Return part of a string
 * @param {string} string 
 * @param {number} offset 
 * @param {number} length Length of the returned string
 * @returns {string}
 */
function substr(string, offset, length = 0) {
  return string.substring(offset, offset + length);
}
