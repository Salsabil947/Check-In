import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Plus, Search, Edit, CalendarIcon, Dumbbell, Waves, UtensilsCrossed } from 'lucide-react';
import { format } from 'date-fns';

const facilitiesData = [
  { 
    id: 'F-001', 
    name: 'Swimming Pool', 
    type: 'Recreation',
    capacity: 50,
    operatingHours: '6:00 AM - 10:00 PM',
    status: 'Open',
    pricePerHour: 0
  },
  { 
    id: 'F-002', 
    name: 'Fitness Center', 
    type: 'Recreation',
    capacity: 30,
    operatingHours: '24/7',
    status: 'Open',
    pricePerHour: 0
  },
  { 
    id: 'F-003', 
    name: 'Conference Room A', 
    type: 'Business',
    capacity: 50,
    operatingHours: '8:00 AM - 8:00 PM',
    status: 'Open',
    pricePerHour: 150
  },
  { 
    id: 'F-004', 
    name: 'Spa & Wellness', 
    type: 'Wellness',
    capacity: 15,
    operatingHours: '9:00 AM - 9:00 PM',
    status: 'Open',
    pricePerHour: 120
  },
  { 
    id: 'F-005', 
    name: 'Restaurant', 
    type: 'Dining',
    capacity: 80,
    operatingHours: '7:00 AM - 11:00 PM',
    status: 'Open',
    pricePerHour: 0
  },
  { 
    id: 'F-006', 
    name: 'Banquet Hall', 
    type: 'Events',
    capacity: 200,
    operatingHours: 'By Reservation',
    status: 'Maintenance',
    pricePerHour: 500
  },
];

const bookingsData = [
  { 
    id: 'FB-001', 
    facility: 'Conference Room A',
    guestName: 'Tech Corp',
    date: '2025-10-15',
    startTime: '9:00 AM',
    endTime: '5:00 PM',
    status: 'Confirmed'
  },
  { 
    id: 'FB-002', 
    facility: 'Spa & Wellness',
    guestName: 'Sarah Johnson',
    date: '2025-10-14',
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    status: 'Confirmed'
  },
  { 
    id: 'FB-003', 
    facility: 'Banquet Hall',
    guestName: 'Wedding Party',
    date: '2025-10-20',
    startTime: '6:00 PM',
    endTime: '12:00 AM',
    status: 'Pending'
  },
];

export function Facilities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingDate, setBookingDate] = useState<Date>();

  const filteredFacilities = facilitiesData.filter(facility => {
    const matchesSearch = 
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-700';
      case 'Closed':
        return 'bg-red-100 text-red-700';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Facilities Management</h1>
          <p className="text-slate-500">Manage hotel facilities and bookings</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Facility
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Facility</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="facilityName">Facility Name</Label>
                  <Input id="facilityName" placeholder="Conference Room" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facilityType">Type</Label>
                  <Input id="facilityType" placeholder="Business, Recreation, etc." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricePerHour">Price/Hour</Label>
                    <Input id="pricePerHour" type="number" placeholder="150" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Operating Hours</Label>
                  <Input id="hours" placeholder="9:00 AM - 5:00 PM" />
                </div>
                <Button className="w-full bg-[#6EC6CB] hover:bg-[#50b8bd]">Add Facility</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#6EC6CB] hover:bg-[#50b8bd]">
                <CalendarIcon className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Facility Booking</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="bookingGuest">Guest/Organization Name</Label>
                  <Input id="bookingGuest" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facility">Facility</Label>
                  <Input id="facility" placeholder="Conference Room A" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingDate ? format(bookingDate, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={bookingDate} onSelect={setBookingDate} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Special requirements or notes..." />
                </div>
                <Button className="w-full bg-[#6EC6CB] hover:bg-[#50b8bd]">Create Booking</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Total Facilities</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">12</p>
            <p className="text-slate-500">Available facilities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Active Bookings</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">18</p>
            <p className="text-slate-500">Today's bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Revenue (MTD)</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">$12,450</p>
            <p className="text-slate-500">From bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Utilization</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">67%</p>
            <p className="text-slate-500">Average usage</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facilities</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search facilities..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Facility ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Operating Hours</TableHead>
                <TableHead>Price/Hour</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFacilities.map((facility) => (
                <TableRow key={facility.id}>
                  <TableCell>{facility.id}</TableCell>
                  <TableCell>{facility.name}</TableCell>
                  <TableCell>{facility.type}</TableCell>
                  <TableCell>{facility.capacity} people</TableCell>
                  <TableCell>{facility.operatingHours}</TableCell>
                  <TableCell>
                    {facility.pricePerHour === 0 ? 'Free' : `$${facility.pricePerHour}`}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(facility.status)}>{facility.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Guest/Organization</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingsData.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.facility}</TableCell>
                  <TableCell>{booking.guestName}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.startTime} - {booking.endTime}</TableCell>
                  <TableCell>
                    <Badge className={booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {booking.status}
                    </Badge>
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
