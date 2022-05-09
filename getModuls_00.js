
/*
 * Bu file, 'appStarter,js' ile görüntülenen web sayfasina buradaki =="importModules"== dosyasi
 *  icerisnde bildirilen modlulleri sayfaya dahil eder
 * 
 */
let scrpt = document.createElement('script');
//script.type = 'text/javascript';
scrpt.type = 'module';
scrpt.src = "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/_importModuls_a01.js";
//head taginin en sonuna yerlestirilir
document.head.appendChild(scrpt);
//belirli bir ögeden hemen sonra bulunmasi istenilirse:
  let head_ = document.querySelector('body')
  head_.insertBefore(scrpt, head_.firstChild);
  console.log('run import module...')
