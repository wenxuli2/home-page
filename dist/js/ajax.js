function ajax(t,e,n){var s;(s=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")).open("GET",t,!0),s.send(),s.onreadystatechange=function(){4==s.readyState&&(200==s.status?e(s.responseText):n&&n(s.status))}}