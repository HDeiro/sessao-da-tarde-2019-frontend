const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dataPayload = require('./data.json');

app.use(bodyParser.json());

app.get('/livros', (request, response) => response.send(dataPayload));

app.post('/livros', (request, response) => {
	response.send('OK');
});

app.listen(8000, _ => console.log('Servidor rodando em http://localhost:8000.'));
