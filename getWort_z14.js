const rpRegExp = /»|⁰|¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹|\(|\)|\n/gi,
  brExp = /·/gi,
  empty = "",
  wortesArr = [],
  msgTyp = Object.freeze({
    primary: 0,
    successful: 1,
    warning: 2,
    error: 3,
  }),
  resApi = {
    lang: {
      status: true,
      index: 0,
    },
    img: {
      status: true,
      index: 0,
    },
  };

let newWort,
  doc,
  kNo = 0;

class Wort {
  wrt = {
    wort: "",
    plural: "",
    prefix: "",
    suffix: "",
    artikel: "",
  };
  fall = {
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
  };
  status = {
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
  };
  adj = {
    Positiv: "",
    Komparativ: "",
    Superlativ: "",
  };
  theme = "";
  source = "";
  main_Html = "";
  main_Sound = "";
  sub_Html = "";
  sub_Sound = "";
  lang_TR = "";
  lang_DE = "";
  lang_En = "";
  tbl = {
    prasens: "",
    praterium: "",
    perfekt: "",
  };
  zB = [];
  img = [];
  othrTbls = {
    Starke: { txt: "starke Deklination" },
    Schwache: { txt: "schwache Deklination" },
    Gemischte: { txt: "gemischte Deklination" },
    Praedikativ: { txt: "als Prädikativ" },
    Pronomen: { txt: "Deklination des Pronomens" },
  };
}

/**
function nextHtml(wrtOj) {
  //console.log(wrtOj.wrt);
  //console.log(JSON.stringify(wrtOj));
  Object.keys(wrtOj).forEach((key) => {
    //console.log(key, wrtOj[key]);
    //console.log("______________________");
    //kosnoldaki fonksiyon isleme tekrar sokulur
    getWortObj();
  });
}


 *   ÖNEMELI
 * image düzenleme islem kontrolü icin devre disi birakildi tekrar 
 * calisma durumu sonrasi tekrar devreye alinmali
 

//image icin gapi js'in sayfaya dahil edilmesi
getAPI();//--->document doc olarak atanir ve isleme doc üzerinden devam edilir
//gapi.load fonksiyonunun sayfaya dahili ve kodun yürütülmesi
timeOutGapi(getWort,true) 


getImg() fonksiyonu da devreye alinmali...

*/

/******* nesnenin ekrana bastirilmasi islemi ********
function outPut() {
  delete newWort.fall.wechsel;
  var jsonData = JSON.stringify(newWort);
  //console.log(jsonData); // HTML düzenlemesi icin cikti formati
  //console.log(newWort); //ankiye veri aktarimi icin cikti formati
}
******* nesnenin ekrana bastirilmasi islemi sonu********/

/*------------------tekil alinmasi icin editlenen kod blogu SONU ---------------------*/

