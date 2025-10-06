const fs = require("fs");
const crypto = require("crypto");

console.log("1. Start of the event loop example");

setTimeout(() => {
  console.log("2. Timeout callback 0s executed (Microtask)");
}, 0);

setTimeout(() => {
  console.log("3. Another timeout callback 0s  executed (Microtask)");
}, 0);

setImmediate(() => {
  console.log("4. Immediate callback executed (Check!)");
});

Promise.resolve().then(() => {
    console.log("5. Promise resolved (Microtask)");
});

process.nextTick(() => {
  console.log("6. process.nextTick callback executed (Microtask)");
});

fs.readFile(__filename, () => {
  console.log("7. File read completed (I/O callback)");

  setTimeout(() => {
    console.log("8. Timeout inside I/O callback executed (Microtask)");
  }, 0);

  setImmediate(() => {
    console.log("9. Immediate inside I/O callback executed");
  });
});

crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  console.log("10. pbkdf2 completed (I/O callback). This is a CPU-intensive task.");
});

console.log("11. End of the event loop example");

/*
Expected Output Order:
1. Start of the event loop example
11. End of the event loop example
6. process.nextTick callback executed (Microtask)
5. Promise resolved (Microtask)
2. Timeout callback 0s executed (Microtask)
3. Another timeout callback 0s  executed (Microtask)
4. Immediate callback executed (Check!)
7. File read completed (I/O callback)
8. Timeout inside I/O callback executed (Microtask)
9. Immediate inside I/O callback executed
10. pbkdf2 completed (I/O callback). This is a CPU-intensive task.
*/
// Note: The exact order of the last few logs may vary slightly due to the asynchronous nature of I/O operations and CPU-intensive tasks.
// Explanation:
// 1. Synchronous code runs first.
// 2. process.nextTick() callbacks run before other microtasks.
// 3. Promise callbacks run next.
// 4. setTimeout() with 0ms delay runs after microtasks.
// 5. setImmediate() runs in the check phase of the event loop.
// 6. I/O callbacks (like fs.readFile) run in the poll phase.
// 7. Any timers set within I/O callbacks are queued for the next iteration of the event loop.  