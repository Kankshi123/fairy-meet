import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Razorpay from "npm:razorpay"

// Get these from Supabase Edge Function Secrets
const key_id = Deno.env.get('RAZORPAY_KEY_ID')
const key_secret = Deno.env.get('RAZORPAY_KEY_SECRET')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, currency = 'INR', description } = await req.json()

    if (!key_id || !key_secret) {
      throw new Error("Razorpay keys not configured in Edge Function secrets.")
    }

    const instance = new Razorpay({
      key_id: key_id,
      key_secret: key_secret,
    })

    const options = {
      amount: amount * 100, // Razorpay takes amount in subunits (paise)
      currency: currency,
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    }

    const order = await instance.orders.create(options)

    return new Response(
      JSON.stringify({ order_id: order.id, amount: order.amount, currency: order.currency }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
