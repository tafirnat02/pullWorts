//bu modul ile olusturulan wortObj icerisinde kelimenin -trükcesi yok ise rapidAPI/google Translate ile Türkcesi alinir.
/*-------- Disariya Cikarilan Ögeler ---------*/
export { getLang };

/*-------- Modul icerigindeki Ögeler ---------*/

/**** öncelikle wortObjArr'de Türkce karsiligi olmayanlar bulunur */
let index = 0,
  len;
//wortObjArr'da tutulan her bir wort objsi index no ile sirayla kontrol edilir.
const isEmptyLang = async () => {
  if (wortObjsArr[index].lang_TR === "") await checkLang(wortObjsArr[index]);
  trLang();
};

//wortObjArr dizinindeki tüm ögeler icin routerLang ile islem yapilir
const trLang = async () => {
  index++;
  if (len === index) {
    byController.trLang = true; //item.search() ile bu asamnin tamamlandigini teyit icin controlObj'de trLang propertysi olusturulur...
  } else {
    isEmptyLang();
  }
};

//modul erisimi ile wortObjArr dizini uzunlu tespit edilip routerLang ile islem yapilir
const getLang = async () => {
  debugger;
  len = wortObjsArr.length;
  if (len > index) isEmptyLang();
};

async function checkLang(wortObj) {
  try {
    await test(wortObj)
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

function test(wortObj) {
  return new Promise((resolve, reject) => {
    //Wort sinifindan nesen olusturulmasi...
    setTimeout(() => {
      console.log('setTimeOut...:', wortObj.lang_TR);
      resolve();
    }, 750);
  });
}

//___________________________________________________

function getLang2(currentWort) {
  var wa_index; //API ile alinirken gecime sebebiyle ilgili wortObj secimi icin index no alinir
  wortesArr.forEach((wrtObj, index) => {
    if (wrtObj.wrt.wort === currentWort) wa_index = index; //kelimenin wortesArr dizin no alinir..
  });

  const getDocForLang = () => {
    //documandan ilgili veriler alinir
    let srcL1 = "",
      srcL2 = "";
    //Tükce karsiligi
    srcL1 = doc.querySelector('span[lang="tr"]'); //birinci dom ögesi
    srcL2 = doc.querySelector("form > span.rNobr>a"); //ikinci dom ögesi
    if (checkEl(srcL1)) {
      wortesArr[wa_index].lang_TR = srcL1.innerText.replaceAll(rpRegExp, empty);
    } else if (checkEl(srcL2)) {
      wortesArr[wa_index].lang_TR = srcL2.innerText.replaceAll(rpRegExp, empty);
    } else {
      if (resApi.lang.status) getApiLang(); //api aktif ise: Tükcesi icin  apiye yönlendirilir
    }
  };

  resApi.lang.index = 10;
  const getApiLang = () => {
    const langVal = [
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
        "X-RapidAPI-Key": langVal[resApi.lang.index],
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
          if (resApi.lang.index < langVal.length) {
            consoleMsg(
              msgTyp.warning,
              `API Limit | ${currentWort} `,
              `google-translate1 rapidapi >>  key no:${resApi.lang.index} (f:getLang-multiple)`
            );
            resApi.lang.index++; //diger keyler denenir..
            getApiLang();
          } else {
            //tüm keyler limit asimi ise
            resApi.lang.status = false;
            consoleMsg(
              msgTyp.error,
              `API Limit`,
              `google-translate1 rapidapi -> all keys limit... | ${currentWort} (f:getLang-multiple)`
            );
          }
        } else {
          //basarili sekilde veri alindi
          wortesArr[wa_index].lang_TR = response.data[
            "translations"
          ][0].translatedText.replaceAll(rpRegExp, empty);
          // if(newWort.status.Substantiv[0] == "Substantiv") callback() //isim ise görsel alinacak degilse sonraki ögeye gecilir
        }
      })
      .catch((err) => {
        consoleMsg(
          msgTyp.error,
          `${currentWort}`,
          "Google translate API error. (f:getLang-multiple)",
          err
        );
      });
    return;
  };

  //initialization hatasi almamak icin en alttan cargildi
  getDocForLang.call();
}
