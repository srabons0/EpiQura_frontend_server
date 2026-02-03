import { motion } from "framer-motion";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { use, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useLoader from "../hooks/useLoader";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CheckOutForm = ({transcription,setTranscription}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  // const [transcription, setTranscription] = useState("");

  const [cart, isPending, refetch] = useLoader(
    "cart",
    `/orderFood?email=${user.email}`,
    !!user?.email && !loading
  );

  const [users] = useLoader(
    "user",
    `/user?email=${user.email}`,
    !!user?.email && !loading
  );
  // const [paymentInfo, , reload] = useLoader(
  //   "paymentInfo",
  //   `/save-order/${user.email}`,
  //   !!user?.email && !loading
  // );
  // console.log("paymentInfo", paymentInfo);

  //   console.log({email: users?.email,
  //         name: users?.name,
  //         number: users?.phone,
  //         address: users?.address,});

  const totalPrice = cart.reduce((total, item) => total + Number(item?.realPrice)*Number(item?.quantity), 0);
    // console.log(totalPrice, cart);

  //   console.log(info);

  useEffect(() => {
    if (totalPrice) {
      axiosSecure
        .post("/create-payment-intent", { price: Number(totalPrice) })
        .then((res) => {
      if (res.data?.clientSecret) {
        setClientSecret(res.data.clientSecret);
      } else {
        console.error("Client secret missing:", res.data);
      }
    })
    .catch(err => {
      console.error("Payment intent error:", err);
    });
    }
  }, [axiosSecure, totalPrice]);
// console.log("clientSecret:", clientSecret,totalPrice);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const PhoneNumber = event.target.number.value;
    // console.log(PhoneNumber);

 if (!stripe || !elements || !clientSecret) {
  return;
}
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("[error]", error);
      setError(error.message);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

  
    // console.log("clientSecret", clientSecret);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log(confirmError);
    } else {
      // console.log("paymentIntent", paymentIntent);
    }
    // console.log("paymentIntent", paymentIntent);
    if (paymentIntent.status === "succeeded") {
      setTranscription(paymentIntent.id);

      const info = {
        transcriptionId: paymentIntent.id,
        email: users?.email,
        name: users?.name,
        number: users?.phone,
        address: users?.address,
        date: new Date(),
        price: Number(totalPrice),
        status: "Pending",
        paymentStatus: "Completed",
        payment: "Paid",
        cartsId: cart.map((item) => item._id),
        orderedItems: cart.map((item) => item),
      };
      const res = await axiosSecure.post("/save-order", info);
      if (res.data?.insertedId) {
        localStorage.setItem("transactionId", paymentIntent.id);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your payment has been success",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        reload();
      }
    }
  };

  

  return (
    <div className="w-full mt-10">
      <form
        className=" flex flex-col gap-5 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full md:w-2/3  mt-10">
          <label className="text-2xl font-semibold text-center mb-6">
            Pay To Card
          </label>
<div className="relative w-full">
  <CardElement
    className="
      w-full
      rounded-2xl
      bg-white/80
      backdrop-blur-md
      px-5
      py-4
      shadow-md
      ring-1
      ring-black/10
      transition-all
      focus-within:ring-2
      focus-within:ring-orange-400
      focus-within:shadow-lg
    "
    options={{
      style: {
        base: {
          fontSize: "16px",
          fontFamily: "Poppins, system-ui, sans-serif",
          color: "#111827",
          fontWeight: "500",
          letterSpacing: "0.03em",
          "::placeholder": {
            color: "#9ca3af",
          },
        },
        invalid: {
          color: "#ef4444",
          iconColor: "#ef4444",
        },
        complete: {
          color: "#16a34a",
        },
      },
    }}
  />
</div>



        </div>
        <p className="text-sm lg:text-xl font-bold text-[#fd4545] mt-5">{error}</p>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={!stripe}
          className="btn-block px-9 py-4 block mt-8 text-center font-medium uppercase text-white no-underline  shadow-[0_0_20px_#eee] hover:bg-[#1bd233] bg-green-500  md:w-1/3 rounded-bl-xl rounded-tr-xl "
        >
          Pay
        </motion.button>
      </form>
    </div>
  );
};

export default CheckOutForm;
