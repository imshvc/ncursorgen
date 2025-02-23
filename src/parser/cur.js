// file: src/parser/cur.js

/**
 * @file Windows Static Cursor Parser.
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 */

/**
 * Windows Static Cursor Parser.
 */
class CurParser {
  /**
   * Parse cursor.
   * @param {DataViewExt} dataView Raw file bytes.
   * @returns {CurParserResult}
   */
  parse(dataView) {
    dataView.littleEndian();

    let result = new CurParserResult();
    let offset = 0;

    /**
     * Process: Icon Directory Structure.
     */
    for (let field of CurStructure.IconDirectory) {
      result.Fields[field.name] = dataView.read(offset, field.type);
      offset += field.size;
    }

    /**
     * Process: Icon Directory Entry Structures.
     */
    for (let entryIndex = 0; entryIndex < result.Fields.NumberOfEntries; entryIndex++) {
      result.Entries[entryIndex] = {};

      for (let field of CurStructure.IconDirectoryEntry) {
        result.Entries[entryIndex][field.name] = dataView.read(offset, field.type);
        offset += field.size;
      }
    }

    return result;
  }
}

/**
 * Result from the CurParser.
 */
class CurParserResult {
  Entries = [];
  Fields = {};

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

  /**
   * Returns true if the image type is cursor (number 2).
   * @returns {boolean}
   */
  valid() {
    return this.Fields.ImageType === 2;
  }
}
