import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const roomsData = [
  { id: 1, roomNumber: '101', type: 'Standard', floor: 1, status: 'Available', price: 150, capacity: 2 },
  { id: 2, roomNumber: '102', type: 'Standard', floor: 1, status: 'Occupied', price: 150, capacity: 2 },
  { id: 3, roomNumber: '201', type: 'Deluxe', floor: 2, status: 'Available', price: 250, capacity: 3 },
  { id: 4, roomNumber: '202', type: 'Deluxe', floor: 2, status: 'Maintenance', price: 250, capacity: 3 },
  { id: 5, roomNumber: '301', type: 'Suite', floor: 3, status: 'Available', price: 450, capacity: 4 },
  { id: 6, roomNumber: '302', type: 'Suite', floor: 3, status: 'Occupied', price: 450, capacity: 4 },
  { id: 7, roomNumber: '401', type: 'Presidential', floor: 4, status: 'Available', price: 850, capacity: 6 },
  { id: 8, roomNumber: '105', type: 'Standard', floor: 1, status: 'Available', price: 150, capacity: 2 },
  { id: 9, roomNumber: '203', type: 'Deluxe', floor: 2, status: 'Occupied', price: 250, capacity: 3 },
  { id: 10, roomNumber: '303', type: 'Suite', floor: 3, status: 'Available', price: 450, capacity: 4 },
];

export function Rooms() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredRooms = roomsData.filter(room => {
    const matchesSearch = room.roomNumber.includes(searchTerm) || room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || room.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-700';
      case 'Occupied':
        return 'bg-[#d1eced] text-[#50b8bd]';
      case 'Maintenance':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#30382F]">Rooms Management</h1>
          <p className="text-[#5a6158]">Manage hotel rooms and their availability</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#6EC6CB] hover:bg-[#50b8bd]">
              <Plus className="w-4 h-4 mr-2" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input id="roomNumber" placeholder="101" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Room Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="presidential">Presidential</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">Floor</Label>
                <Input id="floor" type="number" placeholder="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price per Night</Label>
                <Input id="price" type="number" placeholder="150" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" placeholder="2" />
              </div>
              <Button className="w-full bg-[#6EC6CB] hover:bg-[#50b8bd]">Add Room</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-[#b8d4d6] shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5a6158] w-4 h-4" />
              <Input
                placeholder="Search rooms..."
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
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price/Night</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                  </TableCell>
                  <TableCell>${room.price}</TableCell>
                  <TableCell>{room.capacity} guests</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
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
