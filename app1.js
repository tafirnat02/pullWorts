"use strict";
//kelime bilgilerini tutacak js objesi githubdan jsdelivr araciligyla asekron fetch yapisi kullanilarak import edilir.
var newWort =""
const url = "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortsObj.json"
const loadScript = async (url) => {
    try {
        const response = await fetch(url)
        const json = await response.text()
        newWort = JSON.parse(json);
      } catch (error) {
        console.log(error)
      }
    }

loadScript(scriptUrl).then(()=>{
    console.log(newWort)  
})
//kelimeler 