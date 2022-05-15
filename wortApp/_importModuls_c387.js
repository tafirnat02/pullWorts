/**
Kullanilacak tüm ögeler ilgili modul icinden export islemi sonrasi burada import edilir....
*/

/**  --- import edilen ögeler --- */

import { baseFun } from "./module/_zBase_b07.js"; //bu bir dizin altindaki tüm ögleri 'base' adli degiskene export eder...
import { getWortList } from "./module/_wortList_b16.js"; //kullanilacak kelimleri alir
import { getDoc } from "./module/_documents_a06.js"; //document/HTML dizin olarak ham verileri tutar
//import {getWortObject} from "./module/_getWortObj_a03"; //HTML  olarak alinan dizin ögelerini nesne olusturmaya yönlendirir
//import {newWortObject, testASCVBG} from "./module/_creatWortObj_a02" //HTML'den wort nesnesinin icerigini toplar
//import {myFunc} from "./module/_lang_a00" //dil islemlerini yapar
//import {myFunc} from "./module/_img_a00" //image islemlerini yapar
//import sonrasi ilgili ögeler yürütülür...

const loadBase = () => {
  return new Promise((resolve, reject) => {
    baseFun();
    let duration =10
    setTimeout(() => {
      if (typeof item === "object") resolve();
      reject(`baseFun() modülü ${duration} ms icerisinde sayfaya import edilemedi!
      Süreyi artirarak dene! Hata devam etmesi halinde modul pathini check et.`);
    }, duration);
  });
};


const getWortList=()=>{
    getWortList()
    item.search(wortList,item.typ.variabel,getHTMLdoc)
  } 
  
const getHTMLdoc=()=>{
  getDoc()
  item.search(HTMLdocs,item.typ.variabel,finish)
}

const finish=()=>{
  console.log('tüm ögeler yüklendi...')
  console.log(wortList)
  console.log(HTMLdocs)
}


loadBase()
.then(
  getWortList()
)
.catch(err=>{
  console.log(err,'m:getModuls, p:loadBase.then()')
})


/*
const base2 = async () => {
  return new Promise((resolve) => {
    resolve(baseFun.call());
  });
};
const load = async () => {
  return new Promise((resolve) => {
    getWortList(); //kelimeler dahil edilir
    runBar.set(1);
  });
};

const next = async () => {
  return new Promise((resolve) => {
    console.log("run me...");
    console.log(HTMLdocs);
  });
};

const runApp = async () => {
  await base();
  await load();
  await next();
};

runApp.call();
*/
/*
base
.then(()=>{
  getWortList(); //kelimeler dahil edilir
  runBar.set(1);
})
.then(()=>{
  item.search('wortList',1, getDoc) // wortList check edilerek --> kelimelere ait sayfanin HTML'i alinir...
})
.then(()=>{
  console.log('run me...')
  console.log(HTMLdocs)
  //item.search('HTMLdocs',1, getWortObject) //newWortObject) //HTMLdocs check edilir > sonra, getWortObject funksiyonu calistirilir, callback olarak da newWortObject gönderilir... 
})
.catch(err=>{
  console.log(err)
})

*/

/*
const base=async()=>{ baseFun()}      //baz kodlar dahil edilir
const worts=async()=>{getWortList();  //kelimeler dahil edilir
                      runBar.set(1); }
//wortList varligi check edildikten sonra getDoc yürütülür...
const docs=async()=>{item.search('wortList',1, getDoc)}   //kelimelere ait sayfanin HTML'i alinir

        //burada kalindi....
//HTMLdocs varligi check edildikten sonra  . .. . . siradaki fonksiyon atanacak

//sub asycn yapi
const load=async()=>{
  await base()
  await worts()
}

//ana asycn yapi
(async()=>{
  await  load()
  await docs()
  
  //burada kalindi....
  // ---> kelimelere ait sayfanin HTML'i aldiktan sonrakine ait asycn olarak fonksiyon cagrilmali,,,
  
  //await  docs()
}).call()

*/

/*

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
