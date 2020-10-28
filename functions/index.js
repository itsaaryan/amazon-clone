const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HgDjnFi7AfvlbUvAb3qpXcxUmY6wpLnp2wB8otQa4LYVwAPeMTI2WdpSp0sS5JFYXjX7KkkRkhLQKLXD88WZO8E00AJJisT8c"
);

//app config
const app = express();

//middleware
app.use(cors({ origin: true }));
app.use(express.json());

//api routes
app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  var customer = await stripe.customers.create({
    name: req.body.name,
    address: req.body.address,
  });
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    amount: total,
    currency: "usd",
    payment_method_types: ["card"],
    description: "My First Test Charge (created for API docs)",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//listen command
exports.api = functions.https.onRequest(app);
