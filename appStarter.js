/**
 * Buradaki kod console yapistirilip run edilerek baslatilir.
 * Bu kod ile moduller yüklenir sayfaya ve esrisilir hale getirilir...
 * Asil islem yapilacak kodlar burada dahil edilen js dosyasindadir...
 *
 */

const urlChecker = { url: undefined };
window.checkFile = checkFile;
//ilgili urldeki js kodu sayfanin head kismina eklenir....
const url_getModuls =
  "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/getModuls_a62.js";
if (checkFile(url_getModuls,'m:appStarter, f:-')) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url_getModuls;
  //head taginin en sonuna yerlestirilir
  document.head.appendChild(script);
  //belirli bir ögeden hemen sonra bulunmasi istenilirse:
  let head = document.querySelector("head");
  head.insertBefore(script, head.firstChild);
}

/*
Dizin Yapisi:
📂
  |_📇appStarter.js         .../appStarter.js"📍
  |_📇getMosuls_*.js        .../getMosuls_*.js"  🟡
  |_📂WortApp               .../wortApp
    |_📇_importModuls_*.js  .../wortApp/_importModuls_*.js  
    |_📂module                  ./module
    |_📇_Documents_*.js         ./module/_Documents_*.js 
    |_📇_img_*.js               ./module/_img_*.js 
    |_📇_lang_*.js              ./module/_lang_*.js
    |_📇_wortList_*.js          ./module/_wortList_*.js   
    |_📇_wortObj_*.js           ./module/_wortObj_*.js
    |_📇_zBase_*.js             ./module/_zBase_*.js
    |_📇wortList.json           ./module/wortList.json    
*/

/* --- cdn dosya yolunun gecerli olup olmadigini kontrol eder --- */
//islem sonrasi kontrol icin sonuc url eslestirilerek bu nesneden check edilir.

async function checkFile(url, pos = "") {
  urlChecker.url = false; //obje degeri default hale getirilir...
  await fetch(url)
    .then((response) => {
      if (response.status === 404) throw 404;
      urlChecker.url = true; //url erisilebilir...
    })
    .catch((err) => {
      if (err === 404) {
        console.log(
          `Dosya konumu hatali! url'yi kontrol edin ${pos}.\n${url}`,
          err
        );
      } else {
        console.log("Hata meydana geldi! (m:appStarter, f:checkFile)", err);
      }
    });
}


