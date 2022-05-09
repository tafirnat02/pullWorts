/*
Modul Baglami: Kelime listasini dahil eder... 
*/

/*-------- Modul Disina Aktarilanlar ---------*/
console.log('wortList..runing..')
export function test(){console.log('me..ok..run..')}
export function  getWort(){getWortList()}

/*-------- Modul Icerigindeki Islemler ---------*/
const url='https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/module/wortList.json'

function getWortList(newList=""){
  console.log("🚩 running... ≣⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮");
  if(!!newList) return //eger kelime listesi elden girilmis ise dosyadan kelime alinmaz
  loadList()
  //kelimeler dosyadan array olarak sayfaya dahil edilir...
return wortList
}

function loadList () {
    //resolve(loadWort());//promise ile sirali olarak js filler eklenir...
    fetch(url)
      .then((response) => {
        return response.text();
      }) // or .json()
      .then((data) => {
        return JSON.parse(data);
      })
      .then((list) => {
        wortList.push(...list);
      })
      .catch((err) => {
        console.clear()
        console.log(
          `Kelime listesi alinirken hata oldu. Kelime urlini kontrol edin! (m:wortList, f:loadApp) ${url}`
        );
        console.log( err)
      });
};