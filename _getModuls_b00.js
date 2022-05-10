/* Bu kod ile =="importModules"== dosyasi sayfaya dahil eder */

const urlChecker = { url: undefined }, //dosya konumu kontrol edilip, moduller sayfaya dahil edilir...
  url_importModuls =
    "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/_importModuls_b00.js";

if (checkFile(url_importModuls, "m:getModuls, f:importModuls")) {
  //url gecerli ise moduller sayfaya aktarilir
  let scrpt = document.createElement("script");
  scrpt.type = "module";
  scrpt.src = url_importModuls;
  document.head.appendChild(scrpt);
  let head_ = document.querySelector("head");
  head_.insertBefore(scrpt, head_.lastChild);
  console.log("🚩running... ▰▱▱▱▱▱▱▱▱▱▱ 10%");
}

/*
Dizin Yapisi:
📂
  |_📇appStarter.js         .../appStarter.js"
  |_📇getMosuls_*.js        .../getMosuls_*.js"  📍
  |_📂WortApp               .../wortApp
    |_📇_importModuls_*.js  .../wortApp/_importModuls_*.js  🟡
    |_📂module                  ./module
        |_📇_Documents_*.js         ./module/_Documents_*.js 
        |_📇_img_*.js               ./module/_img_*.js 
        |_📇_lang_*.js              ./module/_lang_*.js
        |_📇_wortList_*.js          ./module/_wortList_*.js   
        |_📇_wortObj_*.js           ./module/_wortObj_*.js
        |_📇_zBase_*.js             ./module/_zBase_*.js
        |_📇wortList.json           ./module/wortList.json   
*/

/* --- cdn dosya yolunun gecerli olup olmadigini kontrol eder --- */
//islem sonrasi kontrol icin sonuc url eslestirilerek bu nesneden check edilir...
async function checkFile(url, pos) {
  urlChecker.url = false; //obje degeri default hale getirilir...
  await fetch(url)
    .then((response) => {
      if (response.status === 404) throw 404;
      urlChecker.url = true; //url erisilebilir ise true atanir...
    })
    .catch((err) => {
      if (err === 404) {
        console.log(
          `Dosya konumu hatali! url'yi kontrol edin ${pos}.\n${url}`,
          err
        );
      } else {
        console.log("Hata meydana geldi! (m:appStarter, f:checkFile)", err);
      }
    });
}

//ilerleme yüzdesini gösterir
function runBar(index=""){
  console.clear()
  if(index!=="") console.log(msgStatus[index])
}
