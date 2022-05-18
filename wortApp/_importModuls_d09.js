/**
Kullanilacak tüm ögeler ilgili modul icinden export islemi sonrasi burada import edilir....
*/

/**  --- import edilen ögeler --- */

import { baseFun } from "./module/_zBase_b09.js"; //bu bir dizin altindaki tüm ögleri 'base' adli degiskene export eder...
import { getWorteList } from "./module/_wortList_b17.js"; //kullanilacak kelimleri alir
import { getDoc } from "./module/_documents_a07.js"; //document/HTML dizin olarak ham verileri tutar
//import {getWortObject} from "./module/_getWortObj_a04"; //HTML  olarak alinan dizin ögelerini nesne olusturmaya yönlendirir
//import {newWortObject} from "./module/_creatWortObj_a04" //HTML'den wort nesnesinin icerigini toplar
//import {myFunc} from "./module/_lang_a00" //dil islemlerini yapar
//import {myFunc} from "./module/_img_a00" //image islemlerini yapar
//import sonrasi ilgili ögeler yürütülür...

const loadBase = () => {
  return new Promise((resolve, reject) => {
    baseFun();
    let duration = 10;
    setTimeout(() => {
      if (typeof item === "object") resolve();
      reject(`baseFun() modülü ${duration} ms icerisinde sayfaya import edilemedi!
      Süreyi artirarak dene! Hata devam etmesi halinde modul pathini check et.`);
    }, duration);
  });
};

const _worteList = () => {
  getWorteList();
  item.search("worteList", item.typ.variabel, getHTMLdoc);
};

const getHTMLdoc = () => {
  getDoc();
  item.search("HTMLdocs", item.typ.variabel, wortObj);
};

const wortObj = () => {
  console.log("tüm ögeler yüklendi...");
  console.log(worteList);
  console.log(HTMLdocs);
  
  getWortObject(newWortObject)
};

loadBase()
  .then(_worteList())
  .catch((err) => {
    console.log(err, "m:getModuls, p:loadBase.then()");
  });




/*  
notlar
buradaki kodalar dahil edilenler itibariyle düzgün calismakta....

promis zinci yapisi olarak asagidaki kullanilabilir
*/

const first=()=> {
  return new Promise((resolve) => {
    console.log("1st");
    resolve();
  });
}

const second=()=> {
  return new Promise((resolve) => {
    console.log("2nd");
    resolve();
  });
}

const third=()=> {
  console.log("3rd");
}

first().then(second().then(third()));






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
