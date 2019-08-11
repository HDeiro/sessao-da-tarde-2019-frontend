const title = $('#inputTitle');
const isbn = $('#inputISBN');
const year = $('#inputYear');
const author = $('#inputAuthor');
const publisher = $('#inputPublisher');
const form = $('#form-livro');
let bookInEdition = null;

window.addEventListener('load', async event => {
	const urlParams = new URLSearchParams(window.location.search);
	const bookCode = urlParams.get('livro');

	if(bookCode) {
		const response = await fetch(`http://localhost:8000/books/${bookCode}`);
		const payload = await response.json();
		const book = payload.livro;

		bookInEdition = book.code;
		title.value = book.title;
		isbn.value = book.isbn;
		year.value = book.year;
		author.value = book.author;
		publisher.value = book.publisher;
	}
});

form.addEventListener('submit', async event => {
	event.preventDefault();

	let formPayload = {
		title: title.value,
		isbn: isbn.value,
		year: year.value,
		author: author.value,
		publisher: publisher.value
	};

	(bookInEdition ? updateBook : createBook)(formPayload);
});

async function createBook(book) {
	const fetchConfig = {
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(book)
	};

	const response = await fetch(`http://localhost:8000/books`, fetchConfig);
	const payload  = await response.json();

	if(response.status == 200 && response.statusText == 'OK') {
		alert(payload.message || 'Livro criado com sucesso');
		form.reset();
	} else
		alert(payload.message || 'Não foi possível cadastrar o livro')
}

async function updateBook(book) {
	book.code = bookInEdition;

	const fetchConfig = {
		method: 'PATCH',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(book)
	};

	const response = await fetch(`http://localhost:8000/books/${book.code}`, fetchConfig);
	const payload  = await response.json();

	if(response.status == 200 && response.statusText == 'OK')
		alert(payload.message || 'Livro atualizado com sucesso');
	else
		alert(payload.message || 'Não foi possível atualizar o livro')
}

[title, isbn, year, author, publisher].forEach(formElement => {
	formElement.oninvalid = _ => form.classList.add('submited');
})

