/*
Copyright 2012 Colin Angus Mackay and other contributors
http://colinmackay.co.uk/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  
*/

$(function () {
    var clockStartTime = null;
    var clockProgress = 0;
    var clockId = null;
    var maxTime = 1500000; // 25 minutes in ms

    $("#startTimer").click(startTimer);
    $("#pauseTimer").click(pauseTimer);
    $("#stopTimer").click(stopTimer);
    $("#progressBar").progressbar({value:0, max:maxTime});

    function currentTime() {
        var result = new Date().getTime();
        return result;
    }

    function startTimer() {
        if (clockStartTime === null)
            clockStartTime = currentTime();
        else {
            clockStartTime = currentTime() - clockProgress;
        }
        clockId = window.setInterval(updateClock, 5000);
        updateClock();
        $("#startTimer").attr("disabled", "disabled");
        $("#pauseTimer").removeAttr("disabled");
        $("#stopTimer").removeAttr("disabled");
    }

    function pauseTimer() {
        window.clearInterval(clockId);
        clockId = null;

        $("#startTimer").removeAttr("disabled");
        $("#pauseTimer").attr("disabled", "disabled");
        $("#stopTimer").removeAttr("disabled");

        $("#timeRemaining").html("Paused..");
    }

    function stopTimer() {
        window.clearInterval(clockId);
        clockId = null;
        clockStartTime = null;

        $("#startTimer").removeAttr("disabled");
        $("#pauseTimer").attr("disabled", "disabled");
        $("#stopTimer").attr("disabled", "disabled");

        $("#timeRemaining").html("Stopped");
    }

    function updateClock() {
        clockProgress = currentTime() - clockStartTime;
        $("#progressBar").progressbar("value", clockProgress);
        var remainingTime = Math.round((maxTime - clockProgress) / 1000);
        if (remainingTime <= 90) {
            remainingTime = Math.round(remainingTime / 5) * 5;
            $("#timeRemaining").html("About " + remainingTime + " seconds");
        } else {
            remainingTime = Math.round(remainingTime / 60);
            $("#timeRemaining").html("About " + remainingTime + " minutes");
        }

        if (clockProgress > maxTime) {
            document.getElementById("timesUpAudio").play();
            stopTimer();
            $("#timeRemaining").html("Finished");
        }
    }
});