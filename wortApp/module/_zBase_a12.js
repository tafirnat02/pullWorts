/* Burada tüm modüllerde kullanilacak olan ögeler yer almakta...*/

export { test, setGlobal, msgStatus };

/*  --- Fonksiyonlar vd. --- */
function test() {
  console.log("base js...");
}

// bir nesneyi, window/this nesnesine ait property olarak globa scope tasir...
//tek seferde ard ardina 10'a kadar öge scope atilabilir
function setGlobal(
  item0 = "",
  item1 = "",
  item2 = "",
  item3 = "",
  item4 = "",
  item5 = "",
  item6 = "",
  item7 = "",
  item8 = "",
  item9 = ""
) {
  for (let index = 0; index < 10; index++) {
    if (eval("item" + index) == "") break;
    item = eval("item" + index);
    this[item.name] = item;
  }
}

//loading ilerleyisi....
const msgStatus = [
  "▰▱▱▱▱▱▱▱▱▱▱ 10%",
  "▰▰▱▱▱▱▱▱▱▱▱ 20%",
  "▰▰▰▱▱▱▱▱▱▱▱ 30%",
  "▰▰▰▰▱▱▱▱▱▱▱ 40%",
  "▰▰▰▰▰▱▱▱▱▱▱ 50%",
  "▰▰▰▰▰▰▰▱▱▱▱ 60%",
  "▰▰▰▰▰▰▰▰▱▱▱ 70%",
  "▰▰▰▰▰▰▰▰▰▱▱ 80%",
  "▰▰▰▰▰▰▰▰▰▰▱ 90%",
  "▰▰▰▰▰▰▰▰▰▰▰ 100%",
];




