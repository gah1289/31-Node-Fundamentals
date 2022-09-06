let $numList = $('#numberFacts');
let $questionOne = $('#question-one');
let $questionTwo = $('#question-two');
let $questionThree = $('#question-three');

// // Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.
let num = '13';
let type = 'year';
let baseURL = `http://numbersapi.com`;
// axios
// 	.get(`${baseURL}/13/year?json`)
// 	.then((data) => {
// 		$questionOne.append(`<li>Question One: ${data.data.text}</li>`);

// 		return data;
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

async function requestNum(num, type) {
	let data = await $.getJSON(`${baseURL}/${num}/${type}?json`);
	$questionOne.append(`<ul><li>${data.text}</li></ul>`);
	return data;
}
requestNum(num, type);

// // Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// for (let i = 1; i < 12; i++) {
// 	axios.get(`${baseURL}/${i}/math?json`).then((num1) => {
// 		$questionTwo.append(`<li>Question Two: ${num1.data.text}</li>`);
// 	});
// }

async function getMultipleNums() {
	let num1 = await $.getJSON(`${baseURL}/151/trivia?json`);
	let num2 = await $.getJSON(`${baseURL}/277/trivia?json`);
	let num3 = await $.getJSON(`${baseURL}/6/trivia?json`);
	let num4 = await $.getJSON(`${baseURL}/34/trivia?json`);
	let num5 = await $.getJSON(`${baseURL}/4/trivia?json`);
	$questionTwo.append(`<ul><li>${num1.text}</li></ul>`);
	$questionTwo.append(`<ul><li>${num2.text}</li></ul>`);
	$questionTwo.append(`<ul><li>${num3.text}</li></ul>`);
	$questionTwo.append(`<ul><li>${num4.text}</li></ul>`);
	$questionTwo.append(`<ul><li>${num5.text}</li></ul>`);
}

getMultipleNums();

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

// let fourFacts = [];
// for (let i = 0; i < 4; i++) {
// 	fourFacts.push(axios.get(`${baseURL}/12/math?json`));
// }

// Promise.all(fourFacts).then((fact) =>
// 	fact.forEach((f) => $questionThree.append(`<li>Question Two: ${f.data.text}</li>`))
// );

async function getFourFacts(num, type) {
	for (let i = 1; i < 5; i++) {
		let fact = await $.getJSON(`${baseURL}/${num}/${type}?json`);
		$questionThree.append(`<ul><li> Fact #${i}: ${fact.text}</li></ol>`);
	}
}

getFourFacts('1', 'trivia');
