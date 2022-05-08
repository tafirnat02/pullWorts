import {myFunc} from "./module/test1.js"
 

//console.log(myFunc(5))
var testMyFunc = myFunc.bind()
testMyFunc(9)
export {testMyFunc};