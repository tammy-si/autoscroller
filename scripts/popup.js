document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.sync.get(['scrollSpeed', 'scrollTime'], function(result) {
        document.getElementById('scrollSpeed').value = result.scrollSpeed ? result.scrollSpeed : 10;
        document.getElementById('scrollTime').value = result.scrollTime ? result.scrollTime : 50;
    })
});

document.getElementById("updateButton").addEventListener("click", function(){
    const scrollSpeed = document.getElementById("scrollSpeed").value;
    const scrollTime = document.getElementById("scrollTime").value;

    // save info
    chrome.storage.sync.set({
        scrollSpeed: scrollSpeed,
        scrollTime: scrollTime
    });

    // send a message to the content scripts to update the variables
    chrome.tabs.query({}, function(tabs) {
        var message = {newscrollSpeed: scrollSpeed, newScrollTime: scrollTime};
        for (var i=0; i<tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, message);
        }
    });
})
