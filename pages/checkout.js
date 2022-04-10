import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call backend
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    // Redirect Stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="lg:flex max-w-6xl mx-auto">
        {/* Left */}
        <div>
          <div className="flex-grow m-5 shadow-sm">
            <Image
              src="https://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit="contain"
              className="mx-4"
            />

            <div className="flex flex-col flex-grow p-5 space-y-10 bg-white mx-4">
              <h1 className="text-3xl border-b pb-4">
                {items.length === 0
                  ? "Your Amazon Basket is empty."
                  : "Shopping Basket"}
              </h1>

              {items.map((item, i) => (
                <CheckoutProduct
                  key={i}
                  id={item.id}
                  title={item.title}
                  rating={item.rating}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  hasPrime={item.hasPrime}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        {items.length > 0 && (
          <>
            <div className="flex flex-col bg-white shadow-sm p-10 my-5 sm:mx-9">
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="USD" />
                </span>
              </h2>
              <button
                disabled={!session}
                onClick={createCheckoutSession}
                role="link"
                s
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign In to Checkout" : "Proceed to Checkout"}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Checkout;
