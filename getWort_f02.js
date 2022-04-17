/****
 * setMainEl(head) bu fonksiyon düzeltilmeli....
 * nomen ise artkel icin...
 *      document.querySelector("#x8f684Box > p.vGrnd.rCntr > img").nextSibling
 * adj ise kod calisir ama "am" durumunda "am" alinmalidir  [ok...tamamlandi]
 *
 * verben eger tek kelimeden olusuyor ise calisiyor
 * verb eger trennbar ise bu durumda ikinci <b> etiketide alinmalidir..
 * bunun icin 2. kisimdaki kod
 *      ele.querySelectorAll('b')
 * olarak elie alinip dizin uzunluhuna göre islem yapilabilir innerHTML icin
 *
 * tablo kismindaki () ve ^5 kaldirilmali [ok...tamamlandi]
 *
 * kelimenin almanca kisminida alinmali [uygulamada almanca/türkce secimlik olarak sorulabilir kelime icin..] [ok...tamamlandi]
 * 
 * elArr = document.querySelectorAll("#grundform>b")
elArr.forEach(r => console.log(r))
 */

const rpRegExp = /⁰|¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹|\(|\)|\n/g;
const brExp = /·/g;
const empty = "";
var newWort, doc, verb;
wortesArr = [];
var wort_Obj = {
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
    Deklination: "",
    Zertifikat: "",
    Substantiv: "",
    Adjektiv: "",
    Superlativ: "",
    Komparativ: "",
    Plural: "",
    Positiv: "",
    Genus: "",
    gesteigert: "",
    Komparativ: "",
    regelmäßige: "",
    Artikel: "",
    starke: "",
    Pronomen: "",
    Other: "",
  },
  theme: "",
  source: "",
  main_Html: "",
  main_Sound: "",
  sub_Html: "",
  sub_Sound: "",
  lang_TR: "",
  lang_DE: "",
  tbl: {
    prasens: "",
    praterium: "",
    perfekt: "",
  },
};

function nextHtml(wrtOj) {
  console.log(wrtOj.wrt);
  console.log(JSON.stringify(wrtOj));
  Object.keys(wrtOj).forEach((key) => {
    console.log(key, wrtOj[key]);
  });

  console.log("______________________");
  //kosnoldaki fonksiyon isleme tekrar sokulur
  nextDoc();
}

//buradaki kodalr ile sayfadaki kelimenin bilgileri newWort objesine atanir....
function getWort(html) {
  (doc = ""), (doc = html);
  
  //obje kolonlanir ve daha sonra obje icerigi sifirlanir
  newWort = Object.assign({}, wort_Obj);
  Object.keys(newWort).forEach((key) => {
      if (typeof newWort[key] == "object") {
          Object.keys(newWort[key]).forEach((s_key) => {
              if (s_key != "wechsel") {
                  newWort[key][s_key] = "";
              }
          });
      } else {
          newWort[key] = "";
      }
  });

  console.log("newWort >> " + newWort.wrt.wort);
  /**kelimenin alinmasi */
  newWort.wrt.wort = doc.querySelector("form>div>input").value;
  /***Kelimenin tanimlanmasi */
  newWort.status.Deklination = doc.querySelector(
    "body > article > div:nth-child(1) > nav.rKrml.rKln.rInf > a:nth-child(2)"
  ).innerText;
  /**Üst kisimdaki kelimeye dair gramatik bilgiler */
  getTitle("headTitle");
  /***sub Title: Keliemenin cogulu, verben halleri ve diger cekimler bulunur***/
  getTitle("subCode");
  /*** mainTitle: Keliemyi ve ses dosyasini objeye ekler */
  getTitle("subMain");
  /*** worte dair text bilgileri olusturulur */
  getTitle("wortText");
  /*****Türkcesi */
  getTitle("lang");;
  /**** Akkusativ/Dativ kullanimlarini neseye alma** */
  getTitle("fall");
  /***Konjugation Tablolarina dair HTML'ler */
  getTitle("Tbls");
    /***kelimenin DE tanimi alinir */
    getLangDe()
  /***kelimenin TR anlami akinir */
  getLang(GoogleAPIwait, newWort);
  return;
}

/***Google Translate API callback islemi beklenemesi icin bu kod araya yazildi */
function GoogleAPIwait(wtr) {
  delete wtr.fall.wechsel;
  //stringe gönüstürülür ve dizine alinir
  wortesArr.push(JSON.stringify(wtr));
  nextDoc();
}

