/**
Kullanilacak tüm ögeler ilgili modul icinden export islemi sonrasi burada import edilir....

son kontrol:
genetiv kismini tam olarak alinmali....

*/

/**  --- import edilen ögeler --- */
import { runApp } from "./module/_creatWortObj_e11.js"; //HTML'den wort nesnesinin icerigini toplar
import { getDoc } from "./module/_documents_b11.js"; //document/HTML dizin olarak ham verileri tutar
import { getWortObject } from "./module/_getWortObj_b09.js"; //HTML  olarak alinan dizin ögelerini nesne olusturmaya yönlendirir
import { getImg } from "./module/_img_b03.js"; //image islemlerini yapar
import { getLang } from "./module/_lang_b01.js"; //dil islemlerini yapar
import { getWorteList } from "./module/_wortList_c010.js"; //kullanilacak kelimleri alir
import { baseFun } from "./module/_zBase_c17.js"; //bu bir dizin altindaki tüm ögleri 'base' adli degiskene export eder...
//import sonrasi ilgili ögeler yürütülür...

let maxTime = 1500;

async function appRun() {
  console.clear();
  await controller()
    .then((result) => {
      if (result) {
        let tryAgain = window.confirm(
          "Girilen kelimeler icin islem yapildi!\nIslem tekrarlansin mi?"
        );
        if (!tryAgain)
          return console.warn(
            "Kelimeler icin islem tekrarlanmasi iptal edildi.\n",
            worteList
          );
        return finish(); //son alinan wortObj tekrar ekrana basilir...
      }
      console.log("liste degisti, yeniden cagrilacak...");
      console.log("🚩running... ▱▱▱▱▱▱▱▱▱▱▱ 0%"); //baslama bildirimi...
      storage.remove("lastWortList");
      getHTMLdoc();
    })
    .catch((error) => {
      if (error === "notWort") {
        console.warn(
          "Islem yapilacak kelime bulunamadi!\n'neueAbfrage' ile yeni kelime girisi yapin!"
        );
      } else {
        console.log(error);
      }
    });
}

//sayfada modulün olup olmadigini, varsa kelime listesinin
async function controller() {
  return new Promise((resolve, reject) => {
    if (neueAbfrage == "") reject("notWort");
    if (typeof worteList === "undefined") {
      const worteList = [];
      window.worteList = worteList;
    }
    worteList = new Set (neueAbfrage.split(","));
    const lastWortList = storage.get("lastWortList")
      ? storage.get("lastWortList").value
      : [];
    resolve(
      worteList.length === lastWortList.length &&
        worteList.every((val, index) => val === lastWortList[index])
    );
  });
}

async function loadBase() {
  return new Promise((resolve, reject) => {
    window.appRun = appRun;
    baseFun();
    let duration = 10;
    setTimeout(() => {
      if (typeof item === "object") resolve();
      reject(
        `baseFun modülü ${duration} ms icerisinde sayfaya import edilemedi!\nSüreyi artirarak dene! Hata devam etmesi halinde modul pathini check et.(m:importModul, f:loadBase)`
      );
    }, duration);
  });
}

/*
async function  _worteList  () {
  getWorteList();
  item.search("byController.wortList", item.typ.variabel, getHTMLdoc,maxTime);
};
*/

async function getHTMLdoc() {
  //delete byController.wortList
  maxTime = worteList.length < 5 ? maxTime : 500 * worteList.length;
  if (typeof HTMLdocs !== "undefined") HTMLdocs.length = 0; //doc sifirlanir
  getDoc();
  item.search(" byController.docs", item.typ.variabel, wortObj, maxTime);
}
async function wortObj() {
  delete byController.docs;
  getWortObject(runApp);
  item.search("byController.worts", item.typ.variabel, get_langTR, maxTime);
}

//wortObjsArr dizininde tutulunan wortObj'ler icin lang_TR durumu kontrol edilir ve yoksa gapi ile Türkcesi alinir.
async function get_langTR() {
  delete byController.worts; //kontrol islemi sonrasi controlObj'deki worts property kaldirilir...
  getLang(); //Türkce karsiligi...
  item.search("byController.trLang", item.typ.variabel, get_Image, maxTime);
}

async function get_Image() {
  delete byController.trLang; //kontrol islemi sonrasi controlObj'deki trLang property kaldirilir...
  getImg(); //görseller alinir...
  item.search("byController.image", item.typ.variabel, finish, maxTime);
}

async function finish() {
  delete byController.image;
  storage.set("lastWortList", worteList, 3);
  console.clear();
  msg.allPrint();
  //sonuclar ekrana basilir...
  wortObjsArr.forEach((w) => {
    let result = new Promise((resolve) => {
      msg.group(1, w.wrt.wort, " kelimesi icin alinan sonuclar:");
      console.log(JSON.stringify(w));
      console.dir(w);
      resolve();
    });
    result.then(msg.group());
  });
}

await loadBase()
  .then(appRun())
  .catch((err) => {
    console.log(err, "m:getModuls, p:loadBase.then()");
  });

//_______________________-

/* --- cdn dosyasini kontrol eder --- */
/*
async function checkFile(url, pos = "(m:appStarter, f:checkFile)") {
  urlChecker.url = false; //obje degeri default hale getirilir...
  await fetch(url)
    .then((response) => {
      if (response.status === 404) throw 404;
      urlChecker.url = true;
    })
    .catch((err) => {
      let txt_404 = [
          "warn",
          `Dosya konumu hatali! Url'yi kontrol edin. ${pos}\n${url}\n`,
        ],
        txt_e = ["error", `Hata meydana geldi! ${pos}\n`],
        txt = err === 404 ? txt_404 : txt_e;
      window.console[txt[0]](txt[1], err);
    });
}
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
