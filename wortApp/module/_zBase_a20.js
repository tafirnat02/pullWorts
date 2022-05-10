/* Burada tüm modüllerde kullanilacak olan ögeler yer almakta...*/

export {setGlobalScope};

/*  --- Fonksiyonlar vd. --- */
 const  setGlobalScope= async ()=>{
   setValues.call()
}


function setValues(){
  //nesne deklare edilir
 const msgStatus = [
    "▰▱▱▱▱▱▱▱▱▱▱ 10%",
    "▰▰▱▱▱▱▱▱▱▱▱ 20%",
    "▰▰▰▱▱▱▱▱▱▱▱ 30%",
    "▰▰▰▰▱▱▱▱▱▱▱ 40%",
    "▰▰▰▰▰▱▱▱▱▱▱ 50%",
    "▰▰▰▰▰▰▰▱▱▱▱ 60%",
    "▰▰▰▰▰▰▰▰▱▱▱ 70%",
    "▰▰▰▰▰▰▰▰▰▱▱ 80%",
    "▰▰▰▰▰▰▰▰▰▰▱ 90%",
    "▰▰▰▰▰▰▰▰▰▰▰ 100%",
  ];
  //ardindan global Scope aktarilir...
  window.msgStatus=msgStatus
}

