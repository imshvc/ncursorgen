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
   */
  InfoHeaderSize: 40,

  /**
   * Bitmap Info Structure Size.
   */
  InfoSize: 44,

  /**
   * RGB Quad Structure Size.
   */
  RGBQuadSize: 4,

  /**
   * Bitmap File Header Structure Size.
   */
  FileHeaderSize: 14,

  /**
   * Bitmap File Header Structure (BITMAPFILEHEADER).
   */
  FileHeader: [
    {
      // The file type; must be 0x4D42 (the ASCII string "BM").
      name: 'FileType',
      size: 2,
      read: function(dataView, offset) {
        return dataView.getInt16(offset, true);
      }
    },
    {
      // The size, in bytes, of the bitmap file.
      name: 'FileSize',
      size: 4,
      read: function(dataView, offset) {
        return dataView.getUint32(offset, true);
      }
    },
    {
      // Reserved; must be zero.
      name: 'Reserved1',
      size: 2,
      read: function(dataView, offset) {
        return dataView.getUint16(offset, true);
      }
    },
    {
      // Reserved; must be zero.
      name: 'Reserved2',
      size: 2,
      read: function(dataView, offset) {
        return dataView.getUint16(offset, true);
      }
    },
    {
      // The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
      name: 'BitmapOffset',
      size: 4,
      read: function(dataView, offset) {
        return dataView.getInt32(offset, true);
      }
    }
  ],

  /**
   * Bitmap Info Header Structure (BITMAPINFOHEADER).
   */
  InfoHeader: [
    {
      // Specifies the number of bytes required by the structure.
      name: 'Size',
      size: 4,
      read: function(dataView, offset) {
        return dataView.getUint32(offset, true);
      }
    },
    {
      // Specifies the width of the bitmap, in pixels.
      name: 'Width',
      size: 4,
      read: function(dataView, offset) {
        return dataView.getUint32(offset, true);
      }
    },
    {
      // Specifies the height of the bitmap, in pixels.
      name: 'Height',
      size: 4,
      read: function(dataView, offset) {
        return dataView.getUint32(offset, true);
      }
    },
    {
      // Specifies the number of planes for the target device. This value must be set to 1.
      name: 'Planes',
      size: 2,
      read: function(dataView, offset) {
        return dataView.getUint16(offset, true);
      }
    },
    {
      // Specifies the number of bits per pixel (bpp).
      name: 'BitCount',
      size: 2,
      read: function(dataView, offset) {
        return dataView.getUint16(offset, true);
      }
    },
    {
      // For uncompressed RGB formats set to 0.
      name: 'Compression',
      size: 4,
      read: function(dataView, offset) {
        return dataView.getUint32(offset, true);
      }
    },
    {
      // Specifies the size, in bytes, of the image. This can be set to 0 for uncompressed RGB bitmaps.
      name: 'SizeImage',
      size: 4,
      read: function(dataView, offset) {
        return dataView.getUint32(offset, true);
      }
    },
    {
      // Specifies the horizontal resolution, in pixels per meter, of the target device for the bitmap.
      name: 'XPelsPerMeter',
      size: 4,
      read: function(dataView, offset) {
        return dataView.getUint32(offset, true);
      }
    },
    {
      // Specifies the vertical resolution, in pixels per meter, of the target device for the bitmap.
      name: 'YPelsPerMeter',
      size: 4,
      read: function(dataView, offset) {
        return dataView.getUint32(offset, true);
      }
    },
    {
      // Specifies the number of color indices in the color table that are actually used by the bitmap.
      name: 'ClrUsed',
      size: 4,
      read: function(dataView, offset) {
        return dataView.getUint32(offset, true);
      }
    },
    {
      // Specifies the number of color indices that are considered important for displaying the bitmap. If this value is zero, all colors are important.
      name: 'ClrImportant',
      size: 4,
      read: function(dataView, offset) {
        return dataView.getUint32(offset, true);
      }
    }
  ],

  /**
   * Bitmap Info Structure (BITMAPINFO).
   */
  // Info: [
  //   {
  //     // Bitmap Info Header Structure
  //     name: 'BitmapInfoHeader',
  //     size: this.InfoHeaderSize
  //   },
  //   {
  //     description: '',
  //     name: '',
  //     size: DataTypes.Windows.DWORD
  //   }
  // ],

  /**
   * RGB Quad Structure (RGBQUAD).
   */
  RGBQuad: [
    {
      // Blue color channel.
      name: 'Blue',
      size: 1,
      type: 'Uint8'
    },
    {
      // Green color channel.
      name: 'Green',
      size: 1,
      type: 'Uint8'
    },
    {
      // Red color channel.
      name: 'Red',
      size: 1,
      type: 'Uint8'
    },
    {
      // Reserved color channel.
      name: 'Reserved',
      size: 1,
      type: 'Uint8'
    }
  ]
};
