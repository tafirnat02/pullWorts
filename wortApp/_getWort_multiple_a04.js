import {myFunc} from "./module/test.js"
 
const testMyFunc =myFunc.bind()
console.log(myFunc(5))