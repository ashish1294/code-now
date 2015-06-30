url = document.URL
while(url[url.length - 1] === "/" || url[url.length - 1] === "#")
{
    url = url.slice(0, url.length - 1);
}
us = url.split("/");
if(us.length > 4 && us[2].split(".")[1] === "codechef" && us[us.length-2] === "problems")
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
            console.log("Java Code Now Clicked. Opening Java IDE");
            var prob_name = document.title.split("|")[0].trim();
            var prob_url = url;
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
            console.log("C Code Now Clicked. Opening C IDE");
            var prob_name = document.title.split("|")[0].trim();
            var prob_url = url;
            var user_code = document.getElementById("custom-login").getElementsByTagName('span')[0];
            var u_name = "";
            if(user_code.innerHTML.search("Login") != -1)
            {
                u_name = "No User";
            }
            else
            {
                u_name = user_code.textContent.replace("Hello ", "").trim().split('!')[0];
            }
            chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : "c"});
        };

        document.getElementById("code_now_id_c++_button").onclick = function(){
            console.log("C++ Code Now Clicked. Opening C++ IDE");
            var prob_name = document.title.split("|")[0].trim();
            var prob_url = url;
            var user_code = document.getElementById("custom-login").getElementsByTagName('span')[0];
            var u_name = "";
            if(user_code.innerHTML.search("Login") != -1)
            {
                u_name = "No User";
            }
            else
            {
                u_name = user_code.textContent.replace("Hello ", "").trim().split('!')[0];
            }
            chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : "cpp"});
        };
    }
}
else if(us.length > 4 && us[2].split(".")[1] === "spoj" && us[us.length-2] === "problems")
{
    var code = us[us.length - 2];
    if(code !== "classical" && code !== "challenge" && code !== "partial" && code !== "tutorial" && code !== "riddle")
    {
        //document.getElementsByClassName("problems")[0].getElementsByTagName("tbody")[0].innerHTML = 
        //document.getElementsByClassName("problems")[0].getElementsByTagName("tbody")[0].innerHTML 
        //+ "<tr class='navigation'>"
        //+ "<td><a id='code_now_id_java_button'>Code in Java</a></td>"
        //+ "<td><a id='code_now_id_c_button'>Code in C</a></td>"
        //+ "<td><a id='code_now_id_c++_button'>Code in C++<a></a></td>"
        //+ "</tr>"
document.getElementsByClassName("text-center")[0].innerHTML= document.getElementsByClassName("text-center")[0].innerHTML +  "<tr class='navigation'>"
        + "<td><a id='code_now_id_java_button' class ='btn btn-primary'>Code in Java</a></td>"
        + "<td><a id='code_now_id_c_button' class ='btn btn-primary'>Code in C</a></td>"
        + "<td><a id='code_now_id_c++_button' class ='btn btn-primary'>Code in C++<a></a></td>"
        + "</tr>"

        console.log("Code Now Button Added !! ~ Code Now Extension");

        document.getElementById("code_now_id_java_button").onclick = function(){
            var prob_name = document.getElementsByClassName("prob")[0].getElementsByTagName("h2")[0].innerHTML;
            var prob_url = url;
            //var user_code = document.getElementsByClassName("prob")[0].getElementsByTagName("table")[0].getElementsByTagName("h2")[1].innerHTML.split(":")[1].trim();
            var u_name = "";
            if(document.getElementsByClassName("text-success")[0].innerText.search("sign in")!=-1)
            {
                u_name = "No User";
            }
            else
            {
                u_name = document.getElementsByClassName("username_dropdown")[0].innerText;
            }
            chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : "java"});
        };

        document.getElementById("code_now_id_c_button").onclick = function(){
            console.log("C Code Now Clicked. Opening C IDE");
            var prob_name =  document.getElementsByClassName("prob")[0].getElementsByTagName("h2")[0].innerHTML;
            var prob_url = url;
            //var user_code = document.getElementsByClassName("prob")[0].getElementsByTagName("table")[0].getElementsByTagName("h2")[1].innerHTML.split(":")[1].trim();
            var u_name = "";
            if(document.getElementsByClassName("text-success")[0].innerText.search("sign in")!=-1)
            {
                u_name = "No User";
            }
            else
            {
                u_name = document.getElementsByClassName("username_dropdown")[0].innerText;
            }
            chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : "c"});
        };

        document.getElementById("code_now_id_c++_button").onclick = function(){
            console.log("C++ Code Now Clicked. Opening C++ IDE");
            var prob_name =  document.getElementsByClassName("prob")[0].getElementsByTagName("h2")[0].innerHTML;
            var prob_url = url;
            //var user_code = document.getElementsByClassName("prob")[0].getElementsByTagName("table")[0].getElementsByTagName("h2")[1].innerHTML.split(":")[1].trim();
            var u_name = "";
            if(document.getElementsByClassName("text-success")[0].innerText.search("sign in")!=-1)
            {
                u_name = "No User";
            }
            else
            {
                u_name = document.getElementsByClassName("username_dropdown")[0].innerText;
            }
            chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : "cpp"});
        };
    }
}
