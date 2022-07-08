const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Order = require("./models/order");

const app = express();

app.set("view engine", "ejs");

const PORT = 3000;
const db = "mongodb+srv://Dima:Chdtu215@cluster0.9pnlm.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});


app.use(express.urlencoded({ extended: false}));

app.use(express.static('css'));

app.use(methodOverride("_method"));



app.post("/", (req, res) => {
  const { email, name, language, text } = req.body;
  const order = new Order({email, name, language, text});
  order
    .save()
    .then((result) => res.redirect("/"))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), {title: "Error"})
    });
});


app.get("/", (req, res) => {
  Order
    .find()
    .sort({ createdAt: -1 })
    .then((orders) => res.render(createPath("index"),{orders}))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), {title: "Error"})
    });
});


app.get('/order/:id', (req, res) => {
  const title = 'Order';
  Order
    .findById(req.params.id)
    .then((order) => res.render(createPath('order'), { order, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});


app.delete('/order/:id', (req, res) => {
  const title = 'Order';
  Order
    .findByIdAndDelete(req.params.id)
    .then(result => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});


app.get('/edit/:id', (req, res) => {
  const title = 'Edit Order';
  Order
    .findById(req.params.id)
    .then((order) => res.render(createPath('edit-order'), { order, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});


app.put('/edit/:id', (req, res) => {
  const { email, name, language, text } = req.body;
  const { id } = req.params;  
  Order
    .findByIdAndUpdate(id, { email, name, language, text })
    .then((result) => res.redirect("/"))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});