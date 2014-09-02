chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var port = chrome.runtime.connectNative('codenow');
    port.onMessage.addListener(function(msg) {
        alert(msg);
    });
    port.onDisconnect.addListener(function() {
        console.log("Program Is disconnected !! Hope You are enjoyed this log :P")
    });
    port.postMessage({"problem_name" : request.problem_name, "problem_url" : request.problem_url, "user_name" : request.user_name, "lang" : request.lang});
});