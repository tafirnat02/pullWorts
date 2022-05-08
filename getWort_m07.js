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
    resolve(currentWort);
  });

  //HTML  icerigi dogrulama sonrasi Wort sinifindan nesne olusturulur ve propertyleri atanir
  checkDoc
    .then((currentWort) => {
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
      /********* */
      wortesArr.push(newWort); //alinan kelimeye dair obje nesne olarak wortesArr dizinine aktarilir
      //wortesArr.push(JSON.stringify(newWort)); //alinan kelimeye dair obje JSON olarak wortesArr dizinine aktarilir
      return currentWort;
    })
    .then((currentWort) => {
      //getLang(currentWort); //api aktif ise: dil durumu kontrol edilir TR yoksa API ile ceviri eklenir...
      return currentWort;
    })
    .then((currentWort) => {
      if (newWort.status.Substantiv[0] == "Substantiv") {
        if (resApi.img.status) getImg(currentWort); //api aktif ise: nomen ise görsel alinir
      }
    })
    .then(() => {
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
      if (resApi.lang.status) getApiLang(); //api aktif ise: Tükcesi icin  apiye yönlendirilir
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

function getImg(currentWort) {
  const cse = [
      ["AIzaSyA4G2MEzMKpYk9aS88kCGXZwOXQWwIvWxw", "a3e969be698bd439c"],
      ["AIzaSyCVS4E6QeXeDZoyEMOICbKxUR22O7uNGVM", "3a809e54711b3d927"],
      ["AIzaSyAOzki0o1Pi1zvSOSLVY0cVWBSDb1EwtKg", "206d7b21e9b9cb1ff"],
      ["AIzaSyCuccrJiVM6rntFedFIM4LEH-jF_uCv8Zw", "35567e479b9d748eb"],
      ["AIzaSyDqNKbCbulrRy6XJvELDdv9LOtpSGeii8M", "25137c264a9db4dbc"],
      ["AIzaSyAKYGVOpY9R0XjuvPiocMEE8GtdHdjuk5I", "a3e78d7388ad640cf"],
    ],
    imgArr = [],
    cseWord = [];
  var url,
    tryCSE = 0,
    wa_index; //tryCSE: sonuc bulunmaz ise arama sonuclari farkli kritere göre tekrar denenir

  wortesArr.forEach((wrtObj, index) => {
    if (wrtObj.wrt.wort === currentWort) wa_index = index; //kelimenin wortesArr dizin no alinir..
  });
  console.log(wa_index);
  //öncelikle cse GET icin search urlleri düyenlenir
  const cseGETword = async () => {
    if (cseWord.length > 0) return; //daha önce kelimeler alinmis ise sonraki fonksiyona gecilir

    const rRgxWrd = new RegExp(/,|\.|;|\//gi),
      rRgxDom = new RegExp(/<i>|<b>|<\/i>|<\/b>|<br>|[ ]{2,}/gi),
      rRgxOR = new RegExp(/OR OR|OR  OR| OR OR | OR  OR /g);
    (nxtWort = JSON.parse(wortesArr[wa_index])),
      (excludedURL =
        " OR -logo -inurl:[www.verbformen.com] -inurl:[www.verbformen.de] -inurl:[www.verbformen.es] -inurl:[www.verbformen.ru] -inurl:[www.verbformen.pt] -inurl:[www.duden.de]");

    console.log(nxtWort);

    //odaklanmis: Almanca singular + plurala göre arama url'i olusturulur.
    let qTxt =
      `"${nxtWort.wrt.wort}" OR ${nxtWort.wrt.wort}` +
      ((nxtWort.wrt.artikel != "-" || nxtWort.wrt.plural != "-") &&
      nxtWort.wrt.plural != nxtWort.wrt.wort
        ? " OR " + nxtWort.wrt.plural
        : "");
    qTxt = qTxt.replaceAll(rRgxWrd, "OR");
    qTxt = qTxt.replaceAll(rRgxDom, "");
    cseWord.push(
      (qTxt + excludedURL)
        .replaceAll(rRgxOR, " OR ")
        .replaceAll(" OR -logo ", " -logo ")
    );

    //varsa kelimenin ingilizce karsiligina göre arama url'i olusturulur.
    qTxt = !!nxtWort.lang_En
      ? nxtWort.lang_En.replaceAll(rRgxDom, "").replaceAll(rRgxWrd, " OR ")
      : "";
    if (!!qTxt)
      cseWord.push(
        (qTxt + excludedURL)
          .replaceAll(rRgxOR, " OR ")
          .replaceAll(" OR -logo ", " -logo ")
      );

    //varsa: odaklanmis + almanca tanimina göre arama url'i olusturulur.
    qTxt = !!nxtWort.lang_DE
      ? `${cseWord[0]} OR ${nxtWort.lang_DE
          .replaceAll(rRgxDom, "")
          .replaceAll(rRgxWrd, " OR ")}`
      : "";
    if (!!qTxt)
      cseWord.push(
        (qTxt + excludedURL)
          .replaceAll(rRgxOR, " OR ")
          .replaceAll(" OR -logo ", " -logo ")
      );

    cseWord.forEach((url) => {
      console.log(url);
    });
  };

  const cseGETurl = () => {
    const searchPara = [],
      searchDe = ["de", "countryDE"],
      searchEn = ["en", "countryUS"],
      rRgxUrl = new RegExp(/&[ ]{1,}/gi),
      rRgxBreak = new RegExp(/\r\n|\r|\n|\t|[ ]{2,}/gi);

    tryCSE == 1 ? searchPara.push(...searchEn) : searchPara.push(...searchDe);

    url = `https://customsearch.googleapis.com/customsearch/v1?
key=${cse[resApi.img.index][0]}&
cx=${cse[resApi.img.index][1]}&
searchType=image&
safe=active&
c2coff=1&
filter=1&
cr=${searchPara[1]}&
gl=${searchPara[0]}&
hl=${searchPara[0]}&
q=${cseWord[tryCSE]}
`;
    url = url.replaceAll(rRgxBreak, "").replaceAll(rRgxUrl, "&");
    console.log("resApiNo:", resApi.img.index, `\n`, url);
  };

  const searchImg = () => {
    tryCSE++;
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.text();
        } else if (response.status === 429) {
          throw 429;
        } else {
          throw response;
        }
      }) // or .json()
      .then((response) => {
        return JSON.parse(response);
      })
      .then((response) => {
        if (response.searchInformation.totalResults !== "0") return response;
        if (tryCSE < 3) {
          //aramada sonuc bulunamaz ise
          tryCSEimg(); //sonraki arama parametresine göre arama yapilir
        } else {
          tryCSE = 9; //cikis yapilir
          throw "noImage";
        }
      })
      .then((response) => {
        response.items.forEach((item) => {
          imgArr.push(item.image.thumbnailLink);
        });
      })
      .then(() => {
        if (imgArr.length >= 6 || tryCSE > 2) tryCSE = 9; //cikis yapilir
        tryCSEimg(); //daha fayla sonuc icin sonraki arama parametresine göre arama yapilir
      })
      .then(() => {
        if (imgArr.length < 1) throw "noImage";
        //imgArr dizinindeki urller ilgili kelimeye dahil edilir aktarilir

        wortesArr[wa_index].img.push(...imgArr)

        /*
        let editArr = imgArr.map((i) => {
          return `"${i}"`;
        });
        let imgURLs = '"img":[' + editArr.join(",");
        let rRegImg = /"img":\[/gi;
        console.log(wortesArr)
        console.log(JSON.parse(wortesArr[wa_index]))
        console.log(wa_index)
        console.log(currentWort)
        wortesArr[wa_index] = wortesArr[wa_index].replaceAll(rRegImg, imgURLs);
*/
      })
      .catch((err) => {
        switch (err) {
          case "noImage": //tüm secimlik metin aramasi sonucu image bulunamamasi durumu
            if (imgArr.length < 1)
              consoleMsg(
                msgTyp.warning,
                `🚨 ${currentWort}`,
                `Not found image! (f:getImg-searchImg)`
              );
            break;
          case 429: // server engeli halinde diger keyve id'ler ile denenir...
            resApi.img.index++;
            if (resApi.img.index < cse.length) {
              tryCSEimg();
            } else {
              resApi.img.status = false; //api engeli tespiti, sonraki kelimeler icin görsel api kapatilir
              consoleMsg(
                msgTyp.warning,
                `429 | ${currentWort}`,
                `HTTP 429 Too Many Requests: rate limiting! (f:getImg-searchImg)`,
                err
              );
              tryCSE = 9; //cikis yapilir
            }
            break;
          default: // diger hatalar
            consoleMsg( //cikis yapilir
              msgTyp.error,
              `${currentWort}`,
              `Görsel alinirken hata olustu! (f:getImg-searchImg)`,
              err
            );
            console.log(err)
            tryCSE = 9;
            break;
        }
      });
  };
  //sirali halde fonksiyonlar isleme alinir...
  const tryCSEimg = () => {
    if (tryCSE === 9) return; //uygulamadan cikilir...
    cseGETword().then(cseGETurl()).then(searchImg());
  };
  tryCSEimg();
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
