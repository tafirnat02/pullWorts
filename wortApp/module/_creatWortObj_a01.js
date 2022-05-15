//bu modul ile alinan kelimelere ait HTMldocumet'daki veriler baz alinarak Wort sinifdan nesne olusturulur.
/*-------- Disariya Cikarilan Ögeler ---------*/
export { newWortObject, testASCVBG };

/*-------- Modul icerigindeki Ögeler ---------*/

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

const rpRegExp = /»|⁰|¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹|\(|\)|\n/gi,
  brExp = /·/gi;

var doc, //alinan sayfa document'i
  newWortObj, //kelime icin yeni olsturulen nesne
  wort,
  ele,
  verb,
  head; //islem gören kelime


function testASCVBG(){
  console.log('baska bir modüldeki fonksiyon export/import sonrasi 2. bir modüle calback olarak atandi... calisiyor... ')
}



/*--- [1.Kisim: gelen documentden kelime kontrolü ve ilgili fonksiyona yönlendirme] ---*/
const checkWort = (dcmnt) => {
  new Promise((resolve) => {
    wort = doc.querySelector("form>div>input").value;
    if (!checkEl(doc.querySelector("section.rBox"))) throw "not found wort!";
    doc = dcmnt;
    resolve();
  });
};
/*--- [2.Kisim: gelen documenti promise yapisiyla bilgileri newWortObj nesnesine aktarma] ---*/
const newWortObject = (dcmnt) => {
  checkWort(dcmnt)
    .then(() => {
      //Wort sinifindan nesen olusturulmasi...
      newWortObj = new Wort();
      newWortObj.wrt.wort = wort;
      //kelime tipinin alinmasi
      newWortObj.status.Situation[0] = doc.querySelector(
        "article>div>nav>a[href]"
      ).nextElementSibling.textContent;
    })
    .then(() => {
      verb = newWortObj.status.Situation[0] == "Konjugation" ? true : false;
      (head = doc.querySelector("section.rBox.rBoxWht")),
        (ele = this.verb
          ? head.querySelector("p")
          : head.querySelector("header>p"));
    })
    .then(() => {
      setStatus();
    })
    .then(() => {
      setSubEl();
    })
    .then(() => {
      setMainEl();
    })
    .then(() => {
      if (!verb) getAdj();
    })
    .then(() => {
      if (verb) setFall();
    })
    .then(() => {
      if (verb) setTbls();
    })
    .then(() => {
      getOthrTbl();
    })
    .then(() => {
      getSatze();
    })
    .then(() => {
      getLang();
    })
    .then(() => {
      wortObjsArr.push(newWortObj);
    });
};

/**** objenin status keyinde tutulan verileri head bardan alir */
function setStatus() {
  let arr = ele.innerText.split("·");
  ele.childNodes.forEach((t) => {
    switch (t.childNodes.length) {
      case 0:
        break;
      default:
        if (verb) {
          if (checkEl(t.querySelector("span").title)) {
            newWortObj.status.Zertifikat[0] = arr[0].replaceAll(
              rpRegExp,
              empty
            );
            arr.shift();
          }
        } else {
          Object.keys(newWort.status).forEach((k) => {
            if (t.title.includes(k)) {
              newWortObj.status[k][0] =
                newWortObj.status[k][0] == ""
                  ? t.innerText.replaceAll(rpRegExp, "")
                  : newWortObj.status[k][0].replaceAll(rpRegExp, "");
            }
          });
        }
        break;
    }
  });
  newWortObj.status.Other = verb
    ? arr.join(" ").replaceAll(rpRegExp, empty)
    : "";
}

/*****  Kelimenin artikeli ve cogul durumu ve ayrica
        altta yer alan cogul, konj vs kisimin Html'ini ve soundunu objeye ekler ****/
