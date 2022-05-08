
//Önce sayfaya getWort scrpti yüklenir...
const getWrt="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/getWort_05.js"
const wortListUrl ="https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortList2.json";
var newWortArr = []
let oldScript = document.querySelector("head").lastChild  

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
    }).then(checkSt0())

//durum check edilir
function checkSt0(){
    setTimeout(()=>{
        console.log(document.querySelector("head").lastChild.src)
        console.log(newWortArr)
    }, 200);
}


try {
  
} catch (error) {
  
}