/*
Modul Baglami: Kelime listasini dahil eder... 
*/

//     if (!!newList) return; //eger kelime listesi elden girilmis ise dosyadan kelime alinmaz

/*-------- Modul Default Olarak Disa Aktarimi ---------*/
//url dogru ise ilgili kelime listesi arr olara dönderilir...
export default function getWortList() {
  console.log("🚩 running... ≣⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮");
 
  const url_wortList =
    "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/module/wortList.json";
    
  if (checkFile(url_wortList)) return false; //kelimeler dosyadan array olarak sayfaya dahil edilir...

  return fetch(url_wortList)
    .then((response) => {
      return response.text();
    }) // or .json()
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((err) => {
      console.log(
        `Kelime listesi alinirken hata oldu. Kelime urlini kontrol edin! (m:wortList, f:loadWords) ${url}`
      );
      console.log(err);
    });
};