//buradaki kodalr ile sayfadaki kelimenin bilgileri newWort objesine atanir....
function getWort(html) {
  //alinan ilgili HTML icerikler siralya islenilmek üzere 'app MultiWort*.js' deki getWortObj fonksiyonu ile buraya gönderilir...
  let currentWort;
  doc = html;
  const checkDoc = new Promise((resolve) => {
    /**kelimenin alinmasi */
    currentWort = doc.querySelector("form>div>input").value;
    //kelime kontrolü yapilir-gecersiz kelime bildirimi yapilip sonraki html'e gecilir...
    if (!checkEl(doc.querySelector("section.rBox"))) throw "not found wort!";
    resolve();
  });

  //HTML  icerigi dogrulama sonrasi Wort sinifindan nesne olusturulur ve propertyleri atanir
  checkDoc
    .then(() => {
      //kelime icin Wort sinifindan bir nesne olusturulur ve kelime atanir
      newWort = new Wort();
      newWort.wrt.wort = currentWort;
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
      /*** worte dair text bilgileri olusturulur */
      getTitle("wortText");
      /**** Akkusativ/Dativ kullanimlarini neseye alma** */
      getTitle("fall");
      /***Konjugation Tablolarina dair HTML'ler */
      getTitle("Tbls");
      /***Adjecktiflerin/Pronomenlerin cekimlerine dair tablolar alinir */
      getOthrTbl();
      /***örnek cümleleralinir */
      getSatze();
      /***almanca ingilizce tanimlari alinir */
      getLangDeEng();
      return newWort;
    })
    .then((newWort) => {
      getLang(newWort); //api aktif ise: dil durumu kontrol edilir TR yoksa API ile ceviri eklenir...
      return newWort;
    })
    .then((newWort) => {
      if (newWort.status.Substantiv[0] == "Substantiv") {
        if (resApi.img.status) getImg(newWort); //api aktif ise: nomen ise görsel alinir
      }
      return newWort;
    })
    .then((newWort) => {
      wortesArr.push(JSON.stringify(newWort)); //alinan kelimeye dair obje JSON olarak wortesArr dizinine aktarilir
      getWortObj(); //(multiple icin)sonraki doc isleme alinir...
    })
    .catch((error) => {
      switch (error) {
        case "not found wort!":
          consoleMsg(
            msgTyp.error,
            `"${currentWort}"`,
            `Aranilan kelime icin gecerli sayfa bulunamadi! (f:getWort-checkDoc[multiple])`,
            `https://www.verbformen.de/?w=${currentWort}`
          );
          getWortObj(); //multiple icin sonraki doc isleme alinir...
          break;
        case 555:
          break;
        case 554:
          break;
        default:
          consoleMsg(
            msgTyp.error,
            `${currentWort}`,
            "'e ait HTML verisi islenirken hata olustu! (f:getWort[multiple])"
          );
          console.log(error);
          break;
      }
    });
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
    case "wortText":
      if (!verb) getAdj();
      break;
    case "fall":
      if (verb) setFall(head);
      break;
    case "Tbls":
      if (verb) setTbls();
      break;
  }
}
/**** verb olmasi halinde fiil cekimlerine dair tablolar alinir. */
function setTbls() {
  newWort.tbl.prasens = doc
    .querySelector("a[href*='indikativ/praesens']")
    .parentNode.nextElementSibling.innerHTML.replaceAll(rpRegExp, empty);
  newWort.tbl.praterium = doc
    .querySelector("a[href*='indikativ/praeteritum']")
    .parentNode.nextElementSibling.innerHTML.replaceAll(rpRegExp, empty);
  newWort.tbl.perfekt = doc
    .querySelector("a[href*='indikativ/perfekt']")
    .parentNode.nextElementSibling.innerHTML.replaceAll(rpRegExp, empty);
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
  delete newWort.fall.wechsel;
}
/***** bu fonksiyon ile sadece sifatlarin derecelerini almak icin kullanilir */
function getAdj() {
  if (newWort.status.Adjektiv[0] != "") {
    //sifat dereceleri alinir
    let adjTbl = doc.querySelectorAll(".vTxtTbl>table>tbody>tr>td");
    newWort.adj.Positiv = adjTbl[0].innerText;
    newWort.adj.Komparativ = adjTbl[1].innerText;
    newWort.adj.Superlativ = adjTbl[2].innerText;
  }
}
/*****kelimenin ana gövdesini ve sound linkini objeye atar */
function setMainEl(head) {
  let ele = head.querySelector("p.vGrnd.rCntr");
  newWort.main_Sound = ele.querySelector('a[href][onclick^="Stimme"]').href;
  //newWort.main_Html = ele.querySelector('b').outerHTML.replaceAll(rpRegExp, empty);

  let grundArr = ele.querySelectorAll("b");
  if (grundArr.length > 1) {
    grundEl = grundArr[0].outerHTML + "·" + grundArr[1].outerHTML;
  } else {
    grundEl = grundArr[0].outerHTML;
  }

  let txtEl = ele.querySelector('img[alt="Deutsch"]').nextSibling;
  if (checkEl(txtEl) && txtEl.nodeName == "#text") {
    grundEl = txtEl.textContent + grundEl;
    grundEl = grundEl.replaceAll(rpRegExp, empty);
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
      ? s_p[1].nextElementSibling.nextElementSibling.textContent.replaceAll(
          rpRegExp,
          empty
        )
      : "-";
    if (newWort.wrt.plural == "-") {
      newWort.sub_Html = ""; //ohne Plural
    } else {
      newWort.sub_Html =
        s_p[1].nextElementSibling.nextElementSibling.innerHTML.replaceAll(
          rpRegExp,
          empty
        );
    }
  } else {
    //adjektiv ve Konjugation  durumu
    newWort.sub_Html = subHtml.innerHTML
      .replaceAll(rpRegExp, empty)
      .replaceAll(brExp, "<br>");
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
            newWort.status.Zertifikat[0] = arr[0].replaceAll(rpRegExp, empty);
            arr.shift();
          }
        } else {
          Object.keys(newWort.status).forEach((k) => {
            if (t.title.includes(k)) {
              newWort.status[k][0] =
                newWort.status[k][0] == ""
                  ? t.innerText.replaceAll(rpRegExp, empty)
                  : newWort.status[k][0].replaceAll(rpRegExp, empty);
            }
          });
        }
        break;
    }
  });
  newWort.status.Other = verb ? arr.join(" ").replaceAll(rpRegExp, empty) : "";
}

