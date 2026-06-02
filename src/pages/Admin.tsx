import { useState } from 'react';
import {
  LayoutDashboard, ShoppingBag, Package, Users, BarChart3, Settings,
  LogOut, Search, CheckCircle, TrendingUp, TrendingDown,
} from 'lucide-react';

const adminNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const statsCards = [
  { label: "Today's Orders", value: '48', change: '+12%', up: true, color: 'text-brand-clay' },
  { label: "Today's Revenue", value: '\u20A6245,000', change: '+8%', up: true, color: 'text-functional-success' },
  { label: 'New Customers', value: '15', change: '+5%', up: true, color: 'text-brand-espresso' },
  { label: 'Avg. Order Value', value: '\u20A65,100', change: '-2%', up: false, color: 'text-brand-gold' },
];

const recentOrders = [
  { id: 'UP-2025-00125', customer: 'Amara O.', items: 'Party Jollof x2', total: 6600, status: 'Preparing', time: '2:30 PM' },
  { id: 'UP-2025-00124', customer: 'Chioma N.', items: 'Suya Platter', total: 4300, status: 'Delivered', time: '7:15 PM' },
  { id: 'UP-2025-00123', customer: 'Tunde K.', items: 'Pounded Yam x2', total: 6400, status: 'Delivered', time: '1:00 PM' },
  { id: 'UP-2025-00121', customer: 'Ngozi E.', items: 'Fried Rice, Zobo', total: 3300, status: 'Out for Delivery', time: '12:45 PM' },
  { id: 'UP-2025-00120', customer: 'Femi A.', items: 'Grilled Tilapia', total: 4500, status: 'Confirmed', time: '11:30 AM' },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    Pending: 'bg-brand-gold/20 text-brand-espresso',
    Confirmed: 'bg-brand-clay/20 text-brand-clay',
    Preparing: 'bg-brand-clay/20 text-brand-clay',
    'Out for Delivery': 'bg-functional-success/20 text-functional-success',
    Delivered: 'bg-functional-success/20 text-functional-success',
    Cancelled: 'bg-functional-error/20 text-functional-error',
  };
  return map[status] || map.Pending;
};

