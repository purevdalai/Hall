
function getTime(timeMin) {
    let time = timeMin.slice(0, 2);
    return time;
}

function getMin(timeMin) {
    let min = timeMin.slice(3, timeMin.length);
    return min;
}

export function beforeTime(start) {
    let time    = getTime(start);
    let min     = getMin(start);
    let bfTime  = parseInt(time);


    if(min === '30') {
        min = '00';
    }
    else {
        min = '30';
        bfTime--;
    }
    if(bfTime < 10) {
        bfTime = '0' + bfTime;
    }
    return bfTime+':'+min;
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
    if(nextTime < 10) {
        nextTime = '0' + nextTime;
    }
    return nextTime+':'+min;
} 