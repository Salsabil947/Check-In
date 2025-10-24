import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { DashboardLayout } from './components/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Rooms } from './pages/Rooms';
import { Bookings } from './pages/Bookings';
import { Guests } from './pages/Guests';
import { Employees } from './pages/Employees';
import { Departments } from './pages/Departments';
import { Inventory } from './pages/Inventory';
import { RoomService } from './pages/RoomService';
import { Facilities } from './pages/Facilities';
import { Maintenance } from './pages/Maintenance';
import { Reviews } from './pages/Reviews';
import { Payments } from './pages/Payments';
import { Users } from './pages/Users';
import { Reports } from './pages/Reports';

export default function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/room-service" element={<RoomService />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </DashboardLayout>
      <Toaster />
    </Router>
  );
}
