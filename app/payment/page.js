"use client";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import CheckoutForm from "../components/home/CheckoutForm";

const Payment = () => {
	const searchParam = useSearchParams();
	const amount = searchParam.get("amount");

	const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIP_KEY);
	const options = {
		mode: "payment",
		amount: Number(amount),
		currency: "inr",
	};
	return (
		<Elements stripe={stripePromise} options={options}>
			<CheckoutForm options={options} />
		</Elements>
	);
};

export default Payment;
