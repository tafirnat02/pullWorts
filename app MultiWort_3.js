"use strict"/*
//import ederek kodu yürütmek icin: Sayfaya dahil edildiginde yürütülür.
//Yeniden yürütmek icin sayfa yenilendirken sonra bu kod tekrar yürütülmelidir.

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/app%20MultiWort_2.js";
document.head.appendChild(script);


    Herhangi baska dosya olmadan tek bu dosya yütürülmekle coklu kelime alinir....
    [ Hata Durumu: linkleri kontrol et!]
*//*------------- [ 1. Kisim / Degiskenler ] -------------*/
const getWrt="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/getWort_f06a7.js"
//const wortListUrl ="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortList2.json";
//const wortListUrl ="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortlist.json";
//const wortListUrl ="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wort_verbenList.json"
const wortListUrl ="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/test.json"
var newWortArr, docs =[], myArr, clnDocs, i_no=0, maxlen;

/*------------- [ 2. Kisim / Codes Inject ] -------------*/
//sayfaya wort list ve getWort() fonksiyonu dahil edilir
let oldScript = document.querySelector("head").lastChild  
//sayfada hali hayirda getWort.js yüklü ise atlanir
if(oldScript.src !== getWrt){
  let script = document.createElement('script'); 
      script.type = 'text/javascript';
      script.src = getWrt;  
      document.head.appendChild(script);
}

//wortList obje olarak fatch ile alinir
const loadWortList = (indexNo) => { 
    let url = wortListUrl
    fetch(url)
    .then(response => {  
      return response.text()
    }) // or .json()
    .then(data => {
      return JSON.parse(data)
    }).then(list=>{
       return newWortArr = list
    }).then(()=>{
        setTimeout(()=>{ //sonraki kisim kodu yürütülür...
        //console.log(document.querySelector("head").lastChild.src)
        //console.log(newWortArr)
        console.log("kod yürütülüyor...")
        runApp(indexNo)
      }, 500);
    })
    .catch(err => {
        console.log("Kelime listesi allinirken bir hata olustu!\n", error);
    });
};
/*------------- [ 3. Kisim / WortObje olusturulur ] -------------*/
//dizinde isleme alinacak kelime grubu belirlenir
//(len: servir hatasi sebebiyle islem tamamlanmama durumunda kalinan index no girilerek sonrakiler islme alinir)
const runApp = (len="") =>{
    myArr = [...newWortArr]
    maxlen = myArr.length
    if(len!==""){
      myArr = myArr.slice(len,maxlen)
      i_no=len
    }
    nextWort()
}

// fetch islemeinin ardindan tekrar kelime isleme alinir ve dizinden cikarilir
const nextWort = () =>{
    if(myArr.length>0){
       let wort  = myArr.shift();
       getWrtDoc(wort)
    }
}

//siteden fetch ile body kismini alinir sonra
//getWort() fonksiyonu ile kelime objesi olustururlur 
const getWrtDoc = (wort) => {
    let url = `https://www.verbformen.de/?w=${wort}` 
    fetch(url, { mode: "no-cors" })
    .then(response => {
     if (response.status != 200) {throw Error("Hata Kodu: " + response.status);}
      //console.log(response);
      //console.log("durum: " + response.status);
      return response.text(); }) // or .json()
    .then(html =>{
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        docs.push(doc) })
     .then(()=>{
        i_no++
        //console.log("max " + maxlen + " ino:" + i_no )
        if(maxlen == i_no){
            nextDoc() //sonraki kisma gecilir
        }else{
            nextWort()
        } }) 
    .catch(err => {
        console.log("---> " + wort)
        console.log(`Wort Listeki kalinan öge no:${i_no} `) 
        console.log("Alinan Kelime: " + newWortArr[i_no])
        console.log(err)
        nextDoc()
    });
};

/*------------- [ 4. Kisim / WortObje olusturulur ] -------------*/
//alınan her bır html sayfasi tek tek isleme alinarak kelime nesnesi olusturulur

//daha sonra teker teker ögeler getWort fonksiyonuna sokulur
function nextDoc(){
    try {
         if(docs.length>0){
            let html  = docs.shift();
            getWort(html)
         }else{
             console.log("--< ok >--")
             wortesArr.forEach(wrt =>{console.log(wrt)})
         }
    } catch (err) {
       console.log(`nextDoc Hata : ${err} `) 
    }   
}
/*------------- [ Finaly / WortObje olusturulur ] -------------*/
//server hatasi sebebiyle liste tam alinamaz ise kalinan öge no
//en son kalinan öge no burada parametre olarak gönderilir...
loadWortList()
