// Declarações
const svgTrashIcon = '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g><path stroke="null" transform="rotate(0.30481046438217163 7.981059074401963,7.99611520767212) " id="svg_1" fill-rule="evenodd" fill="#ffffff" d="m13.385495,3.661705l-1.898916,0l0,-1.857549c0,-0.684143 -0.522888,-1.23832 -1.168507,-1.23832l-4.674123,0c-0.645587,0 -1.168539,0.554211 -1.168539,1.23832l0,1.857583l-1.898884,0c-0.403082,0 -0.730313,0.346791 -0.730313,0.774035c0,0.427176 0.327231,0.773967 0.730313,0.773967l0.438226,0l0,8.978333c0,0.684177 0.522888,1.23832 1.168507,1.23832l7.595534,0c0.645587,0 1.168507,-0.554143 1.168507,-1.23832l0,-8.978333l0.438226,0c0.40305,0 0.730377,-0.346791 0.730377,-0.773967c-0.000032,-0.427278 -0.327359,-0.774069 -0.730409,-0.774069zm-3.359541,0l-4.089918,0l0,-0.866722c0,-0.377664 0.28646,-0.681212 0.64279,-0.681212l2.804339,0c0.356394,0 0.642757,0.303583 0.642757,0.681212l0,0.866722l0.000032,0zm-4.089918,2.167197l0,7.430297c0,0.340487 -0.263051,0.619228 -0.584237,0.619228s-0.584237,-0.278741 -0.584237,-0.619228l0,-7.430297c0,-0.340385 0.263019,-0.61916 0.584237,-0.61916s0.584237,0.278775 0.584237,0.61916zm2.629293,0l0,7.430297c0,0.340487 -0.263051,0.619228 -0.584302,0.619228c-0.321218,0 -0.584237,-0.278741 -0.584237,-0.619228l0,-7.430297c0,-0.340385 0.263051,-0.61916 0.584237,-0.61916c0.32125,0 0.584302,0.278775 0.584302,0.61916zm2.6291,0l0,7.430297c0,0.340487 -0.263051,0.619228 -0.584205,0.619228c-0.321218,0 -0.584302,-0.278741 -0.584302,-0.619228l0,-7.430297c0,-0.340385 0.263084,-0.61916 0.584302,-0.61916c0.321186,0 0.584205,0.278775 0.584205,0.61916z" clip-rule="evenodd"/></g></svg>';
const svgEditIcon = '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="#fff"><g><path id="Triangle 313" d="m1.33733,11.24476l4,4.04919l-4,0l0,-4.04919zm7,-7.95081l4,4l-6.02136,7.04419l-3.97864,-4.04419l6,-7zm2.08462,-2.2185c0.62484,-0.62484 1.82467,-0.43807 2.6799,0.41715l0.77426,0.77427c0.85523,0.85523 1.042,2.05506 0.41716,2.6799l-1.23555,1.23554l-3.87132,-3.87132l1.23555,-1.23554zm0,0"/></g></svg>';
const filterInput = $('#filterInput');
const filterButton = $('#filterButton');
let bookList = [];

// Funções
function compare(container, contains) {
	return ('' + container).toLowerCase().indexOf(('' + contains).toLocaleLowerCase()) > -1;
}

function filterBooks(filter) {
	return bookList.filter(book => compare(book.code, filter)
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
		row.id = `tr-${index}`;

		// Cria elementos célula
		const tdCode = createTd(book, 'code', index);
		const tdISBN = createTd(book, 'isbn', index);
		const tdTitle = createTd(book, 'title', index);
		const tdYear = createTd(book, 'year', index);
		const tdAuthor = createTd(book, 'author', index);
		const tdPublisher = createTd(book, 'publisher', index);

		// Add action button
		const deleteButton = document.createElement('button');
		deleteButton.title = `Deletar livro "${book.title}"`;
		deleteButton.innerHTML = svgTrashIcon;
		deleteButton.id = `button-del-${index}`;
		deleteButton.classList.add('btn');
		deleteButton.classList.add('btn-danger');
		deleteButton.classList.add('btn-sm');
		deleteButton.classList.add('df-aic-jcc');
		deleteButton.addEventListener('click', _ => deleteBook(book, index));

		// Add Edit Button
		const editButton = document.createElement('button');
		editButton.title = `Editar livro "${book.title}"`;
		editButton.innerHTML = svgEditIcon;
		editButton.id = `button-edit-${index}`;
		editButton.classList.add('btn');
		editButton.classList.add('btn-warning');
		editButton.classList.add('btn-sm');
		editButton.classList.add('df-aic-jcc');
		editButton.addEventListener('click', _ => editBook(book, index));

		const tdActions = createTd(null, 'actions', index);
		tdActions.classList.add('td-actions');
		tdActions.appendChild(deleteButton);
		tdActions.appendChild(editButton);

		// Adiciona células na linha
		row.appendChild(tdCode);
		row.appendChild(tdISBN);
		row.appendChild(tdTitle);
		row.appendChild(tdYear);
		row.appendChild(tdAuthor);
		row.appendChild(tdPublisher);
		row.appendChild(tdActions);

		// Adiciona linha no tbody da tabela
		tableBody.appendChild(row);
	});
}

function createTd(book, property, index) {
	const td = document.createElement('td');
	td.id = `td-${property}-${index}`;
	book  && (td.innerText = book[property]);
	return td;
}

function filterElementsOnTableUsingInputFilter() {
	const filterText = filterInput.value;
	const filteredBooks = filterBooks(filterText);
	loadBooks(filteredBooks);
}

function editBook(book, index) {
	window.location.replace(`registro-livros.html?livro=${book.code}`);
}

async function deleteBook(book, index) {
	let shouldDelete = confirm(`Você realmente deseja deletar o livro ${book.title}?`);

	if(!shouldDelete)
		return;

	const fetchConfig = {method: 'DELETE'};
	let response = await fetch(`http://localhost:8000/books/${book.code}`, fetchConfig);
	let payload  = await response.json();

	if(response.status == 200 && response.statusText == 'OK') {
		bookList.splice(index, 1);
		loadBooks(bookList);
		alert(payload.message || 'Livro deletado com sucesso');
	} else {
		alert(payload.message || 'Não foi possível deletar o livro')
	}
}

// Controle de eventos

window.addEventListener('load', async () => {
	let response = await fetch('http://localhost:8000/books');
	bookList	 = await response.json();
	loadBooks(bookList);
});

filterButton.addEventListener('click', filterElementsOnTableUsingInputFilter);

filterInput.addEventListener('keypress', event =>
    (event.keyCode == 13) && filterElementsOnTableUsingInputFilter());

