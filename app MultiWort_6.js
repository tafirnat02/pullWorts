// getWortObj de kalindi -------------

/**
 * düzgün calisiyor ancak onun islemi beklenmeden MultiplWort kismi bittigi icin ekranda görünmüyor...
 * cözüm olarak önce kelime bilgileri promis ile sayfalardan alinip
 * daha sonra asycn yapi ile her bir kelime imagei
 * ardindan da yine asycn yapida dil durumu alinmalidir...
 *
 *
 */

/*------------- [ o. Kisim / Giris Alani] -------------*/
var starter = 0; /* < << server hatasi halinde sonraki index no girilerek islem devam edilir... */
const mainWortList =
  []; /* < << Yeni Kelime Girisi: aray olarak mainWortList e yazilmali... */
/*------------- [ 1. Kisim / Degiskenler] -------------*/
var maxlen;
const subWortList = [],
  arrDocument = [];
(itemTyp = Object.freeze({ function: 0, domEl: 1, variabel: 2 })),
  (jFs = {
    gApi: "https://apis.google.com/js/api.js",
    wortList:
      "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/test03.json",
    getWort:
      "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/getWort_n04.js",
    check() {
      let e_getWort = document.querySelectorAll(
          `script[src="${this.getWort}"]`
        ).length,
        e_gApi = document.querySelectorAll(`script[src="${this.gApi}"]`).length;

      if (e_getWort > 0 && e_gApi > 0) {
        return true;
      } else {
        return e_getWort == 0 && e_gApi == 0
          ? "getWort.js, gApi.js"
          : e_getWort == 0
          ? "getWort.js"
          : "gApi.js";
      }
    },
  });

/*------------- [ 2. Kisim / Wort Liset Inject:Promise] -------------*/
const loadApp = () => {
  console.log("🚩 Loading… ≣⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮");
  return new Promise((resolve, reject) => {
    if (mainWortList.length > 0) resolve(true); //kelimeler elle girilmisse
    //resolve(loadWort());//promise ile sirali olarak js filler eklenir...
    let url = jFs.wortList;
    fetch(url)
      .then((response) => {
        return response.text();
      }) // or .json()
      .then((data) => {
        return JSON.parse(data);
      })
      .then((list) => {
        mainWortList.push(...list);
        resolve(true);
      })
      .catch((err) => {
        console.log(
          `Kelime listesi alinirken hata oldu. Kelime urlini kontrol edin! (f:loadApp) ${url}`,
          err
        );
      });
  });
};

/*------------- [ 3. Kisim / Js File Inject:Base Codes ] -------------*/
function addJS(source, pos = "head") {
  //yükleme öncesi ilgili js dosyada olup olmadigi kontrol edilir
  if (document.querySelectorAll(`script[src="${source}"]`).length > 0) {
    return `Dosya mevcut: ${source}`;
  }
  //sayfaya dahil edilme
  var docPos = document[pos];
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = source;
  docPos.appendChild(script); // js sayfaya dahil edilir
  // script.onload = callback; // sonra yükleme olayina callbak atanir
}

/*------------- [ 4. Kisim / Js File Inject:Promise and Next >>] -------------*/
loadApp() //        🏁🚩🏁 loadApp promise yapisiyla uygulamaya start verilmekte 🏁🚩🏁
  .then((value) => {
    addJS(jFs.gApi, (pos = "head"));
  })
  .then((value) => {
    addJS(jFs.getWort, (pos = "head"));
  })
  .then((value) => {
    // "consoleMsg" fonksiyonu ile getWort.js durumu check edilir...
    intervalApp(`consoleMsg`, itemTyp.function, wortListEditor, 50, 2000); // kontrol sonrasi yürütülecek fonksiyon callback olarak gönderilir.
  })
  .catch((err) =>
    console.log(
      `Js dosyalari yüklenirken hata olustu. Linkleri kontrol edin! (loadApp.promise)`,
      err
    )
  );

/*------------- [ 5. Kisim / Wort List Düzenlenir] -------------*/
//Coklu kelime islemlerinde server banlanmasi durumunda kalinilan dizin numarasiniyla devam ettmesi icin kelime dizini tekrar düzenlenir..
const wortListEditor = () => {
  maxlen = mainWortList.length;
  subWortList.push(...mainWortList.slice(starter, maxlen));
  wortesArr.length = 0; // JSON olarak tutulan kelime bilgileri islem tekrarinda dizin sifirlanir...
  nextWort();
};

/*------------- [ 6. Kisim / SubWortList ögeleri islem icin teker teker secimi] -------------*/
//sayfa bilgisi alinacak kelime SubWortList den cikarilir ve öge bulunmaz ise döngüden cikilir...
const nextWort = () => {
  if (subWortList.length > 0) {
    getWortHTML(subWortList.shift());
  } //dizinden cikarilan kelime ile isleme devam edilir...
};

