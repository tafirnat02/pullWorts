/* Burada tüm modüllerde kullanilacak olan ögeler yer almakta...*/

 //export{test,setGlobal}
 export * from './_zBase_a09.js'; //bu modüldeki tüm ögeleri * joker karakteri ile disa aktarilir....


/*  --- Fonksiyonlar vd. --- */
  function test (){
    console.log('base js...')
}

// bir nesneyi, window nesnesine ait property olarak globa scope tasir...
const setGlobal=(item)=>{
  window.item = item
}

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
