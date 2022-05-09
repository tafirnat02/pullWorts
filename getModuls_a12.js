/*
 * Bu file, 'appStarter,js' ile görüntülenen web sayfasina buradaki =="importModules"== dosyasi
 *  icerisnde bildirilen modlulleri sayfaya dahil eder
 *
 */
const url_importModuls =
  "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/_importModuls_a09.js";

//dosya konumu kontrol edilip, moduller sayfaya dahil edilir...  
if (checkFile(url_getModuls)) {
//moduller sayfaya aktarilir
let scrpt = document.createElement("script");
scrpt.type = "module";
scrpt.src = url_importModuls;
document.head.appendChild(scrpt);
let head_ = document.querySelector("body");
head_.insertBefore(scrpt, head_.firstChild);
console.log("run import module...");
}

/*
Dizin Yapisi:
📂
  |_📇appStarter.js         .../appStarter.js"
  |_📇getMosuls_*.js        .../getMosuls_*.js"  📍
  |_📂WortApp               .../wortApp
    |_📇_importModuls_*.js  .../wortApp/_importModuls_*.js  🟡
    |_📂module                  ./module
    |_📇_Documents_*.js         ./module/_Documents_*.js 
    |_📇_img_*.js               ./module/_img_*.js 
    |_📇_lang_*.js              ./module/_lang_*.js
    |_📇_wortList_*.js          ./module/_wortList_*.js   
    |_📇_wortObj_*.js           ./module/_wortObj_*.js
    |_📇_zBase_*.js             ./module/_zBase_*.js
    |_📇wortList.json           ./module/wortList.json    
*/