/*------------- [ 7. Kisim / Kelimeye Ait HTML document objesi alinir] -------------*/
// dizinden cikarilan kelime icin fetch ile HTML'i alinir
const getWortHTML = (wort) => {
  let url = `https://www.verbformen.de/?w=${wort}`;
  fetch(url, { mode: "no-cors" })
    .then((response) => {
      if (response.status != 200) {
        console.log(response);
        throw Error(response);
      }
      return response.text();
    }) // or .json()
    .then((html) => {
      let parser = new DOMParser();
      let doc = parser.parseFromString(html, "text/html");
      arrDocument.push(doc);
    })
    .then(() => {
      starter++;
      //console.log("max " + maxlen + " ino:" + i_no )
      if (maxlen == starter) {
        getWortObj(); //tamamlanan kelime sayfalarindan "Wort" sinifindan nesne olusturulur.
      } else {
        nextWort();
      }
    })
    .catch((err) => {
      consoleMsg(
        msgTyp.error,
        `Server Blocked: ${wort} No:${starter}`,
        `Wort Listeki kalinan öge no:${starter}, Siradaki Kelime: ${mainWortList[starter]} (f:getWortHTML)`,
        err
      );
      getWortObj(); //hataya kadar alinan kelime sayfalarindan "Wort" sinifindan nesne olusturulur.
    });
};

/*------------- [ 8. Kisim / Kelimeye Ait HTML document objesi alinir] -------------*/
// fetch islemeinin ardindan tekrar kelime isleme alinir ve dizinden cikarilir
const getWortObj = () => {
  try {
    if (arrDocument.length > 0) {
      let html = arrDocument.shift();
      getWort(html); //her kelimeye ait ham html verileri getWort ile Json data olarak ayristirilir
      return;
    }
    //json veri olusturma islemi bittikten sonra --docs arrayinde öge kalmayinca-- sonuc ekrana bastirlir...
    printChecker()
  } catch (err) {
    consoleMsg(
      msgTyp.error,
      `Document Islem Hatasi`,
      `${err} (f:getWortObj)`,
      err
    );
  }
};


const printChecker=()=>{
  consoleMsg(
    msgTyp.successful,
    `Document Islemi Tamamlanadi`,
    `Keliemlere ait veriler aliniyor... (f:printChecker)`
  );
  let clear =true;
  //döngüsel zaman atanir
  const int_ID = setInterval(() => {
    wortesArr.forEach((wrtObj) => {
      if(wrtObj.img.length>0){
        clear=false
        clearInterval(int_ID)
        printWort()
      }
    })
  }, 100); // döngüyü tekrarlar
  //max time sonrasi cikilir
  const clearInt = setTimeout(() => {
    if (clear) printWort()
    clearInterval(int_ID);
  }, 1000);
  clearInt;
  int_ID;
}

const printWort = () => {
  //console.log(wortesArr) // >> Tüm JSON obje olarak tutulen kelimelere ait dizin. getWort'ten push() edilir.
  wortesArr.forEach((wrtObj) => {
    consoleMsg(
      msgTyp.successful,
      wrtObj.wrt.wort,
      `kelimesine ait sonuclar (f:printWort)`
    );
    console.log(JSON.stringify(wrtObj));
    console.log(wrtObj);
  });
};

/*------------- [ x. Kisim / Öge Kontrolü ] -------------*/
/*bu fonksiyon ile itemTyp degiskenindeki tiplerden fonksiyn, dom ögesi veya bir degiskennin olup olmadigi 
setTimeInterval ile kontrol edilir ve duruma göre sonraki fonskiyon callback ile siraya alinir 
zB: dom elelmani kontrol ->>      intervalApp(`script[src="${wrtApp}"]`, itemTyp.domEl, callMe, 100, 800)
zB: callback olarak -fonksiyon->> addJS(wrtApp,intervalApp(`consoleMsg`, itemTyp.function, callMe, 100, 800))*/

function intervalApp(item, typ, callback, duration = 100, maxDuration = 3000) {
  let clear;
  //döngüsel zaman atanir
  const int_ID = setInterval(() => {
    switch (typ) {
      case 0: //fonksiyon kontrolü >> window.functionName
        if (typeof window[item] === "function") clear = true;
        break;
      case 1: //document element kontrolu
        if (document.querySelectorAll(item).length > 0) clear = true; // selector girisi zB:'a[href="test.me"]'
        break;
      default: //obje, array, string vs degiskenlerin kontrolü
        try {
          if (typeof eval(item) != "undefined") clear = true;
        } catch (error) {
          clear = false;
        }
        break;
    }
    if (clear) {
      //öge varsa zamanlamayi temizler
      clearInterval(int_ID);
      callback();
      return;
    }
  }, duration); // döngüyü tekrarlar
  //max time sonrasi cikilir
  const clearInt = setTimeout(() => {
    if (!clear)
      console.log(
        `Süre Asimi: "${item}" adli ${
          Object.keys(itemTyp)[typ]
        } erisilebilir degil!  Baglantilari ziyaret ederek check et.(f:intervalApp-clearInt)`
      );
    clearInterval(int_ID);
  }, maxDuration);

  clearInt;
  int_ID;
}
