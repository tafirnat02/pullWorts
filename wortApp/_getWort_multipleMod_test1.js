
//ilgili urldeki js kodu sayfanin head kismina eklenir....
import {myFunc} from "./module/test1.js"
 console.log(myFunc(5))
var testMyFunc = myFunc.bind()
testMyFunc(9)
console.log(testMyFunc)
export{testMyFunc,myFunc}


