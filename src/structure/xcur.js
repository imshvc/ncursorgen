/**
 * @file X11 Cursor Structures.
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 */

/**
 * X11 Cursor Structures.
 */
var XcurStructure = {
  /**
   * File signature or the magic number.
   * Least significat byte first.
   */
  Magic: 'Xcur',

  /**
   * File signature as a number.
   */
  MagicNumber: 0x72756358,

  /**
   * This version number is stored in cursor files.
   *
   * Changes to the file format require updating this
   * version number.
   *
   * Source: https://gitlab.freedesktop.org/xorg/lib/libxcursor/-/blob/master/include/X11/Xcursor/Xcursor.h.in?ref_type=heads#L85-93
   */
  FileVersion: 65535,

  /**
   * File "Table of contents" size.
   */
  FileTableOfContentsSize: 12,

  /**
   * File header length (when writing to a file).
   */
  FileHeaderLength: 16,

  /**
   * File header size (the structure we define).
   */
  FileHeaderSize: 40,

  /**
   * Chunk header size.
   */
  ChunkHeaderSize: 16,

  /**
   * File "Table of contents" Structure (XcursorFileToc).
   */
  FileTableOfContents: [
    {
      // Chunk type.
      name: 'Type',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Subtype (size for images).
      name: 'SubType',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Absolute position in file.
      name: 'Position',
      size: DataTypes.Xcursor.UInt
    }
  ],

  /**
   * File Header Structure (XcursorFileHeader).
   */
  FileHeader: [
    {
      // Magic number.
      name: 'Magic',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Byte length of header.
      name: 'HeaderByteLength',
      size: DataTypes.Xcursor.UInt
    },
    {
      // File version number.
      name: 'FileVersion',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Number of "Table of contents" entries.
      name: 'NumberOfTocEntries',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Table of contents.
      name: 'TableOfContents',
      size: 12 // FileTableOfContentsSize
    }
  ],

  /**
   * Chunk Header Structure (XcursorChunkHeader).
   */
  ChunkHeader: [
    {
      // Bytes in chunk header.
      name: 'Header',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Chunk type.
      name: 'Type',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Chunk subtype (size for images).
      name: 'SubType',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Version of this type.
      name: 'Version',
      size: DataTypes.Xcursor.UInt
    }
  ],

  CommentType: 0xfffe0001,
  CommentVersion: 1,

  /**
   * ChunkHeaderSize + 4
   */
  CommentHeaderSize: 20,

  /**
   * Comment types.
   */
  CommentCopyright: 1,
  CommentLicense: 2,
  CommentOther: 3,

  CommentMaxLength: 0x100000,

  /**
   * Comment Structure (XcursorComment).
   */
  Comment: [
    {
      // Version number.
      name: 'Version',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Comment type.
      name: 'CommentType',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Comment data.
      name: 'Comment',
      size: DataTypes.char
    },
  ],

  ImageType: 0xfffd0002,
  ImageVersion: 1,

  /**
   * ChunkHeaderSize + (5 * 4)
   */
  ImageHeaderSize: 36,

  /**
   * 32767x32767 max cursor size.
   */
  ImageMaxSize: 0x7fff,

  /**
   * Image Structure (XcursorImage).
   */
  Image: [
    {
      // Version of the image data.
      name: 'Version',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Nominal size for matching.
      name: 'Size',
      size: DataTypes.Xcursor.Dim
    },
    {
      // Actual width.
      name: 'Width',
      size: DataTypes.Xcursor.Dim
    },
    {
      // Actual height.
      name: 'Height',
      size: DataTypes.Xcursor.Dim
    },
    {
      // Hot spot x (must be inside image).
      name: 'HotspotX',
      size: DataTypes.Xcursor.Dim
    },
    {
      // Hot spot y (must be inside image).
      name: 'HotspotY',
      size: DataTypes.Xcursor.Dim
    },
    {
      // Animation delay to next frame (ms).
      name: 'Delay',
      size: DataTypes.Xcursor.UInt
    },
    {
      // Pointer to pixels.
      name: 'Pixels',
      size: DataTypes.Xcursor.Pixel
    }
  ],

  /**
   * Images Structure (XcursorImages).
   */
  Images: [
    {
      // Number of images.
      name: 'NumberOfImages',
      size: DataTypes.int
    },
    {
      // Array of XcursorImage pointers.
      name: 'Images',
      size: 32 // sizeof(XcursorImage)
    },
    {
      // Name used to load images.
      name: 'Name',
      size: DataTypes.Xcursor.char
    }
  ],

  /**
   * Cursors Structure (XcursorCursors).
   */
  Cursors: [
    {
      // Dispaly holding cursors.
      name: 'Display',
      size: DataTypes.Xcursor.Display
    },
    {
      // Reference count.
      name: 'ReferenceCount',
      size: DataTypes.int
    },
    {
      // Number of cursors.
      name: 'NumberOfCursors',
      size: DataTypes.int
    },
    {
      // Array of cursors.
      name: 'Cursors',
      size: DataTypes.Xcursor.Cursor
    },
  ]
};
