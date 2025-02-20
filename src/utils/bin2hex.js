// file: src/utils/bin2hex.js

/**
 * Convert binary data into hexadecimal representation.
 *
 * @param {string} bin Binary data (string, mixed, etc)
 * @return {string} Hexadecimal String
 */
function bin2hex(bin = null) {
  if (bin == null)
    return null

  // Length of bin, return undefined if 0
  let binl = bin.length

  // Array of chars
  let output = ''

  for (let i = 0; i < binl; i++) {
    // Convert character code at index i to hexadecimal
    let hex = bin.charCodeAt(i).toString(16)

    // The value must be even
    if (2 > hex.length) {
      hex = '0' + hex
    }

    // Append to output
    output += hex
  }

  // Return output
  return output
}

/* Example *

var text_a = 'ABCDEFGH'
var text_b = bin2hex(text_a)

console.table({
  text_a: text_a,
  text_b: text_b
})

/**/
