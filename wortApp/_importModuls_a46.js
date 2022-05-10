
/**
Kullanilacak tüm ögeler ilgili modul icinden export islemi sonrasi burada import edilir....
*/

/**  --- import edilen ögeler --- */
//import {myFunc} from "./module/_Documents_a00" //document/HTML dizin olarak ham verileri tutar
//import {myFunc} from "./module/_img_a00" //image islemlerini yapar
//import {myFunc} from "./module/_lang_a00" //dil islemlerini yapar
//import {myFunc} from "./module/_wortObj_a00" //document/HTML verilerini wort Classndan nesneye dönderir
import {getWortList, wortList} from "./module/_wortList_a23.js" //kullanilacak kelimleri alir
import {test,setGlobal, msgStatus} from "./module/_zBase_a15.js" //bu bir dizin altindaki tüm ögleri 'base' adli degiskene export eder...

/**  --- ekran bildirimi--- */
//console.log('🚩 running...',msgStatus[0])
/* --- import islemi sonrasi "windows." nesnesi altinda Global Scope tasinan ögeler --- */
setGlobal(test,getWortList,wortList,msgStatus)

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

// bir nesneyi, window/this nesnesine ait property olarak globa scope tasir...
//tek seferde ard ardina 10'a kadar öge scope atilabilir
function setGlobal(
  item0 = "",
  item1 = "",
  item2 = "",
  item3 = "",
  item4 = "",
  item5 = "",
  item6 = "",
  item7 = "",
  item8 = "",
  item9 = ""
) {
  debugger
  for (let index = 0; index < 10; index++) {
    if (eval(`item${index}`) == "") break;
    let item = eval(`item${index}`);
    this[item.name] = item;
  }
}

