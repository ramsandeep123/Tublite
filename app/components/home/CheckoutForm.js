import React, { useState } from "react";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ options }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [processing, setProcessing] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (elements == null || processing) {
			return;
		}

		setProcessing(true);

		const { error: submitError } = await elements.submit();

		if (submitError) {
			setProcessing(false);
			return;
		}

		const res = await fetch("/api/intent ", {
			method: "POST",
			body: JSON.stringify({
				amount: options.amount,
			}),
		});

		const secretKey = await res.json();
		console.log(secretKey);

		const { error } = await stripe.confirmPayment({
			clientSecret: secretKey,
			elements,
			confirmParams: {
				return_url: "http://localhost:3000/confirmpage",
			},
		});

		if (error) {
			setProcessing(false);
			return;
		}

		setProcessing(false);

		// // Display confirmation box
		// const confirmation = window.confirm(
		// 	"Payment successful! Click OK to continue."
		// );
	};

	return (
		<div className="flex flex-col justify-center items-center w-full mt-20">
			<h2 className="font-bold p-5 text-[22px]">
				Amount To Pay: {options.amount} INR
			</h2>
			{processing && (
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-5"></div>
			)}
			<form onSubmit={handleSubmit} className="w-96 h-97">
				<PaymentElement />
				<button
					className="w-full bg-black text-white p-2 rounded-lg mt-2"
					disabled={processing}
				>
					{processing ? "Processing..." : "Pay"}
				</button>
			</form>
		</div>
	);
};

export default CheckoutForm;
