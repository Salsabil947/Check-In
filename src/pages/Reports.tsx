import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Download, FileText, TrendingUp, Users, BedDouble, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyRevenue = [
  { month: 'Jan', revenue: 145000, bookings: 89 },
  { month: 'Feb', revenue: 152000, bookings: 95 },
  { month: 'Mar', revenue: 148000, bookings: 92 },
  { month: 'Apr', revenue: 161000, bookings: 102 },
  { month: 'May', revenue: 155000, bookings: 98 },
  { month: 'Jun', revenue: 167000, bookings: 108 },
  { month: 'Jul', revenue: 182000, bookings: 125 },
  { month: 'Aug', revenue: 189000, bookings: 132 },
  { month: 'Sep', revenue: 171000, bookings: 115 },
  { month: 'Oct', revenue: 176000, bookings: 118 },
];

const roomTypeRevenue = [
  { name: 'Standard', value: 35, revenue: 52500 },
  { name: 'Deluxe', value: 28, revenue: 84000 },
  { name: 'Suite', value: 22, revenue: 118800 },
  { name: 'Presidential', value: 15, revenue: 153000 },
];

const COLORS = ['#6EC6CB', '#30382F', '#9dd9dc', '#50b8bd'];

const topPerformingRooms = [
  { room: '401', bookings: 28, revenue: 23800, rating: 4.9 },
  { room: '301', bookings: 26, revenue: 23400, rating: 4.8 },
  { room: '302', bookings: 25, revenue: 22500, rating: 4.7 },
  { room: '201', bookings: 24, revenue: 12000, rating: 4.8 },
  { room: '202', bookings: 23, revenue: 11500, rating: 4.6 },
];

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-500">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900">Total Revenue</h3>
              <DollarSign className="w-5 h-5 text-[#6EC6CB]" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">$1,646,000</p>
            <p className="text-[#6EC6CB] flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              12.5% vs last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900">Total Bookings</h3>
              <FileText className="w-5 h-5 text-[#30382F]" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">1,074</p>
            <p className="text-[#6EC6CB] flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              8.3% vs last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900">Avg Occupancy</h3>
              <BedDouble className="w-5 h-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">71.6%</p>
            <p className="text-[#6EC6CB] flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              5.2% vs last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900">Guest Satisfaction</h3>
              <Users className="w-5 h-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">4.3/5.0</p>
            <p className="text-[#6EC6CB] flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              0.3 points up
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#6EC6CB" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#6EC6CB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Room Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roomTypeRevenue}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roomTypeRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {roomTypeRevenue.map((type, index) => (
                <div key={type.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-slate-600">{type.name}</span>
                  </div>
                  <span className="text-slate-900">${type.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingRooms.map((room, index) => (
                <div key={room.room} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6EC6CB] text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900">Room {room.room}</p>
                    <p className="text-slate-500">{room.bookings} bookings • Rating: {room.rating}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-900">${room.revenue.toLocaleString()}</p>
                    <p className="text-slate-500">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <FileText className="w-5 h-5 text-[#6EC6CB]" />
              <div className="text-left">
                <p className="text-slate-900">Occupancy Report</p>
                <p className="text-slate-500">Daily room occupancy rates</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <DollarSign className="w-5 h-5 text-[#6EC6CB]" />
              <div className="text-left">
                <p className="text-slate-900">Revenue Report</p>
                <p className="text-slate-500">Detailed revenue breakdown</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <Users className="w-5 h-5 text-[#30382F]" />
              <div className="text-left">
                <p className="text-slate-900">Guest Report</p>
                <p className="text-slate-500">Guest demographics & feedback</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
