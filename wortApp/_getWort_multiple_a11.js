
//ilgili urldeki js kodu sayfanin head kismina eklenir....
let script = document.createElement('script');
//script.type = 'text/javascript';
script.type = 'module';
script.src = "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/_getWort_multipleMod_test1.js";
//head taginin en sonuna yerlestirilir
document.head.appendChild(script);
//belirli bir ögeden hemen sonra bulunmasi istenilirse:
  let bdy = document.querySelector('body')
  bdy.insertBefore(script, bdy.firstChild);

  
console.log('me..ok..')




