//Yeni aranacak kelimelerin arasina virgül konulmali
var neueAbfrage="";// ör:"Gemüse,Fenster,Tüte"

//modul import js dosyasi
const modulFiles = "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/_importModuls_n18.js"

try {
  appRun()
 } catch (error) {
  if (existFile(modulFiles)) loadModuls.call()
 }
 
 //sayfaya modulleri import eder
 function loadModuls(){return new Promise((resolve)=>{let head_ =
   document.querySelector("head"),scrpt = document.createElement("script"); 
   scrpt.type = "module";scrpt.src = modulFiles;document.head.appendChild(scrpt);
 head_.insertBefore(scrpt, head_.lastChild);resolve()});}

function existFile(url){
var http = new XMLHttpRequest();
http.open('HEAD', url, false);http.send();
 if(http.status===200) return true
     let txt_404 = ['warn',`Dosya konumu hatali! Url'yi kontrol edin.\n${url}\n`],
      txt_e=['error',`Hata meydana geldi!\n`],
      txt = http.status===404?txt_404:txt_e;
      window.console[txt[0]](txt[1],http) 
    return false
 }



 




 

