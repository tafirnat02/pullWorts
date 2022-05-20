//bu modul ile olusturulan wortObj icerisinde kelimenin -trükcesi yok ise rapidAPI/google Translate ile Türkcesi alinir.
/*-------- Disariya Cikarilan Ögeler ---------*/
export { getLang };

/*-------- Modul icerigindeki Ögeler ---------*/

/**** öncelikle wortObjArr'de Türkce karsiligi olmayanlar bulunur */
let index = 0,
  len;
//wortObjArr'da tutulan wortObj de TRlang kontrol edilir. Bos ise gapi den cevirisi alinmak üzere diger functionlara yönlendirilir
const isEmptyLang = () => {
  if (wortObjsArr[index].lang_TR == "") {
    checkLang(wortObjsArr[index]);
  } else {
    //bos degilse sonraki wortObj e gecilir
    trLang();
  }
};

//wortObjArr dizinindeki tüm ögeler icin routerLang ile islem yapilir
const trLang = () => {
  index++;
  if (index >= len) {
    byController.trLang = true; //item.search() ile bu asamnin tamamlandigini teyit icin controlObj'de trLang propertysi olusturulur...
  } else {
    isEmptyLang(); //sonraki wortObj'deki trLang kontrol edilir
  }
};

//modul erisimi ile wortObjArr dizini uzunlu tespit edilip routerLang ile islem yapilir
const getLang = () => {
  len = wortObjsArr.length;
  if (len > index) isEmptyLang();
};

async function checkLang(wortObj) {
  try {
    await gapi(wortObj)
      .catch((error) => {
        throw { err: error, fun: "test" };
      })
      .then(() => {
        trLang();
        return;
      });
  } catch (errObj) {
    msg.console(
      msg.msgTyp.error,
      `Error | ${wort}`,
      `m:lang*js f:${errObj.fun}`,
      errObj.err
    );
  }
}

/*
async function test(wortObj) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(wortObj);
      resolve();
    }, 1000);
  });
}
*/
//___________________________________________________

const gapiKeyEnd = (wort) => {
  msg.console(
    msg.msgTyp.warning,
    `API Limit | ${wort}`,
    `Bu kelime icin translate yapilamadi! m:lang*.js f:gapiKeyEnd`
  );
};

async function gapiKey(wortObj, next = false) {
  //kullanilacak keyi secer ve geriye dönderi
  let index = 0;
  const gapi = [
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

  return new Promise((resolve, reject) => {
    if (storage.get("gapiLang") !== null && next) {
      if (
        new Date(storage.get("gapiLang").date) > new Date() &&
        storage.get("gapiLang").index !== null
      )
        index = storage.get("gapiLang").index + 1; //eger storagede tutulan bir deger varsa buradan devam edilir...
      index = gapi.length <= index ? "keysEnde" : index;
    }
    //eger api limitleri dolmus ise bildirimde bulunulur....
    if (index === "keysEnde") {
      gapiKeyEnd(wortObj.wrt.wort);
      resolve();
    } else if (next) {
      gapi(wortObj);
    } else {
      storage.set("gapiLang", index, 24);
      resolve(gapi[index]);
    }
  });
}

async function gapi(wortObj) {
  let key;
  try {
    key = await gapiKey().catch((error) => {
      throw { err: error, fun: "gapiKey" };
    });

    return new Promise((resolve, reject) => {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", wortObj.wrt.wort);
      encodedParams.append("target", "tr");
      encodedParams.append("source", "de");

      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Accept-Encoding": "application/gzip",
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
          "X-RapidAPI-Key": key,
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
            gapiKey(wortObj, true);
          } else {
            //basarili sekilde veri alindi
            wortObj.lang_TR = response.data[
              "translations"
            ][0].translatedText.replaceAll(rpRegExp, empty);
            resolve();
          }
        })
        .catch((error) => {
          throw { err: error, fun: "Google translate API error. gapi-fetch()" };
        });
    });
  } catch (errObj) {
    msg.console(
      msg.msgTyp.error,
      `Error | ${wort}`,
      `m:lang*.js f:${errObj.fun}`,
      errObj.err
    );
  }
}
