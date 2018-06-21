
function getTime(timeMin) {
    let time = timeMin.slice(0, -3);
    return time;
}

function getMin(timeMin) {
    let min = timeMin.slice(3, timeMin.length);
    return min;
}

export function nextTime(start) {

    let time    = getTime(start);
    let min     = getMin(start);
    let nextTime = parseInt(time);

    if(min === '30') {
        min = '00';
        nextTime++;
    }
    else {
        min = '30';
    }
    return nextTime+':'+min;
} 