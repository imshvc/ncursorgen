// file: src/utils/data-types.js

/**
 * @file Data types pertaining to various file formats.
 * @author Nurudin Imsirovic <realnurudinimsirovic@gmail.com>
 */

/**
 * Data types, their names, and size.
 * @readonly
 */
var DataTypes = {
  /**
   * C Types - and some extras.
   */
  char: 1,
  short: 2,
  int: 4,
  long: 4,
  float: 4,
  double: 8,

  int8_t: 1,
  int16_t: 2,
  int32_t: 4,
  int64_t: 8,

  uint8_t: 1,
  uint16_t: 2,
  uint32_t: 4,
  uint64_t: 8,
};

/**
 * Data types taken from Windows API.
 * @readonly
 */
DataTypes.Windows = {
  BYTE: 1,
  WORD: 2,
  DWORD: 4,
  LONG: 4,
};

/**
 * TODO: Clean this up ...
 * Data types for X11 Cursor.
 * @readonly
 */
DataTypes.Xcursor = {
  Bool: DataTypes.int,
  UInt: DataTypes.uint32_t,
  Dim: DataTypes.uint32_t,
  Pixel: DataTypes.uint32_t,
  True: 1,
  False: 0,
  CARD32: DataTypes.uint32_t,

  /* Untested */
  Display: DataTypes.uint32_t,
  Cursor: DataTypes.uint32_t,
};
