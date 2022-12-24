console.log("___66776__")

let txt = false, subTitelBtn;
    try {
      ytbSubElx = dcx(".ytp-settings-button")
      ytbSubElx.removeEventListener("click", setEvent);
      ytbSubElx.addEventListener("click", setEvent);
      console.log("youtubeSubTitle....1")

    } catch (error) {
      console.log("youtubeSubTitle....2")
    }
  
  function setEvent() {
    try {
      subTitelBtn = dcx(".ytp-menuitem-label-count").parentElement.parentElement;
      subTitelBtn.removeEventListener("click", timerCLK)
      subTitelBtn.addEventListener("click", timerCLK);
      console.log("setEvent....1")
    } catch (error) {
      console.log("setEvent....2")
    }
  }

  const timerCLK = () => setTimeout(() => clickerEl(), 500);

  function clickerEl() {
    console.log("clickerEl....")
    let els = dcxAll('[role="menuitemradio"]>.ytp-menuitem-label');
    txt = !txt ? "Otomatik çevir" : "Türkçe";
    try {
      els.forEach((el, i) => {
        if (el.innerText === txt) throw i;
      });
    } catch (i) {
      if (typeof i === "number") {
        els[i].click();
        if (txt === "Otomatik çevir"){
          timerCLK();
        }else{
          loopUp=true
        } 
      }
    }
  }
