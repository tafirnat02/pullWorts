/* Burada tüm modüllerde kullanilacak olan ögeler yer almakta...*/

export {setGlobalScope};

/*  --- Fonksiyonlar vd. --- */
 const  setGlobalScope= async ()=>{
   setValues.call()
   window.msgConsole=msgConsole
   window.checkEl=checkEl
}
//msgConsole icin enum
const msgTyp = Object.freeze({
  primary: 0,
  successful: 1,
  warning: 2,
  error: 3,
})

function setValues(){
  //nesne deklare edilir
 const msgStatus = [
    "🚩running... ▰▱▱▱▱▱▱▱▱▱▱ 10%",
    "🚩running... ▰▰▱▱▱▱▱▱▱▱▱ 20%",
    "🚩running... ▰▰▰▱▱▱▱▱▱▱▱ 30%",
    "🚩running... ▰▰▰▰▱▱▱▱▱▱▱ 40%",
    "🚩running... ▰▰▰▰▰▱▱▱▱▱▱ 50%",
    "🚩running... ▰▰▰▰▰▰▰▱▱▱▱ 60%",
    "🚩running... ▰▰▰▰▰▰▰▰▱▱▱ 70%",
    "🚩running... ▰▰▰▰▰▰▰▰▰▱▱ 80%",
    "🚩running... ▰▰▰▰▰▰▰▰▰▰▱ 90%",
    "🚩running... ▰▰▰▰▰▰▰▰▰▰▰ 100%",
  ];
  //ardindan global Scope aktarilir...
  window.msgStatus=msgStatus
}

//console mesaj yazdirmak icin
function msgConsole(msgTyp, head, txt, err = "") {
  const head0 = "background: DodgerBlue;", //primary
    body0 = "color: DodgerBlue;",
    head1 = "background: Green;", //successful
    body1 = "color: Green;",
    head2 = "background: DarkGoldenRod;", //warning
    body2 = "color:DarkGoldenRod;",
    head3 = "background: red;", //error
    body3 = "color:red;",
    bases =
      "font-weight: bold; color: white; font-size: 12px; padding: 3px 5px; border-radius: 5px;";
  var stylHead = eval(`head${msgTyp}`) + bases,
    stylBody = eval(`body${msgTyp} `);

  console.log(`%c ${head} %c ${txt}`, stylHead, stylBody);
  if (!!err) console.log(err);
  /*
consoleMsg(msgTyp.primary | .successful | .warning | .error,'Baslik', 'aciklama metninin görünümü')
*/
}

//bir ögenin sayfada olup olmadigini kontrol eder...
function checkEl(e) {
  return e === null ? false : true;
}



