/**
Kullanilacak tüm ögeler ilgili modul icinden export islemi sonrasi burada import edilir....
*/

/**  --- import edilen ögeler --- */

//import {myFunc} from "./module/_img_a00" //image islemlerini yapar
//import {myFunc} from "./module/_lang_a00" //dil islemlerini yapar
//import {myFunc} from "./module/_wortObj_a00" //document/HTML verilerini wort Classndan nesneye dönderir
import { getWortList } from "./module/_wortList_b08.js"; //kullanilacak kelimleri alir
import { baseFun } from "./module/_zBase_b02.js"; //bu bir dizin altindaki tüm ögleri 'base' adli degiskene export eder...
import {getDoc} from "./module/_documents_a04.js" //document/HTML dizin olarak ham verileri tutar
//import sonrasi ilgili ögeler yürütülür...


//uygulama ana verilerindeki fonksiyonlar yüklenir asycn ile sirali olarak
const base=async()=>{ baseFun()}
const worts=async()=>{getWortList()}
const docs=async()=>{getDoc()}

//daha sonra dahil edilen 
(async()=>{
  await base()
  await  worts()
  console.log(wortList)
  await  docs()
  
})
/*
const starter = async () => {
    //uygulama ana verileri yüklenir...
      
     
};



  const getModule = async () => {
    //modullerdeki nesneler run edilir...
    let promise = new Promise((resolve,reject)=>{
       
       resolve("done!")
    })
      
  };
  //daha sonra ilgili ögeler yürütülür....
  getModule()
  .then(() => {
    debugger
    console.log('importModule>>', wortList)
    window.starter = starter;
    //window.wortList = wortList; //globale aktarilir bu array...
    runBar.set(1); //%10 durumu...
  })
  .then(()=>{
    console.log('++++-->', wortList)
    //getDoc() //HTMLdocs=[], olarak kelimelerin sayfasi HTMLdocumeta aktarilir...
    //runBar.set(2); //%10 durumu...
  })

starter.call()//yüklenmekle yürütülecek ögeler atanir...
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
