// file: src/parser/bmp.js

/**
 * @file Windows Bitmap Parser.
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 */

/**
 * Windows Bitmap Parser.
 */
class BmpParser {
  /**
   * Parse bitmap.
   * @param {DataViewExt} dataView Raw file bytes.
   * @returns {BmpParserResult}
   */
  parse(dataView) {
    dataView.littleEndian();

    /**
     * Not a bitmap file.
     */
    if (this.valid(dataView) === false) {
      return false;
    }

    let result = new BmpParserResult();
    let offset = 0;

    /**
     * Parse file header.
     */
    for (let field of BmpStructure.FileHeader) {
      result.FileHeader[field.name] = dataView.read(offset, field.type);
      offset += field.size;
    }

    /**
     * Parse info header.
     */
    for (let field of BmpStructure.InfoHeader) {
      result.InfoHeader[field.name] = dataView.read(offset, field.type);
      offset += field.size;
    }

    return result;
  }

  /**
   * Check for the magic 'BM' that indicates a valid BMP file.
   * @param {DataView} dataView Raw file bytes.
   * @returns {boolean}
   */
  valid(dataView) {
    console.log(dataView.read(0, 'Uint16'));
    return dataView.read(0, 'Uint16') === 0x4D42;
  }
}

/**
 * Result from the BmpParser.
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
    console.log(`File Header:`);

    for (let field of Object.keys(this.FileHeader)) {
      console.log(`  ${field} = ${this.FileHeader[field]}`);
    }

    console.log(`\nInfoHeader:`);

    for (let field of Object.keys(this.InfoHeader)) {
      console.log(`  ${field} = ${this.InfoHeader[field]}`);
    }
  }
}
