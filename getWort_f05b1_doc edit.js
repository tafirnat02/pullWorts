const rpRegExp = /»|⁰|¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹|\(|\)|\n/g;
const brExp = /·/g;
const empty = "";
var newWort,
  doc,
  wortesArr = [],
  imgRes = {},
  troy,
  qTxt,
  loCnt = false,
  loopCount = 0,
  timeoutId,
  sil_____________TestElement,
  wort_Obj = {
    wrt: {
      wort: "",
      plural: "",
      prefix: "",
      suffix: "",
      artikel: "",
    },
    fall: {
      Dativobjekt: "",
      Akkusativobjekt: "",
      Reflexivpronomen: "",
      Other: "",
      wechsel: [
        "'an'",
        "'in'",
        "'über'",
        "'auf'",
        "'neben'",
        "'hinter'",
        "'unter'",
        "'vor'",
      ],
    },
    status: {
      Situation: ["", "Durumu"],
      Zertifikat: ["", "Kelime Seviyesi"],
      Substantiv: ["", "Isim"],
      Adjektiv: ["", "Sifat"],
      Superlativ: ["", "Superlative: en..."],
      Komparativ: ["", "Komparativ: -e göre..."],
      Plural: ["", "Cogul eki"],
      Positiv: ["", "Pozitif"],
      Genus: ["", "Cinsiyet"],
      regelmäßige: ["", "Düzenli Cekim Durumu"],
      Artikel: ["", "Artikel"],
      starke: ["", "Güclü"],
      Pronomen: ["", "Zamir"],
      dekliniert: ["", "Cekimlenme Durumu"],
      Prädikativ: ["", "Tahmine Dayali Kullanim"],
      gesteigert: ["", "Sifat Derecelendirilmesi"],
      Indefinitpronomen: ["", "Belirsiz Zamir"],
      Other: ["", ""],
    },
    adj: {
      Positiv: "",
      Komparativ: "",
      Superlativ: "",
    },
    theme: "",
    source: "",
    main_Html: "",
    main_Sound: "",
    sub_Html: "",
    sub_Sound: "",
    lang_TR: "",
    lang_DE: "",
    lang_En: "",
    tbl: {
      prasens: "",
      praterium: "",
      perfekt: "",
    },
    zB: [],
    img: [],
    othrTbls:{Starke:{txt:'starke Deklination'},
            Schwache:{txt:'schwache Deklination'},
            Gemischte:{txt:'gemischte Deklination'},
            Praedikativ:{txt:'als Prädikativ'},
            Pronomen:{txt:'Deklination des Pronomens'}}
  };


function nextHtml(wrtOj){
  console.log(wrtOj.wrt)
  console.log(JSON.stringify(wrtOj))
  Object.keys(wrtOj).forEach(key => {
  console.log(key, wrtOj[key]);
  console.log("______________________")
  //kosnoldaki fonksiyon isleme tekrar sokulur
  nextDoc()
})
}

//image icin gapi js'in sayfaya dahil edilmesi
getAPI();
//gapi.load fonksiyonunun sayfaya dahili ve kodun yürütülmesi
timeOutGapi(getWort,true) 

/******* nesnenin ekrana bastirilmasi islemi ********/
function outPut() {
    delete newWort.fall.wechsel;
    var jsonData = JSON.stringify(newWort);
    console.log(jsonData); // HTML düzenlemesi icin cikti formati
    console.log(newWort); //ankiye veri aktarimi icin cikti formati
}
/******* nesnenin ekrana bastirilmasi islemi sonu********/

