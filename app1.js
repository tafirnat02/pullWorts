/**
 * 
 * sorun son kisimda 
 * docs.forEach(page => console.log(getWort(page)));
 * yürütüldügünde hizdan tek 1 öge islemekte
 * bu nedele bu ary islemi icinde
 * getWort sonunda cagracak bir
 * koda dönüstür basta kelime cekiminde yapildigi gibi....
 */

// "use strict"
/*------------- [ 1. Kisim / Degiskenler ] -------------*/
const getWrt="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/getWort_05.js"
//const wortListUrl ="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortList2.json";
const wortListUrl ="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortlist.json";
var newWortArr = []
var docs =[], i_no=0, maxlen;
var newTimeOut, myArr=[]  

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
       getWorts(wort)
    }
}

//siteden fetch ile body kismini alinir sonra
//getWort() fonksiyonu ile kelime objesi olustururlur 
const getWorts = (wort) => {
    let url = `https://www.verbformen.de/?w=${wort}` 
    fetch(url, { mode: "no-cors" })
    .then(response => {
     if (response.status != 200) {throw Error("Hata Kodu: " + response.status);}
      console.log(response);
      console.log("durum: " + response.status);
      return response.text(); }) // or .json()
    .then(html =>{
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        docs.push(doc)
    })
    .then(()=>{
        i_no++
        console.log("max " + maxlen + " ino:" + i_no )
        if(maxlen == i_no){
            getDocsArr()
        }else{
            nextWort()
        }
    }) 
    .catch(err => {
        console.log("---> " + wort)
        console.log(`Wort Listeki kalinan öge no:${i_no} `) 
        console.log("Alinan Kelime: " + newWortArr[i_no])
        console.log(err)
    });
};

/*------------- [ 4. Kisim / WortObje olusturulur ] -------------*/
//getWort fonksiyonuna gönderilerek kelime özellikleri nesne olarak tutulur.
function getDocsArr(){
    try {
        console.log(docs)
        docs.forEach(page => console.log(getWort(page)));
        //console.log(getWort(docs[0]))
        
    } catch (err) {
       console.log(`getWortObj Hata : ${err} `) 
    }   
}
/*------------- [ Finaly / WortObje olusturulur ] -------------*/
//server hatasi sebebiyle liste tam alinamaz ise kalinan öge no
//en son kalinan öge no burada parametre olarak gönderilir...
loadWortList()

























// /****
//  * 
//  * 
//  * 
//  * 
//  * 
//  * 
//  * 
//  * 
//  * 
//  * 
//  */
// //newWortArr
// var wortObj =[],newWort = "",wortList = "",docs =[];

// const delayLoop = (fn, delay) => {
//   return (wort, i) => {
//     setTimeout(() => {
//       fn(wort);
//     }, i * delay);
//   }
// };

// const getWorts = (wort) => {
//     let url = `https://www.verbformen.de/?w=${wort}`   
//     console.log(url)
//     fetch(url, { mode: "no-cors" })
//     .then(response => {
//         console.log(response);
//         console.log("durum: " + response.status);
//         return response.text();})   // or .json()
//     .then(html => {
//         var parser = new DOMParser();
//     	doc = parser.parseFromString(html, 'text/html');
//         docs.push( doc)
//     .catch(err => {
//         console.log(err)
//     });
//     });   
// };

// newWortArr.forEach(delayLoop(getWorts, 300))




// /**
//  *
//  function blankaS(page){
//     setTimeout(()=>{
//               var parser = new DOMParser();
//               doc= parser.parseFromString(page, "text/html");
//               // wortObj.push(getWort())
//               console.log(getWort())
//     },1000);
// }
//  */











// //kalinilan YER--- promis objeden veriler alinmali....


// var parser = new DOMParser();
// doc= parser.parseFromString(docs[0], "text/html");
//  console.log(doc.querySelector("body"))
//  <body>​[object Promise]​</body>​





//  //newWortArr
// var wortObj =[],newWort = "",wortList = "",docs;

// const delayLoop = (fn, delay) => {
//  if(fn =="getWorts") docs =[]
//   return (item, i) => {
//     setTimeout(() => {
//       fn(item);
//     }, i * delay);
//   }
// };

// setTimeout(() => {
  
// }, timeout);

