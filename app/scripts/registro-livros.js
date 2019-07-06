const title = $('#inputTitle');
const isbn = $('#inputISBN');
const year = $('#inputYear');
const author = $('#inputAuthor');
const publisher = $('#inputPublisher');
const form = $('#form-livro');

form.addEventListener('submit', async event => {
	event.preventDefault();

	let formPayload = {
		title: title.value,
		isbn: isbn.value,
		year: isbn.value,
		author: author.value,
		publisher: publisher.value
	};

	const fetchConfig = {
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(formPayload)
	};

	let response = await fetch(`http://localhost:8000/books`, fetchConfig);
	let payload  = await response.json();

	if(response.status == 200 && response.statusText == 'OK') {
		alert(payload.message || 'Livro deletado com sucesso');
		form.reset();
	} else {
		alert(payload.message || 'Não foi possível cadastrar o livro')
	}
});

[title, isbn, year, author, publisher].forEach(formElement => {
	formElement.oninvalid = _ => form.classList.add('submited');
})

