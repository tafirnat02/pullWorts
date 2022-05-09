/**
 * Buradaki kod console yapistirilip run edilerek baslatilir.
 * 
 * Bu kod ile moduller yüklenir sayfaya ve esrisilir hale getirilir...
 * Asil islem yapilacak kodlar burada dahil edilen js dosyasindadir...
 * 
 */

//ilgili urldeki js kodu sayfanin head kismina eklenir....
let script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/getModuls_00.js";
//head taginin en sonuna yerlestirilir
document.head.appendChild(script);
//belirli bir ögeden hemen sonra bulunmasi istenilirse:
  let head = document.querySelector('head')
  head.insertBefore(script, head.firstChild);

