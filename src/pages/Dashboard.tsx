import { useState } from 'react';
import {
  Package, MapPin, Home, CreditCard, User, LogOut,
  ClipboardList, Clock, CheckCircle, XCircle, ChefHat,
} from 'lucide-react';

const sidebarLinks = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'tracking', label: 'Track Order', icon: MapPin },
  { id: 'addresses', label: 'Addresses', icon: Home },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'profile', label: 'Profile Settings', icon: User },
];

const mockOrders = [
  { id: 'UP-2025-00125', date: 'May 21, 2025 at 2:30 PM', items: 'Party Jollof x2, Zobo x2', total: 6600, status: 'Preparing' },
  { id: 'UP-2025-00124', date: 'May 20, 2025 at 7:15 PM', items: 'Suya Platter, Chapman', total: 4300, status: 'Delivered' },
  { id: 'UP-2025-00123', date: 'May 18, 2025 at 1:00 PM', items: 'Pounded Yam & Egusi x2', total: 6400, status: 'Delivered' },
  { id: 'UP-2025-00122', date: 'May 15, 2025 at 8:30 PM', items: 'Fried Rice, Grilled Fish', total: 7300, status: 'Cancelled' },
];

const statusConfig: Record<string, { color: string; text: string }> = {
  Pending: { color: 'bg-brand-gold text-brand-espresso', text: 'text-brand-gold' },
  Confirmed: { color: 'bg-brand-clay text-brand-cream', text: 'text-brand-clay' },
  Preparing: { color: 'bg-brand-clay text-brand-cream', text: 'text-brand-clay' },
  'Out for Delivery': { color: 'bg-functional-success text-white', text: 'text-functional-success' },
  Delivered: { color: 'bg-functional-success text-white', text: 'text-functional-success' },
  Cancelled: { color: 'bg-functional-error text-white', text: 'text-functional-error' },
};

