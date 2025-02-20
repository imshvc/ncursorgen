// file: src/structure/bmp.js

/**
 * @file Windows Bitmap Structures.
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 */

/**
 * Windows Bitmap Structures.
 */
var BmpStructure = {
  /**
   * Bitmap Info Header Structure Size.
   * @public
   * @readonly
   * @type {number}
   */
  InfoHeaderSize: 40,

  /**
   * Bitmap Info Structure Size.
   * @public
   * @readonly
   * @type {number}
   */
  InfoSize: 44,

  /**
   * RGB Quad Structure Size.
   * @public
   * @readonly
   * @type {number}
   */
  RGBQuadSize: 4,

  /**
   * Bitmap File Header Structure Size.
   * @public
   * @readonly
   * @type {number}
   */
  FileHeaderSize: 14,

  /**
   * Bitmap File Header Structure (BITMAPFILEHEADER).
   * @public
   * @readonly
   * @type {array}
   */
  FileHeader: [
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
  ],

  /**
   * Bitmap Info Header Structure (BITMAPINFOHEADER).
   * @public
   * @readonly
   * @type {array}
   */
  InfoHeader: [
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
  ],

  /**
   * Bitmap Info Structure (BITMAPINFO).
   * @public
   * @readonly
   * @type {array}
   */
  Info: [
    {
      description: 'Bitmap Info Header Structure',
      name: 'BitmapInfoHeader',
      size: this.InfoHeaderSize
    },
    {
      description: '',
      name: '',
      size: DataTypes.Windows.DWORD
    }
  ],

  /**
   * RGB Quad Structure (RGBQUAD).
   * @public
   * @readonly
   * @type {array}
   */
  RGBQuad: [
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
  ]
};