function setSubEl() {
  let subEle = head.querySelector("p.vStm.rCntr");
  newWortObj.sub_Sound = subEle.lastChild.href;
  let subHtml = subEle.cloneNode(true);
  subHtml.lastChild.remove();
  //isim/sifat cekimleri sitiliyle beraber almakta
  nomen = newWortObj.status.Substantiv[0] == "Substantiv" ? true : false;
  if (nomen) {
    let s_p = doc.querySelectorAll('th[title="Nominativ"]');
    newWortObj.wrt.artikel = s_p[0].nextElementSibling.textContent;
    newWortObj.wrt.plural = s_p[1].nextElementSibling.nextElementSibling
      ? s_p[1].nextElementSibling.nextElementSibling.textContent.replaceAll(
          rpRegExp,
          ""
        )
      : "-";
    if (newWortObj.wrt.plural == "-") {
      newWort.sub_Html = ""; //ohne Plural
    } else {
      newWortObj.sub_Html =
        s_p[1].nextElementSibling.nextElementSibling.innerHTML.replaceAll(
          rpRegExp,
          ""
        );
    }
  } else {
    //adjektiv ve Konjugation  durumu
    newWortObj.sub_Html = subHtml.innerHTML
      .replaceAll(rpRegExp, "")
      .replaceAll(brExp, "<br>");
  }
}

/*****kelimenin ana gövdesini ve sound linkini objeye atar */
function setMainEl() {
  let subEle = head.querySelector("p.vGrnd.rCntr");
  newWortObj.main_Sound = subEle.querySelector(
    'a[href][onclick^="Stimme"]'
  ).href;
  //newWort.main_Html = ele.querySelector('b').outerHTML.replaceAll(rpRegExp, empty);

  let grundArr = subEle.querySelectorAll("b");
  if (grundArr.length > 1) {
    grundEl = grundArr[0].outerHTML + "·" + grundArr[1].outerHTML;
  } else {
    grundEl = grundArr[0].outerHTML;
  }

  let txtEl = ele.querySelector('img[alt="Deutsch"]').nextSibling;
  if (checkEl(txtEl) && txtEl.nodeName == "#text") {
    grundEl = txtEl.textContent + grundEl;
    grundEl = grundEl.replaceAll(rpRegExp, "");
  }

  newWortObj.main_Html = grundEl;
}

/***** bu fonksiyon ile sadece sifatlarin derecelerini almak icin kullanilir */
function getAdj() {
  if (newWort.status.Adjektiv[0] != "") {
    //sifat dereceleri alinir
    let adjTbl = doc.querySelectorAll(".vTxtTbl>table>tbody>tr>td");
    newWortObj.adj.Positiv = adjTbl[0].innerText;
    newWortObj.adj.Komparativ = adjTbl[1].innerText;
    newWortObj.adj.Superlativ = adjTbl[2].innerText;
  }
}

