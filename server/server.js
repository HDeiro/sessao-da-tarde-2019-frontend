const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const dataPayload = require('./data.json');

app.use(cors());
app.use(bodyParser.json());
app.options('*', cors());

app.get('/books', (request, response) => response.send(JSON.stringify(dataPayload)));

app.get('/books/:code', (request, response) => {
	const {code} = request.params;
	let found = dataPayload.find(book => book.code == code);

	if(!found) {
		response.statusCode = 500;
		response.end(JSON.stringify({
			message: `Não foi encontrado nenhum livro com código ${code}`
		}))
	} else {
		response.send(JSON.stringify({
			livro: found
		}))
	}
})

app.post('/books', (request, response) => {
	const newBook = request.body;
	newBook.code = dataPayload.length + 1;
	dataPayload.push(newBook);
	fs.writeFileSync('./server/data.json', JSON.stringify(dataPayload), 'utf8');
	response.send({
		message: 'Livro cadastrado com sucesso',
		livro: newBook
	});
});

app.patch('/books/:code', (request, response) => {
	const book = request.body;
	const {code} = request.params;
	let found = null;

	dataPayload.find((book, index) => {
		if(book.code == code) {
			found = index;
			return true;
		}
		return false;
	});

	if(found) {
		dataPayload[found] = book;
		fs.writeFileSync('./server/data.json', JSON.stringify(dataPayload), 'utf8');

		response.send({
			message: 'Livro atualizado com sucesso'
		});
	} else {
		response.statusCode = 500;
		response.end(JSON.stringify({
			message: 'Não foi possível atualizar livro'
		}))
	}
});

app.delete('/books/:code', (request, response) => {
	const {code} = request.params;

	let found = dataPayload.find((item, index) => {
		if(item.code == code) {
			dataPayload.splice(index, 1);
			fs.writeFileSync('./server/data.json', JSON.stringify(dataPayload), 'utf8');
			return true;
		}
		return false;
	});

	response.setHeader('Content-Type', 'application/json');
	if(!found) {
		response.statusCode = 500;
		response.end(JSON.stringify({
			message: `Não existe registro de livro com código ${code}`
		}));
	} else {
		response.send(JSON.stringify({
			message: `O livro de código ${code} foi deletado com sucesso`
		}));
	}
});

app.listen(8000, _ => console.log('Servidor rodando em http://localhost:8000.'));
