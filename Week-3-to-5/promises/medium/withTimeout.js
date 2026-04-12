// Problem Description – withTimeout(promise, ms)

// You are required to create a wrapper function named withTimeout that takes a Promise and a time limit in milliseconds. 
// The function should return a new Promise that settles with the same result as the original Promise if it completes within the given time. 
// If the Promise does not settle within the time limit, it should reject with the message "Timeout".
function withTimeout(promise, ms) {}

module.exports = withTimeout;

