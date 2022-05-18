//Bu modül 'HTMLdocs' dizininde tutulan kelimelere ait HTML/document verilerinden obje olusturulup icerik atanir...

/*-------- Disariya Cikarilan Ögeler ---------*/
export { getWortObject };

/*-------- Modul icerigindeki Ögeler ---------*/

//olusturulan kelime objeleri wortObjsArr dizininde tutulut.
const wortObjsArr222 = [];

const setDoc = () => {
    HTMLdocs.forEach((doc) => {
      console.log(doc)
  });
};


const getWortObject = () => {
  window.wortObjsArr222=wortObjsArr222
  setDoc()
};






