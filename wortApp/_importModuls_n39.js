/**
Kullanilacak tüm ögeler ilgili modul icinden export islemi sonrasi burada import edilir....

son kontrol:
genetiv kismini tam olarak alinmali....

*/

/**  --- import edilen ögeler --- */
import { runApp } from "./module/_creatWortObj_e11.js"; //HTML'den wort nesnesinin icerigini toplar
import { getDoc } from "./module/_documents_b15.js"; //document/HTML dizin olarak ham verileri tutar
import { getWortObject } from "./module/_getWortObj_b10.js"; //HTML  olarak alinan dizin ögelerini nesne olusturmaya yönlendirir
import { getImg } from "./module/_img_b04.js"; //image islemlerini yapar
import { getLang } from "./module/_lang_b02.js"; //dil islemlerini yapar
import { baseFun } from "./module/_zBase_c21.js"; //bu bir dizin altindaki tüm ögleri 'base' adli degiskene export eder...
//import { getWorteList } from "./module/_wortList_c010.js"; //kullanilacak kelimleri alir
//import sonrasi ilgili ögeler yürütülür...

//let maxTime = 1500;


async function loadBase() {
  return new Promise((resolve, reject) => {
    window.appStarter = appStarter;
    baseFun();
    let duration = 10;
    setTimeout(() => {
      if (typeof msg === "object") resolve();
      reject(
        `baseFun modülü ${duration} ms icerisinde sayfaya import edilemedi!\nSüreyi artirarak dene! Hata devam etmesi halinde modul pathini check et.(m:importModul, f:loadBase)`
      );
    }, duration);
  });
}

async function appStarter() {
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

    //if (typeof worteList === "undefined") new Promise(res => {const worteList = []; window.worteList = worteList; res()});
    if (typeof worteList === "undefined") {
      const worteList = [];
      window.worteList = worteList;
      window.callNext =()=>{}
    }
    worteList.length=0
    worteList = [...new Set (neueAbfrage.replaceAll(" ","").split(","))];

    if(typeof wortObjsArr === "undefined") resolve(false)
    const lastWortList = storage.get("lastWortList")
      ? storage.get("lastWortList").value
      : [];
    resolve(
      worteList.length === lastWortList.length &&
        worteList.every((val, index) => val === lastWortList[index])
    );
  });
}

async function getHTMLdoc() {
  if (typeof HTMLdocs !== "undefined") HTMLdocs.length = 0; //doc sifirlanir
  callNext= wortObj
  getDoc();
}
async function wortObj() {
  callNext=get_langTR
  getWortObject(runApp);
}

//wortObjsArr dizininde tutulunan wortObj'ler icin lang_TR durumu kontrol edilir ve yoksa gapi ile Türkcesi alinir.
async function get_langTR() {
  callNext =get_Image;
  getLang(); //Türkce karsiligi...
}

async function get_Image() {
  callNext =finish
  getImg(); //görseller alinir...
}

async function finish() {
  callNext =()=>{}
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
  .then(appStarter())
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
