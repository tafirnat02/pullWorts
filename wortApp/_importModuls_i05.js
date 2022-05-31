/**
Kullanilacak tüm ögeler ilgili modul icinden export islemi sonrasi burada import edilir....

son kontrol:
genetiv kismini tam olarak alinmali....
*/

/**  --- import edilen ögeler --- */
import { runApp } from "./module/_creatWortObj_e07.js"; //HTML'den wort nesnesinin icerigini toplar
import { getDoc } from "./module/_documents_b02.js"; //document/HTML dizin olarak ham verileri tutar
import { getWortObject } from "./module/_getWortObj_b00.js"; //HTML  olarak alinan dizin ögelerini nesne olusturmaya yönlendirir
import {getImg} from "./module/_img_b02.js" //image islemlerini yapar
import { getLang } from "./module/_lang_b00.js"; //dil islemlerini yapar
import { baseFun } from "./module/_zBase_c13.js"; //bu bir dizin altindaki tüm ögleri 'base' adli degiskene export eder...
import { getWorteList } from "./module/_wortList_c03.js"; //kullanilacak kelimleri alir
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
  item.search("byController.trLang", item.typ.variabel, get_Image);
};

const get_Image=async()=>{
  delete byController.trLang; //kontrol islemi sonrasi controlObj'deki trLang property kaldirilir...
  getImg() //görseller alinir...
  item.search("byController.image", item.typ.variabel, finish);
}

const finish = async()=>{
  delete byController.image
  console.clear()
  msg.allPrint()
  //sonuclar ekrana basilir...
  wortObjsArr.forEach(w=>{
    let result=  new Promise((resolve) => {
      msg.group(1,w.wrt.wort,' kelimesi icin alinan sonuclar:')
      console.log(JSON.stringify(w))
      console.dir(w)
      resolve();
     });
     result.then(msg.group())
})
}

await loadBase()
  .then(_worteList())
  .catch((err) => {
    console.log(err, "m:getModuls, p:loadBase.then()");
  });
  
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
