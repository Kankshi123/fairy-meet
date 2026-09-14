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

  // MOCK BACKEND CALL
  // In a real application, you MUST NOT create orders on the frontend.
  // You would call your Supabase Edge Function here to create an order
  // and return the order_id.
  const MOCK_ORDER_ID = "order_mock_" + Math.random().toString(36).substring(7);

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Fallback for dev
    amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 100 means 1 INR
    currency: "INR",
    name: name,
    description: description,
    order_id: MOCK_ORDER_ID, // This should come from backend
    handler: function (response) {
      // Payment succeeded
      // response.razorpay_payment_id
      // response.razorpay_order_id
      // response.razorpay_signature
      
      // MOCK BACKEND VERIFICATION
      // Here you would normally send the signature to your backend to verify
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
