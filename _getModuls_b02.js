const urlChecker = {url:undefined},worteList=['Gemüse', 'Fenster','Tüte'], //dosya konumu kontrol edilip, moduller sayfaya dahil edilir...
url_importModuls="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/_importModuls_g00.js";

newRun.call()
async function newRun(){
    console.clear();
  switch (await controller()) {
  case true:return //ilk yükleme sebeiyle kod yürütülür, cagrilmasi gerekmez
  case 'notWort':
    console.warn('Consoldan yeni kelime girin!\nIslem yapilacak kelime bulunamadi!');return
  case false: //
    let istek=  window.confirm('Girilen kelimeler icin islem yapildi!\nIslem tekrarlansin mi?')
    if(!istek){
       console.warn('Kelimeler icin islem tekrarlanmasi iptal edildi.\n',worteList);return
    }
  }
//modul impoert edilditen sonra wortList degisikliginden dolayi tekrar cagrilir.
 console.log('liste degisti, yeniden cagrilacak...')
 await localStorageControl(true)
 console.log("🚩running... ▱▱▱▱▱▱▱▱▱▱▱ 0%"); //baslama bildirimi...
 getHTMLdoc() 
}

//sayfada modulün olup olmadigini, varsa kelime listesinin 
async function controller() {
    const modul = document.querySelector(`script[type="module"][src="${url_importModuls}"]`)
    const lastWortList = await localStorageControl()
    const compare = worteList.length === lastWortList.length && worteList.every((val, index) => val === lastWortList[index])
    if (modul === null){
        window.worteList=worteList;
        await checkFile (url_importModuls)
            .then(await loadModuls())
            return true
    }
    if(worteList.length<1) return 'notWort'
    if(compare) return false;
    return 'newList'    
}

 //sayfaya modulleri import eder
function loadModuls(){
   return new Promise((resolve)=>{
        let head_ = document.querySelector("head"),
        scrpt = document.createElement("script");
        scrpt.type = "module";
        scrpt.src = url_importModuls;
        document.head.appendChild(scrpt);
        head_.insertBefore(scrpt, head_.lastChild);
        resolve()
  });
}

/* --- cdn dosyasini kontrol eder --- */
async function checkFile(url, pos = "(m:appStarter, f:checkFile)") {
  urlChecker.url = false; //obje degeri default hale getirilir...
   await fetch(url)
    .then((response) => {
      if (response.status === 404) throw 404;
        urlChecker.url=true
    })
    .catch((err) => {
      let txt_404 = ['warn',`Dosya konumu hatali! Url'yi kontrol edin. ${pos}\n${url}\n`],
      txt_e=['error',`Hata meydana geldi! ${pos}\n`], 
      txt = err===404?txt_404:txt_e;
      window.console[txt[0]](txt[1],err) 
    });
}

function localStorageControl(remove=false){
    return new Promise((resolve)=>{
      let name='@ri5: lastWortList'
      if(!remove){
          let localObj = JSON.parse(window.localStorage.getItem(name))
          if(!localObj) resolve(false)
          if(new Date(localObj.date) > new Date()) resolve(localObj.value);// key ve tarih gecerli ise geriye obje dönderilir... 
          resolve(false)
          return
      }
      window.localStorage.removeItem(name);
      resolve()
    })
}
