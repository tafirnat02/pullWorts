//Bu modül 'HTMLdocs' dizininde tutulan kelimelere ait HTML/document verilerinden obje olusturulup icerik atanir...

/*-------- Disariya Cikarilan Ögeler ---------*/
export { getWortObject };

/*-------- Modul icerigindeki Ögeler ---------*/

//olusturulan kelime objeleri wortObjsArr dizininde tutulut.
const setDoc = (callback) => {
  HTMLdocs.forEach((doc) => {
    callback(doc);
  });
};

const getWortObject = (callback) => {
  const wortObjsArr = [];
  window.wortObjsArr = wortObjsArr;
  setDoc(callback);
};
