// -- parse embedded file data --

// -- data is served in hexadecimal --

// let cursorData = embeddedFiles['static-cursor-32x32.cur'];
let cursorData = embeddedFiles['static-cursor-32x32-3-frames.cur'];
let curParser = new CURParser();
let curParserResult = curParser.fromHex(cursorData);
