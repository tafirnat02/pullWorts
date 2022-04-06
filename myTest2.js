var ele = document.querySelector("body > article > div:nth-child(1) > div.rAbschnitt > div > h2")
ele.addEventListener("click", myFunction);
var drm=true
function myFunction() {
    if(drm){
        ele.innerHTML = "Bana Tikladin!";
            drm =false
    }else{
        ele.innerHTML = "YOU CLICKED ME!";
            drm =true
    }
    console.log("msj degistirildi-333")
}




