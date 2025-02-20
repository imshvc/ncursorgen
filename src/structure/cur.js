// file: src/structure/cur.js

/**
 * @file Windows Static Cursor Structures.
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 */

/**
 * Windows Static Cursor Structures.
 */
var CurStructure = {
  /**
   * Icon Directory Structure (ICONDIR).
   * @public
   * @readonly
   * @type {array}
   */
  IconDirectory: [
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
  ],

  /**
   * Icon Directory Entry Structure (ICONDIRENTRY).
   * @public
   * @readonly
   * @type {array}
   */
  IconDirectoryEntry: [
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
  ]
};
