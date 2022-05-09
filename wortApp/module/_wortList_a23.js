/*
Modul Baglami: Kelime listasini wortListe dahil eder... 
WortList'e arrayin push edilebilmesi icin önce getWortList() cagrilmalidir.
*/

/*-------- Disariya Cikarilan Ögeler ---------*/
export { wortList, getWortList };

/*-------- Modul Default Olarak Disa Aktarimi ---------*/

const wortList = [];
const pushArr = (arr) => {
  wortList.push(...arr);
};

async function getWortList() {
  const url_wortList =
    "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/module/wortList.json";

  //önce dosya checkFile() kontrol edilir...
  await checkFile(url_wortList, "m:wortList, f:getWortList")
    .then(() => {
      return urlChecker.url;
    })
    .then((file) => {
      if (!file) throw 404; //url gecerli ise ilgili dosya isleme alinir...degilse hata firlatilir...
    })
    .then(
      //dosya konumu teyit edildikten sonra asycn() ile dosyadan veri alinir...
      async () => {
        await fetch(url_wortList)
          .then((response) => {
            return response.text();
          }) // or .json()
          .then((response) => {
            return JSON.parse(response);
          })
          .then((response) => {
            //pushArr(response);
            wortList.push(...response)
          });
      }
    )
    .catch((err) => {
      if (err !== 404) {
        console.log(
          `Kelime listesi alinirken hata meydana geldi!.. (m:wortList, f:getWortList)`,
          err
        );
      }
    });
}

/*
const url_wortList = "https://cdn.jsdelivr.net/gh/tafirnat02/pullWorts@main/wortApp/module/wortList.json"; 

  

 async function  getWortList() {
   //önce dosya kontrol edilir...
   await checkFile(url_wortList,'m:wortList, f:getWortList')
    .then(()=>{ 
        return urlChecker.url
    })
    .then(file=>{
      //url gecerli ise ilgili dosya isleme alinir...
      if (!!file) return false
  
      await fetch(url_wortList)
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
          `Kelime listesi alinirken hata oldu. Kelime urlini kontrol edin! (m:wortList, f:getWortList)\n ${url}`
        );
        console.log(err);
      })
    })
    }


 async function checkUrl(){
   urlChecker(url_wortList,'m:wortList, f:getWortList')
 } 

 checkUrl.then()
*/

/*
try {
  console.log(checkFile(url_wortList,'m:wortList, f:getWortList'))
  if(!!checkFile(url_wortList,'m:wortList, f:getWortList')) return //dosyaya erisilemez ise cikis yapilir...
} catch (error) {
  console.log(error)
}
*/
//resolve(loadWort());//promise ile sirali olarak js filler eklenir...

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
