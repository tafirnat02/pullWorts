//newWortArr 
var wortObj =[],newWort = "",wortList = "",docs =[], i_no=0;
var newTimeOut, myArr=[]  

const runApp = (len="") =>{
    myArr = [...newWortArr]
    if(len!=""){
      maxlen = myArr.length
      myArr = myArr.slice(len,maxlen)
      i_no=len
    }
    nextWort()
}

const nextWort = () =>{
    if(myArr.length>0){
       let wort  = myArr.shift();
       getWorts(wort)
    }
}

const getWorts = (wort) => {
    let url = `https://www.verbformen.de/?w=${wort}` 
    fetch(url, { mode: "no-cors" })
    .then(response => {
     if (response.status != 200) {throw Error("Hata Kodu: " + response.status);}
      console.log(response);
      console.log("durum: " + response.status);
      docs.push( response.text())
        /*return response.text(); */ }) // or .json()
    .then(html => {
         i_no++
         nextWort() 
    }) 
    .catch(err => {
        console.log("---> " + wort)
        console.log(`Wort Listeki kalinan öge no:${i_no} `) 
        console.log("Alinan Kelime: " + newWortArr[i_no])
        console.log(err)
    });
};

runApp(95)


