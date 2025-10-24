import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const employeesData = [
  { 
    id: 'E-001', 
    name: 'Alice Cooper', 
    email: 'alice.c@hotel.com',
    phone: '+1 234 567 8901',
    department: 'Front Desk',
    position: 'Receptionist',
    salary: 45000,
    status: 'Active',
    hireDate: '2023-01-15'
  },
  { 
    id: 'E-002', 
    name: 'Bob Martinez', 
    email: 'bob.m@hotel.com',
    phone: '+1 234 567 8902',
    department: 'Housekeeping',
    position: 'Supervisor',
    salary: 52000,
    status: 'Active',
    hireDate: '2022-06-20'
  },
  { 
    id: 'E-003', 
    name: 'Carol White', 
    email: 'carol.w@hotel.com',
    phone: '+1 234 567 8903',
    department: 'Restaurant',
    position: 'Chef',
    salary: 65000,
    status: 'Active',
    hireDate: '2021-03-10'
  },
  { 
    id: 'E-004', 
    name: 'Daniel Lee', 
    email: 'daniel.l@hotel.com',
    phone: '+1 234 567 8904',
    department: 'Maintenance',
    position: 'Technician',
    salary: 48000,
    status: 'Active',
    hireDate: '2023-07-01'
  },
  { 
    id: 'E-005', 
    name: 'Emma Taylor', 
    email: 'emma.t@hotel.com',
    phone: '+1 234 567 8905',
    department: 'Front Desk',
    position: 'Manager',
    salary: 72000,
    status: 'Active',
    hireDate: '2020-02-14'
  },
];

export function Employees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');

  const filteredEmployees = employeesData.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Employees Management</h1>
          <p className="text-slate-500">Manage hotel staff and workforce</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#6EC6CB] hover:bg-[#50b8bd]">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@hotel.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hireDate">Hire Date</Label>
                  <Input id="hireDate" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="front-desk">Front Desk</SelectItem>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Manager" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input id="salary" type="number" placeholder="50000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full bg-[#6EC6CB] hover:bg-[#50b8bd]">Add Employee</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-[#b8d4d6] shadow-md">
          <CardHeader>
            <h3 className="text-slate-900">Total Employees</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">156</p>
            <p className="text-slate-500">Active staff</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8d4d6] shadow-md">
          <CardHeader>
            <h3 className="text-slate-900">On Duty</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">89</p>
            <p className="text-slate-500">Currently working</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8d4d6] shadow-md">
          <CardHeader>
            <h3 className="text-slate-900">On Leave</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">12</p>
            <p className="text-slate-500">Taking time off</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8d4d6] shadow-md">
          <CardHeader>
            <h3 className="text-slate-900">Departments</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">8</p>
            <p className="text-slate-500">Active departments</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#b8d4d6] shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search employees..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Departments</SelectItem>
                <SelectItem value="Front Desk">Front Desk</SelectItem>
                <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                <SelectItem value="Restaurant">Restaurant</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>${employee.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700">{employee.status}</Badge>
                  </TableCell>
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
