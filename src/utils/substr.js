// file: src/utils/substr.js

/**
 * Return part of a string
 * @param {string} string 
 * @param {number} offset 
 * @param {number} length Length of the returned string
 * @returns {string}
 */
function substr(string, offset, length = -1) {
  // handle case: length not specified
  if (0 > length) {
    length = string.length;
  }

  // handle case: out of bounds offset
  if (offset > string.length) {
    return '';
  }

  length += offset;

  // mitigate against overflow
  if (length > string.length) {
    length = string.length;
  }

  let buffer = '';

  for (let i = offset; i < length; i++) {
    buffer += string[i];
  }

  return buffer;
}
