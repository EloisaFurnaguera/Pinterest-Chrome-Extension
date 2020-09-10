
chrome.browserAction.onClicked.addListener(function (tab) { 
    chrome.tabs.query({active: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"cmd": "read_file"});
    });
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if(request.cmd == "read_file") {
        // console.log("jobId: ", request.jobId);
        $.ajax({
            url: chrome.extension.getURL("popup.html"),

            dataType: "html",
            success: sendResponse
           
        });
       return true;
    }
})



