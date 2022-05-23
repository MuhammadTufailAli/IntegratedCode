require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.post("/pay", async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { name },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ msg: "Payment Initiated", clientSecret });
  } catch (error) {}
});


app.listen(5000, () => {
  console.log("Listening at port 5000");
});
