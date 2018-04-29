let d = new Date();
let startMS = d.getMilliseconds();
let delayedTime = startMS + 1000000000;
while (startMS < delayedTime) {
    startMS++;
}

console.log('completed blocker');