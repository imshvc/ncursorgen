// file: tests/raw-bytes/test.js

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

  console.log(loadedFiles['32-bit.bmp']);
}, 100);
