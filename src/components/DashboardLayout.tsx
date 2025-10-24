import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BedDouble, 
  Calendar, 
  Users, 
  UserCog, 
  Building2, 
  Package, 
  UtensilsCrossed, 
  Dumbbell, 
  Wrench, 
  Star, 
  CreditCard, 
  UserCircle, 
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BedDouble, label: 'Rooms', path: '/rooms' },
  { icon: Calendar, label: 'Bookings', path: '/bookings' },
  { icon: Users, label: 'Guests', path: '/guests' },
  { icon: UserCog, label: 'Employees', path: '/employees' },
  { icon: Building2, label: 'Departments', path: '/departments' },
  { icon: Package, label: 'Inventory', path: '/inventory' },
  { icon: UtensilsCrossed, label: 'Room Service', path: '/room-service' },
  { icon: Dumbbell, label: 'Facilities', path: '/facilities' },
  { icon: Wrench, label: 'Maintenance', path: '/maintenance' },
  { icon: Star, label: 'Reviews', path: '/reviews' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: UserCircle, label: 'Users', path: '/users' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#e8f5f6]">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-[#30382F] border-r border-[#30382F]">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-[#6EC6CB]">Hotel Management</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#6EC6CB] text-white'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#30382F] border-r border-[#30382F]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h1 className="text-[#6EC6CB]">Hotel Management</h1>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-[#6EC6CB] text-white'
                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-[#b8d4d6] px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex-1 md:flex-none"></div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[#30382F]">Admin User</p>
                <p className="text-[#5a6158]">admin@hotel.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#6EC6CB] flex items-center justify-center text-white shadow-md">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
