// file: src/parser/cur.js

/**
 * @file Windows Static Cursor Parser
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 */

class CURParser {
  /**
   * Icon Directory Structure (ICONDIR)
   * @public
   * @readonly
   */
  IconDirectoryStructure = [
    {
      description: 'Reserved. Must always be 0.',
      name: 'Reserved',
      size: DataTypes.Windows.WORD,
    },
    {
      description: 'Specifies image type: 1 for icon (.ICO) image, 2 for cursor (.CUR) image. Other values are invalid.',
      name: 'ImageType',
      size: DataTypes.Windows.WORD,
    },
    {
      description: 'Specifies number of images in the file.',
      name: 'NumberOfImages',
      size: DataTypes.Windows.WORD,
    }
  ];

  /**
   * Icon Directory Entry Structure (ICONDIRENTRY)
   * @member
   * @type {array}
   */
  IconDirectoryEntryStructure = [
    {
      description: 'Specifies image width in pixels. Can be any number between 0 and 255. Value 0 means image width is 256 pixels.',
      name: 'ImageWidth',
      size: DataTypes.Windows.BYTE,
    },
    {
      description: 'Specifies image height in pixels. Can be any number between 0 and 255. Value 0 means image height is 256 pixels.',
      name: 'ImageHeight',
      size: DataTypes.Windows.BYTE,
    },
    {
      description: 'Specifies number of colors in the color palette. Should be 0 if the image does not use a color palette.',
      name: 'ColorPalette',
      size: DataTypes.Windows.BYTE,
    },
    {
      description: 'Reserved. Should be 0.',
      name: 'Reserved',
      size: DataTypes.Windows.BYTE,
    },
    {
      description: 'Specifies the horizontal coordinates of the hotspot in number of pixels from the left.',
      name: 'HotspotX',
      size: DataTypes.Windows.WORD,
    },
    {
      description: 'Specifies the vertical coordinates of the hotspot in number of pixels from the top.',
      name: 'HotspotY',
      size: DataTypes.Windows.WORD,
    },
    {
      description: 'Specifies the size of the image data in bytes',
      name: 'ImageSizeInBytes',
      size: DataTypes.Windows.DWORD,
    },
    {
      description: 'Specifies the offset of BMP or PNG data from the beginning of the ICO/CUR file',
      name: 'ImageDataOffset',
      size: DataTypes.Windows.DWORD,
    }
  ];

  /**
   * Parse cursor from a hexadecimal string
   * @param {*} string Hexadecimal string
   * @returns {CURParserResult}
   */
  fromHex(string) {
    let cursorData = string;
    let cursorResult = new CURParserResult();
    let offset = 0;

    /**
     * Process: Icon Directory Structure
     */
    for (let field of this.IconDirectoryStructure) {
      let data = substr(cursorData, offset, field.size * 2);
      cursorResult.Fields[field.name] = hexdec(hexreverse(data));
      offset += field.size * 2;
    }

    let sizeOfEntryStructure = 0;
    for (let field of this.IconDirectoryEntryStructure) {
      sizeOfEntryStructure += field.size;
    }

    /**
     * Process: Icon Directory Entry Structures
     */
    for (let entryIndex = 0; entryIndex < cursorResult.Fields.NumberOfImages; entryIndex++) {
      cursorResult.Entries[entryIndex] = {};

      for (let field of this.IconDirectoryEntryStructure) {
        let data = substr(cursorData, offset, field.size * 2);
        cursorResult.Entries[entryIndex][field.name] = hexdec(hexreverse(data));
        offset += field.size * 2;
      }

      offset += sizeOfEntryStructure * 2;
    }

    return cursorResult;
  }
}

/**
 * Result from the CUR parser.
 */
class CURParserResult {
  // IconDirectoryStructure = []
  // IconDirectoryEntryStructure = []
  SizeInBytes = 0
  Entries = []
  Fields = {}

  /**
   * Log parsed structure information to the DevTools console
   * @r
   */
  toConsole() {
    let offset = 0;

    console.log('\n%cICONDIR Structure', 'font-weight: bold; color: #00F');

    for (let field of this.IconDirectoryStructure) {
      // let data = substr(cursorData, offset, field.size * 2);

      console.log(`  %cField:  %c${field.name}`, 'font-weight: bold', 'color: #048; font-weight: bold');
      console.log(`  %cData:   %c${hexdec(hexreverse(data))}`, 'font-weight: bold', '');
      console.log(`  %cSize:   %c${field.size}`, 'font-weight: bold', '');
      console.log(`  %cOffset: %c${offset > 0 ? offset / 2 : offset}`, 'font-weight: bold', '');
      console.log(`  %cInfo:   %c${field.description}`, 'font-weight: bold', 'font-style: italic');
      console.log('');

      offset += field.size * 2;
    }

    console.log('\n\n%cICONDIRENTRY Structure', 'font-weight: bold; color: #00F');

    for (let field of this.IconDirectoryEntryStructure) {
      // we do *2 because data is in hex
      let data = substr(cursorData, offset, field.size * 2);

      console.log(`  %cField:  %c${field.name}`, 'font-weight: bold', 'color: #048; font-weight: bold');
      console.log(`  %cData:   %c${hexdec(hexreverse(data))}`, 'font-weight: bold', '');
      console.log(`  %cSize:   %c${field.size}`, 'font-weight: bold', '');
      console.log(`  %cOffset: %c${offset > 0 ? offset / 2 : offset}`, 'font-weight: bold', '');
      console.log(`  %cInfo:   %c${field.description}`, 'font-weight: bold', 'font-style: italic');
      console.log('');

      offset += field.size * 2;
    }
  }
}
