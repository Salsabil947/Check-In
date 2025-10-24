import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Plus, Search, Edit, Eye, Mail, Phone } from 'lucide-react';

const guestsData = [
  { 
    id: 'G-001', 
    name: 'John Smith', 
    email: 'john.smith@email.com',
    phone: '+1 234 567 8901',
    country: 'USA',
    totalBookings: 5,
    totalSpent: 4500,
    status: 'VIP'
  },
  { 
    id: 'G-002', 
    name: 'Sarah Johnson', 
    email: 'sarah.j@email.com',
    phone: '+1 234 567 8902',
    country: 'Canada',
    totalBookings: 3,
    totalSpent: 2250,
    status: 'Regular'
  },
  { 
    id: 'G-003', 
    name: 'Michael Brown', 
    email: 'michael.b@email.com',
    phone: '+44 123 456 789',
    country: 'UK',
    totalBookings: 8,
    totalSpent: 7800,
    status: 'VIP'
  },
  { 
    id: 'G-004', 
    name: 'Emily Davis', 
    email: 'emily.davis@email.com',
    phone: '+1 234 567 8903',
    country: 'USA',
    totalBookings: 2,
    totalSpent: 1200,
    status: 'Regular'
  },
  { 
    id: 'G-005', 
    name: 'David Wilson', 
    email: 'david.w@email.com',
    phone: '+61 123 456 789',
    country: 'Australia',
    totalBookings: 1,
    totalSpent: 850,
    status: 'New'
  },
];

export function Guests() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuests = guestsData.filter(guest => {
    const matchesSearch = 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP':
        return 'bg-purple-100 text-purple-700';
      case 'Regular':
        return 'bg-[#d1eced] text-[#50b8bd]';
      case 'New':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Guests Management</h1>
          <p className="text-slate-500">Manage guest information and history</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#6EC6CB] hover:bg-[#50b8bd]">
              <Plus className="w-4 h-4 mr-2" />
              Add Guest
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Guest</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 234 567 8900" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="USA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St, City, State" />
              </div>
              <Button className="w-full bg-[#6EC6CB] hover:bg-[#50b8bd]">Add Guest</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[#b8d4d6] shadow-md">
          <CardHeader>
            <h3 className="text-slate-900">Total Guests</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">1,247</p>
            <p className="text-slate-500">Active guests</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8d4d6] shadow-md">
          <CardHeader>
            <h3 className="text-slate-900">VIP Guests</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">89</p>
            <p className="text-slate-500">Premium members</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8d4d6] shadow-md">
          <CardHeader>
            <h3 className="text-slate-900">New This Month</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">42</p>
            <p className="text-slate-500">New registrations</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#b8d4d6] shadow-md">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search guests..."
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
                <TableHead>Guest ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.id}</TableCell>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-slate-600">
                        <Mail className="w-3 h-3" />
                        <span>{guest.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Phone className="w-3 h-3" />
                        <span>{guest.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{guest.country}</TableCell>
                  <TableCell>{guest.totalBookings}</TableCell>
                  <TableCell>${guest.totalSpent}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(guest.status)}>{guest.status}</Badge>
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
