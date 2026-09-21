import { supabase } from './supabaseClient';

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const openRazorpayCheckout = async ({ 
  amount, 
  name = "FairyMeet", 
  description = "Wallet Top-up", 
  onSuccess, 
  onFailure,
  user
}) => {
  const res = await loadRazorpay();

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    if (onFailure) onFailure('SDK_LOAD_FAILED');
    return;
  }

  // REAL BACKEND CALL to Supabase Edge Function
  let order_id = null;
  try {
    // This will fail since we haven't deployed the edge function yet,
    // but we can catch it and proceed without an order_id for frontend test mode.
    const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
      body: { amount: amount, currency: 'INR', description: description }
    });
    
    if (error) throw error;
    order_id = data?.order_id;
  } catch (err) {
    console.warn("Edge function failed, running without order_id for frontend test mode.", err);
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Fallback for dev
    amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 100 means 1 INR
    currency: "INR",
    name: name,
    description: description,
    ...(order_id && { order_id }), // Only pass if it exists
    handler: async function (response) {
      // Payment succeeded
      if (onSuccess) onSuccess(response);
    },
    prefill: {
      name: user?.name || "FairyMeet User",
      email: user?.email || "user@example.com",
      contact: user?.phone || "9999999999"
    },
    theme: {
      color: "#FF1B6B" // Vibrant Pink to match FairyMeet
    }
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.on('payment.failed', function (response) {
    // Payment failed
    if (onFailure) onFailure(response.error);
  });
  
  paymentObject.open();
};
