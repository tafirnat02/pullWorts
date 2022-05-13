/* Burada tüm modüllerde kullanilacak olan ögeler yer almakta...*/

export { baseFun };

/*  --- Fonksiyonlar vd. --- */
const baseFun = async () => setItems.call();
baseFun().catch((err) => console.log(err));

//=============================================================
//gloabale atanacak öge biödirimi ve globale aktarimi. setValues icinde olmali tüm ögeler....
function setItems() {
  //yüzde % gösterimi...  Aciklama notion'da mevcut____________
  const runBar = {
    msgStatus: [
      "▱▱▱▱▱▱▱▱▱▱",
      "▰▱▱▱▱▱▱▱▱▱",
      "▰▰▱▱▱▱▱▱▱▱",
      "▰▰▰▱▱▱▱▱▱▱",
      "▰▰▰▰▱▱▱▱▱▱",
      "▰▰▰▰▰▱▱▱▱▱",
      "▰▰▰▰▰▰▱▱▱▱",
      "▰▰▰▰▰▰▰▱▱▱",
      "▰▰▰▰▰▰▰▰▱▱",
      "▰▰▰▰▰▰▰▰▰▱",
      "▰▰▰▰▰▰▰▰▰▰",
    ],
    lastIndex: 0,
    set: function (toIndex, min = 0, max = 0) {
      if (toIndex < 0 || toIndex > 10) return;
      if (max !== 0) {
        if (this.rate === undefined) {
          this.dif = toIndex - this.lastIndex;
          this.rate = Math.round((max - min) / this.dif);
          this.index = toIndex;
        }

        toIndex = this.lastIndex;

        if (min % this.rate === this.dif % this.rate) this.lastIndex++;
        if (min === max) {
          this.lastIndex = this.index;
          toIndex == this.index;
          delete this.rate;
          delete this.dif;
          delete this.index;
        }
      } else {
        if (toIndex === this.lastIndex) return;
        this.lastIndex = toIndex < this.lastIndex ? this.lastIndex : toIndex;
        toIndex = null;
      }

      if (this.lastIndex === toIndex || this.lastIndex > 10) return;
      console.clear(); //öncekiler temizlenir...
      console.log(
        `🚩running... ${this.msgStatus[this.lastIndex]} ${this.lastIndex}0%`
      );
    },
  };

  //console mesaj yazdirmak icin_______________________________
  const msg = {
    msgTyp: {
      primary: 0,
      successful: 1,
      warning: 2,
      error: 3,
    },
    style: {
      head: [
        "background: DodgerBlue;", //primary
        "background: Green;", //successful
        "background: DarkGoldenRod;", //warning
        "background: Red;", //error
      ],
      body: [
        "color: DeepSkyBlue;",
        "color: LimeGreen;",
        "color:DarkGoldenRod;",
        "color: Red;",
      ],
    },
    console: function (msgTyp, head, text, err = "") {
      let headStyle = `${this.style.head[msgTyp]} font-size: 12px; font-weight: bold; padding: 3px 5px; border-radius: 5px;`,
        bodyStyle = this.style.body[msgTyp];

      console.log(`%c ${head} %c ${text}`, headStyle, bodyStyle);
      if (!!err) console.log(err);
    },
    /*   msg.console(0==msg.msgTyp.primary,'Baslik', 'aciklama metninin görünümü')   */
  };

  //bir ögenin sayfada olup olmadigini kontrol eder...________
  const checkEl = (e) => {
    return e === null ? false : true;
  };

  //global scope a aktarilir...===============================
  window.runBar = runBar;
  window.msgConsole = msg;
  window.checkEl = checkEl;
} //setValues icinde olmali tüm ögeler....
