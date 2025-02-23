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
   */
  IconDirectory: [
    {
      // Reserved. Must always be 0.
      name: 'Reserved',
      size: 2,
      type: 'Uint16'
    },
    {
      // Specifies image type: 1 for icon (.ICO) image, 2 for cursor (.CUR) image. Other values are invalid.
      name: 'ImageType',
      size: 2,
      type: 'Uint16'
    },
    {
      // Specifies number of images in the file.
      name: 'NumberOfEntries',
      size: 2,
      type: 'Uint16'
    }
  ],

  /**
   * Icon Directory Entry Structure (ICONDIRENTRY).
   */
  IconDirectoryEntry: [
    {
      // Specifies image width in pixels. Can be any number between 0 and 255. Value 0 means image width is 256 pixels.
      name: 'ImageWidth',
      size: 1,
      type: 'Uint8'
    },
    {
      // Specifies image height in pixels. Can be any number between 0 and 255. Value 0 means image height is 256 pixels.
      name: 'ImageHeight',
      size: 1,
      type: 'Uint8'
    },
    {
      // Specifies number of colors in the color palette. Should be 0 if the image does not use a color palette.
      name: 'ColorPalette',
      size: 1,
      type: 'Uint8'
    },
    {
      // Reserved. Should be 0.',
      name: 'Reserved',
      size: 1,
      type: 'Uint8'
    },
    {
      // Specifies the horizontal coordinates of the hotspot in number of pixels from the left.
      name: 'HotspotX',
      size: 2,
      type: 'Int16'
    },
    {
      // Specifies the vertical coordinates of the hotspot in number of pixels from the top.
      name: 'HotspotY',
      size: 2,
      type: 'Int16'
    },
    {
      // Specifies the size of the image data in bytes
      name: 'ImageSizeInBytes',
      size: 4,
      type: 'Uint32'
    },
    {
      // Specifies the offset of BMP or PNG data from the beginning of the ICO/CUR file
      name: 'ImageDataOffset',
      size: 4,
      type: 'Uint32'
    }
  ]
};
