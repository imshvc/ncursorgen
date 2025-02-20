// file: src/utils/hex2bin.js

/**
 * Convert hexadecimal data into binary representation.
 *
 * @param {string} bin Binary data (string, mixed, etc)
 * @return {string} Hexadecimal String
 */
function hex2bin(hex = null) {
  if (hex == null)
    return null

  // We are reading/returning lower-case by default
  hex = hex.toLowerCase()
  var hexl = hex.length

  // Input length must be even
  if (hexl % 2) {
    throw new Exception('Hexadecimal input string length must be even')
  }

  var output = ''

  for (let i = 0; i < hexl; i += 2) {
    // Input must be hexadecimal
    var ord = Number(hex.charCodeAt(i))

    if (!(ord > 47 && ord < 58 || ord > 96 && ord < 103)) {
      throw new Exception('Input string must be hexadecimal')
    }
    
    // Everything is fine, continue ...
    output += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }

  return output
}

/* Example *

var text_a = '4142434445464748'
var text_b = hex2bin(text_a)

console.table({
  text_a: text_a,
  text_b: text_b
})

/**/
