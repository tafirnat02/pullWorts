/* Burada tüm modüllerde kullanilacak olan ögeler yer almakta...*/

export { baseFun };

/*  --- Fonksiyonlar vd. --- */
const baseFun = async () => {
  return setItems.call();
};
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
        }
        toIndex = this.lastIndex;
        if (min % this.rate === this.dif % this.rate) this.lastIndex++;
        if (min === max) {
          delete this.rate;
          delete this.dif;
        }
      } else {
        if (toIndex <= this.lastIndex || this.lastIndex > 10) return;
        this.lastIndex = toIndex; //< this.lastIndex ? this.lastIndex : toIndex;
        toIndex = -1;
      }
      if (this.lastIndex <= toIndex || this.lastIndex > 10) return;
      console.clear(); //öncekiler temizlenir...
      console.log(
        `🚩running... ${this.msgStatus[this.lastIndex]} ${this.lastIndex}0%`
      );
    },
  };

  /**** mesaj bildirim islemlerine dair ****/
  const msg = {
    style: {
      titleColor: [
        "background: DodgerBlue;", //primary
        "background: Green;", //successful
        "background: DarkGoldenRod;", //warning
        "background: Red;", //error
      ],
      bodyColor: [
        "color: DeepSkyBlue;",
        "color: LimeGreen;",
        "color:DarkGoldenRod;",
        "color: Red;",
      ],
      title: function (typ) {
        return `${this.titleColor[typ]} font-size: 12px; font-weight: bold; padding: 3px 5px; border-radius: 5px;`;
      },
      body: function (typ) {
        return this.bodyColor[typ];
      },
    },
    container: [],
    add: function (msgTyp, title, text, add = "") {
      let newMsg = [msgTyp, title, text, add];
      this.container.push(newMsg);
    },
    print: function (typ, title, text, add = "") {
      console.log(
        `%c ${title} %c ${text}`,
        this.style.title(typ),
        this.style.body(typ)
      );
      if (!!add) console[typ == 3 ? "error" : typ == 2 ? "warn" : "info"](add);
    },
    allPrint: function () {
      if (this.container.length < 1) return;
      this.container.sort();
      //islem kayit sonuclari gruplu(false=>acik) olarak gösterilir
      this.group(0,'Rapor','Isleme dair aciklamalar:',false)
        this.container.forEach((msg) => {
          let msgTyp, title, text, add;
          [msgTyp, title, text, add] = msg; //degiskenlere array degerleri atanir
          this.print(msgTyp, title, text, add);
        });
      this.group();
      this.container.length = 0;
    },
    group: function (typ = "", title = "", text = "", collapsed = true) {
      if (typ==="") {
        console.groupEnd();
        return;
      }
      collapsed = collapsed ? "groupCollapsed" : "group";
      window.console[collapsed](
        `%c ${title} %c ${text}`,
        this.style.title(typ),
        this.style.body(typ)
      );
    },
  };
  //uygulama icerisinde yürütülen sürecin olup olmadigini kontrolü ve beklemesi icin
  const byController = {}; //nesne bos, property kullanilirken ilgili modülde atanir ve islem teyidi sonrasi silinir..
  //global scope a aktarilir...===============================
  window.byController = byController;
  window.runBar = runBar;
  window.checkEl = checkEl;
  window.storage = storage;
  window.msg = msg;
  return true;
} //setValues icinde olmali tüm ögeler....
