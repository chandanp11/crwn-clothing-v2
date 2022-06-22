import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payments-intent", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
        description: "Test Description",
      }),
    }).then((res) => res.json());

    console.log(response);

    // const clientSecret = response.paymentIntent.client_secret;
    const {
      paymentIntent: { client_secret },
    } = response;
    console.log("client secret", client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });
    setIsProcessingPayment(false);
    console.log(paymentResult);
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };

  return (
    <div>
      <PaymentFormContainer>
        <FormContainer onSubmit={paymentHandler}>
          <h2>Credit Card Payment:</h2>
          <CardElement />
          <Button
            isLoading={isProcessingPayment}
            buttonType={BUTTON_TYPE_CLASSES.inverted}
          >
            Pay Now
          </Button>
        </FormContainer>
      </PaymentFormContainer>
    </div>
  );
};

export default PaymentForm;
