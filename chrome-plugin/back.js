chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    try {
        var port = chrome.runtime.connectNative('codenow');
        port.onMessage.addListener(function(msg) {
            console.log("Received :" + msg);
        });
        port.onDisconnect.addListener(function() {
            console.log("Code-Now Host disconnected !! Hope You are enjoying this log :P");
        });
        port.postMessage({"problem_name" : request.problem_name, "problem_url" : request.problem_url, "user_name" : request.user_name, "lang" : request.lang});
    }
    catch (err)
    {
        alert("Unable To reach Host Program !! Please install host program");
    }
});