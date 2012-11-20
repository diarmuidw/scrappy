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

    function GUID ()
    {
        var S4 = function ()
        {
            return Math.floor(
                    Math.random() * 0x10000 /* 65536 */
                ).toString(16);
        };
           return S4() +S4();
//        return (
//                S4() + S4() + "-" +
//                S4() + "-" +
//                S4() + "-" +
//                S4() + "-" +
//                S4() + S4() + S4()
//            );
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
            origin  = doc.createElement('textarea'),
            uniqueid  = doc.createElement('textarea');

        text.setAttribute('name', 'data');
        text.appendChild(doc.createTextNode(data));
      
        origin.setAttribute('name', 'origin');
        origin.appendChild(doc.createTextNode(o));
        
        uniqueid.setAttribute('name', 'uniqueid');
        generatedid = GUID()
        uniqueid.appendChild(doc.createTextNode(generatedid));        
        
        form.setAttribute('action', url);
        form.setAttribute('method', 'post');
        
        form.appendChild(text);
        form.appendChild(origin);
        form.appendChild(uniqueid);
        
        doc.body.appendChild(form);
        
        //if (cb) { document.getElementById(fname).onload=cb; }

        doc.forms[0].submit();
        ////alert(doc.forms[0].getAttribute('action'));
        
        return generatedid
      }

    
    function post_to_url(path, params, method) {
    	//opens a new window which is not ideal but at least it works
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
      
    
    
      function nodeToString ( node ) {
    	   var tmpNode = document.createElement( "div" );
    	   tmpNode.appendChild( node.cloneNode( true ) );
    	   var str = tmpNode.innerHTML;
    	   tmpNode = node = null; // prevent memory leaks in IE
    	   return str;
    	}
     
    function changepage(uniqueid){
    
        var range = window.getSelection().getRangeAt(0);
        var selectionContents = range.extractContents();
        var s = "";
        s = nodeToString(selectionContents);//getSelText();
        
        if (s == "") {
            //var s = prompt("Forget something?");
            var s = "Nothing selected - Just scrap the url";
        }

        s = encodeURIComponent(s);

        url = encodeURIComponent(window.location.href);

		var linkimage = document.createElement('img');
		linkimage.setAttribute('src',"http://192.168.1.145:8888/site_media/static/images/mm_20_blue.png")
		var link = document.createElement('a');
        link.style.color = "red";
        link.appendChild(selectionContents);
        link.setAttribute('href', 'http://192.168.1.145:8888/scrap/viewone/' +uniqueid);
        link.setAttribute('target','_blank')
        var text = document.createTextNode("Your Scrappy!");
        //var hh = document.createElement("h1");
        link.appendChild(linkimage)
        //alert(nodeToString(link))
        range.insertNode(link);   
    	
    	
    	
    }
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
            
            
            
            colonposition = window.location.href.indexOf(":");
            urlleader = window.location.href.substring(0,colonposition);
                              
            
            

            if (urlleader == "http")
            	{
            		
            		var version = 3
                    var range = window.getSelection().getRangeAt(0);
                    var selectionContents = range.extractContents();
                    var s = "";
                    s = nodeToString(selectionContents);//getSelText();
                    
                    if (s == "") {
                        //var s = prompt("Forget something?");
                        var s = "Nothing selected - Just scrap the url";
                    }
         
                    s = encodeURIComponent(s);

                    url = encodeURIComponent(window.location.href);


            		if (version ==1)
            			{
		            		uniqueid = postData( s, url, "http://192.168.1.145:8888/scrap/logpost/") ;
		            		var div = document.createElement("div");
		                    div.style.color = "red";
		                    div.appendChild(selectionContents);
		                    var newContent = document.createTextNode("Hi there and greetings!");
		                    var link = document.createElement('a');
		                    link.setAttribute('href', 'http://192.168.1.145:8888/scrap/viewone/' + uniqueid);
		                    link.setAttribute('target','_blank')
		                    var text = document.createTextNode("Your Scrappy!");
		                    link.appendChild(text)
		                    div.appendChild(link)
		                    
		                    range.insertNode(div);
            			}
            		else if(version ==2)
            			{
            			//try without the div as it is causing a newline
		            		uniqueid = postData( s, url, "http://192.168.1.145:8888/scrap/logpost/") ;
		            		var link = document.createElement('a');
		                    link.style.color = "red";
		                    link.appendChild(selectionContents);
		                    link.setAttribute('href', 'http://192.168.1.145:8888/scrap/viewone/' + uniqueid);
		                    link.setAttribute('target','_blank')
		                    var text = document.createTextNode("Your Scrappy!");
		                    //var hh = document.createElement("h1");
		                    link.appendChild(text)
		                    //div.appendChild(link)

		                    range.insertNode(link);

            			}
            		else
            			{
            			//try with an image as the link
	            		uniqueid = postData( s, url, "http://192.168.1.145:8888/scrap/logpost/") ;
	            		var linkimage = document.createElement('img');
	            		linkimage.setAttribute('src',"http://192.168.1.145:8888/site_media/static/images/mm_20_blue.png")
	            		var link = document.createElement('a');
	                    link.style.color = "red";
	                    link.appendChild(selectionContents);
	                    link.setAttribute('href', 'http://192.168.1.145:8888/scrap/viewone/' +uniqueid);
	                    link.setAttribute('target','_blank')
	                    var text = document.createTextNode("Your Scrappy!");
	                    //var hh = document.createElement("h1");
	                    link.appendChild(linkimage)
	                    //alert(nodeToString(link))
	                    range.insertNode(link);            			
            			
            			
            			}
            	
            		
            	}
            else
            	{
            		//This doesn't work. Doesn't scrap but alos doesn't throw up a warning on the page
            		//postData( s, url, "https://192.168.1.145:8888/scrap/logpost/") ;
            		//post_to_url("http://192.168.1.145:8888/scrap/logpost/", { 'data': s,'origin': url });
		
		            if ($("#wikiframe").length == 0) {
		                var s = "";
		                s = getSelText();
		                if (s == "") {
		                    //var s = prompt("Forget something?");
		                    var s = "Nothing selected - Just scrap the url";
		                }
		                s = encodeURIComponent(s);
		                uniqueid = GUID();
		                changepage(uniqueid);
		                
		                url = encodeURIComponent(window.location.href);
		
		                if ((s != "") && (s != null)) {
		                    $("body").append("\
							<div id='wikiframe'>\
								<div id='wikiframe_veil' style=''>\
									<p>Loading...</p>\
								</div>\
								<iframe src='http://192.168.1.145:8888/scrap/log?uniqueid=" + uniqueid + "&v=1.0&q=" + s + "&url=" + url + "' onload=\"$('#wikiframe iframe').slideDown(500);\">Enable iFrames.</iframe>\
								<style type='text/css'>\
									#wikiframe_veil { display: none; position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(255,255,255,.25); cursor: pointer; z-index: 900; }\
									#wikiframe_veil p { color: black; font: normal normal bold 20px/20px Helvetica, sans-serif; position: absolute; top: 50%; left: 50%; width: 10em; margin: -10px auto 0 -5em; text-align: center; }\
									#wikiframe iframe { display: none; position: fixed; top: 10%; left: 10%; width: 80%; height: 80%; z-index: 999; border: 10px solid rgba(0,0,0,.5); margin: -5px 0 0 -5px; }\
								</style>\
							</div>");
		                    $("#wikiframe_veil").fadeIn(750);
		                }
		            } else {
		                $("#wikiframe_veil").fadeOut(750);
		                $("#wikiframe iframe").slideUp(500);
		                setTimeout("$('#wikiframe').remove()", 750);
		            }
		            $("#wikiframe_veil").click(function (event) {
		                $("#wikiframe_veil").fadeOut(750);
		                $("#wikiframe iframe").slideUp(500);
		                setTimeout("$('#wikiframe').remove()", 750);
		            });
            
            	};//else
        })();
    }

})();