const trackingSteps = [
  { label: 'Order Placed', time: '2:30 PM', done: true },
  { label: 'Payment Confirmed', time: '2:31 PM', done: true },
  { label: 'Preparing Your Meal', time: '2:35 PM', done: true, current: true },
  { label: 'Ready for Pickup', time: '', done: false },
  { label: 'Out for Delivery', time: '', done: false },
  { label: 'Delivered', time: '', done: false },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orderFilter, setOrderFilter] = useState('All');

  const filteredOrders = orderFilter === 'All'
    ? mockOrders
    : mockOrders.filter(o => o.status === orderFilter);

  const filters = ['All', 'Preparing', 'Delivered', 'Cancelled'];

  return (
    <div className="pt-[72px] min-h-screen bg-brand-cream">
      <div className="flex min-h-[calc(100vh-72px)]">
        {/* Sidebar */}
        <aside className="hidden md:block w-[280px] bg-white border-r border-gray-200 fixed left-0 top-[72px] h-[calc(100vh-72px)] overflow-y-auto">
          <div className="p-8 text-center border-b border-gray-100">
            <div className="w-16 h-16 mx-auto rounded-full bg-brand-clay flex items-center justify-center text-brand-cream font-display text-2xl font-semibold">
              AO
            </div>
            <p className="font-body text-base font-semibold text-brand-espresso mt-3">Amara Okafor</p>
            <p className="font-body text-xs text-brand-espresso/50">amara@example.com</p>
          </div>
          <nav className="py-4">
            {sidebarLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center gap-3 px-6 py-3.5 font-body text-[15px] font-medium transition-all ${
                  activeTab === link.id
                    ? 'bg-brand-clay/8 text-brand-clay border-l-[3px] border-brand-clay'
                    : 'text-brand-espresso/70 hover:bg-brand-cream border-l-[3px] border-transparent'
                }`}
              >
                <link.icon size={20} />
                {link.label}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100">
            <button className="w-full flex items-center gap-3 px-6 py-3.5 font-body text-[15px] font-medium text-functional-error hover:bg-functional-error/5 transition-colors">
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-[280px] p-6 md:p-10">
          {/* Mobile Tabs */}
          <div className="md:hidden flex overflow-x-auto no-scrollbar gap-2 mb-6">
            {sidebarLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-pill border whitespace-nowrap font-body text-sm ${
                  activeTab === link.id
                    ? 'bg-brand-espresso text-brand-cream border-brand-espresso'
                    : 'border-gray-200 text-brand-espresso'
                }`}
              >
                <link.icon size={16} />
                {link.label}
              </button>
            ))}
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="max-w-[900px]">
              <h1 className="font-display text-4xl font-semibold text-brand-espresso mb-2">My Orders</h1>
              <p className="font-body text-base text-brand-espresso/60 mb-8">View and manage your order history</p>

              <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">
                {filters.map(f => (
                  <button
                    key={f}
                    onClick={() => setOrderFilter(f)}
                    className={`px-5 py-2 rounded-pill border font-body text-sm font-medium transition-all whitespace-nowrap ${
                      orderFilter === f
                        ? 'bg-brand-espresso text-brand-cream border-brand-espresso'
                        : 'border-gray-200 text-brand-espresso hover:bg-brand-espresso/5'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="space-y-5">
                {filteredOrders.map(order => {
                  const status = statusConfig[order.status] || statusConfig.Pending;
                  return (
                    <div key={order.id} className="bg-white p-7 shadow-card border-b-[3px]" style={{ borderColor: order.status === 'Delivered' ? '#27ae60' : order.status === 'Cancelled' ? '#c0392b' : '#c06625' }}>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-body text-sm font-semibold text-brand-espresso/60">{order.id}</p>
                          <p className="font-body text-xs text-brand-espresso/40 mt-1">{order.date}</p>
                          <p className="font-body text-[15px] text-brand-espresso mt-3">{order.items}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-pill font-body text-xs uppercase font-medium ${status.color}`}>
                            {order.status}
                          </span>
                          <p className="font-body text-lg font-semibold text-brand-clay mt-2">
                            &#8358;{order.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-4 pt-4 border-t border-gray-50">
                        {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                          <button onClick={() => setActiveTab('tracking')} className="font-body text-sm text-brand-clay font-medium">
                            Track Order
                          </button>
                        )}
                        <button className="font-body text-sm text-brand-espresso/60 hover:text-brand-clay transition-colors">
                          Reorder
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tracking Tab */}
          {activeTab === 'tracking' && (
            <div className="max-w-[700px] mx-auto">
              <h1 className="font-display text-4xl font-semibold text-brand-espresso mb-2">Track Your Order</h1>
              <p className="font-body text-base text-brand-espresso/60 mb-8">Order #UP-2025-00125</p>

              <div className="bg-white p-8 shadow-card mb-8">
                <p className="font-body text-sm text-brand-espresso/50 uppercase tracking-wider mb-4">Estimated Delivery</p>
                <p className="font-display text-3xl font-semibold text-brand-espresso">3:15 PM</p>
                <p className="font-body text-sm text-brand-espresso/60 mt-1">25-30 minutes remaining</p>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200" />
                {trackingSteps.map((step) => (
                  <div key={step.label} className="relative flex items-start gap-5 pb-8">
                    <div className={`absolute left-[-21px] w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      step.done
                        ? step.current
                          ? 'bg-brand-clay ring-4 ring-brand-clay/20 animate-pulse-ring'
                          : 'bg-functional-success'
                        : 'bg-gray-200'
                    }`}>
                      {step.done ? (
                        step.current ? <ChefHat size={18} className="text-white" /> : <CheckCircle size={18} className="text-white" />
                      ) : (
                        <Clock size={18} className="text-brand-espresso/30" />
                      )}
                    </div>
                    <div>
                      <p className={`font-body text-base font-medium ${step.done ? 'text-brand-espresso' : 'text-brand-espresso/40'}`}>
                        {step.label}
                      </p>
                      {step.time && (
                        <p className="font-body text-sm text-brand-espresso/50">{step.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-brand-cream p-6 mt-8">
                <p className="font-body text-sm font-medium uppercase text-brand-espresso/50 mb-3">Delivery Rider</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-clay/10 flex items-center justify-center font-body text-sm font-semibold text-brand-clay">
                    MK
                  </div>
                  <div>
                    <p className="font-body text-base font-medium text-brand-espresso">Michael K.</p>
                    <p className="font-body text-sm text-brand-clay">+234 805 123 4567</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="max-w-[700px]">
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-display text-4xl font-semibold text-brand-espresso">Saved Addresses</h1>
                <button className="font-body text-sm font-medium text-brand-clay hover:underline">
                  + Add New Address
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { type: 'Home', address: '15 Admiralty Way, Lekki Phase 1', city: 'Lekki, Lagos', phone: '+234 801 234 5678', default: true },
                  { type: 'Work', address: 'Plot 42, Bourdillon Road, Ikoyi', city: 'Ikoyi, Lagos', phone: '+234 801 234 5678', default: false },
                ].map((addr, i) => (
                  <div key={i} className="bg-white p-7 shadow-card">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-brand-cream font-body text-xs font-medium uppercase">{addr.type}</span>
                        {addr.default && <span className="px-3 py-1 bg-brand-clay/10 text-brand-clay font-body text-xs font-medium">Default</span>}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-brand-espresso/40 hover:text-brand-clay transition-colors"><ClipboardList size={16} /></button>
                        <button className="p-2 text-brand-espresso/40 hover:text-functional-error transition-colors"><XCircle size={16} /></button>
                      </div>
                    </div>
                    <p className="font-body text-base text-brand-espresso mt-4">{addr.address}</p>
                    <p className="font-body text-sm text-brand-espresso/60 mt-1">{addr.city}</p>
                    <p className="font-body text-sm text-brand-clay mt-1">{addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="max-w-[700px]">
              <h1 className="font-display text-4xl font-semibold text-brand-espresso mb-8">Payment Methods</h1>
              <div className="bg-white p-7 shadow-card">
                <div className="flex items-center gap-4">
                  <CreditCard size={32} className="text-brand-clay" />
                  <div>
                    <p className="font-body text-base font-medium text-brand-espresso">Visa ending in 4242</p>
                    <p className="font-body text-sm text-brand-espresso/50">Expires 12/26</p>
                  </div>
                  <span className="ml-auto px-3 py-1 bg-brand-clay/10 text-brand-clay font-body text-xs font-medium">Default</span>
                </div>
              </div>
              <button className="mt-4 font-body text-sm font-medium text-brand-clay hover:underline">
                + Add New Card
              </button>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="max-w-[600px]">
              <h1 className="font-display text-4xl font-semibold text-brand-espresso mb-8">Profile Settings</h1>
              <div className="bg-white p-8 shadow-card">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-brand-clay flex items-center justify-center text-brand-cream font-display text-2xl font-semibold">
                    AO
                  </div>
                  <button className="font-body text-sm font-medium text-brand-clay hover:underline">
                    Change Photo
                  </button>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Full Name</label>
                    <input type="text" defaultValue="Amara Okafor" className="w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Email</label>
                    <input type="email" defaultValue="amara@example.com" className="w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Phone</label>
                    <input type="tel" defaultValue="+234 801 234 5678" className="w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none" />
                  </div>
                </div>
                <button className="w-full h-14 bg-brand-espresso text-brand-cream font-body font-semibold mt-8 hover:bg-brand-clay transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
