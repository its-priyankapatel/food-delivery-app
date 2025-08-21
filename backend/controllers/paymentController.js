import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const paymentController = async (req, res) => {
  const { products } = req.body;
  const delivery = 40;
  const handling = 4;

  const lineItems = [
    ...products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round((product.price / product.quantity) * 100),
      },
      quantity: product.quantity,
    })),
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
          images: [
            "https://res.cloudinary.com/dbbmvt91t/image/upload/v1755795157/package_v7b0tg.png",
          ],
        },
        unit_amount: delivery * 100,
      },
      quantity: 1,
    },
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: "Handling Charges",
          images: [
            "https://res.cloudinary.com/dbbmvt91t/image/upload/v1755795407/rupee_gudnmk.png",
          ],
        },
        unit_amount: handling * 100,
      },
      quantity: 1,
    },
  ];
  console.log(lineItems);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["amazon_pay", "card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/failure",
  });

  return res.status(200).send({
    success: true,
    message: "Payment Done successfully",
    id: session.id,
  });
};
