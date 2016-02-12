var languages = [
    {
        ext : "c",
        name : "C"
    },
    {
        ext : "cpp",
        name : "C++"
    },
    {
        ext : "java",
        name : "Java"
    },
    {
        ext : "py",
        name : "Python"
    }
];

//Getting the URL of the HTMl Page
var url = document.URL;

//Removing the trailing punctuation marks
while(url[url.length - 1] === "/" || url[url.length - 1] === "#")
{
    url = url.slice(0, url.length - 1);
}

//Spliting the URL to get path
var us = url.split("/");
