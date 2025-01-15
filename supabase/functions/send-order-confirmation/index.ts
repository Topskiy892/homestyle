import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  to: string;
  userName: string;
  orderDetails: string;
  totalAmount: number;
  deliveryAddress: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, userName, orderDetails, totalAmount, deliveryAddress }: OrderConfirmationRequest = await req.json();

    const html = `
      <h1>Спасибо за ваш заказ, ${userName}!</h1>
      <p>Мы получили ваш заказ и начали его обработку.</p>
      <h2>Детали заказа:</h2>
      ${orderDetails}
      <p><strong>Итого: ${totalAmount} ₽</strong></p>
      <p><strong>Адрес доставки:</strong> ${deliveryAddress}</p>
      <p>Мы свяжемся с вами в ближайшее время для подтверждения заказа.</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Мебельный магазин <onboarding@resend.dev>",
        to: [to],
        subject: "Подтверждение заказа",
        html: html,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${await res.text()}`);
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-order-confirmation function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);