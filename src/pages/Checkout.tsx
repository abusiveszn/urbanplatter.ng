import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Truck, CreditCard, CheckCircle, ChevronLeft,
  Clock, Shield, Building2, Smartphone, Banknote,
} from 'lucide-react';
import { useCart } from '../hooks/useCart';

const steps = [
  { id: 1, label: 'Delivery', icon: MapPin },
  { id: 2, label: 'Method', icon: Truck },
  { id: 3, label: 'Payment', icon: CreditCard },
  { id: 4, label: 'Review', icon: CheckCircle },
];

const nigerianStates = [
  'Lagos', 'Abuja (FCT)', 'Port Harcourt', 'Ibadan', 'Kano', 'Enugu',
  'Kaduna', 'Oyo', 'Delta', 'Ogun', 'Anambra', 'Imo', 'Abia',
  'Cross River', 'Akwa Ibom', 'Ondo', 'Osun', 'Ekiti', 'Kwara',
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form states
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '', phone: '', address: '', landmark: '', city: '', state: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd' | 'cod'>('card');

  const deliveryFee = deliveryMethod === 'express' ? 1000 : 500;
  const total = subtotal + deliveryFee;

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-[72px] min-h-screen bg-brand-cream flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-brand-espresso mb-4">
            Your cart is empty
          </h2>
          <p className="font-body text-brand-espresso/60 mb-6">
            Add some delicious items to proceed with checkout.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="px-8 py-3 bg-brand-clay text-brand-cream font-body font-semibold hover:bg-brand-gold hover:text-brand-espresso transition-colors"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, 4));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  const inputClass = "w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base text-brand-espresso placeholder:text-brand-espresso/40 focus:border-brand-clay focus:outline-none focus:ring-[3px] focus:ring-brand-clay/10 transition-all";
  const labelClass = "block font-body text-sm font-medium text-brand-espresso mb-2";

  return (
    <div className="pt-[72px] min-h-screen bg-brand-cream pb-20">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        {orderPlaced ? (
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-20 h-20 bg-functional-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-functional-success" />
            </div>
            <h2 className="font-display text-4xl font-semibold text-brand-espresso mb-4">
              Order Placed!
            </h2>
            <p className="font-body text-brand-espresso/70 mb-2">
              Your order has been received and is being prepared.
            </p>
            <p className="font-body text-brand-clay font-medium mb-8">
              Order #UP-2025-00126
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3 bg-brand-espresso text-brand-cream font-body font-semibold hover:bg-brand-clay transition-colors"
              >
                Track Order
              </button>
              <button
                onClick={() => navigate('/menu')}
                className="px-8 py-3 border border-gray-200 font-body font-medium text-brand-espresso hover:bg-white transition-colors"
              >
                Order More
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left - Form */}
            <div className="lg:col-span-7">
              {/* Progress */}
              <div className="mb-10">
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
                  <div
                    className="absolute top-1/2 left-0 h-0.5 bg-brand-clay -translate-y-1/2 transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  />
                  {steps.map(step => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          step.id < currentStep
                            ? 'bg-brand-clay text-white'
                            : step.id === currentStep
                            ? 'bg-brand-espresso text-white ring-4 ring-brand-clay/20'
                            : 'bg-gray-200 text-brand-espresso/40'
                        }`}
                      >
                        <step.icon size={18} />
                      </div>
                      <span className={`font-body text-xs mt-2 ${
                        step.id <= currentStep ? 'text-brand-espresso' : 'text-brand-espresso/40'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 1: Delivery */}
              {currentStep === 1 && (
                <div className="bg-white p-8 shadow-card">
                  <h2 className="font-display text-3xl font-semibold text-brand-espresso mb-2">
                    Delivery Details
                  </h2>
                  <p className="font-body text-base text-brand-espresso/60 mb-8">
                    Enter your delivery address so we can bring the food to you.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-1">
                      <label className={labelClass}>Full Name *</label>
                      <input
                        type="text" placeholder="John Doe" className={inputClass}
                        value={deliveryInfo.fullName}
                        onChange={e => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className={labelClass}>Phone Number *</label>
                      <input
                        type="tel" placeholder="+234 801 234 5678" className={inputClass}
                        value={deliveryInfo.phone}
                        onChange={e => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Delivery Address *</label>
                      <input
                        type="text" placeholder="123 Admiralty Way" className={inputClass}
                        value={deliveryInfo.address}
                        onChange={e => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Landmark (Optional)</label>
                      <input
                        type="text" placeholder="Near Ebeano Supermarket" className={inputClass}
                        value={deliveryInfo.landmark}
                        onChange={e => setDeliveryInfo({ ...deliveryInfo, landmark: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className={labelClass}>City *</label>
                      <input
                        type="text" placeholder="Lekki" className={inputClass}
                        value={deliveryInfo.city}
                        onChange={e => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className={labelClass}>State *</label>
                      <select
                        className={inputClass}
                        value={deliveryInfo.state}
                        onChange={e => setDeliveryInfo({ ...deliveryInfo, state: e.target.value })}
                      >
                        <option value="">Select State</option>
                        {nigerianStates.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={nextStep}
                    className="w-full h-14 bg-brand-espresso text-brand-cream font-body font-semibold mt-8 hover:bg-brand-clay transition-colors"
                  >
                    Continue to Delivery Method
                  </button>
                </div>
              )}

              {/* Step 2: Delivery Method */}
              {currentStep === 2 && (
                <div className="bg-white p-8 shadow-card">
                  <h2 className="font-display text-3xl font-semibold text-brand-espresso mb-6">
                    Choose Delivery Method
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      {
                        id: 'standard' as const,
                        icon: Truck,
                        title: 'Standard Delivery',
                        time: '45-60 minutes',
                        price: 500,
                        desc: 'Reliable delivery at a great price.',
                      },
                      {
                        id: 'express' as const,
                        icon: Truck,
                        title: 'Express Delivery',
                        time: '25-35 minutes',
                        price: 1000,
                        desc: 'Priority dispatch for when you\'re hungry now.',
                        badge: 'POPULAR',
                      },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setDeliveryMethod(opt.id)}
                        className={`relative p-7 text-left border-2 transition-all duration-200 ${
                          deliveryMethod === opt.id
                            ? 'border-brand-clay bg-brand-clay/[0.02]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {opt.badge && (
                          <span className="absolute top-4 right-4 bg-brand-gold text-brand-espresso font-body text-[11px] font-semibold uppercase px-2 py-0.5">
                            {opt.badge}
                          </span>
                        )}
                        {deliveryMethod === opt.id && (
                          <CheckCircle size={24} className="absolute top-4 right-4 text-brand-clay" />
                        )}
                        <opt.icon size={36} className={opt.id === 'express' ? 'text-brand-gold' : 'text-brand-clay'} />
                        <h3 className="font-body text-lg font-semibold text-brand-espresso mt-4">{opt.title}</h3>
                        <p className="font-body text-sm text-brand-espresso/60 mt-1 flex items-center gap-1">
                          <Clock size={14} /> {opt.time}
                        </p>
                        <p className="font-body text-2xl font-semibold text-brand-clay mt-3">
                          &#8358;{opt.price.toLocaleString()}
                        </p>
                        <p className="font-body text-sm text-brand-espresso/50 mt-2">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={prevStep} className="h-14 px-8 border border-gray-200 font-body font-medium text-brand-espresso hover:bg-brand-cream transition-colors">
                      <ChevronLeft size={18} className="inline mr-1" /> Back
                    </button>
                    <button onClick={nextStep} className="flex-1 h-14 bg-brand-espresso text-brand-cream font-body font-semibold hover:bg-brand-clay transition-colors">
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="bg-white p-8 shadow-card">
                  <h2 className="font-display text-3xl font-semibold text-brand-espresso mb-6">
                    Payment Method
                  </h2>
                  <div className="space-y-4">
                    {[
                      { id: 'card' as const, icon: CreditCard, title: 'Debit / Credit Card', desc: 'Visa, Mastercard, Verve accepted', trust: 'Secured by Paystack' },
                      { id: 'transfer' as const, icon: Building2, title: 'Bank Transfer', desc: 'Transfer to our corporate account' },
                      { id: 'ussd' as const, icon: Smartphone, title: 'USSD', desc: 'Dial code to pay from your bank' },
                      { id: 'cod' as const, icon: Banknote, title: 'Pay on Delivery', desc: 'Pay with cash or POS when food arrives', fee: '+₦200' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setPaymentMethod(opt.id)}
                        className={`w-full flex items-center gap-5 p-6 border-2 text-left transition-all duration-200 ${
                          paymentMethod === opt.id
                            ? 'border-brand-clay bg-brand-clay/[0.02]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <opt.icon size={28} className="text-brand-espresso flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-body text-base font-medium text-brand-espresso">{opt.title}</h3>
                            {opt.fee && (
                              <span className="font-body text-xs text-brand-clay font-medium">{opt.fee}</span>
                            )}
                          </div>
                          <p className="font-body text-sm text-brand-espresso/60">{opt.desc}</p>
                          {opt.trust && paymentMethod === opt.id && (
                            <p className="font-body text-xs text-functional-success mt-1 flex items-center gap-1">
                              <Shield size={12} /> {opt.trust}
                            </p>
                          )}
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          paymentMethod === opt.id ? 'border-brand-clay' : 'border-gray-300'
                        }`}>
                          {paymentMethod === opt.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-clay" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={prevStep} className="h-14 px-8 border border-gray-200 font-body font-medium text-brand-espresso hover:bg-brand-cream transition-colors">
                      <ChevronLeft size={18} className="inline mr-1" /> Back
                    </button>
                    <button onClick={nextStep} className="flex-1 h-14 bg-brand-espresso text-brand-cream font-body font-semibold hover:bg-brand-clay transition-colors">
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="bg-white p-8 shadow-card">
                  <h2 className="font-display text-3xl font-semibold text-brand-espresso mb-6">
                    Review Your Order
                  </h2>

                  {/* Items */}
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-50">
                        <img src={item.image} alt={item.name} className="w-[60px] h-[60px] object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-body text-base font-medium text-brand-espresso truncate">{item.name}</h4>
                          <p className="font-body text-sm text-brand-espresso/60">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-body text-base font-semibold text-brand-clay">
                          &#8358;{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Summary */}
                  <div className="bg-brand-cream p-5 mt-6">
                    <p className="font-body text-sm font-medium uppercase text-brand-espresso/50 mb-2">Delivering to</p>
                    <p className="font-body text-base text-brand-espresso">
                      {deliveryInfo.fullName || 'John Doe'}, {deliveryInfo.address || '123 Admiralty Way'}
                      {deliveryInfo.landmark && `, ${deliveryInfo.landmark}`}, {deliveryInfo.city || 'Lekki'}, {deliveryInfo.state || 'Lagos'}
                    </p>
                    <p className="font-body text-sm text-brand-espresso/60 mt-1">{deliveryInfo.phone || '+234 801 234 5678'}</p>
                    <p className="font-body text-sm text-brand-espresso mt-2">
                      {deliveryMethod === 'express' ? 'Express Delivery' : 'Standard Delivery'} — {deliveryMethod === 'express' ? '25-35' : '45-60'} mins
                    </p>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-brand-cream p-5 mt-4">
                    <p className="font-body text-sm font-medium uppercase text-brand-espresso/50 mb-2">Payment method</p>
                    <p className="font-body text-base text-brand-espresso capitalize">
                      {paymentMethod === 'card' ? 'Debit / Credit Card' : paymentMethod === 'transfer' ? 'Bank Transfer' : paymentMethod === 'ussd' ? 'USSD' : 'Pay on Delivery'}
                    </p>
                  </div>

                  {/* Totals */}
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between font-body text-base">
                      <span className="text-brand-espresso">Subtotal</span>
                      <span className="text-brand-espresso">&#8358;{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-body text-base">
                      <span className="text-brand-espresso">Delivery Fee</span>
                      <span className="text-brand-espresso">&#8358;{deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-body text-xl pt-3 border-t border-gray-200">
                      <span className="font-semibold text-brand-espresso">Total</span>
                      <span className="font-semibold text-brand-clay">&#8358;{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button onClick={prevStep} className="h-14 px-8 border border-gray-200 font-body font-medium text-brand-espresso hover:bg-brand-cream transition-colors">
                      <ChevronLeft size={18} className="inline mr-1" /> Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 h-14 bg-brand-clay text-brand-cream font-body text-lg font-semibold hover:bg-brand-gold hover:text-brand-espresso transition-colors disabled:opacity-70 flex items-center justify-center"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        `Place Order — \u20A6${total.toLocaleString()}`
                      )}
                    </button>
                  </div>

                  <p className="font-body text-xs text-brand-espresso/40 text-center mt-4 flex items-center justify-center gap-1">
                    <Shield size={12} /> Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>
              )}
            </div>

            {/* Right - Summary */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-[152px] bg-white p-8 shadow-card">
                <h3 className="font-display text-2xl font-semibold text-brand-espresso mb-6">
                  Order Summary
                </h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-[50px] h-[50px] object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-medium text-brand-espresso truncate">{item.name}</p>
                        <p className="font-body text-xs text-brand-espresso/50">x{item.quantity}</p>
                      </div>
                      <span className="font-body text-sm font-semibold text-brand-clay">
                        &#8358;{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between font-body text-base">
                    <span>Subtotal</span>
                    <span>&#8358;{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-brand-espresso/60">
                    <span>Delivery</span>
                    <span>&#8358;{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-body text-xl font-semibold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-brand-clay">&#8358;{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
