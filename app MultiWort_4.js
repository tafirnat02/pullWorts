"use strict"; /*

---- YAPILACAKLAR
sayfada ilgili kelime bulunamamasi durumunu ele al
coklu kisimda tüm kelimelerin döngüyle doc alimi ve obje basimini kontrol et
döngü kelime sayisi ile sinirli olmali mükerer durumu var kontrol et
google image kismini aktif et
googl traslate ksimini aktif et
sayfa server 429 hatasi verdiginde sayfayi yenileme uyarisi at 
    >> bilgiler gidecek mi önden veya sonradan yapilabilir kontrol et olmaz ise iptal



//import ederek kodu yürütmek icin: Sayfaya dahil edildiginde yürütülür.
//Yeniden yürütmek icin sayfa yenilendirken sonra bu kod tekrar yürütülmelidir.

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/app%20MultiWort_2.js";
document.head.appendChild(script);


    Herhangi baska dosya olmadan tek bu dosya yütürülmekle coklu kelime alinir....
    [ Hata Durumu: linkleri kontrol et!]
*/ /*------------- [ 1. Kisim / Degiskenler ] -------------*/
const itemTyp = Object.freeze({ function: 0, domEl: 1, variabel: 2 });
const wrtApp =
  "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/getWort_f07class06.js";
//const wortListUrl ="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortList2.json";
//const wortListUrl ="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortlist.json";
//const wortListUrl ="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wort_verbenList.json"
const wortListUrl =
  "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/test1.json";
var newWortArr,
  docs = [],
  myArr,
  clnDocs,
  i_no = 0,
  maxlen;

/*------------- [ 2. Kisim / Codes Inject ] -------------*/
/*------------- [ script has been executed ] -------------*/
addJS(wrtApp,intervalApp(`consoleMsg`, itemTyp.function, loadWortList, 50, 1000))

//loadScript(wrtApp, loadWortList);

/*
//sayfaya wort list ve getWort() fonksiyonu dahil edilir
let oldScript = document.querySelector("head").lastChild  
//sayfada hali hayirda getWort.js yüklü ise atlanir
if(oldScript.src !== getWrt){
  let script = document.createElement('script'); 
      script.type = 'text/javascript';
      script.src = getWrt;  
      document.head.appendChild(script);
}
*/
//wortList obje olarak fatch ile alinir
function loadWortList(indexNo) {
  let url = wortListUrl;
  fetch(url)
    .then((response) => {
      return response.text();
    }) // or .json()
    .then((data) => {
      return JSON.parse(data);
    })
    .then((list) => {
      return (newWortArr = list);
    })
    .then(() => {
      //sonraki kisim kodu yürütülür...
      runApp(indexNo);
    })
    .catch((err) => {
      consoleMsg(
        msgTyp.error,
        "Wort List Error",
        "Kelime listesi alinirken hata olustu. (F:loadWortList)"
      );
    });
}
/*------------- [ 3. Kisim / WortObje olusturulur ] -------------*/
//dizinde isleme alinacak kelime grubu belirlenir
//(len: servir hatasi sebebiyle islem tamamlanmama durumunda kalinan index no girilerek sonrakiler islme alinir)
const runApp = (len = "") => {
  myArr = [...newWortArr];
  maxlen = myArr.length;
  if (len !== "") {
    myArr = myArr.slice(len, maxlen);
    i_no = len;
  }
  nextWort();
};

// fetch islemeinin ardindan tekrar kelime isleme alinir ve dizinden cikarilir
const nextWort = () => {
  if (myArr.length > 0) {
    let wort = myArr.shift();
    consoleMsg(
      msgTyp.successful,
      ` ${wort} `,
      "Kelime islenme alindi... (F:nextWort)"
    );
    getWrtDoc(wort);
  }
};

