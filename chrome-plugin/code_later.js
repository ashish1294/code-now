us = document.URL.split("/");
if(us.length>1 && us[us.length-2] === "problems")
{
    if(us[us.length - 1] !== "easy" && us[us.length - 1] !== "medium" && us[us.length - 1] !== "hard" && us[us.length - 1]
                !== "challenge" && us[us.length - 1] !== "extcontest" && us[us.length - 1] !== "school")
    {
        if (! document.getElementById("user-bar"))
        {
            document.getElementsByTagName('ul').item(7).innerHTML = document.getElementsByTagName('ul').item(7).innerHTML
            +"<li><a href='#' id='code_now_id_java_button'>Code in Java</a></li>"
            +"<li><a href='#' id='code_now_id_c_button'>Code in C</a></li>"
            +"<li><a href='#' id='code_now_id_c++_button'>Code in C++</a></li>";
            
            document.getElementById("code_now_id_java_button").onclick = function(){
                var prob_name = document.getElementsByTagName("h1")[0].innerHTML;
                var prob_url = document.URL;
                var u_name = document.getElementsByTagName("span").item(1).textContent.replace("Hello ", "").trim().split('!')[0]
                chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : "java"});
            };
            
            document.getElementById("code_now_id_c_button").onclick = function(){
                var prob_name = document.getElementsByTagName("h1")[0].innerHTML;
                var prob_url = document.URL;
                var u_name = document.getElementsByTagName("span").item(1).textContent.replace("Hello ", "").trim().split('!')[0]
                chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : "c"});
            };
            
            document.getElementById("code_now_id_c++_button").onclick = function(){
                var prob_name = document.getElementsByTagName("h1")[0].innerHTML;
                var prob_url = document.URL;
                var u_name = document.getElementsByTagName("span").item(1).textContent.replace("Hello ", "").trim().split('!')[0]
                chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : "cpp"});
            };
        }
    }
}