/*------------------tekil alinmasi icin editlenen kod blogu SONU ---------------------*/
//buradaki kodalr ile sayfadaki kelimenin bilgileri newWort objesine atanir....
function getWort(html) {

  try {
  //img-->load first gApi
  (doc = html), (newWort = Object.assign({}, wort_Obj));
  /**kelimenin alinmasi */
  newWort.wrt.wort = doc.querySelector("form>div>input").value;
  /***Kelimenin tanimlanmasi */
  newWort.status.Situation[0] = doc.querySelector(
    "article>div>nav>a[href]"
  ).nextElementSibling.textContent;
  /**Üst kisimdaki kelimeye dair gramatik bilgiler */
  getTitle("headTitle");
  /***sub Title: Keliemenin cogulu, verben halleri ve diger cekimler bulunur***/
  getTitle("subCode");
  /*** mainTitle: Keliemyi ve ses dosyasini objeye ekler */
  getTitle("subMain");
  /*** adjektif islemleri yapilir */
  getAdj();
  /*****Türkcesi */
  getTitle("lang");
  /**** Akkusativ/Dativ kullanimlarini neseye alma** */
  getTitle("fall");
  /***Konjugation Tablolarina dair HTML'ler */
  getTitle("Tbls");
  /***Adjecktiflerin/Pronomenlerin cekimlerine dair tablolar alinir */
  getOthrTbl()
  /***örnek cümleleralinir */ 
  getSatze();
  /***almanca tanimi */
  getLangDe();
  //dil durumu kontrol edilir ve callback ile görsel durumuna gecilir...
  //eger nomen ise sadece bu durumda görsel alma söz konusu olacak...
  getLang(getImg); //calback->getImg

  wortesArr.push(JSON.stringify(newWort));
  nextDoc();
  return;
  } catch (err) {
    console.log('getWort (Multi) Error:\n',err) 
  }
}
/****::: Sub function****** */
/***Genel olarak ilgili fonksiyona yönlendirm yapan ara fonksiyon */
function getTitle(tit) {
  let head, ele, verb;
  verb = newWort.status.Situation[0] == "Konjugation" ? true : false;
  //head = doc.querySelector("div.rAbschnitt>div>section");
  head = doc.querySelector("section.rBox.rBoxWht");
  switch (tit) {
    case "headTitle":
      if (verb) {
        ele = head.querySelector("p");
      } else {
        ele = head.querySelector("header>p");
      }
      setStatus(ele, verb);
      break;
    case "subCode":
      setSubEl(head);
      break;
    case "subMain":
      setMainEl(head);
      break;
    case "lang":
      setLang(head);
      break;
    case "fall":
      if (verb) setFall(head);
      break;
    case "Tbls":
      if (verb) setTbls();
      break;
  }
}
/**** kelimenin Türkcesini objeye atar. */
function setTbls() {
  newWort.tbl.prasens = doc
    .querySelector("a[href*='indikativ/praesens']")
    .parentNode.nextElementSibling.innerHTML.replace(rpRegExp, empty);
  newWort.tbl.praterium = doc
    .querySelector("a[href*='indikativ/praeteritum']")
    .parentNode.nextElementSibling.innerHTML.replace(rpRegExp, empty);
  newWort.tbl.perfekt = doc
    .querySelector("a[href*='indikativ/perfekt']")
    .parentNode.nextElementSibling.innerHTML.replace(rpRegExp, empty);
}
function setLang(head) {
  ele = head.querySelector("span[lang='tr']");
  if (checkEl(ele)) {
    newWort.lang_TR = ele.innerText.trim();
  }
}
/******Fillerin dativ akkusativ kullanimlarinin tespiti */
function setFall(head) {
  let subFall = "",
    ele = doc.querySelectorAll("#vVdBx>div>div>p");
  ele.forEach((row) => {
    row.childNodes.forEach((n) => {
      if (n.nodeName == "SPAN") {
        Object.keys(newWort.fall).forEach((f) => {
          let tit = n.title;
          if (tit.includes(f)) {
            newWort.fall[f] = n.innerText;
          } else {
            if (f == "wechsel") {
              //console.log(Object.values(newWort.fall[f]))
              Object.values(newWort.fall[f]).forEach((w) => {
                if (tit.includes(w)) {
                  subFall = subFall + n.innerText + " ";
                }
              });
            }
          }
        });
      }
    });
  });
  subFall = subFall.split(" -§- ").sort().join(" ").trim();
  newWort.fall.Other = subFall;
}
/***** bu fonksiyon ile sadece sifatlarin derecelerini almak icin kullanilir */
function getAdj() {
  debugger
  console.log('getAdj kismindan...', doc)
  if (newWort.status.Adjektiv[0] != "") {
    //sifat dereceleri alinir
    let adjTbl = doc.querySelectorAll(".vTxtTbl>table>tbody>tr>td");
    console.log('uzunluk ', adjTbl.length)
    sil_____________TestElement = doc
    console.log(sil_____________TestElement)
    try {
      newWort.adj.Positiv = adjTbl[0].innerText;
    newWort.adj.Komparativ = adjTbl[1].innerText;
    newWort.adj.Superlativ = adjTbl[2].innerText;
    } catch (err) {
      console.log('getAdj (Multi) Error:\n',err) 
    }
  }
}
/*****kelimenin ana gövdesini ve sound linkini objeye atar */
function setMainEl(head) {
  let ele = head.querySelector("p.vGrnd.rCntr");
  newWort.main_Sound = ele.querySelector('a[href][onclick^="Stimme"]').href;
  //newWort.main_Html = ele.querySelector('b').outerHTML.replace(rpRegExp, empty);

  let grundArr = ele.querySelectorAll("b");
  if (grundArr.length > 1) {
    grundEl = grundArr[0].outerHTML + "·" + grundArr[1].outerHTML;
  } else {
    grundEl = grundArr[0].outerHTML;
  }

  let txtEl = ele.querySelector('img[alt="Deutsch"]').nextSibling;
  if (checkEl(txtEl) && txtEl.nodeName == "#text") {
    grundEl = txtEl.textContent + grundEl;
    grundEl = grundEl.replace(rpRegExp, empty);
  }

  newWort.main_Html = grundEl;
}
/*****  Kelimenin artikeli ve cogul durumu ve ayrica
        altta yer alan cogul, konj vs kisimin Html'ini ve soundunu objeye ekler ****/
