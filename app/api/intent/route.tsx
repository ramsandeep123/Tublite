import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_SECRET_STRIP_KEY!, {
    typescript: true,
    apiVersion: "2023-10-16"
})

export async function POST(req: any) {

    const data: any = await req.json();
    const amount = data.amount;



    try {
        const paymentIntent = await stripe.paymentIntents.create({

            description: 'Software development services',
            shipping: {
                name: 'Jenny Rosen',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            },
            amount: Number(amount),
            currency: 'inr',


        })


        return NextResponse.json(paymentIntent.client_secret, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(error, { status: 400 })
    }
}