
/**
Kullanilacak tüm ögeler ilgili modul icinden export islemi sonrasi burada import edilir....
*/

/**  --- import edilen ögeler --- */
//import {myFunc} from "./module/_Documents_a00" //document/HTML dizin olarak ham verileri tutar
//import {myFunc} from "./module/_img_a00" //image islemlerini yapar
//import {myFunc} from "./module/_lang_a00" //dil islemlerini yapar
//import {myFunc} from "./module/_wortObj_a00" //document/HTML verilerini wort Classndan nesneye dönderir
import {getWortList, wortList} from "./module/_wortList_a19.js" //kullanilacak kelimleri alir
import {test} from "./module/_zBase_a06.js" //genel kullanilacak islemleri tutar

/**  --- ekran bildirimi--- */
console.log("🚩 running... ≣⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮"); 

/* --- import islemi sonrasi "windows." nesnesi altinda Global Scope tasinan ögeler --- */
window.test=test  
window.getWortList=getWortList //kelime listesi alinir
window.wortList=wortList




/*
Dizin Yapisi:
📂
  |_📇appStarter.js         .../appStarter.js"
  |_📇getMosuls_*.js        .../getMosuls_*.js"  
  |_📂WortApp               .../wortApp
    |_📇_importModuls_*.js  .../wortApp/_importModuls_*.js  📍
    |_📂module                  ./module
    |_📇_Documents_*.js         ./module/_documents_*.js 
    |_📇_img_*.js               ./module/_img_*.js 
    |_📇_lang_*.js              ./module/_lang_*.js
    |_📇_wortList_*.js          ./module/_wortList_*.js   🟡
    |_📇_wortObj_*.js           ./module/_wortObj_*.js
    |_📇_zBase_*.js             ./module/_zBase_*.js      🟡
    |_📇wortList.json           ./module/wortList.json    
*/