function setSubEl(head) {
  ele = head.querySelector("p.vStm.rCntr");
  newWort.sub_Sound = ele.lastChild.href;
  let subHtml = ele.cloneNode(true);
  subHtml.lastChild.remove();
  //isim/sifat cekimleri sitiliyle beraber almakta
  nomen = newWort.status.Substantiv[0] == "Substantiv" ? true : false;
  if (nomen) {
    let s_p = doc.querySelectorAll('th[title="Nominativ"]');
    newWort.wrt.artikel = s_p[0].nextElementSibling.textContent;
    newWort.wrt.plural = s_p[1].nextElementSibling.nextElementSibling
      ? s_p[1].nextElementSibling.nextElementSibling.textContent.replace(
          rpRegExp,
          empty
        )
      : "-";
    if (newWort.wrt.plural == "-") {
      newWort.sub_Html = ""; //ohne Plural
    } else {
      newWort.sub_Html =
        s_p[1].nextElementSibling.nextElementSibling.innerHTML.replace(
          rpRegExp,
          empty
        );
    }
  } else {
    //adjektiv ve Konjugation  durumu
    newWort.sub_Html = subHtml.innerHTML
      .replace(rpRegExp, empty)
      .replace(brExp, "<br>");
  }
}
/**** objenin status keyinde tutulan verileri head bardan alir */
function setStatus(ele, verb) {
  let arr = ele.innerText.split("·");
  ele.childNodes.forEach((t) => {
    switch (t.childNodes.length) {
      case 0:
        break;
      default:
        if (verb) {
          if (checkEl(t.querySelector("span").title)) {
            newWort.status.Zertifikat[0] = arr[0].replace(rpRegExp, empty);
            arr.shift();
          }
        } else {
          Object.keys(newWort.status).forEach((k) => {
            if (t.title.includes(k)) {
              newWort.status[k][0] =
                newWort.status[k][0] == ""
                  ? t.innerText.replace(rpRegExp, empty)
                  : newWort.status[k][0].replace(rpRegExp, empty);
            }
          });
        }
        break;
    }
  });
  newWort.status.Other = verb ? arr.join(" ").replace(rpRegExp, empty) : "";
}

/****** sifartlarin/pronomen cekimlerine dair tablolar alinir **********/
function getOthrTbl(){

    let callCal = newWort.status.Adjektiv[0]=='Adjektiv' || newWort.status.Pronomen[0]=='Pronomen' ? true:false
    if(callCal)othrTbls()  
}

function othrTbls(){
let allContent= doc.querySelectorAll('div>div>section>header')
    
allContent.forEach((itm)=>{
cnt =itm.innerText    
    if(cnt.includes(newWort.othrTbls.Starke.txt)){
        addTrVal(itm,'Starke')
        delete newWort.othrTbls.Starke.txt;
    }else if (cnt.includes(newWort.othrTbls.Schwache.txt)){
        addTrVal(itm,'Schwache')
        delete newWort.othrTbls.Schwache.txt;
    }else if (cnt.includes(newWort.othrTbls.Gemischte.txt)){
        addTrVal(itm,'Gemischte')
        delete newWort.othrTbls.Gemischte.txt;
    }else if (cnt.includes(newWort.othrTbls.Praedikativ.txt)){
        addTrVal(itm,'Praedikativ')
        delete newWort.othrTbls.Praedikativ.txt;
    }else if (cnt.includes(newWort.othrTbls.Pronomen.txt)){
        addTrVal(itm,'Pronomen')
        delete newWort.othrTbls.Pronomen.txt;
    }
})
}
function addTrVal(e,obj){
    const divs = e.closest("section").querySelectorAll('div.vTbl');
    divs.forEach((t,n)=>{
        newWort.othrTbls[obj][t.firstElementChild.innerText]={}
        const clnE = t.cloneNode(true)
        const tbl = clnE.querySelectorAll('table>tbody>tr')
         tbl.forEach((i)=>{
             let tit = i.firstElementChild.innerText
             newWort.othrTbls[obj][t.firstElementChild.innerText][tit] ={}
             i.firstElementChild.remove() // th
             newWort.othrTbls[obj][t.firstElementChild.innerText][tit] =  i.outerHTML
         })
})
}

