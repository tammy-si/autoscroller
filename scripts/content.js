let scroll_speed = 10;
let scroll_time = 100;
let scrollMode = false;
let intervalId;

chrome.storage.sync.get(['scrollSpeed','scrollTime'], function(result) {
    scroll_speed = result.scrollSpeed ? result.scrollSpeed : 10;
    scroll_time = result.scrollTime ? result.scrollTime : 50;

    console.log('Scroll amount', scroll_speed);
    console.log('Scroll time:', scroll_time);  
})

document.addEventListener("keydown", (e) => {

    if (e.code == "ControlLeft" && scrollMode == false) {
        scrollMode = true;
        // start the scrolling
        intervalId = setInterval(() => {
            // Task to perform every second
            window.scrollBy({top: scroll_speed, left: 0, behavior: 'smooth'});
        }, scroll_time); 
    } else if (e.code == "ControlLeft" && scrollMode == true) {
        scrollMode = false;
        clearInterval(intervalId);
    }
})

chrome.runtime.onMessage.addListener(
    function(request) {
        scroll_speed = request.newscrollSpeed ? request.newscrollSpeed : 10;
        scroll_time = request.newScrollTime ? request.newScrollTime : 50;
        console.log("New scroll speed: " + scroll_speed);
        console.log("New scroll time: " + scroll_speed);
    }
  );
