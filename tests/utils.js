// file: tests/utils.js

let loadedFiles = {};
let xhrConnections = 0;

/**
 * Load file as raw bytes (ArrayBuffer).
 * @param {string} name
 * @param {string} path
 * @throws if either argument is null.
 */
function loadFile(name = null, path = null) {
  if (name === null) {
    throw new Error(`Argument 'name' is null.`);
  }

  if (path === null) {
    throw new Error(`Argument 'path' is null.`);
  }

  let xhr = new XMLHttpRequest();

  xhr.open('GET', path, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        loadedFiles[name] = xhr.response;
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

/**
 * Get structure size by summing up 'size' fields.
 * Used for debugging.
 * @param {array} structure
 * @returns {number}
 */
function getStructureSize(structure) {
  let sum = 0;

  structure.forEach((k) => {
    sum += k.size ?? 0;
  });

  return sum;
}
