function click_hackerearth(language)
{
    return function() {
        console.log(language + " Code Now Clicked. Opening " + language + " IDE");
        var prob_name = $('.problem-title').first().text().trim();
        var prob_url = url;
        var u_name = "";
        var login_link = document.getElementsByClassName('track-header-login show-modal');

        // If login link exists
        if($('.track-header-login.show-modal').length !== 0)
        {
            u_name = "No User";
        }
        else
        {
            u_name = $('a.track-header-profile-box')[0].href.split('@')[1];
        }
        chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : language});
    };
}

if (us[3] === "problem") {
    var new_div = $('.editor-header').first().clone(false);
    new_div.html('');
    console.log(languages);
    for(var i = 0; i < languages.length; i++)
    {
        var button = $('<button/>', {
            class : 'button btn-blue',
            text : 'Code In ' + languages[i].name,
            style : 'margin: 5px 5px 0px 0px;',
            click : click_hackerearth(languages[i].ext)
        });
        new_div.append(button);
    }
    $('.editor-header').first().after(new_div);
    console.log("Code Now Button Added !! ~ Code Now Extension");
}
