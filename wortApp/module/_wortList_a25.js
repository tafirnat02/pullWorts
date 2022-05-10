/*
Modul Baglami: Kelime listasini wortListe dahil eder... 
WortList'e arrayin push edilebilmesi icin önce getWortList() cagrilmalidir.
*/

/*-------- Disariya Cikarilan Ögeler ---------*/
export {getWortList };

/*-------- Modul Default Olarak Disa Aktarimi ---------*/

const wortList = [];

async function getWortList() {
  const url_wortList =
    "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/module/wortList.json";

  //önce dosya checkFile() kontrol edilir...
  await checkFile(url_wortList, "m:wortList, f:getWortList")
    .then(() => {
      return urlChecker.url;
    })
    .then((file) => {
      if (!file){
        throw 404; //url gecerli ise ilgili dosya isleme alinir...degilse hata firlatilir...
      }
    })
    .then(
      //dosya konumu teyit edildikten sonra asycn() ile dosyadan veri alinir...
      async () => {
        await fetch(url_wortList)
          .then((response) => {
            return response.text();
          }) // or .json()
          .then((response) => {
            return JSON.parse(response);
          })
          .then((response) => {
            //pushArr(response);
            wortList.push(...response)
            this.wortList=wortList //gloabe scope'a gönderilir...
          });
      }
    )
    .catch((err) => {
      if (err !== 404) {
        console.log(
          `Kelime listesi alinirken hata meydana geldi!.. (m:wortList, f:getWortList)`,
          err
        );
      }
    });
}

