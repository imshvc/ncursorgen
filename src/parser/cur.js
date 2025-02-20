// file: src/parser/cur.js

/**
 * @file Windows Static Cursor Parser
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 */

/**
 * CUR file parser.
 */
class CURParser {
  /**
   * Icon Directory Structure (ICONDIR).
   * @public
   * @readonly
   * @type {array}
   */
  IconDirectoryStructure = [
    {
      description: 'Reserved. Must always be 0.',
      name: 'Reserved',
      size: DataTypes.Windows.WORD
    },
    {
      description: 'Specifies image type: 1 for icon (.ICO) image, 2 for cursor (.CUR) image. Other values are invalid.',
      name: 'ImageType',
      size: DataTypes.Windows.WORD
    },
    {
      description: 'Specifies number of images in the file.',
      name: 'NumberOfEntries',
      size: DataTypes.Windows.WORD
    }
  ];

  /**
   * Icon Directory Entry Structure (ICONDIRENTRY).
   * @public
   * @readonly
   * @type {array}
   */
  IconDirectoryEntryStructure = [
    {
      description: 'Specifies image width in pixels. Can be any number between 0 and 255. Value 0 means image width is 256 pixels.',
      name: 'ImageWidth',
      size: DataTypes.Windows.BYTE
    },
    {
      description: 'Specifies image height in pixels. Can be any number between 0 and 255. Value 0 means image height is 256 pixels.',
      name: 'ImageHeight',
      size: DataTypes.Windows.BYTE
    },
    {
      description: 'Specifies number of colors in the color palette. Should be 0 if the image does not use a color palette.',
      name: 'ColorPalette',
      size: DataTypes.Windows.BYTE
    },
    {
      description: 'Reserved. Should be 0.',
      name: 'Reserved',
      size: DataTypes.Windows.BYTE
    },
    {
      description: 'Specifies the horizontal coordinates of the hotspot in number of pixels from the left.',
      name: 'HotspotX',
      size: DataTypes.Windows.WORD
    },
    {
      description: 'Specifies the vertical coordinates of the hotspot in number of pixels from the top.',
      name: 'HotspotY',
      size: DataTypes.Windows.WORD
    },
    {
      description: 'Specifies the size of the image data in bytes',
      name: 'ImageSizeInBytes',
      size: DataTypes.Windows.DWORD
    },
    {
      description: 'Specifies the offset of BMP or PNG data from the beginning of the ICO/CUR file',
      name: 'ImageDataOffset',
      size: DataTypes.Windows.DWORD
    }
  ];

  /**
   * Parse cursor from bytes.
   * @param {string} string Raw file bytes.
   * @returns {CURParserResult}
   */
  fromBytes(string) {
    let cursorData = string;
    let cursorResult = new CURParserResult();
    let offset = 0;

    /**
     * Process: Icon Directory Structure.
     */
    for (let field of this.IconDirectoryStructure) {
      let data = substr(cursorData, offset, field.size);
      cursorResult.Fields[field.name] = hexdec(hexreverse(bin2hex(data)));
      offset += field.size;
    }

    /**
     * Process: Icon Directory Entry Structures.
     */
    for (let entryIndex = 0; entryIndex < cursorResult.Fields.NumberOfEntries; entryIndex++) {
      cursorResult.Entries[entryIndex] = {};

      for (let field of this.IconDirectoryEntryStructure) {
        let data = substr(cursorData, offset, field.size);
        cursorResult.Entries[entryIndex][field.name] = hexdec(hexreverse(bin2hex(data)));
        offset += field.size;
      }
    }

    return cursorResult;
  }
}

/**
 * Result from the CUR parser.
 */
class CURParserResult {
  Entries = [];
  Fields = {};

  /**
   * Log structure information to developer console.
   */
  toConsole() {
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
