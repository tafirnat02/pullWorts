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
        if (toIndex <= this.lastIndex  || this.lastIndex > 10) return;
        this.lastIndex = toIndex //< this.lastIndex ? this.lastIndex : toIndex;
        toIndex=-1
      }
     if (this.lastIndex <= toIndex ||  this.lastIndex > 10) return;
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
      if (!!err) console.error(err);
    },
    /*   msg.console(0==msg.msgTyp.primary,'Baslik', 'aciklama metninin görünümü')   */
  };

  //belirli bir süre icerisinde fonksiyon/degisken arar bulursa cikis yapar________________________
  const item = {
    typ: {
      function: 0, //fonksiyon
      variabel: 1, //obje vd. degiskenlerin kontrolü
    },
    search: function (
      string_itemName, //ilgili ögenin adi string olarak girilmeli...
      typ,
      callback = "",
      duration = 100,
      maxDuration = 3000
    ) {
      if (typeof string_itemName !== "string")
        throw `Hata: Aranilan öge sitrin olarak girilmeli. (m:Base.js, o:item.search()) \n${string_itemName}`;

      let clear;
      //döngüsel zaman atanir
      const int_ID = setInterval(() => {
        switch (typ) {
          case 0: //fonksiyon kontrolü >> window.functionName
            if (typeof window[string_itemName] === "function") clear = true;
            break;
          default: //obje, array, string vs degiskenlerin kontrolü
            try {
              if (typeof eval(string_itemName) != "undefined") clear = true;
            } catch (error) {
              clear = false;
            }
            break;
        }
        if (clear) {
          //öge varsa zamanlamayi temizler
          clearInterval(int_ID);
          if (typeof callback === "function") callback();
          return true;
        }
      }, duration); // döngüyü tekrarlar

      //max time sonrasi cikilir
      const clearInt = setTimeout(() => {
        if (!clear) {
          console.log(
            `Süre Asimi: "${string_itemName}" adli ${
              Object.keys(item.typ)[typ]
            } erisilebilir degil!  Baglantilari ziyaret ederek check et.(f:intervalApp-clearInt)`
          );
          return false;
        }
        clearInterval(int_ID);
      }, maxDuration);
      /*****runing********/
      clearInt;
      int_ID;
    },

    /*zBsp: item.search('wortList',item.typ.function,callback)        item.typ.function || 0
            item.search('baz',item.typ.variabel,callback,50,1200)     item.typ.variabel || 1
    */
  };

  //bir ögenin sayfada olup olmadigini kontrol eder...________
  const checkEl = (e) => {
    return e === null ? false : true;
  };

  //local storage'e key, value degeri olarak js objenin saklanmasi,geri alinmasi ve silinmesi
  //local storage'e key, value degeri olarak js objenin saklanmasi,geri alinmasi ve silinmesi
  const storage = {
    obj: {
      name: null,
      index: null,
      date: null, // new Date(..obj.date) olarak tarihe cevrilerek kullanilmali
    },
    set: function (name, index, hour = 5) {
      this.obj.name = `@ri5: ${name}`;
      this.obj.index = index;
      this.addHour(hour);
      //olusturulan nesne local storagee aktarilir
      window.localStorage.setItem(this.obj.name, JSON.stringify(this.obj));
    },
    get: function (name) {
      return JSON.parse(window.localStorage.getItem(`@ri5: ${name}`));
    },
    remove: function (name) {
      window.localStorage.removeItem(`@ri5: ${name}`);
    },
    addHour: function (hour) {
      //olusturulan zaman damgasi ile local storagedeki objenin güncelligi kontrol edilir.
      this.obj.date = new Date(
        new Date().setTime(new Date().getTime() + hour * 60 * 60 * 1000)
      );
    },
    /* storage.set('myVal',2,1)     //atanir
       storage.get('myVal').index   //localden veri alinir
       storage.remove('myVal')      //localden key/value kaldirilir
       let trh = storage.get('myVal').date
       new Date(trh)>new Date()
    */
  };
  //uygulama icerisinde yürütülen sürecin olup olmadigini kontrolü ve beklemesi icin
  const byController = {}; //nesne bos, property kullanilirken ilgili modülde atanir ve islem teyidi sonrasi silinir..

  //global scope a aktarilir...===============================
  window.byController = byController;
  window.runBar = runBar;
  window.msg = msg;
  window.checkEl = checkEl;
  window.item = item;
  window.storage = storage;
  //
  return true;
} //setValues icinde olmali tüm ögeler....
