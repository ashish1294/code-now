us = document.URL.split("/");
if(us.length>1 && us[us.length-2] === "problems")
{
    if(us[us.length - 1] !== "easy" && us[us.length - 1] !== "medium" && us[us.length - 1] !== "hard" && us[us.length - 1]
                !== "challenge" && us[us.length - 1] !== "extcontest" && us[us.length - 1] !== "school")
    {
        document.getElementById('problem-page').getElementsByTagName('ul').item(0).innerHTML = document.getElementById('problem-page').getElementsByTagName('ul').item(0).innerHTML
        +"<li><a href='#' id='code_now_id_java_button'>Code in Java</a></li>"
        +"<li><a href='#' id='code_now_id_c_button'>Code in C</a></li>"
        +"<li><a href='#' id='code_now_id_c++_button'>Code in C++</a></li>";

        console.log("Code Now Button Added !! ~ Code Now Extension");

        document.getElementById("code_now_id_java_button").onclick = function(){
            var prob_name = document.getElementsByTagName("h1")[0].innerHTML;
            var prob_url = document.URL;
            var user_code = document.getElementById("custom-login").getElementsByTagName('span')[0];
            var u_name = "";
            if(user_code.innerHTML.search("Login") != -1)
            {
                u_name = "No User";
                console.log("Java Code Now Clicked !! No user Logged in");
            }
            else
            {
                u_name = user_code.textContent.replace("Hello ", "").trim().split('!')[0];
            }
            chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : "java"});
        };

        document.getElementById("code_now_id_c_button").onclick = function(){
            var prob_name = document.getElementsByTagName("h1")[0].innerHTML;
            var prob_url = document.URL;
            var user_code = document.getElementById("custom-login").getElementsByTagName('span')[0];
            var u_name = "";
            if(user_code.innerHTML.search("Login") != -1)
            {
                u_name = "No User";
                console.log("C Code Now Clicked !! No user Logged in");
            }
            else
            {
                u_name = user_code.textContent.replace("Hello ", "").trim().split('!')[0];
            }
            chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : "c"});
        };

        document.getElementById("code_now_id_c++_button").onclick = function(){
            var prob_name = document.getElementsByTagName("h1")[0].innerHTML;
            var prob_url = document.URL;
            var user_code = document.getElementById("custom-login").getElementsByTagName('span')[0];
            var u_name = "";
            if(user_code.innerHTML.search("Login") != -1)
            {
                u_name = "No User";
                console.log("C++ Code Now Clicked !! No User Logged in");
            }
            else
            {
                u_name = user_code.textContent.replace("Hello ", "").trim().split('!')[0];
            }
            chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : "cpp"});
        };
    }
}