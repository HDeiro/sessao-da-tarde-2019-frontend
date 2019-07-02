const books = [
	{code: 1, isbn: 1234, title: 'JavaScript', year: 2019, author: 'Hugo', publisher: 'Editora'},
	{code: 2, isbn: 1235, title: 'PHP', year: 2019, author: 'Hugo', publisher: 'Editora'},
	{code: 3, isbn: 1236, title: 'FrontEnd', year: 2019, author: 'Hugo', publisher: 'Editora'},
	{code: 4, isbn: 1237, title: 'Angular', year: 2019, author: 'Hugo', publisher: 'Editora'}
];

function compare(container, contains) {
	return ('' + container).toLowerCase().indexOf(('' + contains).toLocaleLowerCase()) > -1;
}

function filterBooks(filter) {
	return books.filter(book => compare(book.code, filter)
		|| compare(book.isbn, filter)
		|| compare(book.title, filter)
		|| compare(book.year, filter)
		|| compare(book.author, filter)
		|| compare(book.publisher, filter))
}

function loadBooks(books) {
	const tableBody = $('#table-body');

	(books.length ? books : []).forEach((book, index) => {
		// Cria elemento linha
		const row = document.createElement('tr');
		row.id = `row-${index}`;

		// Cria elementos célula
		const tdCode = createTd(book, 'code', index);
		const tdISBN = createTd(book, 'isbn', index);
		const tdTitle = createTd(book, 'title', index);
		const tdYear = createTd(book, 'year', index);
		const tdAuthor = createTd(book, 'author', index);
		const tdPublisher = createTd(book, 'publisher', index);

		// Adiciona células na linha
		row.appendChild(tdCode);
		row.appendChild(tdISBN);
		row.appendChild(tdTitle);
		row.appendChild(tdYear);
		row.appendChild(tdAuthor);
		row.appendChild(tdPublisher);

		// Adiciona linha no tbody da tabela
		tableBody.appendChild(row);
	});
}

function createTd(book, property, index) {
	const td = document.createElement('td');
	td.id = `${property}-${index}`;
	td.innerText = book[property];
	return td;
}

window.addEventListener('load',  event => {
	loadBooks(books);
});

