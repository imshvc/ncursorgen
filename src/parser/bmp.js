// file: src/parser/bmp.js

/**
 * @file Windows Bitmap (BMP) Parser
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 */

/**
 * BMP file parser.
 */
class BMPParser {
  /**
   * Bitmap Info Header Structure Size.
   * @public
   * @readonly
   * @type {number}
   */
  BitmapInfoHeaderStructureSize = 40;

  /**
   * Bitmap Info Structure Size.
   * @public
   * @readonly
   * @type {number}
   */
  BitmapInfoStructureSize = 44;

  /**
   * RGB Quad Structure Size.
   * @public
   * @readonly
   * @type {number}
   */
  RGBQuadStructureSize = 4;

  /**
   * Bitmap File Header Structure Size.
   * @public
   * @readonly
   * @type {number}
   */
  BitmapFileHeaderStructureSize = 14;

  /**
   * Bitmap File Header Structure (BITMAPFILEHEADER).
   * @public
   * @readonly
   * @type {array}
   */
  BitmapFileHeaderStructure = [
    {
      description: 'The file type; must be 0x4D42 (the ASCII string "BM").',
      name: 'FileType',
      size: DataTypes.Windows.WORD
    },
    {
      description: 'The size, in bytes, of the bitmap file.',
      name: 'FileSize',
      size: DataTypes.Windows.DWORD
    },
    {
      description: 'Reserved; must be zero.',
      name: 'Reserved1',
      size: DataTypes.Windows.WORD
    },
    {
      description: 'Reserved; must be zero.',
      name: 'Reserved2',
      size: DataTypes.Windows.WORD
    },
    {
      description: 'The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.',
      name: 'BitmapOffset',
      size: DataTypes.Windows.DWORD
    }
  ];

  /**
   * Bitmap Info Header Structure (BITMAPINFOHEADER).
   * @public
   * @readonly
   * @type {array}
   */
  BitmapInfoHeaderStructure = [
    {
      description: 'Specifies the number of bytes required by the structure.',
      name: 'Size',
      size: DataTypes.Windows.DWORD
    },
    {
      description: 'Specifies the width of the bitmap, in pixels.',
      name: 'Width',
      size: DataTypes.Windows.LONG
    },
    {
      description: 'Specifies the height of the bitmap, in pixels.',
      name: 'Height',
      size: DataTypes.Windows.LONG
    },
    {
      description: 'Specifies the number of planes for the target device. This value must be set to 1.',
      name: 'Planes',
      size: DataTypes.Windows.WORD
    },
    {
      description: 'Specifies the number of bits per pixel (bpp).',
      name: 'BitCount',
      size: DataTypes.Windows.WORD
    },
    {
      description: 'For uncompressed RGB formats set to 0.',
      name: 'Compression',
      size: DataTypes.Windows.DWORD
    },
    {
      description: 'Specifies the size, in bytes, of the image. This can be set to 0 for uncompressed RGB bitmaps.',
      name: 'SizeImage',
      size: DataTypes.Windows.DWORD
    },
    {
      description: 'Specifies the horizontal resolution, in pixels per meter, of the target device for the bitmap.',
      name: 'XPelsPerMeter',
      size: DataTypes.Windows.LONG
    },
    {
      description: 'Specifies the vertical resolution, in pixels per meter, of the target device for the bitmap.',
      name: 'YPelsPerMeter',
      size: DataTypes.Windows.LONG
    },
    {
      description: 'Specifies the number of color indices in the color table that are actually used by the bitmap.',
      name: 'ClrUsed',
      size: DataTypes.Windows.DWORD
    },
    {
      description: 'Specifies the number of color indices that are considered important for displaying the bitmap. If this value is zero, all colors are important.',
      name: 'ClrImportant',
      size: DataTypes.Windows.DWORD
    }
  ];

  /**
   * Bitmap Info Structure (BITMAPINFO).
   * @public
   * @readonly
   * @type {array}
   */
  BitmapInfoStructure = [
    {
      description: 'Bitmap Info Header Structure',
      name: 'BitmapInfoHeader',
      size: this.BitmapInfoHeaderStructureSize
    },
    {
      description: '',
      name: '',
      size: DataTypes.Windows.DWORD
    }
  ];

  /**
   * RGB Quad Structure (RGBQUAD).
   * @public
   * @readonly
   * @type {array}
   */
  RGBQuadStructure = [
    {
      description: 'Blue color channel.',
      name: 'Blue',
      size: DataTypes.Windows.BYTE
    },
    {
      description: 'Green color channel.',
      name: 'Green',
      size: DataTypes.Windows.BYTE
    },
    {
      description: 'Red color channel.',
      name: 'Red',
      size: DataTypes.Windows.BYTE
    },
    {
      description: 'Reserved color channel.',
      name: 'Reserved',
      size: DataTypes.Windows.BYTE
    }
  ];

  /**
   * Returns true if the image type is valid.
   * @returns {boolean}
   */
  valid(bytes) {
    return bytes.length >= 2 && substr(bytes, 0, 2).toUpperCase() === 'BM';
  }

  /**
   * Parse bitmap from bytes.
   * @param {string} bytes Raw file bytes.
   * @returns {BMPParserResult}
   */
  parse(bytes) {
    /**
     * Not a bitmap file.
     */
    if (this.valid(bytes) === false) {
      return false;
    }

    let result = new BMPParserResult();
    let offset = 0;

    /**
     * Process: Bitmap File Header Structure.
     */
    for (let field of this.BitmapFileHeaderStructure) {
      let data = substr(bytes, offset, field.size);
      result.FileHeader[field.name] = hexdec(hexreverse(bin2hex(data)));
      offset += field.size;
    }

    /**
     * Process: Bitmap Info Header Structure.
     */
    for (let field of this.BitmapInfoHeaderStructure) {
      let data = substr(bytes, offset, field.size);
      result.InfoHeader[field.name] = hexdec(hexreverse(bin2hex(data)));
      offset += field.size;
    }

    return result;
  }
}

/**
 * Result from the BMP parser.
 */
class BMPParserResult {
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
