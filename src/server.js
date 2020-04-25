const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pug = require('pug');
const port = 3000;

require('./database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('views', '/views');
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(require('./routes'));

app.get('/home', (req, res) => {
    res.render('index');

});

app.use('/files', express.static(
    path.resolve(__dirname, "..", "tmp", "uplouds")
));

/* Redireionando para a página home */
app.get('/', (req, res) => res.redirect("http://localhost:3000/home"));



app.listen(`${port}`, () => {
    console.log(`NodeJs rodando com sucesso na porta ${port}`);
});


module.exports = app;