/****** sifartlarin/pronomen cekimlerine dair tablolar alinir **********/
function getOthrTbl() {
  let callCal =
    newWort.status.Adjektiv[0] == "Adjektiv" ||
    newWort.status.Pronomen[0] == "Pronomen"
      ? true
      : false;
  if (callCal) othrTbls();
}

function othrTbls() {
  let allContent = doc.querySelectorAll("div>div>section>header");

  allContent.forEach((itm) => {
    cnt = itm.innerText;
    if (cnt.includes(newWort.othrTbls.Starke.txt)) {
      addTrVal(itm, "Starke");
      delete newWort.othrTbls.Starke.txt;
    } else if (cnt.includes(newWort.othrTbls.Schwache.txt)) {
      addTrVal(itm, "Schwache");
      delete newWort.othrTbls.Schwache.txt;
    } else if (cnt.includes(newWort.othrTbls.Gemischte.txt)) {
      addTrVal(itm, "Gemischte");
      delete newWort.othrTbls.Gemischte.txt;
    } else if (cnt.includes(newWort.othrTbls.Praedikativ.txt)) {
      addTrVal(itm, "Praedikativ");
      delete newWort.othrTbls.Praedikativ.txt;
    } else if (cnt.includes(newWort.othrTbls.Pronomen.txt)) {
      addTrVal(itm, "Pronomen");
      delete newWort.othrTbls.Pronomen.txt;
    }
  });
}
function addTrVal(e, obj) {
  const divs = e.closest("section").querySelectorAll("div.vTbl");
  divs.forEach((t, n) => {
    newWort.othrTbls[obj][t.firstElementChild.innerText] = {};
    const clnE = t.cloneNode(true);
    const tbl = clnE.querySelectorAll("table>tbody>tr");
    tbl.forEach((i) => {
      let tit = i.firstElementChild.innerText.replaceAll(rpRegExp, empty);
      newWort.othrTbls[obj][t.firstElementChild.innerText][tit] = {};
      i.firstElementChild.remove(); // th
      newWort.othrTbls[obj][t.firstElementChild.innerText][tit] =
        i.outerHTML.replaceAll(rpRegExp, empty);
    });
  });
}

