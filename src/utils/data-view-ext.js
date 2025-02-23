// file: src/utils/data-view-ext.js

/**
 * DataView extended and simplified.
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 * @see {@link https://github.com/imshvc/data-view-ext GitHub}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView DataView - JavaScript | MDN}
 */
class DataViewExt {
  /**
   * Byte offset.
   * @type {number}
   */
  byteOffset = 0;

  /**
   * Byte length.
   * @type {number}
   */
  byteLength = 0;

  /**
   * Set length.
   * @param {number} value null or negative integers do nothing
   * @returns {this}
   */
  setLength(value = null) {
    if (value === null || 0 > value) {
      return;
    }

    this.byteLength = parseInt(value);
    this.resetType();
  }

  /**
   * DataView instance.
   * @type {DataView|null}
   */
  dataView = null;

  /**
   * Default endianess getters and setters will use when no explicit value was given.  
   * 0 - Big-Endian (default)  
   * 1 - Little-Endian
   * @type {number}
   */
  endianess = 0;

  /**
   * Use Little Endian.
   * @returns {this}
   */
  littleEndian() {
    this.endianess = 1;
    return this;
  }

  /**
   * Use Big Endian.
   * @returns {this}
   */
  bigEndian() {
    this.endianess = 0;
    return this;
  }

  /**
   * Get current endianess.
   * @returns {string} little | big
   */
  getEndianess() {
    return this.endianess ? 'little' : 'big';
  }

  /**
   * Active type - required for read() and write().  
   *
   * By default it's value is 'byteLength' which
   * informs the read() operation to use getUint8
   * with byteLength.
   *
   * For explicit types - these are commonly used:
   * - Int8
   * - Int16
   * - Int32
   * - BigInt64
   * - ... and their Uint counterparts.
   *
   * @type {string}
   */
  activeType = 'Uint8';

  /**
   * Set activeType default value.
   * @returns {this}
   */
  resetType() {
    this.activeType = 'Uint8';
    return this;
  }

  /**
   * Read bytes and automatically converts types based on length.
   * @param {number} offset - explicit byte offset.
   * @param {number} length - explicit byte length.
   * @returns {number|Uint8ClampedArray} - DataViewExt is returned when chunk set to true.
   */
  read(offset = null, type = null, endianess = null) {
    if (offset === null || 0 > offset) {
      offset = this.byteOffset;
    }

    if (type === null) {
      type = this.activeType;
    }

    if (endianess === null) {
      endianess = this.endianess;
    }

    switch (type) {
      case "BigInt64": return this.dataView.getBigInt64(offset, endianess);
      case "BigUint64": return this.dataView.getBigUint64(offset, endianess);

      case "Float32": return this.dataView.getFloat32(offset, endianess);
      case "Float64": return this.dataView.getFloat64(offset, endianess);

      case "Int8": return this.dataView.getInt8(offset);
      case "Int16": return this.dataView.getInt16(offset, endianess);
      case "Int32": return this.dataView.getInt32(offset,endianess);

      case "Uint8": return this.dataView.getUint8(offset);
      case "Uint16": return this.dataView.getUint16(offset, endianess);
      case "Uint32": return this.dataView.getUint32(offset, endianess);
    }

    // Unknown type - fallback to Uint8
    // TODO: this should throw an exception
    return this.read(offset, 'Uint8', endianess);
  }

  /**
   * Return byte at offset.
   * @param {*} offset 
   */
  byte(offset) {

  }

  /**
   * Return bytes at offset by length.
   */
  bytes(offset, length) {

  }

  /**
   * Return size of a type from 'Types'.
   * @returns {number|null}
   */
  static sizeOfType(type) {
    return this.Types[type] ?? null;
  }

  /**
   * Data types for extensions.
   */
  static Types = {
    // Standard C
    // char: 1,
    // short: 2,
    // int: 4,
    // long: 4,
    // long64: 8, // not part of the standard
    // float: 4,
    // double: 8,

    // DataView
    BigInt64: 8,
    BigUint64: 8,
  
    Float32: 4,
    Float64: 8,
  
    Int8: 1,
    Int16: 2,
    Int32: 4,
  
    Uint8: 1,
    Uint16: 2,
    Uint32: 4,
  };

  /**
   * @constructor
   * @throws Exception from DataView.
   * @param {ArrayBuffer|SharedArrayBuffer} buffer - Instance of ArrayBuffer or SharedArrayBuffer.
   * @param {number|null} byteOffset - Byte offset or the starting index used by getters with no explicit definition for offset.
   * @param {number|null} byteLength - Byte length or how many bytes to read starting from the byte offset location.
   * @returns {DataViewExt}
   */
  constructor() {
    let args = [];

    // Argument: buffer
    if (arguments.length > 0) {
      args.push(arguments[0]);
    }

    // Argument: byte offset
    if (arguments.length > 1) {
      args.push(arguments[1]);
    }

    // Argument: byte length
    if (arguments.length > 2) {
      args.push(arguments[2]);
    }

    try {
      this.dataView = new DataView(...args);
    }
    catch (ex) {
      throw ex;
    }

    return this;
  }
}