/******Fillerin dativ akkusativ kullanimlarinin tespiti */
function setFall() {
  let subFall = "",
    subEle = doc.querySelectorAll("#vVdBx>div>div>p");
  subEle.forEach((row) => {
    row.childNodes.forEach((n) => {
      if (n.nodeName == "SPAN") {
        Object.keys(newWortObj.fall).forEach((f) => {
          let tit = n.title;
          if (tit.includes(f)) {
            newWortObj.fall[f] = n.innerText;
          } else {
            if (f == "wechsel") {
              //console.log(Object.values(newWort.fall[f]))
              Object.values(newWortObj.fall[f]).forEach((w) => {
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
  newWortObj.fall.Other = subFall;
  delete newWortObj.fall.wechsel;
}

/**** verb olmasi halinde fiil cekimlerine dair tablolar alinir. */
function setTbls() {
  newWortObj.tbl.prasens = doc
    .querySelector("a[href*='indikativ/praesens']")
    .parentNode.nextElementSibling.innerHTML.replaceAll(rpRegExp, "");
  newWortObj.tbl.praterium = doc
    .querySelector("a[href*='indikativ/praeteritum']")
    .parentNode.nextElementSibling.innerHTML.replaceAll(rpRegExp, "");
  newWortObj.tbl.perfekt = doc
    .querySelector("a[href*='indikativ/perfekt']")
    .parentNode.nextElementSibling.innerHTML.replaceAll(rpRegExp, "");
}

/****** sifartlarin/pronomen cekimlerine dair tablolar alinir **********/
function getOthrTbl() {
  const othrTbls = () => {
    let allContent = doc.querySelectorAll("div>div>section>header");
    allContent.forEach((itm) => {
      cnt = itm.innerText;
      if (cnt.includes(newWortObj.othrTbls.Starke.txt)) {
        addTrVal(itm, "Starke");
        delete newWortObj.othrTbls.Starke.txt;
      } else if (cnt.includes(newWortObj.othrTbls.Schwache.txt)) {
        addTrVal(itm, "Schwache");
        delete newWort.othrTbls.Schwache.txt;
      } else if (cnt.includes(newWortObj.othrTbls.Gemischte.txt)) {
        addTrVal(itm, "Gemischte");
        delete newWortObj.othrTbls.Gemischte.txt;
      } else if (cnt.includes(newWortObj.othrTbls.Praedikativ.txt)) {
        addTrVal(itm, "Praedikativ");
        delete newWortObj.othrTbls.Praedikativ.txt;
      } else if (cnt.includes(newWortObj.othrTbls.Pronomen.txt)) {
        addTrVal(itm, "Pronomen");
        delete newWortObj.othrTbls.Pronomen.txt;
      }
    });
  };

  const addTrVal = (e, obj) => {
    const divs = e.closest("section").querySelectorAll("div.vTbl");
    divs.forEach((t, n) => {
      newWortObj.othrTbls[obj][t.firstElementChild.innerText] = {};
      const clnE = t.cloneNode(true);
      const tbl = clnE.querySelectorAll("table>tbody>tr");
      tbl.forEach((i) => {
        let tit = i.firstElementChild.innerText.replaceAll(rpRegExp, "");
        newWortObj.othrTbls[obj][t.firstElementChild.innerText][tit] = {};
        i.firstElementChild.remove(); // th
        newWortObj.othrTbls[obj][t.firstElementChild.innerText][tit] =
          i.outerHTML.replaceAll(rpRegExp, "");
      });
    });
  };

  let callCal =
    newWortObj.status.Adjektiv[0] == "Adjektiv" ||
    newWortObj.status.Pronomen[0] == "Pronomen"
      ? true
      : false;
  if (callCal) othrTbls();
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

  function satzeRun(el) {
    el.forEach((z) => {
      let zB = z.cloneNode(true);
      let lis = zB.querySelectorAll("li");
      lis.forEach((e) => {
        if (!!e.querySelector("a")) {
          e.querySelector("a").remove();
          newWortObj.zB.push(e.innerHTML.replaceAll(rpRegExp, ""));
        }
      });
    });
  }
}

//varsa Tr,De ve En anlamlari alinir...
function getLang() {
  //varsa Almanca tanimi alinir
  let allHeader = doc.querySelectorAll("header>h2");
  let zB, bDe;

  allHeader.forEach((header) => {
    let subHead = header.textContent;
    if (subHead.includes("Bedeutungen")) {
      bDe = header.parentNode.nextElementSibling
        .querySelector("ul")
        .cloneNode(true);
      let lis = bDe.querySelectorAll("li");
      lis.forEach((e) => {
        newWort.lang_DE += e.innerHTML.replaceAll(/»|\n/gi, "") + "<br>";
      });
    }
  });

  //varsa ingilizce karsligi
  newWort.lang_En = checkEl(doc.querySelector('dd[lang="en"]'))
    ? doc.querySelector('dd[lang="en"]').innerText.replaceAll("\n", "")
    : "";

  // varsa Türkce karsiligi
  let srcL1 = doc.querySelector('span[lang="tr"]'), //birinci dom ögesi
    srcL2 = doc.querySelector("form > span.rNobr>a"); //ikinci dom ögesi
  if (checkEl(srcL1)) {
    wortesArr[wa_index].lang_TR = srcL1.innerText.replaceAll(rpRegExp, "");
  } else if (checkEl(srcL2)) {
    wortesArr[wa_index].lang_TR = srcL2.innerText.replaceAll(rpRegExp, "");
  }
}