/**** kelimenin TR  karsiligi alinir */
function getLang(newWort) {
  const getDocForLang = () => {
    //documandan ilgili veriler alinir
    let srcL1 = "",
      srcL2 = "";
    //Tükce karsiligi
    srcL1 = doc.querySelector('span[lang="tr"]'); //birinci dom ögesi
    srcL2 = doc.querySelector("form > span.rNobr>a"); //ikinci dom ögesi
    if (checkEl(srcL1)) {
      newWort.lang_TR = srcL1.innerText.replaceAll(rpRegExp, empty);
    } else if (checkEl(srcL2)) {
      newWort.lang_TR = srcL2.innerText.replaceAll(rpRegExp, empty);
    } else {
      if (resApi.lang.status) getApiLang(); //api aktif ise: tükce karsiligi icin  apiye yönlendirilir
    }
  };

  /*
      let kNo = 0; << google translate api siniri sebebiyle 
                      uygulama tam aktif olana degin key No 10 olarak 
                      uygulanacak.
  */
  let kNo = 10;
  const getApiLang = () => {
    const ky = [
      "7a7b531352msh47e6e582c9a0340p181ba8jsnfd06f4a6b0e3",
      "4169b729a4mshdfbcf80a2cd8e6cp15bd53jsnaf3a9c946fa8",
      "92ce60f8d0mshc350c83f2271d57p1fc85cjsn6cc325b66603",
      "2a17947c6fmsh37224f56f3284b3p1dd75djsndfac7a9015fe",
      "fc1d84d6aamsh58aa3844407ec67p11597bjsnbd12981632ba",
      "83219a4a0cmshbc13d688ac6b942p1c8044jsn9a2b9871e43d",
      "1cfd59fd33msh38d8050f2040c54p1cd2f9jsnfd3e122d293c",
      "80eb2deae2mshb393cd69c2783b6p190ec5jsnc1701bf3bde1",
      "aa5821836amsh8cc27db9c0a6ccap17ed8fjsn78e8de5e382b",
      "d041d76df6msh4c7b6813615f12cp167d70jsned4f0e8fb04a",
      "315d73dc43msh61c6def5cbe0690p1cad03jsnc046f66648da",
    ];
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", newWort.wrt.wort);
    encodedParams.append("target", "tr");
    encodedParams.append("source", "de");

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
        "X-RapidAPI-Key": ky[kNo],
      },
      body: encodedParams,
    };

    fetch(
      "https://google-translate1.p.rapidapi.com/language/translate/v2",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (typeof response.message === "string") {
          //api sorgu limiti
          if (kNo <= 10) {
            consoleMsg(
              msgTyp.warning,
              `API Limit | ${newWort.wrt.wort} `,
              `google-translate1 rapidapi >>  key no:${kNo} (f:getLang-multiple)`
            );
            kNo++; //diger keyler denenir..
            getApiLang();
          } else {
            //tüm keyler limit asimi ise
            consoleMsg(
              msgTyp.error,
              `API Limit`,
              `google-translate1 rapidapi -> all keys limit... | ${newWort.wrt.wort} (f:getLang-multiple)`
            );
          }
        } else {
          //basarili sekilde veri alindi
          newWort.lang_TR = response.data[
            "translations"
          ][0].translatedText.replaceAll(rpRegExp, empty);
          // if(newWort.status.Substantiv[0] == "Substantiv") callback() //isim ise görsel alinacak degilse sonraki ögeye gecilir
        }
      })
      .catch((err) => {
        consoleMsg(
          msgTyp.error,
          `${newWort.wrt.wort}`,
          "Google translate API error. (f:getLang-multiple)"
        );
        console.log(err);
      });
    return newWort;
  };

  //initialization hatasi almamak icin en alttan cargildi
  getDocForLang.call();
  return newWort;
}

//varsa kelimeye dair örnekler alinir
function getSatze() {
  let allContent = doc.querySelectorAll("div>div>section>header>h2");
  allContent.forEach((itm) => {
    if (itm.innerText.includes("Beispiele")) {
      const divs = itm.closest("section").querySelectorAll("div>ul");
      if (!!divs) satzeRun(divs);
    }
  });

  let zBel = doc.querySelectorAll(".vBsp>ul");
  if (!!zBel) satzeRun(zBel);
}

function satzeRun(el) {
  el.forEach((z) => {
    let zB = z.cloneNode(true);
    let lis = zB.querySelectorAll("li");
    lis.forEach((e) => {
      if (!!e.querySelector("a")) {
        e.querySelector("a").remove();
        newWort.zB.push(e.innerHTML.replaceAll(rpRegExp, empty));
      }
    });
  });
}

//varsa kelimenin almanca tanimlari alinir
function getLangDeEng() {
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
        newWort.lang_DE += e.innerHTML.replaceAll(/»|\n/gi, "") + "<br>";
      });
    }
  });

  //ingilizce karsligi
  newWort.lang_En = checkEl(doc.querySelector('dd[lang="en"]'))
    ? doc.querySelector('dd[lang="en"]').innerText.replaceAll("\n", "")
    : "";
}

