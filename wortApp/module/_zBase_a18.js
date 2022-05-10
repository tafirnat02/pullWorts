/* Burada tüm modüllerde kullanilacak olan ögeler yer almakta...*/

export {setGlobalScope};

/*  --- Fonksiyonlar vd. --- */
//loading ilerleyisi....
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

//buradaki ögeleri global scope aktarir....
const setGlobalScope=()=>{
  this.msgStatus=msgStatus
}




