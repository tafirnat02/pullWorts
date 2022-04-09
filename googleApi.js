// https://rapidapi.com/  -> fsenel0634@gmail.com
const encodedParams = new URLSearchParams();
encodedParams.append("q", "jeder");  //<< kelime girisi yapilir
encodedParams.append("target", "tr");
encodedParams.append("source", "de");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
		'X-RapidAPI-Key': '315d73dc43msh61c6def5cbe0690p1cad03jsnc046f66648da'
	},
	body: encodedParams
};

fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
	.then(response => response.json())//.then(response => console.log(response))
    .then(data => {
        console.log(data)
        console.log(data.data['translations'][0].translatedText);
    })
	.catch(err => console.error(err));


    // 2. kaynak API | -> tafirnat02+myapp1@gmail.com
    const encodedParams = new URLSearchParams();
encodedParams.append("q", "Hallo");
encodedParams.append("target", "tr");
encodedParams.append("source", "de");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
		'X-RapidAPI-Key': 'e6eeb1d246msh507a98ce5c106ecp1b2006jsn9db652c8d92c'
	},
	body: encodedParams
};

fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
	.then(response => response.json())
    .then(response => {
        console.log(response)
        console.log(response.data['translations'][0].translatedText);
    })
	.catch(err => console.error(err));

// 3. kaynak API | -> tafirnat02+myapp2@gmail.com
const encodedParams = new URLSearchParams();
encodedParams.append("q", "Haus");
encodedParams.append("target", "tr");
encodedParams.append("source", "de");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
		'X-RapidAPI-Key': '2e9d9e2222msh2090313b0b2a039p19c7e1jsn171050b1c271'
	},
	body: encodedParams
};

fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        console.log(response.data['translations'][0].translatedText);
    })
	.catch(err => console.error(err));