// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

async function newCard() {
	let firstDeck = await $.getJSON('https://www.deckofcardsapi.com/api/deck/new/draw/');

	let suit = firstDeck.cards[0].suit;
	let value = firstDeck.cards[0].value;
	// console.log(`${value} of ${suit.toLowerCase()}`);
}

newCard();

// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

async function twoNewCards() {
	let deck = await $.getJSON('https://www.deckofcardsapi.com/api/deck/new/draw/');
	let deckId = deck.deck_id;
	let firstCard = { suit: deck.cards[0].suit, value: deck.cards[0].value };
	// console.log(firstCard);

	let secondCardData = await $.getJSON(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/`);
	let secondCard = { suit: secondCardData.cards[0].suit, value: secondCardData.cards[0].value };
	// console.log(secondCard);
	return firstCard, secondCard;
}

twoNewCards();

// Once you have both cards, console.log the values and suits of both cards.

// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

function makeCard(img) {
	let card = `
    <img src="${img}" alt="">`;
	return card;
}

let $draw = $('#drawCard');
let $deck = $('.cards');

let deckId = $(document).ready(function() {
	axios
		.get('https://www.deckofcardsapi.com/api/deck/new/draw/')
		.then((getDeckId) => {
			let deckId = getDeckId.data.deck_id;
			return `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/`;
		})
		.then((getCard) => {
			$draw.click((card) => {
				axios.get(getCard).then((showCard) => {
					img = showCard.data.cards[0].image;
					$deck.append(makeCard(img));
				});
			});
		});
});

// I accidently did async/await for the first assignment, so above is the answer using Promises.

// let deckId = $(document).ready(async function() {
// 	let deck = await $.getJSON('https://www.deckofcardsapi.com/api/deck/new/draw/');
// 	let deckId = deck.deck_id;
// 	$draw.click(async function() {
// 		let deck = await $.getJSON(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/`);
// 		console.log(deck);
// 		if (deck.remaining == 0) {
// 			alert('Deck is out of cards!');
// 		}
// 		console.log(deck.remaining);
// 		img = deck.cards[0].image;
// 		$deck.append(makeCard(img));
// 	});
// });
