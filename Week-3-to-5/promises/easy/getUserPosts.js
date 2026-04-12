// Problem Description – Rewrite Async/Await Using Promise Chaining

// You are given an asynchronous function written using async and await. 
// Your task is to rewrite the same logic using only .then() and .catch() syntax, without changing its behavior.

// async function getUserPosts(userId) {
//   try {
//     const user = await fetchUser(userId);
//     return await fetchPosts(user.id);
//   } catch (e) {
//     console.error(e);
//   }
// }

// module.exports = getUserPosts;

function getUserPosts(userId) {}

module.exports = getUserPosts;
