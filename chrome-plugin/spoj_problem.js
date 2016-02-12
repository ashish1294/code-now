function click_spoj(language)
{
    return function() {
        console.log(language + " Code Now Clicked. Opening " + language + " IDE");
        var prob_name = $('.prob h2').html().split('-')[1].trim();
        var prob_url = url;
        var u_name = "";
        if($('.submenu .navbar-right')[0].children.length == 2)
        {
            u_name = "No User";
        }
        else
        {
            u_name = $('.submenu .navbar-right a')[0].href.split(',')[1].replace('/', '');
        }
        chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : language});
    };
}

var spoj_interval = null;
function add_spoj_buttons()
{
    var submit_box = $('#problem-btn-submit-box');
    for(var i = 0; i < languages.length; i++)
    {
        var button = $('<button/>', {
            text : 'Code in ' + languages[i].name,
            class : 'btn btn-default',
            style : 'width: 100%; margin-top: 20px;',
            click : click_spoj(languages[i].ext)
        });
        submit_box.append(button);
    }
    console.log("Code Now Button Added !! ~ Code Now Extension");
    clearInterval(spoj_interval);
}

//Again Avoiding Special URLs
var code = us[us.length - 2];
if(code !== "classical" && code !== "challenge" && code !== "partial" && code !== "tutorial" && code !== "riddle")
{
    spoj_interval = setInterval(add_spoj_buttons, 200);
}
