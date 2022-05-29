//Bu modül ile kelimelere ait HTML/documet alinir ve HTMLdocuments arrayinde tutulur...
/*-------- Disariya Cikarilan Ögeler ---------*/
export { getDoc };

/*-------- Modul icerigindeki Ögeler ---------*/

const getDoc = async () => {
  //localStorage konrol edilir eger deger varsa onunla baslanir....
  var max = worteList.length,
    strt = 0;
  if (storage.get("wortList") !== null) {
    if (
      new Date(storage.get("wortList").date) > new Date() &&
      storage.get("wortList").index !== null
    )
      strt = storage.get("wortList").index; //eger storagede tutulan bir deger varsa buradan devam edilir...
  }
  const HTMLdocuments = [],
    subWorteList = [...worteList.slice(strt, max)];

  const nextDoc = () => {
    if (subWorteList.length > 0) docHTML(subWorteList.shift());
  };

  const docHTML = (wort) => {
    let url = `https://www.verbformen.de/?w=${wort}`;
    fetch(url, { mode: "no-cors" })
      .then((response) => {
        if (response.status === 200) return response.text();
        throw response.status === 429 ? 429 : response; //hata kontrolü
      })
      .then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        HTMLdocuments.push(doc);
      })
      .then(() => {
        strt++;
        if (max == strt) {
          storage.remove("wortList"); //islem tamamlanmasi sonrasi index local storageden kaldirilir.
          finishDoc(HTMLdocuments); //tamamlanan kelime sayfalarindan "Wort" sinifindan nesne olusturulur.
        } else {
          runBar.set(5, strt - 1, max); //%10 durumu...
          nextDoc();
        }
      })
      .catch((err) => {
        let msgHead = err === 429 ? `429 | ${wort}` : " ⚠️ Error";
        let msgTxt =
          err === 429
            ? `Alinamayan kelime: ${worteList[strt]}, indeks no: ${strt}`
            : "";
        newMsg(3, msgHead, `${msgTxt}(m:documents*.js f:docHTML)`, err);

        //localStorage islemleri
        storage.set("wortList", strt, 5); //yeni local obje icin index atanir,5 saatten kisa olanlar dikkate alinir
        finishDoc(HTMLdocuments); //hataya kadar alinan ögeler isleme alinir....
      });
  };

  nextDoc.call(); //alt fonksiyon cagrilir
};

const finishDoc = (HTMLdocs) => {
  window.HTMLdocs = HTMLdocs; //alinan ögeler global scope'a HTMLdocs nesnesi olarak aktarilir...
};
//getDoc.call() //ana fonksiyon cagrilir
