javascript: (function () {
    s = '<script type="text/javascript">function displayLink() { str="Links<br/>"; chkBoxes = document.getElementsByName("chkImage"); for(var i=0;i<chkBoxes.length;i++) { if(chkBoxes[i].type == "checkbox") { if(chkBoxes[i].checked == true) { str+= "<a href="+getImgURL(chkBoxes[i].id)+">"+getImgURL(chkBoxes[i].id)+"</a><br/>";}}} document.getElementById("divLink").innerHTML = str; } function getImgURL(txt) {i = txt.indexOf("imgurl");if (i > 0) {if (txt.indexOf("&",i) > 0) txt = txt.substring(i+7,txt.indexOf("&",i));else if (txt.indexOf("&",i) > 0) txt = txt.substring(i+7,txt.indexOf("&",i));}return txt;} function checkAll(state){ chkBoxes = document.getElementsByName("chkImage"); for(var i=0;i<chkBoxes.length;i++) { if(chkBoxes[i].type == "checkbox") chkBoxes[i].checked = state;} displayLink(); }</script><style>.width{float:left;width:23%;max-height:25%;border-style:dotted;border-width:thin;margin:2px} .width img { max-width:90%; max-height:100%; padding:5px; margin:auto; vertical-align:text-top}</style>';
    s += '<div id="divLink" style="width:80%;height:180px;position:fixed;background-color:white;overflow:auto;border-style:solid;border-width:medium;padding:5px;">Links</div><div style="height:200px"></div><input type="button" value="Check All" onclick="checkAll(true)"/><input type="button" value="Uncheck All" onclick="checkAll(false)"/>';
    cnt = 0;
    for (i = 0; i < document.images.length; i++) {
        if (document.images[i].src == '' || document.images[i].width < 30 || document.images[i].height < 30) continue;
        if (cnt++ % 4 == 0) {
            s += '<div style="clear: both"></div>'
        };
        imgURL = document.images[i].src;
        if (imgURL.indexOf("4walled") > 0) imgURL = imgURL.replace("thumb", "src");
        if (document.images[i].parentNode.tagName == 'A') {
            refImg = decodeURIComponent(document.images[i].parentNode.href);
            if (refImg.indexOf("imgurl") > 0) imgURL = refImg;
        }
        s += '<div class="width"><input type="checkbox" name="chkImage" id="' + imgURL + '" onchange="displayLink()"/><img src="' + document.images[i].src + '"></div>';
    };
    if (s != '') {
        document.open("text/html");
        document.write(s);
        document.close();
    } else {
        alert('No images!');
    }
})()