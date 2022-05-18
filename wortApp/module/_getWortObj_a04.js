//Bu modül 'HTMLdocs' dizininde tutulan kelimelere ait HTML/document verilerinden obje olusturulup icerik atanir...

/*-------- Disariya Cikarilan Ögeler ---------*/
export { getWortObject };

/*-------- Modul icerigindeki Ögeler ---------*/

//olusturulan kelime objeleri wortObjsArr dizininde tutulut.
const wortObjsArr = ["henüz bos..."];

const setDoc = (callback) => {
    HTMLdocs.forEach((doc) => {
      callback(doc)
  });
};


const getWortObject = (callback) => {
  window.wortObjsArr=wortObjsArr
  setDoc(callback)
};






