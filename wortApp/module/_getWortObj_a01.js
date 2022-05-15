//Bu modül 'HTMLdocs' dizininde tutulan kelimelere ait HTML/document verilerinden obje olusturulup icerik atanir...

/*-------- Disariya Cikarilan Ögeler ---------*/
export { getWortObject };

/*-------- Modul icerigindeki Ögeler ---------*/

//olusturulan kelime objeleri wortObjsArr dizininde tutulut.
const wortObjsArr = ["henüz bos..."];

const setDoc = (callback) => {
  return new Promise((myResolve) => {
    window.wortObjsArr = wortObjsArr;
    HTMLdocs.forEach((doc) => {
      console.log(doc);
    });
    callback()
    myResolve(); // when successful
  });
};

const getWortObject = (callback) => {
    setDoc(callback)
    .then(console.log(wortObjsArr));
};
