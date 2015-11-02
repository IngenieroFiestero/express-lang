function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString()+"; path=/;";
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
var cookie_lang = 'lang';
function languaje(num){
    if(num==0){
        setCookie(cookie_lang,"es",7); 
    }else if(num==1){
        setCookie(cookie_lang,"en",7);   
    }
    location.reload(); 
}