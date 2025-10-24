import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Plus, Search, Eye, Clock } from 'lucide-react';

const ordersData = [
  { 
    id: 'ORD-001', 
    room: '201', 
    guestName: 'John Smith',
    items: ['Club Sandwich', 'French Fries', 'Coke'],
    totalAmount: 45,
    status: 'Delivered',
    orderTime: '2025-10-13 12:30',
    deliveryTime: '2025-10-13 13:05'
  },
  { 
    id: 'ORD-002', 
    room: '305', 
    guestName: 'Sarah Johnson',
    items: ['Caesar Salad', 'Grilled Chicken', 'Water'],
    totalAmount: 38,
    status: 'In Progress',
    orderTime: '2025-10-13 13:15',
    deliveryTime: null
  },
  { 
    id: 'ORD-003', 
    room: '102', 
    guestName: 'Michael Brown',
    items: ['Breakfast Platter', 'Orange Juice', 'Coffee'],
    totalAmount: 52,
    status: 'Pending',
    orderTime: '2025-10-13 08:45',
    deliveryTime: null
  },
  { 
    id: 'ORD-004', 
    room: '408', 
    guestName: 'Emily Davis',
    items: ['Pasta Carbonara', 'Garlic Bread', 'Red Wine'],
    totalAmount: 68,
    status: 'In Progress',
    orderTime: '2025-10-13 19:20',
    deliveryTime: null
  },
  { 
    id: 'ORD-005', 
    room: '203', 
    guestName: 'David Wilson',
    items: ['Cheeseburger', 'Fries', 'Milkshake'],
    totalAmount: 42,
    status: 'Delivered',
    orderTime: '2025-10-13 14:10',
    deliveryTime: '2025-10-13 14:45'
  },
];

const menuItems = [
  { name: 'Club Sandwich', category: 'Appetizers', price: 18 },
  { name: 'Caesar Salad', category: 'Salads', price: 15 },
  { name: 'Grilled Chicken', category: 'Main Course', price: 28 },
  { name: 'Pasta Carbonara', category: 'Main Course', price: 32 },
  { name: 'Cheeseburger', category: 'Main Course', price: 24 },
  { name: 'French Fries', category: 'Sides', price: 8 },
  { name: 'Garlic Bread', category: 'Sides', price: 6 },
];

export function RoomService() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.room.includes(searchTerm) ||
      order.guestName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-[#d1eced] text-[#50b8bd]';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Room Service Management</h1>
          <p className="text-slate-500">Manage room service orders and menu items</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#6EC6CB] hover:bg-[#50b8bd]">
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Room Service Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderRoom">Room Number</Label>
                  <Input id="orderRoom" placeholder="201" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderGuest">Guest Name</Label>
                  <Input id="orderGuest" placeholder="John Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Menu Items</Label>
                <div className="border rounded-lg p-4 max-h-48 overflow-y-auto space-y-2">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                      <div>
                        <p className="text-slate-900">{item.name}</p>
                        <p className="text-slate-500">{item.category}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-900">${item.price}</span>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea 
                  id="specialInstructions" 
                  placeholder="Any special requests or dietary requirements..."
                />
              </div>
              <Button className="w-full bg-[#6EC6CB] hover:bg-[#50b8bd]">Create Order</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Today's Orders</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">47</p>
            <p className="text-slate-500">Total orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">In Progress</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900 flex items-center gap-2">
              12
              <Clock className="w-4 h-4 text-blue-500" />
            </p>
            <p className="text-slate-500">Being prepared</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Delivered</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">32</p>
            <p className="text-slate-500">Completed today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Revenue</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">$2,345</p>
            <p className="text-slate-500">Today's earnings</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search orders..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Order Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.room}</TableCell>
                  <TableCell>{order.guestName}</TableCell>
                  <TableCell>
                    <div className="text-slate-600">
                      {order.items.slice(0, 2).join(', ')}
                      {order.items.length > 2 && ` +${order.items.length - 2} more`}
                    </div>
                  </TableCell>
                  <TableCell>{order.orderTime}</TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
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
