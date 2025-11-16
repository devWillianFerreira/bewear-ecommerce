"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader } from "lucide-react";

import { createChechoutSession } from "@/actions/create-checkout-session";
import { useFinishOrder } from "@/app/hooks/mutations/use-finish-order";
import { Button } from "@/components/ui/button";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();
  async function handleFinishOrder() {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key is not set");
    }
    const { orderId } = await finishOrderMutation.mutateAsync();

    const checkoutSession = await createChechoutSession({
      orderId,
    });

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Failed to load Stripe");
    }
    await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
  }
  return (
    <>
      <Button
        className="w-full cursor-pointer rounded-full"
        onClick={handleFinishOrder}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <Loader className="h-4 w-4 animate-spin" />
        )}
        Finalizar Compra
      </Button>
    </>
  );
};

export default FinishOrderButton;
