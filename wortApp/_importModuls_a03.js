
/**
 * Burada ilgili moduller icerisndeki fonksion, obje, degiskenleri sayfaya dahil edel ve 
 * window.* ile global bir degisken olarak atar...
 */

//import {myFunc} from "./module/_Documents_a00" //document/HTML dizin olarak ham verileri tutar
//import {myFunc} from "./module/_img_a00" //image islemlerini yapar
//import {myFunc} from "./module/_lang_a00" //dil islemlerini yapar
//import {myFunc} from "./module/_wortObj_a00" //document/HTML verilerini wort Classndan nesneye dönderir
import {wortList,getWort} from "./module/_wortList_a04" //kullanilacak kelimleri alir
//import {myFunc} from "./module/_zBase_a00" //genel kullanilacak islemleri tutar
 
/*
windows.* ile bu degiskenlere consolden/browserdan erisimi istenilen 
    -degisken
    -obje
    -fonskiyon
    -dizin vs 
    hepsini burada window nesnesi altinda tanimlanmalidir.
*/
debugger
console.log('run wortApp moduls...')

//window.wortList = wortList
window.getWort=getWort






