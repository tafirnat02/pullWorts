
 var myArr=[]

for (let w of docs){
   var wo = getWort(w)
   delete wo.fall.wechsel
   let jsonData = JSON.stringify(wo)
    myArr.push(jsonData)
    //console.log(jsonData)
}
setTimeout(() => {
      console.log(myArr)
    }, 500);