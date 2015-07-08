//Getting the URL of the HTMl Page
var url = document.URL

//Removing the trailing punctuation marks
while(url[url.length - 1] === "/" || url[url.length - 1] === "#")
{
    url = url.slice(0, url.length - 1);
}

//Spliting the URL to get path
var us = url.split("/");

var website = us[2].split(".")
for(i = 0; i < website.length; i++)
{
    if (website[i] === "codechef" || website[i] === "spoj" || website[i] === "codeforces")
    {
        website = website[i];
    }
}

function click_codechef(language)
{
    console.log(language + " Code Now Clicked. Opening " + language + " IDE");
    var prob_name = document.title.split("|")[0].trim();
    var prob_url = url;
    var user_code = document.getElementById("custom-login").getElementsByTagName('span')[0];
    var u_name = "";
    //Checking if User is LoggedIn
    if(user_code.innerHTML.search("Login") != -1)
    {
        //No Logged In User Detected
        u_name = "No User";
        console.log("Java Code Now Clicked !! No user Logged in");
    }
    else
    {
        //A user is logged in
        u_name = user_code.textContent.replace("Hello ", "").trim().split('!')[0];
    }
    //Sending Message to the native host with a json object of problem details
    chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : language});
}

function click_spoj(language)
{
    console.log(language + " Code Now Clicked. Opening " + language + " IDE");
    var prob_name = document.getElementsByClassName("prob")[0].getElementsByTagName("h2")[0].innerHTML;
    var prob_url = url;
    var u_name = "";
    if(document.getElementsByClassName("text-success")[0].innerText.search("sign in")!=-1)
    {
        u_name = "No User";
    }
    else
    {
        u_name = document.getElementsByClassName("username_dropdown")[0].innerText;
    }
    chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : language});
}

function click_codeforces(language)
{
    console.log(language + " Code Now Clicked. Opening " + language + " IDE");
    var prob_name = document.getElementById('pageContent').getElementsByClassName('title')[0].innerHTML.split('.')[1].trim();
    var prob_url = url;
    var u_name = "";
    var head_div = document.getElementById('header').getElementsByClassName('lang-chooser')[0].getElementsByTagName('div')[1];
    var reg_link = head_div.getElementsByTagName('a')[1].innerHTML.toLowerCase();
    if(reg_link == "register")
    {
        u_name = "No User";
    }
    else
    {
        u_name = head_div.getElementsByTagName('a')[0].innerHTML.toLowerCase();
    }
    chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : language});
    console.log("IDE");
}

//Checking if it is CodeChef Problem Page
if(us.length > 4 && website === "codechef" && us[us.length - 2] === "problems")
{
    //Excluding the Special Codes in CodeChef Problem Regex - These url indicate a list of problems rather than a particular problem
    var code = us[us.length - 1];
    if(code !== "easy" && code !== "medium" && code !== "hard" && code !== "challenge" && code !== "extcontest" && code !== "school")
    {
        //Adding the Handlers Buttons to the Page
        document.getElementById('problem-page').getElementsByTagName('ul').item(0).innerHTML = document.getElementById('problem-page').getElementsByTagName('ul').item(0).innerHTML
        +"<li><a href='#' id='code_now_id_java_button'>Code in Java</a></li>"
        +"<li><a href='#' id='code_now_id_c_button'>Code in C</a></li>"
        +"<li><a href='#' id='code_now_id_c++_button'>Code in C++</a></li>";

        console.log("Code Now Button Added !! ~ Code Now Extension");

        //Adding listener for Java Button
        document.getElementById("code_now_id_java_button").onclick = function(){ click_codechef("java"); };

        //Adding Listener for C Button
        document.getElementById("code_now_id_c_button").onclick = function(){ click_codechef("c"); };

        //Adding Button for C++ Button
        document.getElementById("code_now_id_c++_button").onclick = function(){ click_codechef("cpp"); };
    }
}

//Checking for Spoj Problem Pages
else if(us.length > 4 && website === "spoj" && us[us.length - 2] === "problems")
{
    //Again Avoiding Special URLs
    var code = us[us.length - 2];
    if(code !== "classical" && code !== "challenge" && code !== "partial" && code !== "tutorial" && code !== "riddle")
    {
        document.getElementById("problem-btn-submit-box").innerHTML+= 
        "<button id='code_now_id_java_button' class='btn btn-default' style='width: 100%; margin-top: 20px;'>Code in Java</button>"
        + "<button id='code_now_id_c_button' class='btn btn-default' style='width: 100%; margin-top: 20px;'>Code in C</button>"
        + "<button id='code_now_id_c++_button' class='btn btn-default' style='width: 100%; margin-top: 20px;'>Code in C++</button>"

        console.log("Code Now Button Added !! ~ Code Now Extension");

        document.getElementById("code_now_id_java_button").onclick = function(){ click_spoj("java"); };
        document.getElementById("code_now_id_c_button").onclick = function(){ click_spoj("c"); };
        document.getElementById("code_now_id_c++_button").onclick = function(){ click_spoj("cpp"); };
    }
}

//Checking for Codeforces Problem Page
else if(us.length > 4 && website === "codeforces" && (us[us.length - 2] === "problem" || us[us.length - 3] === "problem"))
{
    //Creating and Adding A whole new Sidebox with 3 buttons
    var sidebar = document.getElementById('sidebar')
    sidebar.innerHTML = 
    '<div class="roundbox sidebox" style="">'
        + '<div class="roundbox-lt">&nbsp;</div>'
        + '<div class="roundbox-rt">&nbsp;</div>'
        + '<table class="rtable ">'
            + '<tbody>'
                + '<tr><th class="left" style="width:100%;"><a style="color: black" href="">Code Now</a></th></tr>'
                + '<tr>'
                    + '<td class="left bottom" colspan="1">'
                      + '<div style="text-align:center;margin:1em;">'
                        + '<button id="code_now_id_java_button">Code in Java</button> <br><br>'
                        + '<button id="code_now_id_c_button">Code in C</button> <br><br>'
                        + '<button id="code_now_id_c++_button">Code in C++</button> <br><br>'
                      + '</div>'
                    + '</td>'
                + '</tr>'
            + '</tbody>'
        + '</table>'
    + '</div>'
    + sidebar.innerHTML;

    console.log("Code Now Button Added !! ~ Code Now Extension");

    document.getElementById("code_now_id_java_button").onclick = function() { click_codeforces("java"); };
    document.getElementById("code_now_id_c_button").onclick = function(){ click_codeforces("c"); };
    document.getElementById("code_now_id_c++_button").onclick = function(){ click_codeforces("cpp"); };
}
