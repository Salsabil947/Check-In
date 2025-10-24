import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  BedDouble, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const occupancyData = [
  { name: 'Occupied', value: 68 },
  { name: 'Available', value: 32 },
];

const COLORS = ['#6EC6CB', '#e2e8f0'];

const recentBookings = [
  { id: 'BK-001', guest: 'John Smith', room: '201', checkIn: '2025-10-14', status: 'Confirmed' },
  { id: 'BK-002', guest: 'Sarah Johnson', room: '305', checkIn: '2025-10-15', status: 'Pending' },
  { id: 'BK-003', guest: 'Michael Brown', room: '102', checkIn: '2025-10-14', status: 'Confirmed' },
  { id: 'BK-004', guest: 'Emily Davis', room: '408', checkIn: '2025-10-16', status: 'Confirmed' },
];

const maintenanceRequests = [
  { id: 'MR-001', room: '305', issue: 'AC not working', priority: 'High', status: 'In Progress' },
  { id: 'MR-002', room: '210', issue: 'Leaking faucet', priority: 'Medium', status: 'Pending' },
  { id: 'MR-003', room: '108', issue: 'TV remote not working', priority: 'Low', status: 'Pending' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#30382F] mb-2">Dashboard Overview</h1>
        <p className="text-[#5a6158]">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-[#b8d4d6] shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[#30382F]">Total Rooms</CardTitle>
            <BedDouble className="w-5 h-5 text-[#6EC6CB]" />
          </CardHeader>
          <CardContent>
            <div className="text-[#30382F]">150</div>
            <p className="text-[#5a6158] flex items-center gap-1 mt-1">
              <span className="text-[#6EC6CB] flex items-center">
                <TrendingUp className="w-4 h-4" />
                68%
              </span>
              occupancy rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#b8d4d6] shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[#30382F]">Active Bookings</CardTitle>
            <Calendar className="w-5 h-5 text-[#6EC6CB]" />
          </CardHeader>
          <CardContent>
            <div className="text-[#30382F]">102</div>
            <p className="text-[#5a6158] flex items-center gap-1 mt-1">
              <span className="text-[#6EC6CB] flex items-center">
                <TrendingUp className="w-4 h-4" />
                12%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#b8d4d6] shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[#30382F]">Total Guests</CardTitle>
            <Users className="w-5 h-5 text-[#6EC6CB]" />
          </CardHeader>
          <CardContent>
            <div className="text-[#30382F]">1,247</div>
            <p className="text-[#5a6158] flex items-center gap-1 mt-1">
              <span className="text-[#6EC6CB] flex items-center">
                <TrendingUp className="w-4 h-4" />
                8%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#b8d4d6] shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[#30382F]">Revenue (MTD)</CardTitle>
            <DollarSign className="w-5 h-5 text-[#6EC6CB]" />
          </CardHeader>
          <CardContent>
            <div className="text-[#30382F]">$67,340</div>
            <p className="text-[#5a6158] flex items-center gap-1 mt-1">
              <span className="text-[#6EC6CB] flex items-center">
                <TrendingUp className="w-4 h-4" />
                15%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-[#b8d4d6] shadow-md">
          <CardHeader>
            <CardTitle className="text-[#30382F]">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#6EC6CB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[#b8d4d6] shadow-md">
          <CardHeader>
            <CardTitle className="text-[#30382F]">Room Occupancy</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#b8d4d6] shadow-md">
          <CardHeader>
            <CardTitle className="text-[#30382F]">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-[#f0f9fa] rounded-lg border border-[#b8d4d6]">
                  <div>
                    <p className="text-[#30382F]">{booking.guest}</p>
                    <p className="text-[#5a6158]">Room {booking.room} • {booking.checkIn}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full ${
                    booking.status === 'Confirmed' 
                      ? 'bg-[#d1eced] text-[#50b8bd]' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#b8d4d6] shadow-md">
          <CardHeader>
            <CardTitle className="text-[#30382F]">Maintenance Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-[#f0f9fa] rounded-lg border border-[#b8d4d6]">
                  <div className="flex-1">
                    <p className="text-[#30382F]">Room {request.room}</p>
                    <p className="text-[#5a6158]">{request.issue}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-white ${
                      request.priority === 'High' 
                        ? 'bg-red-500' 
                        : request.priority === 'Medium'
                        ? 'bg-orange-500'
                        : 'bg-[#6EC6CB]'
                    }`}>
                      {request.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
