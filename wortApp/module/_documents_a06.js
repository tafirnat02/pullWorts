//Bu modül ile kelimelere ait HTML/documet alinir ve HTMLdocuments arrayinde tutulur...
/*-------- Disariya Cikarilan Ögeler ---------*/
export { getDoc };

/*-------- Modul icerigindeki Ögeler ---------*/

const getDoc = async () => {
    var strt=0, // >>  starter kismi storage den alinacak server hatasi sonrasi devam etmek icin...
        max =wortList.length

    const HTMLdocuments = [],
        subWortList =  [...wortList.slice(strt, max)]
   
   const nextDoc = () => {if (subWortList.length > 0) docHTML(subWortList.shift())};
       
     const docHTML = (wort) => { 
       let url = `https://www.verbformen.de/?w=${wort}`;
        fetch(url, { mode: "no-cors" })
         .then((response) => {
           if (response.status === 200) return response.text(); 
           throw response.status === 429?429:response //hata kontrolü
         })
         .then((html) => {
           let parser = new DOMParser();
           let doc = parser.parseFromString(html, "text/html");
           HTMLdocuments.push(doc);
         })
         .then(() => {
           strt++;
         if (max == strt) {
           finishDoc(HTMLdocuments); //tamamlanan kelime sayfalarindan "Wort" sinifindan nesne olusturulur.
         } else {
           runBar.set(5,strt-1,max); //%10 durumu...
           nextDoc();
         }
   
         })
       .catch((err) => {
           let msgHead = err===429? `429 | ${wort}`:' ⚠️ Error'
           let msgTxt = err===429? `Alinamayan kelime: ${wortList[strt]}, indeks no: ${strt}`:''
           msg.console(
             msg.msgTyp.error,
             msgHead,
             `${msgTxt}(m:documents*.js f:docHTML)`,
             err
           );
           finishDoc(HTMLdocuments); //hataya kadar alinan ögeler isleme alinir....
         });
     };
     
       nextDoc.call()//alt fonksiyon cagrilir
   }

   const  finishDoc = (HTMLdocs) => {
         window.HTMLdocs = HTMLdocs //alinan ögeler global scope'a HTMLdocs nesnesi olarak aktarilir...
    } 
   //getDoc.call() //ana fonksiyon cagrilir
         
