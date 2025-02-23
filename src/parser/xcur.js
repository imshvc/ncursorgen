// file: src/parser/xcur.js

/**
 * @file X11 Cursor Parser.
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 */

/**
 * X11 Cursor Parser.
 */
class XcurParser {
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

    let result = new XcurParserResult();
    let offset = 0;

    /**
     * Parse file header.
     */
    for (let field of XcurStructure.FileHeader) {
      let data = substr(bytes, offset, field.size);
      result.FileHeader[field.name] = data;
      offset += field.size;
    }

    // result.FileHeader.Magic = substr(bytes, offset, XcurStructure.FileHeader[0].size);
    // offset += XcurStructure.FileHeader[0].size;

    // result.FileHeader.HeaderByteLength = byteToInt(substr(bytes, offset, XcurStructure.FileHeader[1].size));
    // offset += XcurStructure.FileHeader[1].size;

    // result.FileHeader.FileVersion = byteToInt(substr(bytes, offset, XcurStructure.FileHeader[2].size));
    // offset += XcurStructure.FileHeader[2].size;

    // result.FileHeader.NumberOfTocEntries = byteToInt(substr(bytes, offset, XcurStructure.FileHeader[3].size));
    // offset += XcurStructure.FileHeader[3].size;

    // result.FileHeader.TableOfContents = substr(bytes, offset, XcurStructure.FileHeader[4].size * result.FileHeader.NumberOfTocEntries);
    // offset += XcurStructure.FileHeader[4].size * result.FileHeader.NumberOfTocEntries;

    // result.FileHeader.FileVersion = result.FileHeader.FileVersion;
    // result.FileHeader.HeaderByteLength = result.FileHeader.HeaderByteLength;
    // result.FileHeader.NumberOfTocEntries = result.FileHeader.NumberOfTocEntries;

    /**
     * Parse table of contents.
     */
    // result.FileHeader.TableOfContentsParsed = [];
    // let tocOffset = 0;

    // for (let tocIndex = 0; tocIndex < result.FileHeader.NumberOfTocEntries; tocIndex++) {
    //   let tableOfContents = {};

    //   for (let field of XcurStructure.FileTableOfContents) {
    //     let data = substr(result.FileHeader.TableOfContents, tocOffset, field.size);
    //     tableOfContents[field.name] = data;
    //     tocOffset += field.size;
    //   }

    //   result.FileHeader.TableOfContentsParsed.push(tableOfContents);
    // }

    return result;
  }

  /**
   * Check for the magic numberthat indicates a valid X11 Cursor file.
   * @returns {boolean}
   */
  valid(bytes) {
    return bytes.length >= 4 && substr(bytes, 0, 4) === XcurStructure.Magic;
  }
}

/**
 * Result from the XcurParser.
 */
class XcurParserResult {
  FileHeader = {};
  // InfoHeader = {};
  // ColorTable = {};
  // ImageData = {};

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

    // console.log(`\nInfoHeader:`);

    // for (let field of Object.keys(this.InfoHeader)) {
    //   console.log(`  ${field} = ${this.InfoHeader[field]}`);
    // }
  }
}
