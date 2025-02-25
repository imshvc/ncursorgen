// file: tests/bmp-parser/test.js

let bmpParser = new BmpParser();

// loadFile('1-bit.bmp', '../../samples/bmp/2-bit.bmp');
// loadFile('16-bit.bmp', '../../samples/bmp/16-bit.bmp');
loadFile('24-bit.bmp', '../../samples/bmp/24-bit.bmp');
loadFile('32-bit.bmp', '../../samples/bmp/32-bit.bmp');

let parsedBmp24 = null;
let parsedBmp32 = null;

/** Parse 24-bit BMP  */
function parseBmp24() {
  parsedBmp24 = bmpParser.parse(loadedFiles['24-bit.bmp']);

  console.log('\n-- parsedBmp24 --');
  console.log(parsedBmp24);
}

/** Parse 32-bit BMP  */
function parseBmp32() {
  parsedBmp32 = bmpParser.parse(loadedFiles['32-bit.bmp']);

  console.log('\n-- parsedBmp32 --');
  console.log(parsedBmp32);
}

let executeTest = setInterval(() => {
  if (xhrConnections != 0) {
    return;
  }

  clearInterval(executeTest);

  // test code
  parseBmp24();
  // parseBmp32();
}, 100);
