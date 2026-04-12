
// Problem Description – Atomic Multi-File Write (Transactional Write)
//
// You are given multiple files to write as part of one operation.
// Your task is to implement transactionalWrite(filesData).
//
// All file writes should be started in parallel.
// If any write fails, rollback by deleting any files that were successfully written.
// The promise should resolve only if all files are written successfully.
// If rollback occurs, the promise should reject with the original error.
async function transactionalWrite(filesData) { }

module.exports = transactionalWrite;
