// file: src/utils/hexdec.js

/**
 * Hexadecimal to decimal
 *
 * @param {string} Hexadecimal string
 * @return {number} v Integer value
 */
function hexdec(v = null) {
  if (v == null)
    return v

  return parseInt(v, 16)
}

/* Example *

console.table({
  '2':   hexdec('2'),
  '21':  hexdec('21'),
  'F':   hexdec('F'),
  'FF':  hexdec('FF'),
  'FFF': hexdec('FFF'),
})

/**/
