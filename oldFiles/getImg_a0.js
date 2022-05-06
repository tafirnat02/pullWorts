function getImg(){
    //api import
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://apis.google.com/js/api.js";
    document.head.appendChild(script);
    gapi.load("client");
     setTimeout(() => {
      loadClient() 
     }, 1000);
     return true
   }
  
  var anhtr =["43ee39fa4cfa0400a","c23b05fa4f69a434e","a63f41cf66d614e56","729623ca31d534c37","e6415d6a998894840", "81559b9a5542844f0", "009bd2355a51b4179"]
  var myObj = {};
   var queryWort =newWort.wrt.wort
        function loadClient() {
          gapi.client.setApiKey("AIzaSyA27tfTgHk1LOLODEZXMvL5vPBLf_18Jc0"); 
          return gapi.client
            .load(
              "https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest"
            )
            .then(
              function () {
                execute() // console.log("GAPI client loaded for API");
              },
              function (err) {
                console.error("Error loading GAPI client for API", err);
              }
            );
        }
        // Make sure the client is loaded before calling this method.
        function execute() {
          return gapi.client.search.cse
            .list({
              cx: anhtr[0],
              q: queryWort +  ' symbol -stock',
              cr: "countryDE",
              gl: "de",
              hl: "de",
              lr: "lang_de",
              safe: "active",
              searchType: "image",
            })
            .then(
              function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                myObj = Object.assign({}, response);
                addSrc();
              },
              function (err) {
                console.error("Execute error", err);
              }
            );
        }
        
        function addSrc() {
          doc(2,'bildWrap').style.display='flex'
          myObj.result.items.forEach((itm, no) => {
           // var img = document.createElement("img");
            let div = doc(1, "img" + no);
            div.querySelector('img').src = itm.image.thumbnailLink;
          });
        }
  
        /**----------- [ 11. Kisim: add image end] -----------**/