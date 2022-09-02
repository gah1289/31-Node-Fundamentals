let $numList = $('#numberFacts');
let $questionOne = $('#question-one');
let $questionTwo = $('#question-two');
let $questionThree = $('#question-three');

// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.
let num = '13';
let type = 'year';
let baseURL = `http://numbersapi.com`;
axios
	.get(`${baseURL}/13/year?json`)
	.then((data) => {
		$questionOne.append(`<li>Question One: ${data.data.text}</li>`);

		return data;
	})
	.catch((err) => {
		console.log(err);
	});

// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

for (let i = 1; i < 12; i++) {
	axios.get(`${baseURL}/${i}/math?json`).then((num1) => {
		$questionTwo.append(`<li>Question Two: ${num1.data.text}</li>`);
	});
}

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

let fourFacts = [];
for (let i = 0; i < 4; i++) {
	fourFacts.push(axios.get(`${baseURL}/12/math?json`));
}

Promise.all(fourFacts).then((fact) =>
	fact.forEach((f) => $questionThree.append(`<li>Question Two: ${f.data.text}</li>`))
);