//siteden fetch ile body kismini alinir sonra
//getWort() fonksiyonu ile kelime objesi olustururlur
const getWrtDoc = (wort) => {
  let url = `https://www.verbformen.de/?w=${wort}`;
  fetch(url, { mode: "no-cors" })
    .then((response) => {
      if (response.status != 200) {
        throw Error("Hata Kodu: " + response.status);
      }
      //console.log(response);
      //console.log("durum: " + response.status);
      return response.text();
    }) // or .json()
    .then((html) => {
      let parser = new DOMParser();
      let doc = parser.parseFromString(html, "text/html");
      docs.push(doc);
    })
    .then(() => {
      i_no++;
      //console.log("max " + maxlen + " ino:" + i_no )
      if (maxlen == i_no) {
        nextDoc(); //sonraki kisma gecilir
      } else {
        nextWort();
      }
    })
    .catch((err) => {
      console.log("---> " + wort);
      console.log(`Wort Listeki kalinan öge no:${i_no} `);
      console.log("Alinan Kelime: " + newWortArr[i_no]);
      console.log(err);
      nextDoc();
    });
};

/*------------- [ 4. Kisim / WortObje olusturulur ] -------------*/
//alınan her bır html sayfasi tek tek isleme alinarak kelime nesnesi olusturulur

//daha sonra teker teker ögeler getWort fonksiyonuna sokulur
function nextDoc() {
  try {
    if (docs.length > 0) {
      let html = docs.shift();
      getWort(html);
    } else {
      console.log("--< ok >--");
      wortesArr.forEach((wrt) => {
        console.log(wrt);
      });
    }
  } catch (err) {
    console.log(`nextDoc Hata : ${err} `);
  }
}

/*------------- [ Finaly / WortObje olusturulur ] -------------*/
//server hatasi sebebiyle liste tam alinamaz ise kalinan öge no
//en son kalinan öge no burada parametre olarak gönderilir...
//loadWortList()

/*------------- //////// D I G E R \\\\\\\\ -------------
  -----------\\\\\\\\ K I S I M L A R //////// -------------*/
//js file dahil etme ve yüklenme kontrolü
/*------------- External JavaScript Import-------------*/

function addJS(jsUrl, callback, pos = "head") {
    //yükleme öncesi ilgili js dosyada olup olmadigi kontrol edilir
    if (document.querySelectorAll(`script[src="${jsUrl}"]`).length > 0) {
        callback;
        return;
    }
  //sayfaya dahil edilme
  var docPos = document[pos];
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = jsUrl;
  docPos.appendChild(script); // js sayfaya dahil edilir
  script.onload = callback; // sonra yükleme olayina callbak atanir
}

/*------------- Bir fonksiyon/DomEleman/Degiskenin erisilebilir olup olmadigini kontrol eder -------------*/

/*bu fonksiyon ile itemTyp degiskenindeki tiplerden fonksiyn, dom ögesi veya bir degiskennin olup olmadigi 
setTimeInterval ile kontrol edilir ve duruma göre sonraki fonskiyon callback ile siraya alinir 
zB: dom elelmani kontrol ->>      intervalApp(`script[src="${wrtApp}"]`, itemTyp.domEl, callMe, 100, 800)
zB: callback olarak -fonksiyon->> addJS(wrtApp,intervalApp(`consoleMsg`, itemTyp.function, callMe, 100, 800))*/
function intervalApp(
    item,
    itemTyp,
    callback,
    duration = 100,
    maxDuration = 2000
  ) {
    let clear;  
    //döngüsel zaman atanir
    const int_ID = setInterval(() => {
      switch (itemTyp) {
        case 0: //fonksiyon kontrolü >> window.functionName
          if (typeof eval(`window.${item}`) === "function") clear = true;
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
        if(!clear) consoleMsg(msgTyp.error,'Öge Bulunamadi', ' Döngü zamanasimina ugradi... (f:intervalApp)')
      clearInterval(int_ID);
    }, maxDuration); // Will alert once, after a second.
  
    clearInt;
    int_ID;
  }
  