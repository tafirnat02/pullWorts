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
    index++;
    console.log('setDoc-return:', obj)
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


/* örnek asycn */
/*
async function test23(val) {
  setTimeout(() => {
    console.log(val);
    return 55;
  }, 1500);
}

await test23("testVal")
.then((val) => {
  console.log("val", val);
});
*/