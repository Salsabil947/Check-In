import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Plus, Users, DollarSign, Edit } from 'lucide-react';

const departmentsData = [
  { 
    id: 'D-001', 
    name: 'Front Desk', 
    manager: 'Emma Taylor',
    employees: 12,
    budget: 540000,
    description: 'Handles guest check-in, check-out, and customer service'
  },
  { 
    id: 'D-002', 
    name: 'Housekeeping', 
    manager: 'Bob Martinez',
    employees: 35,
    budget: 820000,
    description: 'Maintains cleanliness and orderliness of rooms and facilities'
  },
  { 
    id: 'D-003', 
    name: 'Restaurant & Bar', 
    manager: 'Carol White',
    employees: 28,
    budget: 980000,
    description: 'Food and beverage services for guests'
  },
  { 
    id: 'D-004', 
    name: 'Maintenance', 
    manager: 'Daniel Lee',
    employees: 18,
    budget: 450000,
    description: 'Repairs and maintenance of hotel facilities'
  },
  { 
    id: 'D-005', 
    name: 'Security', 
    manager: 'Frank Anderson',
    employees: 15,
    budget: 380000,
    description: 'Ensures safety and security of guests and property'
  },
  { 
    id: 'D-006', 
    name: 'Spa & Wellness', 
    manager: 'Grace Kim',
    employees: 12,
    budget: 320000,
    description: 'Spa treatments and wellness services'
  },
  { 
    id: 'D-007', 
    name: 'Events & Catering', 
    manager: 'Henry Rodriguez',
    employees: 20,
    budget: 650000,
    description: 'Manages events, conferences, and catering services'
  },
  { 
    id: 'D-008', 
    name: 'Human Resources', 
    manager: 'Isabel Chen',
    employees: 8,
    budget: 280000,
    description: 'Manages employee relations and recruitment'
  },
];

export function Departments() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Departments Management</h1>
          <p className="text-slate-500">Manage hotel departments and their operations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#6EC6CB] hover:bg-[#50b8bd]">
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="deptName">Department Name</Label>
                <Input id="deptName" placeholder="Front Desk" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Manager</Label>
                <Input id="manager" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Annual Budget</Label>
                <Input id="budget" type="number" placeholder="500000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description of department responsibilities" />
              </div>
              <Button className="w-full bg-[#6EC6CB] hover:bg-[#50b8bd]">Add Department</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Total Departments</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">8</p>
            <p className="text-slate-500">Active departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Total Staff</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">148</p>
            <p className="text-slate-500">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Total Budget</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">$4.42M</p>
            <p className="text-slate-500">Annual allocation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Avg. Team Size</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">18.5</p>
            <p className="text-slate-500">Employees per dept.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departmentsData.map((dept) => (
          <Card key={dept.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{dept.name}</CardTitle>
                  <p className="text-slate-500 mt-1">{dept.id}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">{dept.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Manager</span>
                  <span className="text-slate-900">{dept.manager}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Employees
                  </span>
                  <Badge className="bg-[#d1eced] text-[#50b8bd]">{dept.employees}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Annual Budget
                  </span>
                  <span className="text-slate-900">${dept.budget.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
