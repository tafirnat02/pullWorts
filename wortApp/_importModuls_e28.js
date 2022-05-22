/**
Kullanilacak tüm ögeler ilgili modul icinden export islemi sonrasi burada import edilir....
*/

/**  --- import edilen ögeler --- */

import { baseFun } from "./module/_zBase_b20.js"; //bu bir dizin altindaki tüm ögleri 'base' adli degiskene export eder...
import { getWorteList } from "./module/_wortList_b19.js"; //kullanilacak kelimleri alir
import { getDoc } from "./module/_documents_a11.js"; //document/HTML dizin olarak ham verileri tutar
import { getWortObject } from "./module/_getWortObj_a29.js"; //HTML  olarak alinan dizin ögelerini nesne olusturmaya yönlendirir
import { runApp } from "./module/_creatWortObj_2_a13.js"; //HTML'den wort nesnesinin icerigini toplar
import { getLang } from "./module/_lang_a11.js"; //dil islemlerini yapar
//import {myFunc} from "./module/_img_a00" //image islemlerini yapar
//import sonrasi ilgili ögeler yürütülür...

const loadBase = async () => {
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

const _worteList = async () => {
  getWorteList();
  item.search("worteList", item.typ.variabel, getHTMLdoc);
};

const getHTMLdoc = async () => {
  getDoc();
  item.search("HTMLdocs", item.typ.variabel, wortObj);
};

const wortObj = async () => {
  getWortObject(runApp);
  item.search("byController.worts", item.typ.variabel, get_langTR);
};

//wortObjsArr dizininde tutulunan wortObj'ler icin lang_TR durumu kontrol edilir ve yoksa gapi ile Türkcesi alinir.
const get_langTR = async () => {
  delete byController.worts; //kontrol islemi sonrasi controlObj'deki worts property kaldirilir...
  getLang(); //Türkce karsiligi...
};

await loadBase()
  .then(_worteList())
  .catch((err) => {
    console.log(err, "m:getModuls, p:loadBase.then()");
  });

/*  
notlar
buradaki kodalar dahil edilenler itibariyle düzgün calismakta....

promis zinci yapisi olarak asagidaki kullanilabilir


const first = () => {
  return new Promise((resolve) => {
    console.log("1st");
    resolve();
  });
};

const second = () => {
  return new Promise((resolve) => {
    console.log("2nd");
    resolve();
  });
};

const third = () => {
  console.log("3rd");
};

first().then(second().then(third()));
*/

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
