/****************
 * Öncelikle sayfaya 
 *    -calisacak scripti ve 
 *    -kelime listesini 
 * dahil ederiz....
 */

//getWort scrpti yüklenir...
const getWrt="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/getWort_03.js";
const wortListUrl="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortList.json";
var newWortArr = []
let oldScript = document.querySelector("head").lastChild  

checkStO()

let script = document.createElement('script');
script.type = 'text/javascript';
script.src = getWrt;

if(oldScript.src !== getWrt){
document.head.appendChild(script);
}

//fetch ile urllerdeki jsObje ve kelime arrayi getirilir
const loadScript = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.text();
    return JSON.parse(json)
  } catch (error) {
    console.log("Something went wrong.", error);
  }
};

loadScript(wortListUrl)
      .then((res) => {//kelime listesi alinip döngüye sokulur
        newWortArr = [ ...res ]  
        return res 
    })

//durum check edilir
function checkStO(){
    setTimeout(()=>{
        console.log(document.querySelector("head").lastChild.src)
        console.log(newWortArr)
    }, 300);
}

/****************************************************
 * 
 * 
 * 
 * 
 * 
 * 
 * ************************************************* */







 newWortArr.forEach(function(wort) {
  promises.push(
    
         var loadDoc = async (url) => {
             await fetch(url, { mode: "no-cors" })
             .then(function (response) {
                 console.log(response);
                 console.log("durum: " + response.status);
                 return response.text();
             })
             .then(function (html) {
                 var parser = new DOMParser();
                 doc= parser.parseFromString(html, "text/html");
                 getWort()
             })
             .catch(function (err) {
                 console.warn("Something went wrong.", err);
             });
         };

         loadDoc(`https://www.verbformen.de/?w=${wort}`)
  )
})










"use strict";
//kelime bilgilerini tutacak js objesi githubdan jsdelivr araciligyla asekron fetch yapisi kullanilarak import edilir.
var newWort = "";
var wortList = "";

const wortListUrl =
  "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortList.json";
const objUrl =
  "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortsObj.json";

const loadScript = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.text();
    return JSON.parse(json);
  } catch (error) {
    console.log(error);
  }
};

loadScript(objUrl)
  .then((res) => {
    newWort = res;
  })
  .then(() => {
    loadScript(wortListUrl)
      .then((res) => {
        wortList = res;
      })
      .then(() => {
        console.log(newWort);
        console.log(wortList);
      });
  });
//kelime cejimleri...
var wort = "";
var wortUrl = "https://www.verbformen.de/?w=haben";
const loadDoc = async (url) => {
  await fetch(url, { mode: "no-cors" })
    .then(function (response) {
      console.log(response);
      console.log("durum: " + response.status);
      return response.text();
    })
    .then(function (html) {
      var parser = new DOMParser();
      console.log("---");

      return parser.parseFromString(html, "text/html");
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
};

loadDoc(wortUrl).then((doc) => {
  //console.log(doc)
  console.log(doc.querySelector("body"));
  // getWort()
});
