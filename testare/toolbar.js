if (typeof debug === 'undefined')  var debug=false;
var Cookie = {ring:true, theme:"light",class:"4b"};
var version="1.05 01112019";
var WindowOrientation=1   ;//0-Landscape, 1-Portrait 
//*****************************			
function btn_typeTimetable_show(){
if (document.getElementById("dropdown-content_typeTimetable").style.display== "inline")
	document.getElementById("dropdown-content_typeTimetable").style.display = "none";	
else	
	document.getElementById("dropdown-content_typeTimetable").style.display = "inline";	
}

function btn_typeTimetable_select(){
document.getElementById("dropdown-content_typeTimetable").style.display = "none";	
}	
//*****************************	
function btn_class_select(){
document.getElementById("classes").style.display = "none";
a_class=event.srcElement;
classIDstring = a_class.id.split("_");
if (classIDstring[1] != Cookie.class)
	{
	Cookie.class=classIDstring[1];
	setCookie("class", Cookie.class, 365);	
	btn_class_set(Cookie.class);
	document.getElementById("btn_class").innerHTML=a_class.innerHTML;
	ReadXMLSubject();
	}	
}
function btn_class_show(){
if (document.getElementById("classes").style.display== "inline")
	document.getElementById("classes").style.display = "none";	
else	
	document.getElementById("classes").style.display = "inline";	
}
//*****************************
function btn_class_set(idClass){
//*****************************
document.getElementById('btn_class').innerHTML=idClass;}	
//*****************************
function btn_sound_onclick(){
if (debug) console.log("btn_sound.onclick"); 
Cookie.ring=!Cookie.ring;
setCookie("ring", Cookie.ring, 365);
btn_sound_set_image();
}	
function btn_sound_set_image(){
if (debug) console.log("btn_sound_set_image() Cookie.ring="+Cookie.ring);	
var new_style="bell_"
if (Cookie.ring)new_style+="on";else new_style+="off";
if (debug) console.log("btn_sound_set_image() "+new_style); 
document.getElementById('btn_sound').className=new_style;
}
//*********************************
function toolbar_onload() {
//*****************************
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){if (this.readyState == 4 && this.status == 200)ReadXML(this);};
xhttp.open("GET", "schtt.xml", true);
xhttp.send();
checkCookie();
}
//*****************************
function checkCookie() {
//*****************************
//Ring
var ring = getCookie("ring");  
if (debug) console.log("checkCookie() ring="+ring); 
if (ring == "") 
	setCookie("ring", Cookie.ring, 365);
else
	Cookie.ring=(/true/i).test(ring) ;
if (debug) console.log("checkCookie() Cookie.ring="+Cookie.ring);
btn_sound_set_image();
//Class
var TimeTableClass = getCookie("class");  
if (TimeTableClass == "") 
	setCookie("class", Cookie.class, 365);
else
	Cookie.class=TimeTableClass;
btn_class_set(Cookie.class);
}  
//*****************************
function setCookie(cname, cvalue, exdays) {
//*****************************	
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//*****************************
function getCookie(cname) {
//*****************************	
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}