const title = $('#inputTitle');
const isbn = $('#inputISBN');
const year = $('#inputYear');
const author = $('#inputAuthor');
const publisher = $('#inputPublisher');
const form = $('#form-livro');

form.addEventListener('submit', event => {
	event.preventDefault();

	let formPayload = {
		title: title.value,
		isbn: isbn.value,
		year: isbn.value,
		author: isbn.value,
		publisher: publisher.value
	};
});

[title, isbn, year, author, publisher].forEach(formElement => {
	formElement.oninvalid = _ => form.classList.add('submited');
})

