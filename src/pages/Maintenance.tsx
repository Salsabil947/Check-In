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
import { Plus, Search, Eye, AlertCircle, Wrench } from 'lucide-react';

const maintenanceData = [
  { 
    id: 'MR-001', 
    room: '305', 
    issue: 'AC not working',
    description: 'Air conditioning unit not cooling properly',
    priority: 'High',
    status: 'In Progress',
    reportedBy: 'Sarah Johnson',
    assignedTo: 'Daniel Lee',
    reportDate: '2025-10-12',
    completionDate: null
  },
  { 
    id: 'MR-002', 
    room: '210', 
    issue: 'Leaking faucet',
    description: 'Bathroom sink faucet dripping continuously',
    priority: 'Medium',
    status: 'Pending',
    reportedBy: 'Housekeeping',
    assignedTo: null,
    reportDate: '2025-10-13',
    completionDate: null
  },
  { 
    id: 'MR-003', 
    room: '108', 
    issue: 'TV remote not working',
    description: 'TV remote control batteries dead',
    priority: 'Low',
    status: 'Pending',
    reportedBy: 'Guest',
    assignedTo: null,
    reportDate: '2025-10-13',
    completionDate: null
  },
  { 
    id: 'MR-004', 
    room: '402', 
    issue: 'Door lock malfunction',
    description: 'Electronic door lock not responding to key card',
    priority: 'High',
    status: 'In Progress',
    reportedBy: 'Front Desk',
    assignedTo: 'Daniel Lee',
    reportDate: '2025-10-13',
    completionDate: null
  },
  { 
    id: 'MR-005', 
    room: '203', 
    issue: 'Light bulb replacement',
    description: 'Multiple light bulbs need replacement',
    priority: 'Low',
    status: 'Completed',
    reportedBy: 'Housekeeping',
    assignedTo: 'Maintenance Team',
    reportDate: '2025-10-11',
    completionDate: '2025-10-12'
  },
];

export function Maintenance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredRequests = maintenanceData.filter(request => {
    const matchesSearch = 
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.room.includes(searchTerm) ||
      request.issue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'All' || request.priority === filterPriority;
    const matchesStatus = filterStatus === 'All' || request.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-orange-100 text-orange-700';
      case 'Low':
        return 'bg-[#d1eced] text-[#50b8bd]';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-[#d1eced] text-[#50b8bd]';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const pendingCount = maintenanceData.filter(r => r.status === 'Pending').length;
  const inProgressCount = maintenanceData.filter(r => r.status === 'In Progress').length;
  const highPriorityCount = maintenanceData.filter(r => r.priority === 'High' && r.status !== 'Completed').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Maintenance Requests</h1>
          <p className="text-slate-500">Manage maintenance issues and repairs</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#6EC6CB] hover:bg-[#50b8bd]">
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Maintenance Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="requestRoom">Room Number</Label>
                <Input id="requestRoom" placeholder="305" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issue">Issue Title</Label>
                <Input id="issue" placeholder="AC not working" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Detailed description of the issue..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportedBy">Reported By</Label>
                  <Input id="reportedBy" placeholder="Name or Department" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignTo">Assign To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daniel">Daniel Lee</SelectItem>
                    <SelectItem value="maintenance">Maintenance Team</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-[#6EC6CB] hover:bg-[#50b8bd]">Create Request</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Total Requests</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">67</p>
            <p className="text-slate-500">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Pending</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900 flex items-center gap-2">
              {pendingCount}
              <AlertCircle className="w-4 h-4 text-yellow-500" />
            </p>
            <p className="text-slate-500">Awaiting assignment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">In Progress</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900 flex items-center gap-2">
              {inProgressCount}
              <Wrench className="w-4 h-4 text-blue-500" />
            </p>
            <p className="text-slate-500">Being worked on</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">High Priority</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900 flex items-center gap-2">
              {highPriorityCount}
              <AlertCircle className="w-4 h-4 text-red-500" />
            </p>
            <p className="text-slate-500">Urgent issues</p>
          </CardContent>
        </Card>
      </div>

      {highPriorityCount > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-900">
                  {highPriorityCount} high priority maintenance {highPriorityCount === 1 ? 'request' : 'requests'} {highPriorityCount === 1 ? 'requires' : 'require'} immediate attention.
                </p>
                <p className="text-red-700 mt-1">Please address these issues as soon as possible.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search requests..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Report Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.room}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-slate-900">{request.issue}</p>
                      <p className="text-slate-500">{request.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  </TableCell>
                  <TableCell>{request.assignedTo || 'Unassigned'}</TableCell>
                  <TableCell>{request.reportDate}</TableCell>
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
