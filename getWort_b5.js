const rpRegExp = /⁰|¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹|\n/g;
const brExp = /·/g;
const empty = "";
var newWort, doc, wortesArr=[];
var wort_Obj ={
  "wrt": {
    "wort": "",
    "plural": "",
    "prefix": "",
    "suffix": "",
    "artikel": ""
  },
  "fall": {
    "Dativobjekt": "",
    "Akkusativobjekt": "",
    "Reflexivpronomen": "",
    "Other": "",
    "wechsel": [
      "'an'",
      "'in'",
      "'über'",
      "'auf'",
      "'neben'",
      "'hinter'",
      "'unter'",
      "'vor'"
    ]
  },
  "status": {
    "Deklination": "",
    "Zertifikat": "",
    "Substantiv": "",
    "Adjektiv": "",
    "Plural": "",
    "Positiv": "",
    "Genus": "",
    "gesteigert": "",
    "Komparativ": "",
    "regelmäßige": "",
    "Artikel": "",
    "starke": "",
    "Pronomen": "",
    "Other": ""
  },
  "theme": "",
  "source": "",
  "main_Html": "",
  "main_Sound": "",
  "sub_Html": "",
  "sub_Sound": "",
  "lang_TR": "",
  "prasensTbl": "",
  "prateriumTbl": "",
  "perfektTbl": ""
}

function nextHtml(wrtOj){
  console.log(wrtOj.wrt)
  console.log(JSON.stringify(wrtOj))
  Object.keys(wrtOj).forEach(key => {
  console.log(key, wrtOj[key]);
})
  
  console.log("______________________")
  //kosnoldaki fonksiyon isleme tekrar sokulur
  nextDoc()
}

