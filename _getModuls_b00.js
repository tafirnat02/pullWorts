/*  Uygulamanin baslatilmasi:
      1- wortList=[]  dizinine kelime(ler)i girdikten sonra,
      2- buradaki kod yürütülmeli...
    ______
      a- Bu kod dosyaya dahil edildikten sonra 1 numarali islem tekrarlasnir
      b- starter() foksiyonu ardindan cagrilarak yeni kelimeler icin islem tekrarlanir....
    _____
      Eger server 249 sebebiyle islem yarida kalirsada:
      starter(indexNo) girilerek kalan kisimdan yürütülebilir... Veya bu storage ile halledilecek.... [>> Bu yapilacak]
*/

const urlChecker = { url: undefined }, //dosya konumu kontrol edilip, moduller sayfaya dahil edilir...
  url_importModuls =
    "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/_importModuls_d38.js";
    
if (!checkFile(url_importModuls, "m:getModuls, f:importModuls"))
  () => {
    return false;
  }; //dosya yoksa cikis yapilir

//sayfada yüklü olup olmadigi kontrol edilir
if (
  !!document.querySelector(`script[type="module"][src="${url_importModuls}"]`)
)
  () => {
    starter.call(); //yüklenmis ise sonraki islemler isin starter() cagrilir...
  };
//sayfada olmadiginda, url kontrol edilir ve moduller sayfaya aktarilir
let scrpt = document.createElement("script");
scrpt.type = "module";
scrpt.src = url_importModuls;
document.head.appendChild(scrpt);
let head_ = document.querySelector("head");
head_.insertBefore(scrpt, head_.lastChild);
console.clear()
console.log("🚩running... ▱▱▱▱▱▱▱▱▱▱▱ 0%"); //baslama bildirimi...
/* --- cdn dosya yolunun gecerli olup olmadigini kontrol eder --- */
async function checkFile(url, pos="") {
  urlChecker.url = false; //obje degeri default hale getirilir...
  await fetch(url)
    .then((response) => {
      if (response.status === 404) throw 404;
      urlChecker.url = true; //url erisilebilir ise urlChecker.url nesnesine true atanir...
    })
    .catch((err) => {
      if (err === 404) {
        console.log(
          `Hatali dosya konumu! Url'yi kontrol edin. ${pos}\n${url}`,
          err
        );
      } else {
        console.log("Hata meydana geldi! (m:appStarter, f:checkFile)", err);
      }
    });
}

/* örnek asycn */
/*
async function test23(val) {
  setTimeout(() => {
    console.log(val);
    return 55;
  }, 1500);
}

await test23("testVal")
.then((val) => {
  console.log("val", val);
});
*/

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
