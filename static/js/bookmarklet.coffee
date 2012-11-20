(->
  
  #
  #     * javascript:(function(){if(window.myBookmarklet!==undefined){myBookmarklet();}else{document.body.appendChild(document.createElement('script')).src='http://iamnotagoodartist.com/stuff/wikiframe2.js?';}})();
  #     * 
  #     * 
  #     
  GUID = ->
    S4 = ->
      # 65536 
      Math.floor(Math.random() * 0x10000).toString 16

    S4() + S4()
  
  #        return (
  #                S4() + S4() + "-" +
  #                S4() + "-" +
  #                S4() + "-" +
  #                S4() + "-" +
  #                S4() + S4() + S4()
  #            );
  postData = (data, o, url) ->
    f = document.createElement("iframe")
    fname = (+(("" + Math.random()).substring(2))).toString(36)
    f.setAttribute "name", fname
    f.setAttribute "id", fname
    f.setAttribute "style", "width:100;height:100;border:none;margin:none;padding:none;position:absolute;"
    document.body.appendChild f
    frame = window.frames[fname]
    doc = frame.document
    form = doc.createElement("form")
    text = doc.createElement("textarea")
    origin = doc.createElement("textarea")
    uniqueid = doc.createElement("textarea")
    text.setAttribute "name", "data"
    text.appendChild doc.createTextNode(data)
    origin.setAttribute "name", "origin"
    origin.appendChild doc.createTextNode(o)
    uniqueid.setAttribute "name", "uniqueid"
    generatedid = GUID()
    uniqueid.appendChild doc.createTextNode(generatedid)
    form.setAttribute "action", url
    form.setAttribute "method", "post"
    form.appendChild text
    form.appendChild origin
    form.appendChild uniqueid
    doc.body.appendChild form
    
    #if (cb) { document.getElementById(fname).onload=cb; }
    doc.forms[0].submit()
    
    #alert(doc.forms[0].getAttribute('action'));
    generatedid
  post_to_url = (path, params, method) ->
    
    #opens a new window which is not ideal but at least it works
    openWindow = window.open(path)
    method = method or "post"
    form = openWindow.document.createElement("form")
    form.setAttribute "method", method
    form.setAttribute "action", path
    for key of params
      hiddenField = document.createElement("input")
      hiddenField.setAttribute "type", "hidden"
      hiddenField.setAttribute "name", key
      hiddenField.setAttribute "value", params[key]
      form.appendChild hiddenField
    openWindow.document.body.appendChild form
    form.submit()
  nodeToString = (node) ->
    tmpNode = document.createElement("div")
    tmpNode.appendChild node.cloneNode(true)
    str = tmpNode.innerHTML
    tmpNode = node = null # prevent memory leaks in IE
    str
  initMyBookmarklet = ->
    (window.myBookmarklet = ->
      getSelText = ->
        s = ""
        if window.getSelection
          s = window.getSelection()
        else if document.getSelection
          s = document.getSelection()
        else s = document.selection.createRange().text  if document.selection
        s
      colonposition = window.location.href.indexOf(":")
      urlleader = window.location.href.substring(0, colonposition)
      if urlleader is "http"
        version = 3
        range = window.getSelection().getRangeAt(0)
        selectionContents = range.extractContents()
        s = ""
        s = nodeToString(selectionContents) #getSelText();
        
        #var s = prompt("Forget something?");
        s = "Nothing selected - Just scrap the url"  if s is ""
        s = encodeURIComponent(s)
        url = encodeURIComponent(window.location.href)
        if version is 1
          uniqueid = postData(s, url, "http://192.168.1.145:8888/scrap/logpost/")
          div = document.createElement("div")
          div.style.color = "red"
          div.appendChild selectionContents
          newContent = document.createTextNode("Hi there and greetings!")
          link = document.createElement("a")
          link.setAttribute "href", "http://192.168.1.145:8888/scrap/viewone/" + uniqueid
          link.setAttribute "target", "_blank"
          text = document.createTextNode("Your Scrappy!")
          link.appendChild text
          div.appendChild link
          range.insertNode div
        else if version is 2
          
          #try without the div as it is causing a newline
          uniqueid = postData(s, url, "http://192.168.1.145:8888/scrap/logpost/")
          link = document.createElement("a")
          link.style.color = "red"
          link.appendChild selectionContents
          link.setAttribute "href", "http://192.168.1.145:8888/scrap/viewone/" + uniqueid
          link.setAttribute "target", "_blank"
          text = document.createTextNode("Your Scrappy!")
          
          #var hh = document.createElement("h1");
          link.appendChild text
          
          #div.appendChild(link)
          range.insertNode link
        else
          
          #try with an image as the link
          uniqueid = postData(s, url, "http://192.168.1.145:8888/scrap/logpost/")
          linkimage = document.createElement("img")
          linkimage.setAttribute "src", "http://192.168.1.145:8888/site_media/static/images/mm_20_blue.png"
          link = document.createElement("a")
          link.style.color = "red"
          link.appendChild selectionContents
          link.setAttribute "href", "http://192.168.1.145:8888/scrap/viewone/" + uniqueid
          link.setAttribute "target", "_blank"
          text = document.createTextNode("Your Scrappy!")
          
          #var hh = document.createElement("h1");
          link.appendChild linkimage
          alert nodeToString(link)
          range.insertNode link
      else
        
        #This doesn't work. Doesn't scrap but alos doesn't throw up a warning on the page
        #postData( s, url, "https://192.168.1.145:8888/scrap/logpost/") ;
        #post_to_url("http://192.168.1.145:8888/scrap/logpost/", { 'data': s,'origin': url });
        if $("#wikiframe").length is 0
          s = ""
          s = getSelText()
          
          #var s = prompt("Forget something?");
          s = "Nothing selected - Just scrap the url"  if s is ""
          s = encodeURIComponent(s)
          url = encodeURIComponent(window.location.href)
          if (s isnt "") and (s?)
            $("body").append "\t\t\t\t\t\t\t<div id='wikiframe'>\t\t\t\t\t\t\t\t<div id='wikiframe_veil' style=''>\t\t\t\t\t\t\t\t\t<p>Loading...</p>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<iframe src='http://192.168.1.145:8888/scrap/log?v=1.0&q=" + s + "&url=" + url + "' onload=\"$('#wikiframe iframe').slideDown(500);\">Enable iFrames.</iframe>\t\t\t\t\t\t\t\t<style type='text/css'>\t\t\t\t\t\t\t\t\t#wikiframe_veil { display: none; position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(255,255,255,.25); cursor: pointer; z-index: 900; }\t\t\t\t\t\t\t\t\t#wikiframe_veil p { color: black; font: normal normal bold 20px/20px Helvetica, sans-serif; position: absolute; top: 50%; left: 50%; width: 10em; margin: -10px auto 0 -5em; text-align: center; }\t\t\t\t\t\t\t\t\t#wikiframe iframe { display: none; position: fixed; top: 10%; left: 10%; width: 80%; height: 80%; z-index: 999; border: 10px solid rgba(0,0,0,.5); margin: -5px 0 0 -5px; }\t\t\t\t\t\t\t\t</style>\t\t\t\t\t\t\t</div>"
            $("#wikiframe_veil").fadeIn 750
        else
          $("#wikiframe_veil").fadeOut 750
          $("#wikiframe iframe").slideUp 500
          setTimeout "$('#wikiframe').remove()", 750
        $("#wikiframe_veil").click (event) ->
          $("#wikiframe_veil").fadeOut 750
          $("#wikiframe iframe").slideUp 500
          setTimeout "$('#wikiframe').remove()", 750

    #else
    )()
  v = "1.3.2"
  if window.jQuery is `undefined` or window.jQuery.fn.jquery < v
    done = false
    script = document.createElement("script")
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js"
    script.onload = script.onreadystatechange = ->
      if not done and (not @readyState or @readyState is "loaded" or @readyState is "complete")
        done = true
        initMyBookmarklet()

    document.getElementsByTagName("head")[0].appendChild script
  else
    initMyBookmarklet()
)()
