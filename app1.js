"use strict";
const rpRegExp = /⁰|¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹|\n/g;
const brExp = /·/g;
const empty = "";

//kelime bilgilerini tutacak js objesi import edilir.
var newWort =""
fetch("https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortsObj.json")
   .then(res => res.text())
   .then((res) => {
       const obj = JSON.parse(res);
       console.log(obj);
   })
   .catch((err) => {
    console.log(err)
  });