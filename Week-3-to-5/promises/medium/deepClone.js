
// Problem Description – Deep Clone with Circular References
//
// You are required to implement deepClone(obj).
//
// Standard JSON cloning fails for circular references and complex objects.
// Your clone must correctly handle circular dependencies (e.g. obj.self = obj).
//
// Requirements:
// 1. Deeply clone objects and arrays
// 2. Preserve nested structures
// 3. Detect and handle circular references using a WeakMap
//
function deepClone(value, map = new WeakMap()) { }

module.exports = deepClone;
