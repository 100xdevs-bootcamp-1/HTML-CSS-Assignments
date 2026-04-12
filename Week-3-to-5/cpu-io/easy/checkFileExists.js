// Problem Description – Check File Exists
//
// Your task is to implement an asynchronous function `checkFileExists(path)`
// that returns `true` if a file exists and `false` otherwise.
//
// Requirements:
// 1. Use the `fs.promises` API.
// 2. Do NOT use `fs.existsSync` (which is synchronous).
// 3. Hint: Use `fs.promises.access()` and handle the error if it doesn't exist.

const fs = require("fs").promises;

async function checkFileExists(path) {}

module.exports = checkFileExists;
