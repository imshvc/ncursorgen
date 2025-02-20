// file: src/test.js

let cursors = {};
let curParser = new CURParser();
let textDecoder = new TextDecoder();
let xhrConnections = 0;
let parsedCursors = {};

/**
 * Load cursor as raw bytes.
 * @param {string} name Cursor name
 * @param {string} path Cursor path
 */
function loadCursor(name, path) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', path, true);
  xhr.responseType = 'arraybuffer';
  
  xhr.onload = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cursors[name] = textDecoder.decode(xhr.response);
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

// loadCursor('animated-cursor-32x32-12-frames.ani', '../samples/animated-cursor-32x32-12-frames.ani');
loadCursor('static-cursor-32x32-3-frames.cur', '../samples/static-cursor-32x32-3-frames.cur');
// loadCursor('static-cursor-32x32.cur', '../samples/static-cursor-32x32.cur');

/**
 * Execute tasks when no XHR connections are left.
 */
let executeTasks = setInterval(function() {
  if (xhrConnections !== 0) {
    return;
  }

  clearInterval(executeTasks);

  parsedCursors['static-cursor-32x32-3-frames.cur'] = curParser.fromBytes(cursors['static-cursor-32x32-3-frames.cur']);
  window.result = parsedCursors['static-cursor-32x32-3-frames.cur'];
  console.log(result);
}, 33);
