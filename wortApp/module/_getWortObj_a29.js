//Bu modül 'HTMLdocs' dizininde tutulan kelimelere ait HTML/document verilerinden obje olusturulup icerik atanir...

/*-------- Disariya Cikarilan Ögeler ---------*/
export { getWortObject };

/*-------- Modul icerigindeki Ögeler ---------*/

let index = 0,
  len;
//HTMLdocs ögesinden ilgili kelime icin wort classindan wortObj olusturulur ve wortObjsArr dizinine eklenir.
const setDoc = async (callback) => {
  await callback(HTMLdocs[index]).then((obj) => {
    console.log('creat Wort Obj den gelen sonuc:', obj)
    index++;
    wortObjsArr.push(obj);
    docs(callback);
  });
};
//HTMLdocs dizinindeki tüm ögeler icin setDoc ile islem yapilir
const docs = async (callback) => {
  if (len === index){
    byController.worts = true; //item.search() ile bu asamnin tamamlandigini teyit icin controlObj'de worts propertysi olusturulur...
    return true
  }else{
    setDoc(callback);
  } 
};

const getWortObject = async (callback) => {
  const wortObjsArr = [];
  wortObjsArr.length=0
  window.wortObjsArr = wortObjsArr;
  len = HTMLdocs.length;
  setDoc(callback);
};