const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dataPayload = require('./data.json');

app.use(cors());
app.use(bodyParser.json());
app.options('*', cors());

app.get('/livros', (request, response) => response.send(JSON.stringify(dataPayload)));

app.post('/livros', (request, response) => {
	response.send('OK');
});

app.listen(8000, _ => console.log('Servidor rodando em http://localhost:8000.'));
