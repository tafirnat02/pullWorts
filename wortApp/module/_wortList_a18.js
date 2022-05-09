/*
Modul Baglami: Kelime listasini dahil eder... 
*/

//     if (!!newList) return; //eger kelime listesi elden girilmis ise dosyadan kelime alinmaz

/*-------- Modul Default Olarak Disa Aktarimi ---------*/
//url dogru ise ilgili kelime listesi arr olara dönderilir...

export{wortList,  getWortList }

const wortList=[]

const  pushArr = (arr)=>{
    wortList.push(...arr)
    console.log(wortList)
}

 async function  getWortList() {
 console.log("🚩 running... ≣⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮");  
     
 const url_wortList = "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/module/wortList.json"; 

  //resolve(loadWort());//promise ile sirali olarak js filler eklenir...
   return await fetch(url_wortList)
    .then(response => {
      return response.text();
    }) // or .json()
    .then(response => {
      return (JSON.parse( response));
    }).then(response => {
      pushArr(response)
    })   
    .catch((err) => {
      console.log(
        `Kelime listesi alinirken hata oldu. Kelime urlini kontrol edin! (m:wortList, f:loadWords) ${url}`
      );
      console.log(err);
    });
};




/*

export default async function getWortList() {
  console.log("🚩 running... ≣⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮");
 
  const url_wortList =
    "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/module/wortList.json";
    
  if (checkFile(url_wortList)) return false; //kelimeler dosyadan array olarak sayfaya dahil edilir...

  return fetch(url_wortList)
    .then((response) => {
      return response.text();
    }) // or .json()
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((err) => {
      console.log(
        `Kelime listesi alinirken hata oldu. Kelime urlini kontrol edin! (m:wortList, f:loadWords) ${url}`
      );
      console.log(err);
    });
};

*/




/*
getWortList(test)

async function  getWortList(callback) {
 console.log("🚩 running... ≣⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮");  
     
 const url_wortList = "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/module/wortList.json"; 

  //resolve(loadWort());//promise ile sirali olarak js filler eklenir...
   return await fetch(url_wortList)
    .then(response => {
      return response.text();
    }) // or .json()
    .then(response => {
      return (JSON.parse( response));
    }).then(response => {
        test(response)
    })   
    .catch((err) => {
      console.log(
        `Kelime listesi alinirken hata oldu. Kelime urlini kontrol edin! (m:wortList, f:loadWords) ${url}`
      );
      console.log(err);
    });
};

const wortList=[]
const  test = (arr)=>{
    console.log(arr)
    wortList.push(...arr)
    
}
//____________________________________________
getWortList().then(response => {console.log(response)})

async function  getWortList() {
 console.log("🚩 running... ≣⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮");  
     
 const url_wortList = "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/module/wortList.json"; 

  //resolve(loadWort());//promise ile sirali olarak js filler eklenir...
   return await fetch(url_wortList)
    .then(response => {
      return response.text();
    }) // or .json()
    .then(response => {
      return (JSON.parse( response));
    }).then(response => {
        return response
    })   
    .catch((err) => {
      console.log(
        `Kelime listesi alinirken hata oldu. Kelime urlini kontrol edin! (m:wortList, f:loadWords) ${url}`
      );
      console.log(err);
    });
};


*/