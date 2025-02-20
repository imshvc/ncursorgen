// file: src/test.js

let samples = {};
let curParser = new CURParser();
let bmpParser = new BMPParser();
let textDecoder = new TextDecoder();
let xhrConnections = 0;

/**
 * Load sample file as raw bytes.
 * @param {string} name Cursor name
 * @param {string} path Cursor path
 */
function loadSample(name, path) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', path, true);
  xhr.responseType = 'arraybuffer';
  
  xhr.onload = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        samples[name] = textDecoder.decode(xhr.response);
        --xhrConnections;
      }
    }
  };

  xhr.onerror = function(e) {
    console.log(`XHR Error: ${e.message}`);
    --xhrConnections;
  }

  xhr.send();
  ++xhrConnections;
}

// loadCursor('static-cursor-32x32.cur', '../samples/static-cursor-32x32.cur');
// loadCursor('animated-cursor-32x32-12-frames.ani', '../samples/animated-cursor-32x32-12-frames.ani');

loadSample('static-cursor-32x32-3-frames.cur', '../samples/cur/static-cursor-32x32-3-frames.cur');
loadSample('1-bit.bmp', '../samples/bmp/1-bit.bmp');
loadSample('16-bit.bmp', '../samples/bmp/16-bit.bmp');
loadSample('24-bit.bmp', '../samples/bmp/24-bit.bmp');
loadSample('32-bit.bmp', '../samples/bmp/32-bit.bmp');
loadSample('256-colors.bmp', '../samples/bmp/256-colors.bmp');

/**
 * Execute tasks when no XHR connections are left.
 */
let executeTasks = setInterval(function() {
  if (xhrConnections !== 0) {
    return;
  }

  clearInterval(executeTasks);

  window.staticCursor32 = curParser.parse(samples['static-cursor-32x32-3-frames.cur']);

  console.log('\n-- staticCursor32 --');
  console.log(staticCursor32);

  // window.bmp1 = bmpParser.parse(samples['1-bit.bmp']);
  // window.bmp16 = bmpParser.parse(samples['16-bit.bmp']);
  window.bmp24 = bmpParser.parse(samples['24-bit.bmp']);
  window.bmp32 = bmpParser.parse(samples['32-bit.bmp']);
  // window.bmp256 = bmpParser.parse(samples['256-colors.bmp']);

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
}, 33);