/***************** Görsel Icin Yapilan Düzenlemeler ********************/
//ugulamanin basinda api sayfaya dahil edilir
//--> callback ile en son cikti basilmali  <---
function getImg(newWort) {
  /*get methoduyla alinmakta...
  1-Programmable Search Engine (CSE) ile bir arama motoru olusturulur,
  2- CSE Api referanslari ve key alinarak arama api olusturulur alttaki linkte
 Düzenleme icin 👉 https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?apix=true&apix_params=%7B%22c2coff%22%3A%220%22%2C%22cr%22%3A%22countryDE%22%2C%22cx%22%3A%22a3e969be698bd439c%22%2C%22filter%22%3A%221%22%2C%22gl%22%3A%22de%22%2C%22hl%22%3A%22de%22%2C%22q%22%3A%22sound%22%2C%22safe%22%3A%22active%22%2C%22searchType%22%3A%22image%22%7D
 */
  const searchPara = [],
    searchDe = ["de", "countryDE"],
    searchEn = ["en", "countryUS"],
    rRgxUrl = new RegExp(/&[ ]{1,}/gi),
    rRgxWrd = new RegExp(/,|\.|;|\//gi),
    rRgxDom = new RegExp(/<i>|<b>|<\/i>|<\/b>/gi),
    rRgxBreak = new RegExp(/\r\n|\r|\n|\t|[ ]{2,}/gi),
    cse = [
      ["AIzaSyA4G2MEzMKpYk9aS88kCGXZwOXQWwIvWxw", "a3e969be698bd439c"],
      ["AIzaSyCVS4E6QeXeDZoyEMOICbKxUR22O7uNGVM", "3a809e54711b3d927"],
      ["AIzaSyAOzki0o1Pi1zvSOSLVY0cVWBSDb1EwtKg", "206d7b21e9b9cb1ff"],
    ],
    excludedUrl =
      " -logo -inurl:[www.verbformen.com] -inurl:[www.verbformen.de] -inurl:[www.verbformen.es] -inurl:[www.verbformen.ru] -inurl:[www.verbformen.pt] -inurl:[www.duden.de]";
  var subQtxt,
    tryCSEimg = false;
  //tryCSEimg: eger ilk aramada görsel bulunmaz ise arama kriterini genisleterek islem tekrarlanmasi icin...

  const urler = () => {
    searchPara.length = 0; //döngüde parametreler yeniden atanir...
    if (tryCSEimg === false) {
      //odaklanmis arama metni: Almanca singular + plural
      qTxt =
        `"${newWort.wrt.wort}" OR ${newWort.wrt.wort}` +
        ((newWort.wrt.artikel != "-" || newWort.wrt.plural != "-") &&
        newWort.wrt.plural != newWort.wrt.wort
          ? " OR " + newWort.wrt.plural
          : "");
      qTxt = `${qTxt.replaceAll(rRgxWrd, " OR ")}`;
      subQtxt = qTxt;
      searchPara.push(...searchDe);
      tryCSEimg = true;
    } else if (tryCSEimg === true && !!newWort.lang_En) {
      //varsa ingilizce kelimelerden arama yapilir sadece..
      qTxt = newWort.lang_En
        .replaceAll(rRgxDom, "")
        .replaceAll(rRgxWrd, " OR ");
      searchPara.push(...searchEn);
      tryCSEimg = "nextStep";
    } else {
      //varsa odaklanmis genisletilerek ayrica almanca tanimina göre de arama yapilir
      qTxt = !!newWort.lang_DE
        ? `${subQtxt} OR ${newWort.lang_DE
            .replaceAll(rRgxDom, "")
            .replaceAll(rRgxWrd, " OR ")}`
        : "";
      tryCSEimg = "quitImg";
      searchPara.push(...searchDe);
    }
    qTxt = qTxt.replaceAll(rRgxDom, "");
    searchApi();
  };

  const searchApi = () => {
    var url = `https://customsearch.googleapis.com/customsearch/v1?
    key=${cse[resApi.img.index][0]}&
    cx=${cse[resApi.img.index][1]}&
    searchType=image&
    safe=active&
    c2coff=1&
    filter=1&
    cr=${searchPara[1]}&
    gl=${searchPara[0]}&
    hl=${searchPara[0]}&
    q=${qTxt + excludedUrl}
    `;
    url = url.replaceAll(rRgxBreak, "").replaceAll(rRgxUrl, "&");

    debugger;
    console.log(newWort.wrt.wort, resApi.img.index, url);
    fetch(url)
      .then((response) => {
        console.log(newWort.wrt.wort, response.status);
        if (response.status === 200) {
          return response.text();
        } else if (response.status === 429) {
          throw 429;
        } else {
          console.log('response:', response)
          throw response;
        }
      }) // or .json()
      .then((response) => {
        return JSON.parse(response);
      })
      .then((response) => {
        //arama soonucu kontrol edilir
        console.log("response_3:", response);
        if (typeof response.items !== "undefined") return response;
        if (tryCSEimg === "quitImg") {
          throw "noImage";
        } else {
          throw "tryImage";
        }
      })
      .then((response) => {
        response.items.forEach((item, index) => {
          newWort.img.push(item.image.thumbnailLink);
        });
      })
      .then(() => {
        if (newWort.img.length >= 6) {
          tryCSEimg = "quitImg";
          return newWort;
        } else if (tryCSEimg === "quitImg") {
          throw "noImage";
        } else {
          throw "tryImage";
        }
      })
      .catch((err) => {
        debugger
        switch (err) {
          case "tryImage": //sonraki metne göre arama yapilir
            urler();
            break;
          case "noImage": //tüm secimlik metin aramasi sonucu image bulunamamasi durumu
            tryCSEimg = "quitImg";
            if (newWort.img.length === 0)
              consoleMsg(
                msgTyp.warning,
                `No Image | ${newWort.wrt.wort}`,
                `Görsel bulunamadi! (f:getImg-searchApi)`
              );
            break;
          case 429:
            if (resApi.img.index < cse.length) {
              resApi.img.index += 1;
              searchApi();
            } else {
              resApi.lang.status = false; //api engeli tespiti, sonraki kelimeler icin görsel api kapatilir
              consoleMsg(
                msgTyp.warning,
                `429 | ${newWort.wrt.wort}`,
                `HTTP 429 Too Many Requests: rate limiting! (f:getImg-searchApi)`,
                err
              );
              tryCSEimg = "quitImg";
            }
            break;
          default: // diger hatalar
            consoleMsg(
              msgTyp.error,
              `${newWort.wrt.wort}`,
              `Görsel alinirken hata olustu! (f:getImg-searchApi)`,
              err
            );
            tryCSEimg = "quitImg";
            break;
        }
      });
  };
  if (tryCSEimg !== "quitImg") urler();
  return newWort;
}

/**** DOM Element Checker*********/
function checkEl(e) {
  return e === null ? false : true;
}

//console mesaj yazdirmak icin
function consoleMsg(msgTyp, head, txt, err = "") {
  const head0 = "background: DodgerBlue;", //primary
    body0 = "color: DodgerBlue;",
    head1 = "background: Green;", //successful
    body1 = "color: Green;",
    head2 = "background: DarkGoldenRod;", //warning
    body2 = "color:DarkGoldenRod;",
    head3 = "background: red;", //error
    body3 = "color:red;",
    bases =
      "font-weight: bold; color: white; font-size: 12px; padding: 3px 5px; border-radius: 5px;";
  var stylHead = eval(`head${msgTyp}`) + bases,
    stylBody = eval(`body${msgTyp} `);
  console.log(`%c ${head} %c ${txt}  ${err}`, stylHead, stylBody);
  /*
consoleMsg(msgTyp.primary | .successful | .warning | .error,'Baslik', 'aciklama metninin görünümü')
*/
}

// SILINECEK
/*------------- import gAPI-------------*/
//function getAPI() {
//Sayfa document olraka alinir ve doc a tanir//

/*
  //api import
  if (!cGapi()) {
    //api öncelikle sayfaya en basta yüklenir
    let script = doc.createElement("script");
    script.type = "text/javascript";
    script.src = "https://apis.google.com/js/api.js";
    //doc.head.appendChild(script);
    let bdy = doc.querySelector("body");
    bdy.insertBefore(script, bdy.firstChild);
  }
  //giapi.load("client");
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
*/

/*---- gapi'nin sayfaya dahili setTimeOut ile kontrol  -------*/
/*
function timeOutGapi(callback, d = false) {
  //gapi objesi öncelikle kontrol edilir
  let _gapi_Obj = typeof gapi === "object";
  //gapi.load fonksiyonu kontrol edilir
  let _gapi_F = _gapi_Obj ? typeof gapi.load === "function" : false;

  if (!d || _gapi_F) {
    clearTimeout(timeoutId);
    gapi.load("client", () => {
      callback(doc);
    }); //-->uygulamaya start verilir > gapi.load fonksiyonu cevabina müteakip isleme baslamasi icin zincir callback kullanildi
  } else {
    if (loopCount < 20) {
      loopCount++;
      timeoutId = setTimeout(() => {
        timeOutGapi(callback, true);
      }, 100);
    } else {
      timeOutGapi(callback, false);
    }
  }
}
*/
/*---- gapi'nin sayfaya dahili setTimeOut ile kontrol sonu -------*/
/***************** Görsel Icin Yapilan Düzenlemeler Sonu ********************/

/**Genel Kullanimdaki Diger Fonksiyonlar */
