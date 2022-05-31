/*
Modul Baglami: Kelime listasini wortListe dahil eder... 
WortList'e arrayin push edilebilmesi icin önce getWortList() cagrilmalidir.
*/

/*-------- Disariya Cikarilan Ögeler ---------*/
export { getWorteList };

/*-------- Modul Default Olarak Disa Aktarimi ---------*/
async function getWorteList() {
  if(worteList.length>0){
    finis()
    return//eger daha önce tanimlanmis ise bu durumda tekrar atanmaz.
  } 
  //app baslatilmadan önce manuel olarak da wortList=[] nesnesi girilebilir böylece...
  const url_worteList =
    "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/module/wortList.json";

  //önce dosya checkFile() kontrol edilir...
  await checkFile(url_worteList, "m:wortList, f:getWorteList")
    .then(() => {
      return urlChecker.url;
    })
    .then((file) => {
      if (!file) {
        throw 404; //url gecerli ise ilgili dosya isleme alinir...degilse hata firlatilir...
      }
    })
    .then(
      //dosya konumu teyit edildikten sonra asycn() ile dosyadan veri alinir...
      async () => {
        await fetch(url_worteList)
          .then((response) => {
            return response.text();
          }) // or .json()
          .then((response) => {
            return JSON.parse(response);
          })
          .then((response) => {
            worteList.push(...response);
            finis()
            return
          });
      })
    .catch((err) => {
      if (err !== 404) {
       msg.print(3,
          `Kelieme Listesi`,
          `Kelime listesi alinirken hata meydana geldi!... (m:wortList, f:getWorteList > checkfile)\n${url_worteList}`,
          err
        );
        msg.allPrint()
      }
    });
}

function finis(){
  if(typeof cloneWortList === 'undefined') {
    const cloneWortList=[]
    window.cloneWortList=cloneWortList
  }
  cloneWortList.length=0
  cloneWortList.push(worteList)
  byController.wortList=true
}