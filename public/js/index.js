var queueTask = {};
var browserApiTask = {};
var stackTask = {};
var stackCounter = 0;

appendChildrenToStack(0, 'main');

delayExecution().then((message) => {
    first();
    removeItem('stackbody', 'main', 7000)
});
setTimeout(() => {
    afterFiveSeconds();
}, 5000);

setTimeout(() => {
    afterSixSeconds();
}, 6000);

appendChildrenToBrowserAPI('afterFiveSeconds');
appendChildrenToBrowserAPI('afterSixSeconds');


function first() {
    delayExecution().then((message) => {
        appendChildrenToStack(1000, 'first');
        second();
        removeItem('stackbody', 'first', 6000)
    });
}

function second() {
    delayExecution().then((message) => {
        appendChildrenToStack(2000, 'second');
        third();
        removeItem('stackbody', 'second', 5000)
    });
}

function third() {
    delayExecution().then((message) => {
        appendChildrenToStack(3000, 'third');
        removeItem('stackbody', 'third', 4000)
    });
}

function afterFiveSeconds() {
    removeItem('eventSectionBody', 'afterFiveSeconds', 0);
    appendChildrenToQueue('afterFiveSeconds');
    delayExecution().then((message) => {
        removeItem('queuebody', 'afterFiveSeconds', 2000);
        addTaskIfStackEmpty(3000, 'afterFiveSeconds');
    });
}
function afterSixSeconds() {
    removeItem('eventSectionBody', 'afterSixSeconds', 0);
    appendChildrenToQueue('afterSixSeconds');
    delayExecution().then((message) => {
        removeItem('queuebody', 'afterSixSeconds', 2000);
        addTaskIfStackEmpty(5000, 'afterSixSeconds');
    });
}

function addTaskIfStackEmpty(time, taskName) {
    appendChildrenToStack(time, taskName);
    removeItem('stackbody', taskName, time + 1000)
}

function removeItem(parentId, elementId, time) {
    setTimeout(() => {
        $('#' + parentId).children('#' + elementId).remove();
    }, time);
}

function delayExecution() {
    return new Promise((resolve, reject) => {
        let d = new Date();
        let startMS = d.getMilliseconds();
        let delayedTime = startMS + 10000;
        while (startMS < delayedTime) {
            startMS++;
        }
        resolve('completed');
    });
}

function appendChildrenToStack(time, functionName) {
    let element = '<p id=' + functionName + '>' + functionName + '</p>';
    stackCounter++;
    setTimeout(() => {
        $('#stackbody').append(element);
    }, time);
}

function appendChildrenToQueue(functionName) {
    let element = '<div id=' + functionName + '>' + functionName + '</div>';
    setTimeout(() => {
        $('#queuebody').append(element);
    }, 0);
}

function appendChildrenToBrowserAPI(functionName) {
    let element = '<p id=' + functionName + '>' + functionName + '</p>';
    setTimeout(() => {
        $('#eventSectionBody').append(element);
    }, 1000);
}









