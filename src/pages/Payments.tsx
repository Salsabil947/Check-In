import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Search, Download, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const paymentsData = [
  { 
    id: 'PAY-001', 
    bookingId: 'BK-001',
    guestName: 'John Smith',
    amount: 1000,
    method: 'Credit Card',
    status: 'Completed',
    date: '2025-10-12',
    transactionId: 'TXN-548932'
  },
  { 
    id: 'PAY-002', 
    bookingId: 'BK-002',
    guestName: 'Sarah Johnson',
    amount: 1250,
    method: 'Debit Card',
    status: 'Pending',
    date: '2025-10-13',
    transactionId: 'TXN-548933'
  },
  { 
    id: 'PAY-003', 
    bookingId: 'BK-003',
    guestName: 'Michael Brown',
    amount: 300,
    method: 'Cash',
    status: 'Completed',
    date: '2025-10-11',
    transactionId: 'TXN-548934'
  },
  { 
    id: 'PAY-004', 
    bookingId: 'BK-004',
    guestName: 'Emily Davis',
    amount: 2250,
    method: 'Credit Card',
    status: 'Completed',
    date: '2025-10-10',
    transactionId: 'TXN-548935'
  },
  { 
    id: 'PAY-005', 
    bookingId: 'BK-005',
    guestName: 'David Wilson',
    amount: 500,
    method: 'Bank Transfer',
    status: 'Failed',
    date: '2025-10-13',
    transactionId: 'TXN-548936'
  },
];

const revenueData = [
  { day: 'Mon', revenue: 4500 },
  { day: 'Tue', revenue: 5200 },
  { day: 'Wed', revenue: 4800 },
  { day: 'Thu', revenue: 6100 },
  { day: 'Fri', revenue: 7500 },
  { day: 'Sat', revenue: 8200 },
  { day: 'Sun', revenue: 7800 },
];

export function Payments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = filterMethod === 'All' || payment.method === filterMethod;
    const matchesStatus = filterStatus === 'All' || payment.status === filterStatus;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      case 'Refunded':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const totalRevenue = paymentsData.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = paymentsData.filter(p => p.status === 'Pending').length;
  const failedPayments = paymentsData.filter(p => p.status === 'Failed').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Payments Management</h1>
          <p className="text-slate-500">Track and manage payment transactions</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Total Revenue</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#6EC6CB]" />
              <p className="text-slate-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <p className="text-slate-500 mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Completed</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900 flex items-center gap-2">
              {paymentsData.filter(p => p.status === 'Completed').length}
              <TrendingUp className="w-4 h-4 text-[#6EC6CB]" />
            </p>
            <p className="text-slate-500">Successful payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Pending</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">{pendingPayments}</p>
            <p className="text-slate-500">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Failed</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">{failedPayments}</p>
            <p className="text-slate-500">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-slate-900">Weekly Revenue</h3>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#6EC6CB" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search payments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterMethod} onValueChange={setFilterMethod}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Methods</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Debit Card">Debit Card</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.bookingId}</TableCell>
                  <TableCell>{payment.guestName}</TableCell>
                  <TableCell className="text-slate-900">${payment.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-500" />
                      {payment.method}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500">{payment.transactionId}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
