export function myFunc(num){
    console.log('testVal 1>>', testVal)
    console.log(num+1)
    testVal='deger degisti...'
    console.log(myFunc2(num))
}

var testVal='baseVal'

function myFunc2(num){
    console.log(num*2)
    console.log('icerideki fonksiyon yürütüldü...')
    console.log('testVal 2>>', testVal)
}