//buradaki kodalr ile sayfadaki kelimenin bilgileri newWort objesine atanir....
function getWort(html){
  doc="",newWort="", doc = html, newWort = wort_Obj
    /**kelimenin alinmasi */
    newWort.wrt.wort = doc.querySelector("form>div>input").value;
    /***Kelimenin tanimlanmasi */
    newWort.status.Deklination = doc.querySelector(
      "body > article > div:nth-child(1) > nav.rKrml.rKln.rInf > a:nth-child(2)"
    ).innerText;
    /**Üst kisimdaki kelimeye dair gramatik bilgiler */
    getTitle("headTitle")
    /***sub Title: Keliemenin cogulu, verben halleri ve diger cekimler bulunur***/
    getTitle("subCode");
    /*** mainTitle: Keliemyi ve ses dosyasini objeye ekler */
    getTitle("subMain");
    /*** worte dair text bilgileri olusturulur */
    getTitle("wortText");
    /*****Türkcesi */
    getTitle("lang")
    /**** Akkusativ/Dativ kullanimlarini neseye alma** */
    getTitle("fall")
    /***Konjugation Tablolarina dair HTML'ler */
    getTitle("Tbls")
   // console.log(JSON.stringify(newWort))
    wortesArr.push(JSON.stringify(newWort));
    nextDoc()
    //nextHtml(newWort)
}
/****::: Sub function****** */
/***Genel olarak ilgili fonksiyona yönlendirm yapan ara fonksiyon */
function getTitle(tit) {
  let head, ele, verb;
  verb = newWort.status.Deklination == "Konjugation" ? true : false;
  head = doc.querySelector("div.rAbschnitt>div>section");
  switch (tit) {
    case "headTitle":
      if (verb) {
        ele = head.querySelector("p");
      } else {
        ele = head.querySelector("header>p");
      }
      setStatus(ele, verb);
      break;
    case "subCode":
      setSubEl(head);
      break;
    case "subMain":
      setMainEl(head);
      break;
    case "wortText":
      if (!verb) setWortText(head);
      break;
    case "lang":
        setLang(head);
        break;
    case "fall":
        if(verb) setFall(head);
        break;
      case "Tbls":
        if(verb) setTbls()
    break;
  }
}
/**** kelimenin Türkcesini objeye atar. */
function setTbls(){
    let newTbl,tbl 
    tbl = doc.querySelector("a[href*='indikativ/praesens']");
    newTbl = tbl.parentElement.parentElement.cloneNode(true);
    newTbl.querySelector("span").remove()
    newWort.prasensTbl = newTbl.innerHTML
   
    tbl = doc.querySelector("a[href*='indikativ/praeteritum']");
    newTbl = tbl.parentElement.parentElement.cloneNode(true);
    newTbl.querySelector("span").remove()
    newWort.prateriumTbl = newTbl.innerHTML
    
    tbl = doc.querySelector("a[href*='indikativ/perfekt']");
    newTbl = tbl.parentElement.parentElement.cloneNode(true);
    newTbl.querySelector("span").remove()
    newWort.perfektTbl = newTbl.innerHTML
}
function setLang(head){
    ele = head.querySelector("span[lang='tr']")
    if(checkEl(ele)){
        newWort.lang_TR =  ele.innerText.trim() 
    }
}
/******Fillerin dativ akkusativ kullanimlarinin tespiti */
function setFall(head){
    let subFall ="", ele = doc.querySelectorAll("#vVdBx>div>div>p")
ele.forEach((row)=>{
   row.childNodes.forEach((n)=>{
       if(n.nodeName == "SPAN"){
          Object.keys(newWort.fall).forEach((f)=>{
              let tit = n.title
                if(tit.includes(f)){
                    newWort.fall[f] = n.innerText
                }else{
                    if(f=="wechsel"){
                       //console.log(Object.values(newWort.fall[f])) 
                         Object.values(newWort.fall[f]).forEach((w)=>{
                             if(tit.includes(w)) {
                              subFall=  subFall + n.innerText + " "
                             }
                         })
                    }                   
                }
           })
       }
   })
})
subFall = subFall.split(" -§- ").sort().join(" ").trim()       
newWort.fall.Other = subFall
} 
/***** cogul ve sifatlarin derecelerini almak icin kullanilir */
function setWortText(head) {
  ele = head.querySelector("p.vStm");
  if (newWort.status.Adjektiv !="") {
    //sifat dereceleri alinir
    ele.childNodes.forEach((n) => {
      if (n.innerText) {
        let txt = n.innerText.replace(rpRegExp, empty).trim();
        if (!newWort.wrt.Positiv) {
          newWort.wrt.Positiv = txt;
        } else if (!newWort.wrt.Komparativ) {
          newWort.wrt.Komparativ = txt;
        } else if (!newWort.wrt.Superlativ) {
          newWort.wrt.Superlativ = txt;
        }
      }
    });
  } else {
    //plural alinir
    ele.childNodes.forEach((n) => {
      if (n.innerText)
        newWort.wrt.plural = n.innerText.replace(rpRegExp, empty).trim();
      //artikel
      ele = head.querySelector("p.vGrnd");
      ele.childNodes.forEach((n) => {
        if (n.data)
          newWort.wrt.artikel = n.data.replace(rpRegExp, empty).trim();
      });
    });
  }
}
/*****kelimenin ana gövdesini ve sound linkini objeye atar */
function setMainEl(head) {
  ele = head.querySelector("p.vGrnd.rCntr");
  newWort.main_Sound = ele.lastChild.href;
  let mainHtml = ele.cloneNode(true);
  mainHtml.lastChild.remove();
  mainHtml.querySelector("img").remove();
  newWort.main_Html = mainHtml.innerHTML.replace(rpRegExp, empty);
}
/***** altta yer alan cogul, konj vs kisimin Html'ini ve soundunu objeye ekler */
function setSubEl(head) {
  ele = head.querySelector("p.vStm.rCntr");
  newWort.sub_Sound = ele.lastChild.href;
  let subHtml = ele.cloneNode(true);
  subHtml.lastChild.remove();
  let inHtml=""  
  nomen = newWort.status.Substantiv == "Substantiv" ? true : false;
    if(nomen) {
        subHtml.querySelector("b").remove()
        let plural =  newWort.status.Plural
        if (plural.includes(",")) {
        newWort.status.Plural =  plural.split(",")[1].trim()  
        }
    }

    newWort.sub_Html = subHtml.innerHTML.replace(rpRegExp, empty);  
    newWort.sub_Html = (nomen)? newWort.sub_Html.replace("·", "die "):newWort.sub_Html.replace(brExp, "<br>")
}
/**** objenin status keyinde tutulan verileri head bardan alir */
function setStatus(ele, verb) {
  let arr = ele.innerText.split("·");
  ele.childNodes.forEach((t) => {
    switch (t.childNodes.length) {
      case 0:
        break;
      default:
        if (verb) {
          if (checkEl(t.querySelector("span").title)) {
            newWort.status.Zertifikat = arr[0].replace(rpRegExp, empty);
            arr.shift();
          }
        } else {
          Object.keys(newWort.status).forEach((k) => {
            if (t.title.includes(k)) {
              newWort.status[k] =
                newWort.status[k] == "" ? t.innerText.replace(rpRegExp, empty) : newWort.status[k].replace(rpRegExp, empty);
            }
          });
        }
        break;
    }
  });
  newWort.status.Other = verb ? arr.join(" ").replace(rpRegExp, empty) : "";
}
/**Genel Kullanimdaki Diger Fonksiyonlar */
/***** DOM Element Checker*********/
function checkEl(e) {
  return e === null ? false : true;
}