/****
 * HATA DÜZELTILECEK
 * getWort...js deki setMainEl(head) fonksiyonu nomen/adj ve verb(mit trennbar) durumuna göre cek et...
 *
 * Anki ön kisim beklenildigi calismakta anacak
 * Arka kisim masaüstünde sorunsuz calisirken mobilde sorun cikarmakat...
 *
 * Bunun icin mobil oldugunu user_agent ile tespit edip daha sonra
 * ön kismda bu bilgiler Cevabi Göster Butonu ile yapilabilir.
 *
 * userAgent yerine dogrudan platform tespiti icin asagidaki koduda kullanabilirisin
 *
 */

 function getPlatform() {
    var platform = ["Win32", "Android", "iOS"];
  
    for (var i = 0; i < platform.length; i++) {
      if (navigator.platform.indexOf(platform[i]) > -1) {
        return platform[i];
      }
    }
  }
  
  //kelime bazli örnek cümlerler almak icin >> https://www.satzapp.de/saetze/?w=abnehmen
  //seviyeye göre ve diger seceneklere gore alinabilir
  
  getPlatform();
  
  /************************************************************************************* */
  //--> kodun Yürütülmesi
  var newWort = "";
  getWort(setData);
  /**----------- [ 1. Kisim: Kelime Objesinin Alinmasi] -----------**/
  //Anki ise #json.innerText'ten, vsCode ise wortObj linkinden veri alinarak kod baslar
  function getWort(callback) {
    if (typeof wortObj !== "undefined") {
      newWort = wortObj.verb1; //vsCode'da secilen wortObjesini alir.
    } else {
      newWort = JSON.parse(doc(1, "json").innerText); //ankide wortObjesini alir
    }
    console.log(newWort);
    callback();
  }
  /**----------- [ 2. Kisim: Objedeki bilgilerin organizasyonu] -----------**/
  function setData() {
    /***** Ön Sayfadaki Islemler*****/
    //Kelime ve cekimleri alinir...
    doc(2, "kelime").innerHTML = newWort.main_Html;
    doc(2, "s_worts").innerHTML = newWort.sub_Html.replace();
    //kelimeye dair diger bilgiler alinir
    doc(2, "Status").innerText = statusFun();
    doc(2, "ek_item").innerText = fallFun();
    //ses ortami ayarlari
    getSound();
    /***** Arka Sayfadaki Islemler*****/
    //kelimenin TR anlami
    doc(2, "lang").innerText = newWort.lang_TR;
    //tablolara dair durum
    getTblValue();
  }
  /**----------- [ 3. Kisim: Isleyise dair temel fonksiyonlar] -----------**/
  // status kismindaki bilgiler derlenir
  function statusFun() {
    let sts = "",
      o_status = "";
    Object.keys(newWort.status).forEach((s) => {
      switch (s) {
        case "Deklination":
          sts = newWort.status[s] == "Konjugation" ? "Verb" + sts : sts;
          break;
        case "Adjektiv":
          sts = newWort.status[s] != "" ? newWort.status[s] + " " + sts : sts;
          break;
        case "Substantiv":
          sts = newWort.status[s] != "" ? newWort.status[s] + " " + sts : sts;
          break;
        case "Zertifikat":
          /*sts =newWort.status[s] != " -› "? sts + " -› " + newWort.status[s]: sts;*/
          break;
        case "Substantiv":
          /* bu kisim atlanir...*/
          console.log("---");
          break;
        default:
          o_status =
            newWort.status[s] != ""
              ? o_status + " ⌁ " + newWort.status[s]
              : o_status;
          break;
      }
    });
    return sts + " " + o_status;
  }
  //fall kisminda verbe dair diger bilgiler alinir
  function fallFun() {
    let fall = "";
    Object.keys(newWort.fall).forEach((f) => {
      switch (f) {
        case "wechsel":
          break;
        case "Other":
          o_fall = newWort.fall[f];
          break;
        default:
          fall = fall + newWort.fall[f] + " ";
          break;
      }
    });
    return fall;
  }
  /**----------- [ 4. Kisim: Ses Ile ilgili Ayarlari Icerir] -----------**/
  var soundTip = document.getElementById("soundErr");
  //ses urlleri objeden sayfaya aktarilir...
  function getSound() {
    var mainSound = doc(1, "playMain");
    var subSound = doc(1, "playSub");
    mainSound.dataset.sound = newWort.main_Sound;
    subSound.dataset.sound = newWort.sub_Sound;
    //play control gizlemek icin
    var audioCntrl = doc(1, "sTon");
    audioCntrl.hidden = true; // false
    //yüklendiginde sesi oynatmasi icin
    setTimeout(() => {
      mainSound.click();
    }, 800);
  }
  //sesin yürütülmesine ve ses hatasi olmasina iliskin kodlar
  function playTon(ele) {
    const sound = document.getElementById("sTon");
    sound.src = ele.dataset.sound;
    //ses sorunu oldugunda bu kullaniciya bildirilir...
    sound.addEventListener("error", function (e) {
      soundTip.style.display = "block"; //console.error("MP3 file error: ", e);
      soundTip.addEventListener("click", openUrl);
    });
    sound.play();
  }
  function openUrl() {
    window.open(
      "https://www.verbformen.de/",
      "_blank",
      "toolbar=no,scrollbars=no,resizable=no,top=10,left=10,width=350,height=250"
    );
    soundTip.style.display = "none"; //console.error("MP3 file error: ", e);
  }
  /**----------- [ 5. Kisim: Arka sayfadaki tablolara dair kodlar] -----------**/
  function getTblValue() {
    let dsp;
    if (newWort.status.Deklination == "Konjugation") {
      doc(1, "Prasens").insertAdjacentHTML("beforeend", newWort.prasensTbl);
      doc(1, "Prateritum").insertAdjacentHTML("beforeend", newWort.prateriumTbl);
      doc(1, "Perfekt").insertAdjacentHTML("beforeend", newWort.perfektTbl);
      dsp = "block";
    } else {
      dsp = "none";
    }
    for (let tbl of doc(4, ".tbl-wrap")) {
      tbl.style.display = dsp;
    }
  }
  /**----------- [ 6. Kisim: Isleyise dair ===Genel=== fonksiyonlar] -----------**/
  // DOM selector >> sayfadaki elementleri secer
  function doc(dom = "id>1/cls>2/1_El>3/all_El>4", el) {
    switch (dom) {
      case 1: //id
        return document.getElementById(el);
        break;
      case 2: //class
        return document.getElementsByClassName(el)[0];
        break;
      case 3: //querySelector
        return document.querySelector(el);
        break;
      default:
        return document.querySelectorAll(el);
        break;
    }
  }
  
  /********************** Deneysel Kisimlar************* */
  
  doc(2, "Status").addEventListener("click", testFun);
  
  function testFun() {
    doc(2, "Status").innerText = "bana Tikladin...";
  }
  
  