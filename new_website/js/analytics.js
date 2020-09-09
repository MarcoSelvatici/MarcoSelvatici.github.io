/*
    Tiny script to collect some anonymus analytics on the website visitors.
*/
const user = window.navigator;
const user_lang = user.language;
const user_platform = user.oscpu || user.platform;
const user_info = user.userAgent;
let browser = "unknown";
if(user_info.indexOf("Chrome") > -1) {
    browser = "Google Chrome";
} else if (user_info.indexOf("Safari") > -1) {
    browser = "Apple Safari";
} else if (user_info.indexOf("Opera") > -1) {
    browser = "Opera";
} else if (user_info.indexOf("Firefox") > -1) {
    browser = "Mozilla Firefox";
} else if (user_info.indexOf("MSIE") > -1) {
    browser = "Microsoft Internet Explorer";
}
let xhr = new XMLHttpRequest();
const message = "Lang: " + user_lang + "%0AOS: " + user_platform + "%0ABrowser: " + browser;
xhr.open("GET", "https://api.telegram.org/bot494375384:AAFRFnUDzjFGbI5rFIf0npuZP37-6nvHNtM/sendMessage?chat_id=199375311&text="+message, true);
xhr.send();
let node = document.getElementById("analytics");
node.parentNode.removeChild(node);
