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

    // For testing purposes, we'll send to the verified email
    const testEmail = "vladimir02042040@gmail.com";
    console.log(`Original recipient: ${to}, sending to test email: ${testEmail} instead`);

    const html = `
      <h1>Спасибо за ваш заказ, ${userName}!</h1>
      <p>Мы получили ваш заказ и начали его обработку.</p>
      <h2>Детали заказа:</h2>
      ${orderDetails}
      <p><strong>Итого: ${totalAmount} ₽</strong></p>
      <p><strong>Адрес доставки:</strong> ${deliveryAddress}</p>
      <p>Мы свяжемся с вами в ближайшее время для подтверждения заказа.</p>
      <p><small>Это тестовое письмо. В рабочей версии оно будет отправлено на адрес ${to}</small></p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Мебельный магазин <onboarding@resend.dev>",
        to: [testEmail], // Using test email instead of actual recipient
        subject: "Подтверждение заказа",
        html: html,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);
    
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