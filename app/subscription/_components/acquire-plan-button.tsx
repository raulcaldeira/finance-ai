"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-strpe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanButton = () => {
  const { user } = useUser();

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Stripe not found");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  if (hasPremiumPlan) {
    return (
      <Button
        onClick={handleAcquirePlanClick}
        className="w-full rounded-full font-bold"
        variant="link"
        asChild
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
          target="_blank"
        >
          Gerenciar Plano
        </Link>
      </Button>
    );
  }
  return (
    <Button
      onClick={handleAcquirePlanClick}
      className="w-full rounded-full font-bold"
    >
      Adquirir Plano
    </Button>
  );
};

export default AcquirePlanButton;
