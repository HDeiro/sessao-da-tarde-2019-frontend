// Declarações
const filterInput = $('#filterInput');
const filterButton = $('#filterButton');
const books = [
	{code: 1, isbn: 1234, title: 'JavaScript', year: 2019, author: 'Hugo', publisher: 'Editora'},
	{code: 2, isbn: 1235, title: 'PHP', year: 2019, author: 'Hugo', publisher: 'Editora'},
	{code: 3, isbn: 1236, title: 'FrontEnd', year: 2019, author: 'Hugo', publisher: 'Editora'},
	{code: 4, isbn: 1237, title: 'Angular', year: 2019, author: 'Hugo', publisher: 'Editora'}
];

// Funções

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
	/**
		Remove todos elementos da tabela.

		Por ser uma HTMLCollection, uso spread operator (...) para separar os
		elementos em um array ([]) e tenho, assim, acesso ao método forEach,
		onde posso ir removendo os elementos um a um.
	*/
	[...tableBody.children].forEach(child => tableBody.removeChild(child));

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

function filterElementsOnTableUsingInputFilter() {
	const filterText = filterInput.value;
	const filteredBooks = filterBooks(filterText);
	loadBooks(filteredBooks);
}

// Controle de eventos

window.addEventListener('load',  () => loadBooks(books));

filterButton.addEventListener('click', filterElementsOnTableUsingInputFilter);

filterInput.addEventListener('keypress', event =>
    (event.keyCode == 13) && filterElementsOnTableUsingInputFilter());

