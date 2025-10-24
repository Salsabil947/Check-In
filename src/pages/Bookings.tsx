import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Plus, Search, Edit, Eye, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const bookingsData = [
  { 
    id: 'BK-001', 
    guestName: 'John Smith', 
    room: '201', 
    checkIn: '2025-10-14', 
    checkOut: '2025-10-18', 
    status: 'Confirmed',
    guests: 2,
    totalAmount: 1000
  },
  { 
    id: 'BK-002', 
    guestName: 'Sarah Johnson', 
    room: '305', 
    checkIn: '2025-10-15', 
    checkOut: '2025-10-20', 
    status: 'Pending',
    guests: 3,
    totalAmount: 1250
  },
  { 
    id: 'BK-003', 
    guestName: 'Michael Brown', 
    room: '102', 
    checkIn: '2025-10-14', 
    checkOut: '2025-10-16', 
    status: 'Confirmed',
    guests: 2,
    totalAmount: 300
  },
  { 
    id: 'BK-004', 
    guestName: 'Emily Davis', 
    room: '408', 
    checkIn: '2025-10-16', 
    checkOut: '2025-10-21', 
    status: 'Confirmed',
    guests: 4,
    totalAmount: 2250
  },
  { 
    id: 'BK-005', 
    guestName: 'David Wilson', 
    room: '203', 
    checkIn: '2025-10-17', 
    checkOut: '2025-10-19', 
    status: 'Checked-in',
    guests: 2,
    totalAmount: 500
  },
];

export function Bookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();

  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Checked-in':
        return 'bg-[#d1eced] text-[#50b8bd]';
      case 'Checked-out':
        return 'bg-slate-100 text-slate-700';
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
          <h1 className="text-slate-900">Bookings Management</h1>
          <p className="text-slate-500">Manage room reservations and bookings</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#6EC6CB] hover:bg-[#50b8bd]">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guest">Guest Name</Label>
                  <Input id="guest" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input id="guests" type="number" placeholder="2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Check-in Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Check-out Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOutDate ? format(checkOutDate, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard - $150/night</SelectItem>
                    <SelectItem value="deluxe">Deluxe - $250/night</SelectItem>
                    <SelectItem value="suite">Suite - $450/night</SelectItem>
                    <SelectItem value="presidential">Presidential - $850/night</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-[#6EC6CB] hover:bg-[#50b8bd]">Create Booking</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-[#b8d4d6] shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search bookings..."
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
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Checked-in">Checked-in</SelectItem>
                <SelectItem value="Checked-out">Checked-out</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.guestName}</TableCell>
                  <TableCell>{booking.room}</TableCell>
                  <TableCell>{booking.checkIn}</TableCell>
                  <TableCell>{booking.checkOut}</TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell>${booking.totalAmount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
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
