function loadContent(page){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",page,true);
    xhr.onreadystatechange=function(){
        console.log("ReadyState:",xhr.readyState,"Status:",xhr.status);
        if(xhr.readyState ==4){
            if(xhr.status ==200){
       
            document.getElementById("content").innerHTML= xhr.responseText;
        }
        else
        {
            console.error("Error loading"+page +"(Status:" + xhr.status +")");
        }
    }
    };
    xhr.send();
 }
    