/**** kelimenin TR + En karsiligi alinir */
function getLang(callback) {
  let srcL1 = "",
    srcL2 = "",
    res = "";
  //ingilizce karsligi
  newWort.lang_En = checkEl(doc.querySelector('dd[lang="en"]'))
    ? doc.querySelector('dd[lang="en"]').innerText.replace("\n", "")
    : "";
  //Tükcesi
  srcL1 = doc.querySelector('span[lang="tr"]');
  srcL2 = doc.querySelector("form > span.rNobr>a");
  if (checkEl(srcL1)) {
    wort_Obj.lang_TR = srcL1.innerText.replace(rpRegExp, empty);
    newWort.status.Substantiv[0] == "Substantiv" ? callback() : outPut(); //isim ise görsel alinacak
  } else if (checkEl(srcL2)) {
    wort_Obj.lang_TR = srcL2.innerText.replace(rpRegExp, empty);
    newWort.status.Substantiv[0] == "Substantiv" ? callback() : outPut(); //isim ise görsel alinacak
  } else {
    let encodedParams = new URLSearchParams();
    encodedParams.append("q", newWort.wrt.wort); //<< kelime girisi yapilir
    encodedParams.append("target", "tr");
    encodedParams.append("source", "de");
    let options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
        "X-RapidAPI-Key": "315d73dc43msh61c6def5cbe0690p1cad03jsnc046f66648da",
      },
      body: encodedParams,
    };
    fetch(
      "https://google-translate1.p.rapidapi.com/language/translate/v2",
      options
    )
      .then((response) => response.json()) //.then(response => console.log(response))
      .then((data) => {
        console.log(data);
        console.log(data.data["translations"][0].translatedText);
        res = data.data["translations"][0].translatedText;
        console.log(newWort.wrt.wort != res && res != "");
        if (newWort.wrt.wort != res && res != "") {
          res = res.replace(rpRegExp, empty) + " @G"; //eger ayni kelime dönerse cevap bulunmadi....
        } else {
          res = "";
        }
        wort_Obj.lang_TR = res;
        newWort.status.Substantiv[0] == "Substantiv" ? callback() : outPut(); //isim ise görsel alinacak
      })
      .catch((err) => {
        console.log("Google API sorunu: \n" + err);
           outPut(); 
        if (newWort.status.Substantiv[0] == "Substantiv") callback(); //isim ise görsel alinacak
      });
  }
}

//varsa kelimeye dair örnekler alinir
function getSatze(){
let allContent= doc.querySelectorAll('div>div>section>header>h2')
allContent.forEach((itm)=>{
    if(itm.innerText .includes('Beispiele')){
       const divs = itm.closest("section").querySelectorAll('div>ul'); 
        if(!!divs) satzeRun(divs)
    }
})

 let zBel = doc.querySelectorAll(".vBsp>ul");
    if(!!zBel) satzeRun(zBel)
}

function satzeRun(el){
    el.forEach((z) => {
    let zB = z.cloneNode(true);
    let lis = zB.querySelectorAll("li");
    lis.forEach((e) => {
      if (!!e.querySelector("a")) {
        e.querySelector("a").remove();
        newWort.zB.push(e.innerHTML.replace(rpRegExp, empty));
      }
    });
  });  
}

//varsa kelimenin almanca tanimlari alinir
function getLangDe() {
  let allHeader = doc.querySelectorAll("header>h2");
  let zB, bDe;

  allHeader.forEach((header) => {
    let head = header.textContent;
    if (head.includes("Bedeutungen")) {
      bDe = header.parentNode.nextElementSibling
        .querySelector("ul")
        .cloneNode(true);
      let lis = bDe.querySelectorAll("li");
      lis.forEach((e) => {
        newWort.lang_DE += e.innerHTML.replace(/»|\n/g, "") + "<br>";
      });
    }
  });
}

