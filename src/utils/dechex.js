// src/utils/dechex.js

/**
 * Decimal to hexadecimal
 *
 * @param {number} v Integer value
 * @return {string} Hexadecimal string
 */
function dechex(v = null) {
  if (v == null)
    return v

  return Number(v).toString(16)
}

/* Example *

console.table({
  '2':    hexdec('2'),
  '33':   hexdec('33'),
  '15':   hexdec('15'),
  '255':  hexdec('255'),
  '4095': hexdec('4095')
})

/**/
