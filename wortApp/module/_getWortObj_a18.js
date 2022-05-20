//Bu modül 'HTMLdocs' dizininde tutulan kelimelere ait HTML/document verilerinden obje olusturulup icerik atanir...

/*-------- Disariya Cikarilan Ögeler ---------*/
export { getWortObject };

/*-------- Modul icerigindeki Ögeler ---------*/

let index = 0,
  len;
//olusturulan kelime objeleri wortObjsArr dizininde tutulut.
const setDoc = async (callback) => {
  await callback(HTMLdocs[index])
  .then((obj) => {
    console.log('kelime indexi:', index)
    index++;
    wortObjsArr.push(obj);
    docs(callback);
  });
};

const docs = async (callback) => {
  if (len !== index) setDoc(callback);
};

const getWortObject = async (callback) => {
  debugger
  const wortObjsArr = [];
  window.wortObjsArr = wortObjsArr;
  len = HTMLdocs.length;
  setDoc(callback);
};