// Simple bar chart component
function SimpleBarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="space-y-3">
      {data.map(d => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="font-body text-xs text-brand-espresso/60 w-8 text-right">{d.label}</span>
          <div className="flex-1 h-6 bg-brand-cream rounded-sm overflow-hidden">
            <div
              className="h-full bg-brand-clay rounded-sm transition-all duration-500"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="font-body text-xs font-medium text-brand-espresso w-8">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

// Simple line chart (visual only)
function SimpleLineChart() {
  const points = [40, 55, 45, 70, 60, 80, 75];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const width = 100;
  const height = 40;

  const pathPoints = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[200px]" preserveAspectRatio="none">
      <polyline
        points={pathPoints}
        fill="none"
        stroke="#c06625"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,${height} ${pathPoints} ${width},${height}`}
        fill="url(#gradient)"
        opacity="0.1"
      />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c06625" />
          <stop offset="100%" stopColor="#c06625" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  const categoryData = [
    { label: 'Rice', value: 85 },
    { label: 'Swallows', value: 72 },
    { label: 'Grills', value: 68 },
    { label: 'Soups', value: 45 },
    { label: 'Drinks', value: 90 },
    { label: 'Snacks', value: 55 },
  ];

  const filteredOrders = orderStatusFilter === 'All'
    ? recentOrders
    : recentOrders.filter(o => o.status === orderStatusFilter);

  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-brand-espresso/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-[260px] bg-brand-espresso flex-shrink-0 z-50 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 pb-8">
          <div className="font-display text-xl font-semibold text-brand-cream">
            UrbanPlatter
          </div>
          <div className="font-body text-xs uppercase tracking-wider text-brand-clay mt-0.5">
            Admin
          </div>
        </div>
        <nav className="px-3">
          {adminNav.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 font-body text-sm font-medium transition-all border-l-[3px] ${
                activeTab === item.id
                  ? 'bg-brand-clay/15 text-brand-cream border-brand-clay'
                  : 'text-brand-cream/60 border-transparent hover:text-brand-cream hover:bg-brand-cream/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-brand-cream/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 font-body text-sm font-medium text-functional-error hover:bg-functional-error/5 transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-brand-cream border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-brand-espresso">
            <LayoutDashboard size={24} />
          </button>
          <h1 className="font-display text-2xl font-semibold text-brand-espresso capitalize hidden sm:block">
            {activeTab}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-espresso/40" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-48 pl-9 pr-4 border border-gray-200 bg-white font-body text-sm focus:border-brand-clay focus:outline-none"
              />
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-clay flex items-center justify-center text-brand-cream font-body text-sm font-semibold">
              A
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map(card => (
                  <div key={card.label} className="bg-white p-6 shadow-card">
                    <p className="font-body text-xs uppercase tracking-wider text-brand-espresso/50">{card.label}</p>
                    <p className={`font-display text-3xl font-semibold ${card.color} mt-2`}>{card.value}</p>
                    <p className={`font-body text-xs flex items-center gap-1 mt-1 ${card.up ? 'text-functional-success' : 'text-functional-error'}`}>
                      {card.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {card.change} from yesterday
                    </p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 shadow-card">
                  <h3 className="font-body text-base font-semibold text-brand-espresso mb-4">Revenue (Last 7 Days)</h3>
                  <SimpleLineChart />
                  <div className="flex justify-between mt-3">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                      <span key={d} className="font-body text-xs text-brand-espresso/40">{d}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 shadow-card">
                  <h3 className="font-body text-base font-semibold text-brand-espresso mb-4">Orders by Category</h3>
                  <SimpleBarChart data={categoryData} />
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white shadow-card overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-body text-base font-semibold text-brand-espresso">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="font-body text-sm text-brand-clay hover:underline">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Time'].map(h => (
                          <th key={h} className="text-left px-6 py-3 font-body text-xs uppercase tracking-wider text-brand-espresso/50 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(order => (
                        <tr key={order.id} className="border-b border-gray-50 hover:bg-brand-cream/50 transition-colors">
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso/60">{order.id}</td>
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso">{order.customer}</td>
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso/70">{order.items}</td>
                          <td className="px-6 py-4 font-body text-sm font-semibold text-brand-clay">&#8358;{order.total.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-pill font-body text-xs font-medium ${statusBadge(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso/50">{order.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="font-display text-3xl font-semibold text-brand-espresso">Orders</h2>
                <button className="h-10 px-4 border border-gray-200 bg-white font-body text-sm text-brand-espresso hover:bg-brand-cream transition-colors">
                  Export CSV
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                {['All', 'Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map(f => (
                  <button
                    key={f}
                    onClick={() => setOrderStatusFilter(f)}
                    className={`px-4 py-2 rounded-pill border font-body text-sm font-medium transition-all whitespace-nowrap ${
                      orderStatusFilter === f
                        ? 'bg-brand-espresso text-brand-cream border-brand-espresso'
                        : 'border-gray-200 text-brand-espresso hover:bg-brand-espresso/5'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="bg-white shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Time', 'Actions'].map(h => (
                          <th key={h} className="text-left px-6 py-4 font-body text-xs uppercase tracking-wider text-brand-espresso/50 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map(order => (
                        <tr key={order.id} className="border-b border-gray-50 hover:bg-brand-cream/50 transition-colors">
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso/60">{order.id}</td>
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso">{order.customer}</td>
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso/70">{order.items}</td>
                          <td className="px-6 py-4 font-body text-sm font-semibold text-brand-clay">&#8358;{order.total.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-pill font-body text-xs font-medium ${statusBadge(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso/50">{order.time}</td>
                          <td className="px-6 py-4">
                            <button className="font-body text-sm text-brand-clay hover:underline">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-3xl font-semibold text-brand-espresso">Products</h2>
                <button className="h-10 px-6 bg-brand-clay text-brand-cream font-body text-sm font-semibold hover:bg-brand-gold hover:text-brand-espresso transition-colors">
                  + Add Product
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {recentOrders.slice(0, 4).map((_, i) => (
                  <div key={i} className="bg-white shadow-card overflow-hidden">
                    <div className="aspect-square bg-brand-cream">
                      <img src={`/images/hero-${['jollof-rice', 'suya-skewers', 'pounded-yam', 'fried-rice'][i]}.jpg`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-body text-base font-medium text-brand-espresso">
                        {['Party Jollof Rice', 'Suya Platter', 'Pounded Yam & Egusi', 'Fried Rice Special'][i]}
                      </h3>
                      <p className="font-body text-lg font-semibold text-brand-clay mt-1">
                        &#8358;{[2500, 3500, 3200, 2800][i].toLocaleString()}
                      </p>
                      <span className="inline-block mt-2 px-3 py-0.5 bg-brand-cream font-body text-xs text-brand-espresso/60">
                        {['Rice', 'Grills', 'Swallows', 'Rice'][i]}
                      </span>
                      <div className="flex gap-2 mt-3">
                        <span className="font-body text-xs text-functional-success flex items-center gap-1">
                          <CheckCircle size={12} /> In Stock
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customers */}
          {activeTab === 'customers' && (
            <div>
              <h2 className="font-display text-3xl font-semibold text-brand-espresso mb-6">Customers</h2>
              <div className="bg-white shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {['Name', 'Email', 'Phone', 'Orders', 'Total Spent', 'Joined'].map(h => (
                          <th key={h} className="text-left px-6 py-4 font-body text-xs uppercase tracking-wider text-brand-espresso/50 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['Amara Okafor', 'Chioma Nwosu', 'Tunde Kareem', 'Ngozi Eze'].map((name, i) => (
                        <tr key={name} className="border-b border-gray-50 hover:bg-brand-cream/50 transition-colors">
                          <td className="px-6 py-4 font-body text-sm font-medium text-brand-espresso">{name}</td>
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso/60">{['amara', 'chioma', 'tunde', 'ngozi'][i]}@example.com</td>
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso/60">+234 801 234 567{i}</td>
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso">{[12, 8, 15, 5][i]}</td>
                          <td className="px-6 py-4 font-body text-sm font-semibold text-brand-clay">&#8358;{[45000, 28000, 62000, 15000][i].toLocaleString()}</td>
                          <td className="px-6 py-4 font-body text-sm text-brand-espresso/50">{['Jan 2025', 'Feb 2025', 'Dec 2024', 'Mar 2025'][i]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-semibold text-brand-espresso">Analytics</h2>
              <div className="flex gap-2 mb-4">
                {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days'].map(r => (
                  <button key={r} className={`px-4 py-2 rounded-pill border font-body text-sm font-medium transition-all ${
                    r === 'Last 7 Days' ? 'bg-brand-espresso text-brand-cream border-brand-espresso' : 'border-gray-200 text-brand-espresso hover:bg-brand-espresso/5'
                  }`}>
                    {r}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 shadow-card">
                  <h3 className="font-body text-base font-semibold text-brand-espresso mb-4">Revenue Trend</h3>
                  <SimpleLineChart />
                </div>
                <div className="bg-white p-6 shadow-card">
                  <h3 className="font-body text-base font-semibold text-brand-espresso mb-4">Orders by Category</h3>
                  <SimpleBarChart data={categoryData} />
                </div>
                <div className="bg-white p-6 shadow-card">
                  <h3 className="font-body text-base font-semibold text-brand-espresso mb-4">Top Selling Items</h3>
                  <SimpleBarChart data={[
                    { label: 'Jollof', value: 120 },
                    { label: 'Suya', value: 95 },
                    { label: 'Egusi', value: 88 },
                    { label: 'Zobo', value: 76 },
                    { label: 'Puff', value: 65 },
                  ]} />
                </div>
                <div className="bg-white p-6 shadow-card">
                  <h3 className="font-body text-base font-semibold text-brand-espresso mb-4">Customer Growth</h3>
                  <SimpleLineChart />
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="max-w-[600px]">
              <h2 className="font-display text-3xl font-semibold text-brand-espresso mb-6">Settings</h2>
              <div className="bg-white p-8 shadow-card space-y-6">
                <div>
                  <h3 className="font-body text-lg font-semibold text-brand-espresso mb-4">Restaurant Info</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Restaurant Name</label>
                      <input type="text" defaultValue="UrbanPlatter.ng" className="w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none" />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Contact Email</label>
                      <input type="email" defaultValue="hello@urbanplatter.ng" className="w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none" />
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-body text-lg font-semibold text-brand-espresso mb-4">Delivery Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Standard Delivery Fee (&#8358;)</label>
                      <input type="number" defaultValue="500" className="w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none" />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Express Delivery Fee (&#8358;)</label>
                      <input type="number" defaultValue="1000" className="w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none" />
                    </div>
                  </div>
                </div>
                <button className="w-full h-14 bg-brand-espresso text-brand-cream font-body font-semibold hover:bg-brand-clay transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