/****::: Sub function****** */
/***Genel olarak ilgili fonksiyona yönlendirm yapan ara fonksiyon */
function getTitle(tit) {
  let head, ele;
  verb = newWort.status.Deklination == "Konjugation" ? true : false;
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
      if (!verb) setWortText(head);
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
/***** cogul ve sifatlarin derecelerini almak icin kullanilir */
function setWortText(head) {
  ele = head.querySelector("p.vStm");
  if (newWort.status.Adjektiv != "") {
    //sifat dereceleri alinir
    ele.childNodes.forEach((n) => {
      if (n.innerText) {
        let txt = n.innerText.replace(rpRegExp, empty).trim();
        if (!newWort.wrt.Positiv) {
          newWort.wrt.Positiv = txt;
        } else if (!newWort.wrt.Komparativ) {
          newWort.wrt.Komparativ = txt;
        } else if (!newWort.wrt.Superlativ) {
          newWort.wrt.Superlativ = txt;
        }
      }
    });
  } else {
    //plural alinir
    ele.childNodes.forEach((n) => {
      if (n.innerText)
        newWort.wrt.plural = n.innerText.replace(rpRegExp, empty).trim();
      //artikel
      ele = head.querySelector("p.vGrnd");
      ele.childNodes.forEach((n) => {
        if (n.data)
          newWort.wrt.artikel = n.data.replace(rpRegExp, empty).trim();
      });
    });
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
/***** altta yer alan cogul, konj vs kisimin Html'ini ve soundunu objeye ekler */
function setSubEl(head) {
  ele = head.querySelector("p.vStm.rCntr");
  newWort.sub_Sound = ele.lastChild.href;
  let subHtml = ele.cloneNode(true);
  subHtml.lastChild.remove();
  let inHtml = "";
  nomen = newWort.status.Substantiv == "Substantiv" ? true : false;
  if (nomen) {
    subHtml.querySelector("b").remove();
    let plural = newWort.status.Plural;
    if (plural.includes(",")) {
      newWort.status.Plural = plural.split(",")[1].trim();
    }
  }

  newWort.sub_Html = subHtml.innerHTML.replace(rpRegExp, empty);
  newWort.sub_Html = nomen
    ? newWort.sub_Html.replace("·", "die ")
    : newWort.sub_Html.replace(brExp, "<br>");
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
            newWort.status.Zertifikat = arr[0].replace(rpRegExp, empty);
            arr.shift();
          }
        } else {
          Object.keys(newWort.status).forEach((k) => {
            if (t.title.includes(k)) {
              newWort.status[k] =
                newWort.status[k] == ""
                  ? t.innerText.replace(rpRegExp, empty)
                  : newWort.status[k].replace(rpRegExp, empty);
            }
          });
        }
        break;
    }
  });
  newWort.status.Other = verb ? arr.join(" ").replace(rpRegExp, empty) : "";
}
/**** kelimenin TR karsiligi alinir */
function getLang(callback, wrt) {
  let srcL1 = "",
    srcL2 = "",
    res = "";
  srcL1 = doc.querySelector('span[lang="tr"]');
  srcL2 = doc.querySelector("form > span.rNobr>a");
  if (checkEl(srcL1)) {
    wort_Obj.lang_TR = srcL1.innerText.replace(rpRegExp, empty);
    callback(wrt);
  } else if (checkEl(srcL2)) {
    wort_Obj.lang_TR = srcL2.innerText.replace(rpRegExp, empty);
    callback(wrt);
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
        callback(wrt);
      })
      .catch((err) => {
        console.log(
          "Google Translate API Hatasi\nKelime: %c" + newWort.wrt.wort,
          "color: Lime;  font-size: 12px"
        );
        //console.log("Google Translate API Hatasi:\n"+  err)
        callback(wrt);
      });
  }
}

//kelimenin varsa Almanca taninimi alinir
function getLangDe() {
  let deutsch = doc.querySelector("p.rInf>i");
  if (checkEl(deutsch)) {
    newWort.lang_DE = deutsch.innerText;
  }
}
/**Genel Kullanimdaki Diger Fonksiyonlar */
/***** DOM Element Checker*********/
function checkEl(e) {
  return e === null ? false : true;
}