/***************** Görsel Icin Yapilan Düzenlemeler ********************/
//ugulamanin basinda api sayfaya dahil edilir
//--> callback ile en son cikti basilmali  <---
function getImg() {
  //image sources
  //arama icin ingilizce kelimler
  let rRgx = new RegExp(/,|;|\.|\//g);
  let rRgxEnd = new RegExp(/<i>|<\/i>|<br>/g);
  let mainQ =
    `"${newWort.wrt.wort}" OR ${newWort.wrt.wort}` +
    ((newWort.wrt.artikel != "-" || newWort.wrt.plural != "-") &&
    newWort.wrt.plural != newWort.wrt.wort
      ? " OR " + newWort.wrt.plural
      : "");

  if (!loCnt) {
    newWort.img=[] //islem tekrarinda     
    qTxt = `${mainQ.replace(rRgx, " OR ")}`;
    //kisa aramaya almanca singular + plural + ilk ingilizce kelime alinir
    qTxt += !!newWort.lang_En? ` OR ${newWort.lang_En.split(",")[0]}` :'';
  } else {
    //ilk kelime + almanca tanim varsa
    qTxt += !!newWort.lang_DE? ` OR ${newWort.lang_DE.replace(rRgxEnd, "").replace(rRgx, " OR ")}` :"";
  }

  //srchImg_2704 kriterlerini kullan...
  troy = ["a3e969be698bd439c"];
  loadClient();
}
//istemci yürütülür...
function loadClient() {
  //gapi.client.setApiKey("AIzaSyA4G2MEzMKpYk9aS88kCGXZwOXQWwIvWxw");//
  gapi.client.setApiKey("AIzaSyA27tfTgHk1LOLODEZXMvL5vPBLf_18Jc0"); //tafirnat
  return gapi.client
    .load(
      "https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest"
    )
    .then(
      function () {
        execute();
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}
// Make sure the client is loaded before calling this method.
function execute() {
  return gapi.client.search.cse
    .list({
      cx: troy[0],
      q: qTxt, //queryWort +  '  -stock -istockphoto', //wikipedia symbol
      cr: "countryDE",
      gl: "de",
      hl: "de",
      lr: "lang_de",
      safe: "active",
      searchType: "image",
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        imgRes = Object.assign({}, response);
        if (!!!imgRes.result.items) {
          if (!loCnt) {
            console.log("görsel bulunmadi! Tekrar Deneniyor...");
            loCnt = true;
            getImg();
          } else {
            console.log("görsel bulunmadi!");
            outPut();
          }
        }
        imgRes.result.items.forEach((itm) => {
          newWort.img.push(itm.image.thumbnailLink);
        });

        if (!loCnt && newWort.img.length < 9) {
          loCnt = true;
          getImg();
        } else {
          outPut();
        }
      },
      function (err) {
        console.error("Execute error", err);
        outPut();
      }
    );
}

/*------------- import gAPI-------------*/
function getAPI() {
  //api import
  if (!cGapi()) {
    //api öncelikle sayfaya en basta yüklenir
    let script = doc.createElement("script");
    script.type = "text/javascript";
    script.src = "https://apis.google.com/js/api.js";
    //document.head.appendChild(script);
    let bdy = doc.querySelector("body");
    bdy.insertBefore(script, bdy.firstChild);
  }
  //gapi.load("client");
}
//gapi check
function cGapi() {
    //ögenin sayfada olup olmadigi  kontrol edilir
    return doc.querySelectorAll(
      'script[type="text/javascript"][src*="apis.googl"]'
    ).length > 0
      ? true
      : false;
  }

/*---- gapi'nin sayfaya dahili setTimeOut ile kontrol  -------*/
function timeOutGapi(callback, d = false ){ 
    //gapi objesi öncelikle kontrol edilir
    let _gapi_Obj = typeof gapi === 'object'
    //gapi.load fonksiyonu kontrol edilir
    let _gapi_F= _gapi_Obj?typeof gapi.load === 'function':false  

    if(!d || _gapi_F){
        clearTimeout(timeoutId);
        gapi.load("client",(()=>{callback(doc);})); //-->uygulamaya start verilir > gapi.load fonksiyonu cevabina müteakip isleme baslamasi icin zincir callback kullanildi
    }else{
        if(loopCount<20){
            loopCount++
            timeoutId = setTimeout(()=>{timeOutGapi(callback,true)}, 100);
        }else{
            timeOutGapi(callback,false)
        }
    }
}
/*---- gapi'nin sayfaya dahili setTimeOut ile kontrol sonu -------*/
/***************** Görsel Icin Yapilan Düzenlemeler Sonu ********************/

/**Genel Kullanimdaki Diger Fonksiyonlar */
/***** DOM Element Checker*********/
function checkEl(e) {
  return e === null ? false : true;
}

