function countdown(elementName, minutes, seconds) {
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits(n) {
        return n <= 9 ? '0' + n : n;
    }

    function updateTimer() {
        msLeft = endTime - +new Date();
        if (msLeft < 1000) {
            window.location.replace('../timeout.html');
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = twoDigits(hours) + ':' + twoDigits(mins) + ':' + twoDigits(time.getUTCSeconds());
            setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
        }
    }

    element = document.getElementById(elementName);
    endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();
}

countdown('countdown', 10, 00);
