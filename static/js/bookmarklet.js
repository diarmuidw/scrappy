(function () {
    /*
     * javascript:(function(){if(window.myBookmarklet!==undefined){myBookmarklet();}else{document.body.appendChild(document.createElement('script')).src='http://iamnotagoodartist.com/stuff/wikiframe2.js?';}})();
     * 
     * 
     */
    var v = "1.3.2";

    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                initMyBookmarklet();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        initMyBookmarklet();
    }

    
    function postData (data,o, url) {

        var f     = document.createElement('iframe'),
            fname = (+((''+Math.random()).substring(2))).toString(36);

        f.setAttribute('name', fname);
        f.setAttribute('id', fname);
        f.setAttribute('style', 'width:0;height:0;border:none;margin:none;padding:none;position:absolute;');

        document.body.appendChild(f);

        var frame = window.frames[fname], 
            doc   = frame.document,
            form  = doc.createElement('form'),
            text  = doc.createElement('textarea'),
            origin  = doc.createElement('textarea');

        text.setAttribute('name', 'data');
        //alert (data);
        text.appendChild(doc.createTextNode(data));
        
        origin.setAttribute('name', 'origin');
        //alert (o);
        origin.appendChild(doc.createTextNode(o));
        
        form.setAttribute('action', url);
        form.setAttribute('method', 'post');
        form.appendChild(text);
        form.appendChild(origin);

        doc.body.appendChild(form);

        //if (cb) { document.getElementById(fname).onload=cb; }

        doc.forms[0].submit();
      }

    
    function post_to_url(path, params, method) {
        var openWindow = window.open(path);
        method = method || "post"; 
        var form = openWindow.document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        for(var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
        openWindow.document.body.appendChild(form);
        form.submit();
      };
      
    
    
    
    function initMyBookmarklet() {
        (window.myBookmarklet = function () {
            function getSelText() {
                var s = '';
                if (window.getSelection) {
                    s = window.getSelection();
                } else if (document.getSelection) {
                    s = document.getSelection();
                } else if (document.selection) {
                    s = document.selection.createRange().text;
                }
                return s;
            }
            
            
            var s = "";
            s = getSelText();
            if (s == "") {
                //var s = prompt("Forget something?");
                var s = "Nothing selected - Just scrap the url";
            }
           // alert(s);
           // var n = s.replace("s","qqqqqqqqqqqq");
            
            s = encodeURIComponent(s);
           // alert(s.lengthc);
            
            
            url = encodeURIComponent(window.location.href);
            alert(s);
            postData( s, url, "http://192.168.1.145:8888/scrap/logpost/") ;
           // post_to_url("http://192.168.1.145:8888/scrap/logpost", { data: s});
            
            //after post data
           // alert("after post data");
//            
//            
//            if ($("#wikiframe").length == 0) {
//                var s = "";
//                s = getSelText();
//                if (s == "") {
//                    //var s = prompt("Forget something?");
//                    var s = "Nothing selected - Just scrap the url";
//                }
//               // alert(s);
//               // var n = s.replace("s","qqqqqqqqqqqq");
//                
//                s = encodeURIComponent(s);
//               // alert(s.lengthc);
//                
//                
//                url = encodeURIComponent(window.location.href);
//                postData( { data: s }, "http://192.168.1.145:8888/scrap/logpost/") //doesn't work. 500 error hard to debug
//               // post_to_url("http://192.168.1.145:8888/scrap/logpost", { data: s});
//                
//                //after post data
//                alert("after post data");
////                $.post( 
////                        "http://192.168.1.145:8888/scrap/logpost/",
////                        { name: "Zara" },
////                        function(data) {
////                           $('#stage').html(data);
////                        }
////                        )
////                alert ('after post')
//                //http://192.168.1.145:8888/scrap/log?v=1.0&q=" + item+ "&langpair=%7Cen&p=True&url="+url
//                if ((s != "") && (s != null)) {
//                    $("body").append("\
//					<div id='wikiframe'>\
//						<div id='wikiframe_veil' style=''>\
//							<p>Loading...</p>\
//						</div>\
//						<iframe src='http://192.168.1.145:8888/scrap/log?v=1.0&q=" + s + "&url=" + url + "' onload=\"$('#wikiframe iframe').slideDown(500);\">Enable iFrames.</iframe>\
//						<style type='text/css'>\
//							#wikiframe_veil { display: none; position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(255,255,255,.25); cursor: pointer; z-index: 900; }\
//							#wikiframe_veil p { color: black; font: normal normal bold 20px/20px Helvetica, sans-serif; position: absolute; top: 50%; left: 50%; width: 10em; margin: -10px auto 0 -5em; text-align: center; }\
//							#wikiframe iframe { display: none; position: fixed; top: 10%; left: 10%; width: 80%; height: 80%; z-index: 999; border: 10px solid rgba(0,0,0,.5); margin: -5px 0 0 -5px; }\
//						</style>\
//					</div>");
//                    $("#wikiframe_veil").fadeIn(750);
//                }
//            } else {
//                $("#wikiframe_veil").fadeOut(750);
//                $("#wikiframe iframe").slideUp(500);
//                setTimeout("$('#wikiframe').remove()", 750);
//            }
//            $("#wikiframe_veil").click(function (event) {
//                $("#wikiframe_veil").fadeOut(750);
//                $("#wikiframe iframe").slideUp(500);
//                setTimeout("$('#wikiframe').remove()", 750);
//            });
        })();
    }

})();