const express = require('express');
const path = require('path');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/', express.static(path.join(__dirname, 'client', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.get('/test', (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
