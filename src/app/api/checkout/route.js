import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const body = await request.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: body.name,
                        },
                        unit_amount: body.amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "https://easy-task-cyan.vercel.app/donations/success",
            cancel_url: "https://easy-task-cyan.vercel.app/donations/cancel",
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Error creating Stripe session:', error.message, error.stack);
        return NextResponse.json({ error: 'Error creating Stripe session', details: error.message }, { status: 500 });
    }
}