/*
Modul Baglami: Kelime listasini dahil eder... 
*/

 const u_JSONwortList =
  "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/module/wortList.json"; 

/*-------- Modul Default Olarak Disa Aktarimi ---------*/
//url dogru ise ilgili kelime listesi arr olara dönderilir...
export default function getWortList(newList = "") {
 console.log("🚩 running... ≣⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮");  

  if (checkFile(u_JSONwortList))
    return () => {
      if (!!newList) return; //eger kelime listesi elden girilmis ise dosyadan kelime alinmaz
      return loadWords.call();
      //kelimeler dosyadan array olarak sayfaya dahil edilir...
    };
}


const loadWords = () => {
  //resolve(loadWort());//promise ile sirali olarak js filler eklenir...
  return fetch(u_JSONwortList)
    .then((response) => {
      return response.text();
    }) // or .json()
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((err) => {
      console.log(
        `Kelime listesi alinirken hata oldu. Kelime urlini kontrol edin! (m:wortList, f:loadApp) ${url}`
      );
      console.log(err);
    });
};
