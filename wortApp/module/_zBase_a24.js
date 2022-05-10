/* Burada tüm modüllerde kullanilacak olan ögeler yer almakta...*/

export { baseFun };

/*  --- Fonksiyonlar vd. --- */
const baseFun = async () => setItems.call();
baseFun().catch((err) => console.log(err));

//============================================================
//gloabale atanacak öge biödirimi ve globale aktarimi. setValues icinde olmali tüm ögeler....
function setItems() {
  //yüzde % gösterimi...______________________________________
  const msgStatus = [
    "🚩running... ▱▱▱▱▱▱▱▱▱▱▱ 0%",
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

  //console mesaj yazdirmak icin_____________________________
  const msgTyp = Object.freeze({
    //msgConsole icin enum
    primary: 0,
    successful: 1,
    warning: 2,
    error: 3,
  });
  const msgConsole = (msgTyp, head, txt, err = "") => {
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
    //msgConsole(msgTyp.primary | .successful | .warning | .error,'Baslik', 'aciklama metninin görünümü')
  };

  //bir ögenin sayfada olup olmadigini kontrol eder..._______
  const checkEl = (e) => {
    return e === null ? false : true;
  };

  //global scope a aktarilir...===============================
  window.msgStatus = msgStatus;
  window.msgTyp = msgTyp;
  window.msgConsole = msgConsole;
  window.checkEl = checkEl;
} //setValues icinde olmali tüm ögeler....
