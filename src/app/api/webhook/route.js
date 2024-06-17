import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
    const body = await request.text();
    const headersList = headers();
    const sig = headersList.get("stripe-signature");

    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.log(event);
    return NextResponse.json("Webhook received");
}