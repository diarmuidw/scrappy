javascript:(function($){var bookmarklet=document.getElementById('DELI_save_link_slidedown');if(bookmarklet){$('#DELI_mist').show();$('#DELI_save_link_slidedown').slideDown('normal');return};if(!window.jQuery){node=document.createElement('SCRIPT');node.type='text/javascript';node.src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';document.body.appendChild(node)}node=document.createElement('SCRIPT');node.type='text/javascript';node.src='https://www.delicious.com/save/get_bookmarklet_save?url='+encodeURIComponent(window.location.href)+'&title='+encodeURIComponent(document.title)+'&notes='+encodeURIComponent(''+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text));document.body.appendChild(node)})(window.jQuery);



javascript: (function($) {
    var bookmarklet = document.getElementById('DELI_save_link_slidedown');
    if (bookmarklet) {
        $('#DELI_mist').show();
        $('#DELI_save_link_slidedown').slideDown('normal');
        return
    };
    if (!window.jQuery) {
        node = document.createElement('SCRIPT');
        node.type = 'text/javascript';
        node.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
        document.body.appendChild(node)
    }
    node = document.createElement('SCRIPT');
    node.type = 'text/javascript';
    node.src = 'https://www.delicious.com/save/get_bookmarklet_save?url=' + encodeURIComponent(window.location.href) + '&title=' + encodeURIComponent(document.title) + '&notes=' + encodeURIComponent('' + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text));
    document.body.appendChild(node)
})(window.jQuery);



(function($){
    var slidedown_html = '<div id="DELI_save_link_slidedown" style="position:fixed;left:50%;margin-left:-350px!important;z-index:2127777777;top:50%;margin-top:-275px;max-width:700px;min-width:700px;width:700px!important;background:whiteSmoke;height:500px;-webkit-border-radius:2px;-moz-border-radius:2px;-ms-border-radius:2px;-o-border-radius:2px;border-radius:2px;-webkit-box-shadow:0 0 20px 12px rgba(0,0,0,0.5);-moz-box-shadow:0 0 20px 12px rgba(0,0,0,0.5);box-shadow:0 0 20px 12px rgba(0,0,0,0.5)"></div>',
        mist_html = '<div id="DELI_mist" style="position:fixed;z-index:2127777776;width:100%;height:100%;background-color:black;filter:alpha(opacity=70);opacity:.7"></div>',
        iframe_html = '<iframe marginheight="0" width="100%" height="100%" frameborder="0" style="border:0;overflow:hidden;" src="http://www.delicious.com/save/get_iframe_login?url=www.google.com&title=123&notes=" id="iframe_bookmarklet" name="iframe_bookmarklet"></iframe>';

    function init() {        
        var body = $('body');
        body.prepend(mist_html);
        $(slidedown_html).hide().prependTo('body').slideDown('normal');
        $('#DELI_save_link_slidedown').html(iframe_html);
    };
    init()
    
    var slide_toggle = function(){
        var slidedown = $('#DELI_save_link_slidedown')
        if (slidedown){
            slidedown.slideUp('normal');
            $('#DELI_mist').fadeOut('normal');
        }else{
            $('#DELI_mist').show();
            slidedown.slideDown('normal');
        }
    }
    
    // keep trace of mouse movement 
    var mouse_in_save_link_slidedown = false;
    $('#DELI_save_link_slidedown').hover(function() {
        mouse_in_save_link_slidedown = true;
    }, function(){
        mouse_in_save_link_slidedown = false;
    });
    $('body').mouseup(function(){
       if(! mouse_in_save_link_slidedown){
           slide_toggle();
       }       
    });

    // listen to iframe login succeeded message
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    window[eventMethod](messageEvent, onMessage, false);

    function onMessage(e) {
        if (e.origin !== "http://www.delicious.com")
            return;

        if (e.data === 'login_succeeded'){
            $('#iframe_bookmarklet').attr('src', 'http://www.delicious.com/save/get_iframe_savelink?url=www.google.com&title=123')
        }else if(e.data === 'savelink_succeeded' || e.data === 'destroy_bookmarklet'){
            slide_toggle();
            setTimeout(function() {$('#DELI_save_link_slidedown').remove(); $('#DELI_mist').remove();}, 2000);
        }else{}
        
    }    
    
})(jQuery);