// const getWorts = (wort) => {
//     let url = `https://www.verbformen.de/?w=${wort}`   
//     console.log(url)
//     fetch(url, { mode: "no-cors" })
//     .then(response => {
//         console.log(response);
//         console.log("durum: " + response.status);
//         docs.push( response.text())
//         /*return response.text(); */ }) // or .json()
//         /*
//     .then(html => {
//         blankaS(html)})
// */
//     .catch(err => {
//         console.log(err)
//     });
// };

// /*** once alttaki ile sayfalar alinip 2. ile de bu sayfalar cözülerek bilgiler alinmalidir... */
// //newWortArr.forEach(delayLoop(getWorts, 300))

// docs.forEach(delayLoop(blankaS, 500))

// function blankaS(page){
//               var parser = new DOMParser();
//               doc= parser.parseFromString(page, "text/html");
//                console.log(doc.querySelector("body"))
//               // wortObj.push(getWort())
//              // console.log(getWort())
// }

// /****************
//  * Öncelikle sayfaya 
//  *    -calisacak scripti ve 
//  *    -kelime listesini 
//  * dahil ederiz....
//  */
// //Önce sayfaya getWort scrpti yüklenir...
// const getWrt="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/getWort_04.js"
// const wortListUrl ="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortList.json";
// var newWortArr = []
// let oldScript = document.querySelector("head").lastChild  

// checkStO()

// let script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = getWrt;

// if(oldScript.src !== getWrt){
// document.head.appendChild(script);
// }

// //fetch ile urllerdeki jsObje ve kelime arrayi getirilir
// const loadScript = async (url) => {
//   try {
//     const response = await fetch(url);
//     const json = await response.text();
//     return JSON.parse(json)
//   } catch (error) {
//     console.log("Something went wrong.", error);
//   }
// };

// loadScript(wortListUrl)
//       .then((res) => {//kelime listesi alinip döngüye sokulur
//         newWortArr = [ ...res ]  
//         return res 
//     })

// //durum check edilir
// function checkStO(){
//     setTimeout(()=>{
//         console.log(document.querySelector("head").lastChild.src)
//         console.log(newWortArr)
//     }, 300);
// }

// /****************************************************
//  * 
//  * 
//  * 
//  * 
//  * 
//  * 
//  * ************************************************* */







//  newWortArr.forEach(function(wort) {
//   promises.push(
    
//          var loadDoc = async (url) => {
//              await fetch(url, { mode: "no-cors" })
//              .then(function (response) {
//                  console.log(response);
//                  console.log("durum: " + response.status);
//                  return response.text();
//              })
//              .then(function (html) {
//                  var parser = new DOMParser();
//                  doc= parser.parseFromString(html, "text/html");
//                  getWort()
//              })
//              .catch(function (err) {
//                  console.warn("Something went wrong.", err);
//              });
//          };

//          loadDoc(`https://www.verbformen.de/?w=${wort}`)
//   )
// })










// "use strict";
// //kelime bilgilerini tutacak js objesi githubdan jsdelivr araciligyla asekron fetch yapisi kullanilarak import edilir.
// var newWort = "";
// var wortList = "";

// const wortListUrl =
//   "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortList.json";
// const objUrl =
//   "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortsObj.json";

// const loadScript = async (url) => {
//   try {
//     const response = await fetch(url);
//     const json = await response.text();
//     return JSON.parse(json);
//   } catch (error) {
//     console.log(error);
//   }
// };

// loadScript(objUrl)
//   .then((res) => {
//     newWort = res;
//   })
//   .then(() => {
//     loadScript(wortListUrl)
//       .then((res) => {
//         wortList = res;
//       })
//       .then(() => {
//         console.log(newWort);
//         console.log(wortList);
//       });
//   });
// //kelime cejimleri...
// var wort = "";
// var wortUrl = "https://www.verbformen.de/?w=haben";
// const loadDoc = async (url) => {
//   await fetch(url, { mode: "no-cors" })
//     .then(function (response) {
//       console.log(response);
//       console.log("durum: " + response.status);
//       return response.text();
//     })
//     .then(function (html) {
//       var parser = new DOMParser();
//       console.log("---");

//       return parser.parseFromString(html, "text/html");
//     })
//     .catch(function (err) {
//       // There was an error
//       console.warn("Something went wrong.", err);
//     });
// };

// loadDoc(wortUrl).then((doc) => {
//   //console.log(doc)
//   console.log(doc.querySelector("body"));
//   // getWort()
// });
