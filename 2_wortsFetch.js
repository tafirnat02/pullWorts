//newWortArr
var wortObj =[],newWort = "",wortList = "",docs =[];

const delayLoop = (fn, delay) => {
  return (wort, i) => {
    setTimeout(() => {
      fn(wort);
    }, i * delay);
  }
};

const getWorts = (wort) => {
    let url = `https://www.verbformen.de/?w=${wort}`   
    console.log(url)
    fetch(url, { mode: "no-cors" })
    .then(response => {
        console.log(response);
        console.log("durum: " + response.status);
        return response.text();})   // or .json()
    .then(html => {
        var parser = new DOMParser();
    	doc = parser.parseFromString(html, 'text/html');
        docs.push( doc)
    .catch(err => {
        console.log(err)
    });
    });   
};

newWortArr.forEach(delayLoop(getWorts, 300))

/**
 *
 function blankaS(page){
    setTimeout(()=>{
              var parser = new DOMParser();
              doc= parser.parseFromString(page, "text/html");
              // wortObj.push(getWort())
              console.log(getWort())
    },1000);
}
 */