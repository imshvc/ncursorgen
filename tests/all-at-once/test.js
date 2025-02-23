// file: tests/all-at-once/test.js

let curParser = new CurParser();
let bmpParser = new BmpParser();
let aniParser = new AniParser();
let xcurParser = new XcurParser();

loadFile('static-cursor-32x32-3-frames.cur', '../../samples/cur/static-cursor-32x32-3-frames.cur');
loadFile('1-bit.bmp', '../../samples/bmp/1-bit.bmp');
loadFile('16-bit.bmp', '../../samples/bmp/16-bit.bmp');
loadFile('24-bit.bmp', '../../samples/bmp/24-bit.bmp');
loadFile('32-bit.bmp', '../../samples/bmp/32-bit.bmp');
loadFile('256-colors.bmp', '../../samples/bmp/256-colors.bmp');
loadFile('stripe-test-24-bit.bmp', '../../samples/bmp/stripe-test-24-bit.bmp');
loadFile('stripe-test-32-bit.bmp', '../../samples/bmp/stripe-test-32-bit.bmp');
loadFile('xcur-hand', '../../samples/xcur/hand');
loadFile('xcur-pointer', '../../samples/xcur/pointer');

/**
 * Execute tasks when no XHR connections are left.
 */
let executeTasks = setInterval(function() {
  if (xhrConnections !== 0) {
    return;
  }

  clearInterval(executeTasks);

  window.staticCursor32 = curParser.parse(loadedFiles['static-cursor-32x32-3-frames.cur']);

  console.log('\n-- staticCursor32 --');
  console.log(staticCursor32);

  // window.bmp1 = bmpParser.parse(loadedFiles['1-bit.bmp']);
  // window.bmp16 = bmpParser.parse(loadedFiles['16-bit.bmp']);
  window.bmp24 = bmpParser.parse(loadedFiles['24-bit.bmp']);
  window.bmp32 = bmpParser.parse(loadedFiles['32-bit.bmp']);
  // window.bmp256 = bmpParser.parse(loadedFiles['256-colors.bmp']);

  window.xcurHand = xcurParser.parse(loadedFiles['xcur-hand']);
  window.xcurPtr = xcurParser.parse(loadedFiles['xcur-pointer']);

  window.x = loadedFiles['xcur-pointer'];

  // FIXME: bad results - require a separate parser method.
  /*console.log('-- bmp1 --');
  console.log(bmp1);*/

  // TODO: Verification and validation
  /*console.log('\n-- bmp16 --');
  console.log(bmp16);*/

  console.log('\n-- bmp24 --');
  console.log(bmp24);

  console.log('\n-- bmp32 --');
  console.log(bmp32);

  // TODO: Verification and validation
  /*console.log('\n-- bmp256 --');
  console.log(bmp256);*/

  console.log('\n-- xcurHand --');
  console.log(xcurHand);

  console.log('\n-- xcurPtr --');
  console.log(xcurPtr);
}, 33);
