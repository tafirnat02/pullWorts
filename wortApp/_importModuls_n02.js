/**
Kullanilacak tüm ögeler ilgili modul icinden export islemi sonrasi burada import edilir....

son kontrol:
genetiv kismini tam olarak alinmali....

storage yapisi icine tarih kontrolü konuldu
buna göre gecxen yerler düzeltilmeli
storage.get geriye key varsa localde tutulan objeyi yoksa false döndermekte

clone array localde tutulacak....
*/

/**  --- import edilen ögeler --- */
import { runApp } from "./module/_creatWortObj_e07.js"; //HTML'den wort nesnesinin icerigini toplar
import { getDoc } from "./module/_documents_b06.js"; //document/HTML dizin olarak ham verileri tutar
import { getWortObject } from "./module/_getWortObj_b05.js"; //HTML  olarak alinan dizin ögelerini nesne olusturmaya yönlendirir
import {getImg} from "./module/_img_b03.js" //image islemlerini yapar
import { getLang } from "./module/_lang_b01.js"; //dil islemlerini yapar
import { getWorteList } from "./module/_wortList_c010.js"; //kullanilacak kelimleri alir
import { baseFun } from "./module/_zBase_c17.js"; //bu bir dizin altindaki tüm ögleri 'base' adli degiskene export eder...
//import sonrasi ilgili ögeler yürütülür...

var maxTime=1500

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
  item.search("byController.wortList", item.typ.variabel, getHTMLdoc,maxTime);
};

const getHTMLdoc = async () => {
  delete byController.wortList
  maxTime = worteList.length < 5 ? maxTime : 300*worteList.length
  getDoc();
  item.search("HTMLdocs", item.typ.variabel, wortObj,maxTime);
};      

window.getHTMLdoc=getHTMLdoc //yüklendikten sonraki sorgu islemi balangicina erisim icin globale tasinir... 

const wortObj = async () => {
  getWortObject(runApp);
  item.search("byController.worts", item.typ.variabel, get_langTR,maxTime);
};

//wortObjsArr dizininde tutulunan wortObj'ler icin lang_TR durumu kontrol edilir ve yoksa gapi ile Türkcesi alinir.
const get_langTR = async () => {
  delete byController.worts; //kontrol islemi sonrasi controlObj'deki worts property kaldirilir...
  getLang(); //Türkce karsiligi...
  item.search("byController.trLang", item.typ.variabel, get_Image,maxTime);
};

const get_Image=async()=>{
  delete byController.trLang; //kontrol islemi sonrasi controlObj'deki trLang property kaldirilir...
  getImg() //görseller alinir...
  item.search("byController.image", item.typ.variabel, finish,maxTime);
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
