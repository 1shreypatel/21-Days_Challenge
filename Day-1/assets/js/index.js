let realTime = () => {
    let data = new Date();

    let hour = data.getHours();
    let min = data.getMinutes();
    let sec = data.getSeconds();

    if (hour < 10) {
        hour = "0" + hour;
    } else {
        hour = hour;
    }
    
    if (min < 10) {
        min = "0" + min;
    } else {
        min = min;
    }
    
    if (sec < 10) {
        sec = "0" + sec;
    } else {
        sec = sec;
    }

    const time = `${hour}:${min}:${sec}`;

    document.getElementById("demo").textContent = time;
}

setInterval(realTime, 1000);
realTime(); 