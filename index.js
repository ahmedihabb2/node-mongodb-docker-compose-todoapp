const { compile } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('home' , {todos : items}))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.get('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.query['val']
  });

  newItem.save().then(item => res.redirect('/'));
});

app.get('delete', (req, res) => {

  const newItem = new Item({
    name: req.query['val']
  });

});

const port = 3000;

app.listen(port, () => console.log('Server running...'));