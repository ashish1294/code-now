//Helper function to get click_functions
function click_codechef(language)
{
    return function () {
        console.log(language + " Code Now Clicked. Opening " + language + " IDE");
        var prob_name = $('title')[0].text.split('|')[0].trim();
        var prob_url = url;
        var u_name = "";
        //Checking if User is LoggedIn
        if($('#user-bar span.login-box').length > 0)
        {
            //No Logged In User Detected
            u_name = "No User";
        }
        else
        {
            //A user is logged in
            u_name = $('#user-bar span').text().split('!')[0].replace('Hello', '').trim();
        }
        //Sending Message to the native host with a json object of problem details
        chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : language});
    };
}

// Helper function to add codechef buttons
var codechef_interval = null;
function add_codechef_buttons()
{
    if ($('#problem-page-top').length === 0)
    {
        // This means that the page hasn't loaded completely yet. So Wait
        return;
    }
    else
    {
        // Dynamic DOM Created by codechef
        var button_list = $("#problem-page-top").find("ul");
        var html = button_list.html();
        // Adding Language Button
        for (var i = 0; i < languages.length; i++)
        {
            html += "<li><a href='#' id='code_now_id_" + languages[i].ext + "_button'>Code in " + languages[i].name + "</a></li>";
        }
        button_list.html(html);

        //Adding Listeners
        for(var j = 0; j < languages.length; j++)
        {
            $("#code_now_id_" + languages[j].ext + "_button").click(click_codechef(languages[j].ext));
        }
        console.log("Code Now Button Added !! ~ Code Now Extension");

        // Clear interval, so that buttons are not added repeatedly
        clearInterval(codechef_interval);
    }
}

var code = us[us.length - 1];
if(us[us.length - 2] === "problems" && code !== "easy" && code !== "medium" && code !== "hard" && code !== "challenge" && code !== "extcontest" && code !== "school")
{
    // Adding A little sleep here because codechef mutates DOM to add all elements dynamically
    codechef_interval = window.setInterval(add_codechef_buttons, 5000);
}
