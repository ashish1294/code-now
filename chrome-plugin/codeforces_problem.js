function click_codeforces(language)
{
    return function() {
        console.log(language + " Code Now Clicked. Opening " + language + " IDE");
        var prob_name = $('#pageContent .title').html().split('.')[1].trim();
        var prob_url = url;
        var u_name = "";
        var reg_link = $('#header .lang-chooser div')[1].children[1].text.toLowerCase();
        if(reg_link == "register")
        {
            u_name = "No User";
        }
        else
        {
            u_name = $('#header .lang-chooser div')[1].children[0].text.toLowerCase();
        }
        chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : language});
    };
}

if(us.length > 4 && (us[us.length - 2] === "problem" || us[us.length - 3] === "problem"))
{
    //Creating and Adding A whole new Sidebox with 3 buttons
    $('#sidebar').html(
    '<div class="roundbox sidebox" style="">' +
        '<div class="roundbox-lt">&nbsp;</div>' +
        '<div class="roundbox-rt">&nbsp;</div>' +
        '<table class="rtable ">' +
            '<tbody>' +
                '<tr><th class="left" style="width:100%;"><a style="color: black" href="">Code Now</a></th></tr>' +
                '<tr>' +
                    '<td class="left bottom" colspan="1">' +
                      '<div style="text-align:center;margin:1em;" id="code_now_button_box">' +
                      '</div>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
    '</div>' +
    $('#sidebar').html);

    for(var i = 0; i < languages.length; i++)
    {
        var button = $('<button/>', {
            text : 'Code in ' + languages[i].name,
            click : click_codeforces(languages[i].ext)
        });
        $('#code_now_button_box').append(button);
        $('#code_now_button_box').append($('<br/>'));
        $('#code_now_button_box').append($('<br/>'));
    }
    console.log("Code Now Button Added !! ~ Code Now Extension");
}
