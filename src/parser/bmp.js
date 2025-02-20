// file: src/parser/bmp.js

/**
 * @file Windows Bitmap Parser.
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 */

/**
 * Windows Bitmap Parser
 */
class BmpParser {
  /**
   * Parse bitmap from bytes.
   * @param {string} bytes Raw file bytes.
   * @returns {BmpParserResult}
   */
  parse(bytes) {
    /**
     * Not a bitmap file.
     */
    if (this.valid(bytes) === false) {
      return false;
    }

    let result = new BmpParserResult();
    let offset = 0;

    /**
     * Parse file header.
     */
    for (let field of BmpStructure.FileHeader) {
      let data = substr(bytes, offset, field.size);
      result.FileHeader[field.name] = hexdec(hexreverse(bin2hex(data)));
      offset += field.size;
    }

    /**
     * Parse info header.
     */
    for (let field of BmpStructure.InfoHeader) {
      let data = substr(bytes, offset, field.size);
      result.InfoHeader[field.name] = hexdec(hexreverse(bin2hex(data)));
      offset += field.size;
    }

    return result;
  }

  /**
   * Check for the magic 'BM' that indicates a valid BMP file.
   * @returns {boolean}
   */
  valid(bytes) {
    return bytes.length >= 2 && substr(bytes, 0, 2).toUpperCase() === 'BM';
  }
}

/**
 * Result from the BMP parser.
 */
class BmpParserResult {
  FileHeader = {};
  InfoHeader = {};
  ColorTable = {};
  ImageData = {};

  /**
   * Returns JSON stringified result.
   * @returns {string} JSON
   */
  json() {
    return JSON.stringify(this);
  }

  /**
   * Log structure information to developer console.
   */
  log() {
    console.log(`Fields:`);

    for (let field of Object.keys(this.Fields)) {
      console.log(`  ${field} = ${this.Fields[field]}`);
    }

    console.log(`\nEntries:`);

    for (let entryIndex = 0; entryIndex < this.Fields.NumberOfEntries; entryIndex++) {
      console.log(`  Entry ${entryIndex}:`);

      let entry = this.Entries[entryIndex];

      for (let field of Object.keys(entry)) {
        console.log(`    ${field} = ${entry[field]}`);
      }
    }
  }
}
