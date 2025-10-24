// Hotel Management Dashboard - Main Application

// Navigation menu items
const menuItems = [
    { icon: 'layout', label: 'Dashboard', path: '/' },
    { icon: 'home', label: 'Rooms', path: '/rooms' },
    { icon: 'calendar', label: 'Bookings', path: '/bookings' },
    { icon: 'users', label: 'Guests', path: '/guests' },
    { icon: 'user-check', label: 'Employees', path: '/employees' },
    { icon: 'briefcase', label: 'Departments', path: '/departments' },
    { icon: 'package', label: 'Inventory', path: '/inventory' },
    { icon: 'coffee', label: 'Room Service', path: '/room-service' },
    { icon: 'activity', label: 'Facilities', path: '/facilities' },
    { icon: 'tool', label: 'Maintenance', path: '/maintenance' },
    { icon: 'star', label: 'Reviews', path: '/reviews' },
    { icon: 'credit-card', label: 'Payments', path: '/payments' },
    { icon: 'user', label: 'Users', path: '/users' },
    { icon: 'bar-chart-2', label: 'Reports', path: '/reports' }
];

// Current page state
let currentPage = '/';

// Initialize app
function initApp() {
    renderNavigation();
    setupRouting();
    navigate(window.location.hash.slice(1) || '/');
    feather.replace();
}

// Render navigation menu
function renderNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    
    const navHTML = menuItems.map(item => `
        <li>
            <a href="#${item.path}" 
               class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-slate-300 hover:bg-white/10 hover:text-white ${currentPage === item.path ? 'bg-[#6EC6CB] text-white' : ''}"
               data-page="${item.path}">
                <i data-feather="${item.icon}" class="w-5 h-5"></i>
                <span>${item.label}</span>
            </a>
        </li>
    `).join('');
    
    navMenu.innerHTML = navHTML;
    mobileNavMenu.innerHTML = navHTML;
}

// Setup routing
function setupRouting() {
    window.addEventListener('hashchange', () => {
        const path = window.location.hash.slice(1) || '/';
        navigate(path);
    });
    
    // Close mobile sidebar on navigation
    document.addEventListener('click', (e) => {
        if (e.target.closest('a[data-page]')) {
            const mobileSidebar = document.getElementById('mobile-sidebar');
            mobileSidebar.classList.add('hidden');
        }
    });
}

// Navigate to page
function navigate(path) {
    currentPage = path;
    renderNavigation();
    
    // Update active state
    document.querySelectorAll('a[data-page]').forEach(link => {
        const linkPath = link.getAttribute('data-page');
        if (linkPath === path) {
            link.classList.add('bg-[#6EC6CB]', 'text-white');
            link.classList.remove('text-slate-300');
        } else {
            link.classList.remove('bg-[#6EC6CB]', 'text-white');
            link.classList.add('text-slate-300');
        }
    });
    
    // Render page content
    const mainContent = document.getElementById('main-content');
    
    switch(path) {
        case '/':
            mainContent.innerHTML = renderDashboard();
            initDashboardCharts();
            break;
        case '/rooms':
            mainContent.innerHTML = renderRooms();
            initRoomsPage();
            break;
        case '/bookings':
            mainContent.innerHTML = renderBookings();
            initBookingsPage();
            break;
        case '/guests':
            mainContent.innerHTML = renderGuests();
            initGuestsPage();
            break;
        case '/employees':
            mainContent.innerHTML = renderEmployees();
            break;
        case '/departments':
            mainContent.innerHTML = renderDepartments();
            break;
        case '/inventory':
            mainContent.innerHTML = renderInventory();
            break;
        case '/room-service':
            mainContent.innerHTML = renderRoomService();
            break;
        case '/facilities':
            mainContent.innerHTML = renderFacilities();
            break;
        case '/maintenance':
            mainContent.innerHTML = renderMaintenance();
            break;
        case '/reviews':
            mainContent.innerHTML = renderReviews();
            break;
        case '/payments':
            mainContent.innerHTML = renderPayments();
            break;
        case '/users':
            mainContent.innerHTML = renderUsers();
            break;
        case '/reports':
            mainContent.innerHTML = renderReports();
            break;
        default:
            mainContent.innerHTML = '<div class="text-center p-8"><h1>Page Not Found</h1></div>';
    }
    
    feather.replace();
}

// Toggle mobile sidebar
function toggleMobileSidebar() {
    const mobileSidebar = document.getElementById('mobile-sidebar');
    mobileSidebar.classList.toggle('hidden');
}

// ===== DASHBOARD PAGE =====
function renderDashboard() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-[#30382F] mb-2">Dashboard Overview</h1>
                <p class="text-[#5a6158]">Welcome back! Here's what's happening today.</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="card">
                    <div class="card-header flex flex-row items-center justify-between pb-2">
                        <div class="card-title">Total Rooms</div>
                        <i data-feather="home" class="w-5 h-5 text-[#6EC6CB]"></i>
                    </div>
                    <div class="card-content">
                        <div class="stat-value">150</div>
                        <p class="text-[#5a6158] flex items-center gap-1">
                            <span class="text-[#6EC6CB] flex items-center">
                                <i data-feather="trending-up" class="w-4 h-4"></i>
                                68%
                            </span>
                            occupancy rate
                        </p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header flex flex-row items-center justify-between pb-2">
                        <div class="card-title">Active Bookings</div>
                        <i data-feather="calendar" class="w-5 h-5 text-[#6EC6CB]"></i>
                    </div>
                    <div class="card-content">
                        <div class="stat-value">102</div>
                        <p class="text-[#5a6158] flex items-center gap-1">
                            <span class="text-[#6EC6CB] flex items-center">
                                <i data-feather="trending-up" class="w-4 h-4"></i>
                                12%
                            </span>
                            from last month
                        </p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header flex flex-row items-center justify-between pb-2">
                        <div class="card-title">Total Guests</div>
                        <i data-feather="users" class="w-5 h-5 text-[#6EC6CB]"></i>
                    </div>
                    <div class="card-content">
                        <div class="stat-value">1,247</div>
                        <p class="text-[#5a6158] flex items-center gap-1">
                            <span class="text-[#6EC6CB] flex items-center">
                                <i data-feather="trending-up" class="w-4 h-4"></i>
                                8%
                            </span>
                            from last month
                        </p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header flex flex-row items-center justify-between pb-2">
                        <div class="card-title">Revenue (MTD)</div>
                        <i data-feather="dollar-sign" class="w-5 h-5 text-[#6EC6CB]"></i>
                    </div>
                    <div class="card-content">
                        <div class="stat-value">$67,340</div>
                        <p class="text-[#5a6158] flex items-center gap-1">
                            <span class="text-[#6EC6CB] flex items-center">
                                <i data-feather="trending-up" class="w-4 h-4"></i>
                                15%
                            </span>
                            from last month
                        </p>
                    </div>
                </div>
            </div>

            <!-- Charts -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 card">
                    <div class="card-header">
                        <div class="card-title">Revenue Overview</div>
                    </div>
                    <div class="card-content">
                        <div class="chart-container">
                            <canvas id="revenue-chart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Room Occupancy</div>
                    </div>
                    <div class="card-content">
                        <div class="chart-container">
                            <canvas id="occupancy-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Recent Bookings</div>
                    </div>
                    <div class="card-content">
                        <div class="space-y-4">
                            ${getRecentBookings().map(booking => `
                                <div class="flex items-center justify-between p-3 bg-[#f0f9fa] rounded-lg border border-[#b8d4d6]">
                                    <div>
                                        <p class="text-[#30382F] font-medium">${booking.guest}</p>
                                        <p class="text-[#5a6158] text-sm">Room ${booking.room} • ${booking.checkIn}</p>
                                    </div>
                                    <span class="badge ${booking.status === 'Confirmed' ? 'badge-blue' : 'badge-yellow'}">
                                        ${booking.status}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Maintenance Requests</div>
                    </div>
                    <div class="card-content">
                        <div class="space-y-4">
                            ${getMaintenanceRequests().map(request => `
                                <div class="flex items-center justify-between p-3 bg-[#f0f9fa] rounded-lg border border-[#b8d4d6]">
                                    <div class="flex-1">
                                        <p class="text-[#30382F] font-medium">Room ${request.room}</p>
                                        <p class="text-[#5a6158] text-sm">${request.issue}</p>
                                    </div>
                                    <span class="badge ${request.priority === 'High' ? 'badge-red' : request.priority === 'Medium' ? 'badge-yellow' : 'badge-blue'}">
                                        ${request.priority}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initDashboardCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenue-chart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: [45000, 52000, 48000, 61000, 55000, 67000],
                    backgroundColor: '#6EC6CB',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Occupancy Chart
    const occupancyCtx = document.getElementById('occupancy-chart');
    if (occupancyCtx) {
        new Chart(occupancyCtx, {
            type: 'doughnut',
            data: {
                labels: ['Occupied', 'Available'],
                datasets: [{
                    data: [68, 32],
                    backgroundColor: ['#6EC6CB', '#e2e8f0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Data functions
function getRecentBookings() {
    return [
        { id: 'BK-001', guest: 'John Smith', room: '201', checkIn: '2025-10-14', status: 'Confirmed' },
        { id: 'BK-002', guest: 'Sarah Johnson', room: '305', checkIn: '2025-10-15', status: 'Pending' },
        { id: 'BK-003', guest: 'Michael Brown', room: '102', checkIn: '2025-10-14', status: 'Confirmed' },
        { id: 'BK-004', guest: 'Emily Davis', room: '408', checkIn: '2025-10-16', status: 'Confirmed' }
    ];
}

function getMaintenanceRequests() {
    return [
        { id: 'MR-001', room: '305', issue: 'AC not working', priority: 'High', status: 'In Progress' },
        { id: 'MR-002', room: '210', issue: 'Leaking faucet', priority: 'Medium', status: 'Pending' },
        { id: 'MR-003', room: '108', issue: 'TV remote not working', priority: 'Low', status: 'Pending' }
    ];
}

// ===== ROOMS PAGE =====
let roomsData = [
    { id: 1, roomNumber: '101', type: 'Standard', floor: 1, status: 'Available', price: 150, capacity: 2 },
    { id: 2, roomNumber: '102', type: 'Standard', floor: 1, status: 'Occupied', price: 150, capacity: 2 },
    { id: 3, roomNumber: '201', type: 'Deluxe', floor: 2, status: 'Available', price: 250, capacity: 3 },
    { id: 4, roomNumber: '202', type: 'Deluxe', floor: 2, status: 'Maintenance', price: 250, capacity: 3 },
    { id: 5, roomNumber: '301', type: 'Suite', floor: 3, status: 'Available', price: 450, capacity: 4 },
    { id: 6, roomNumber: '302', type: 'Suite', floor: 3, status: 'Occupied', price: 450, capacity: 4 },
    { id: 7, roomNumber: '401', type: 'Presidential', floor: 4, status: 'Available', price: 850, capacity: 6 },
    { id: 8, roomNumber: '105', type: 'Standard', floor: 1, status: 'Available', price: 150, capacity: 2 },
    { id: 9, roomNumber: '203', type: 'Deluxe', floor: 2, status: 'Occupied', price: 250, capacity: 3 },
    { id: 10, roomNumber: '303', type: 'Suite', floor: 3, status: 'Available', price: 450, capacity: 4 }
];

let roomSearchTerm = '';
let roomFilterStatus = 'All';

function renderRooms() {
    return `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-[#30382F]">Rooms Management</h1>
                    <p class="text-[#5a6158]">Manage hotel rooms and their availability</p>
                </div>
                <button onclick="showAddRoomModal()" class="btn btn-primary">
                    <i data-feather="plus" class="w-4 h-4 mr-2"></i>
                    Add Room
                </button>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <div class="relative flex-1">
                            <i data-feather="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5a6158] w-4 h-4"></i>
                            <input type="text" 
                                   id="room-search" 
                                   placeholder="Search rooms..." 
                                   class="input pl-10" 
                                   value="${roomSearchTerm}"
                                   onkeyup="handleRoomSearch(this.value)">
                        </div>
                        <select id="room-filter" 
                                class="select w-full sm:w-48" 
                                onchange="handleRoomFilter(this.value)">
                            <option value="All" ${roomFilterStatus === 'All' ? 'selected' : ''}>All Status</option>
                            <option value="Available" ${roomFilterStatus === 'Available' ? 'selected' : ''}>Available</option>
                            <option value="Occupied" ${roomFilterStatus === 'Occupied' ? 'selected' : ''}>Occupied</option>
                            <option value="Maintenance" ${roomFilterStatus === 'Maintenance' ? 'selected' : ''}>Maintenance</option>
                        </select>
                    </div>
                </div>
                <div class="card-content">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Room Number</th>
                                    <th>Type</th>
                                    <th>Floor</th>
                                    <th>Status</th>
                                    <th>Price/Night</th>
                                    <th>Capacity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="rooms-table-body">
                                ${renderRoomsTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderRoomsTable() {
    const filteredRooms = roomsData.filter(room => {
        const matchesSearch = room.roomNumber.includes(roomSearchTerm) || 
                             room.type.toLowerCase().includes(roomSearchTerm.toLowerCase());
        const matchesStatus = roomFilterStatus === 'All' || room.status === roomFilterStatus;
        return matchesSearch && matchesStatus;
    });

    return filteredRooms.map(room => `
        <tr>
            <td>${room.roomNumber}</td>
            <td>${room.type}</td>
            <td>${room.floor}</td>
            <td>
                <span class="badge ${getStatusBadgeClass(room.status)}">${room.status}</span>
            </td>
            <td>$${room.price}</td>
            <td>${room.capacity} guests</td>
            <td>
                <div class="flex gap-2">
                    <button class="btn btn-ghost btn-icon" onclick="editRoom(${room.id})">
                        <i data-feather="edit" class="w-4 h-4"></i>
                    </button>
                    <button class="btn btn-ghost btn-icon" onclick="deleteRoom(${room.id})">
                        <i data-feather="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getStatusBadgeClass(status) {
    switch(status) {
        case 'Available':
            return 'badge-green';
        case 'Occupied':
            return 'badge-blue';
        case 'Maintenance':
            return 'badge-red';
        default:
            return 'badge-slate';
    }
}

function initRoomsPage() {
    // Initialize search/filter handlers
}

function handleRoomSearch(value) {
    roomSearchTerm = value;
    const tbody = document.getElementById('rooms-table-body');
    tbody.innerHTML = renderRoomsTable();
    feather.replace();
}

function handleRoomFilter(value) {
    roomFilterStatus = value;
    const tbody = document.getElementById('rooms-table-body');
    tbody.innerHTML = renderRoomsTable();
    feather.replace();
}

function showAddRoomModal() {
    showModal('Add New Room', `
        <form onsubmit="handleAddRoom(event)" class="space-y-4">
            <div class="space-y-2">
                <label class="label">Room Number</label>
                <input type="text" name="roomNumber" class="input" placeholder="101" required>
            </div>
            <div class="space-y-2">
                <label class="label">Room Type</label>
                <select name="type" class="select" required>
                    <option value="">Select type</option>
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Presidential">Presidential</option>
                </select>
            </div>
            <div class="space-y-2">
                <label class="label">Floor</label>
                <input type="number" name="floor" class="input" placeholder="1" required>
            </div>
            <div class="space-y-2">
                <label class="label">Price per Night</label>
                <input type="number" name="price" class="input" placeholder="150" required>
            </div>
            <div class="space-y-2">
                <label class="label">Capacity</label>
                <input type="number" name="capacity" class="input" placeholder="2" required>
            </div>
            <button type="submit" class="btn btn-primary w-full">Add Room</button>
        </form>
    `);
}

function handleAddRoom(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newRoom = {
        id: roomsData.length + 1,
        roomNumber: formData.get('roomNumber'),
        type: formData.get('type'),
        floor: parseInt(formData.get('floor')),
        status: 'Available',
        price: parseInt(formData.get('price')),
        capacity: parseInt(formData.get('capacity'))
    };
    roomsData.push(newRoom);
    closeModal();
    navigate('/rooms');
}

function editRoom(id) {
    const room = roomsData.find(r => r.id === id);
    if (!room) return;
    
    showModal('Edit Room', `
        <form onsubmit="handleEditRoom(event, ${id})" class="space-y-4">
            <div class="space-y-2">
                <label class="label">Room Number</label>
                <input type="text" name="roomNumber" class="input" value="${room.roomNumber}" required>
            </div>
            <div class="space-y-2">
                <label class="label">Room Type</label>
                <select name="type" class="select" required>
                    <option value="Standard" ${room.type === 'Standard' ? 'selected' : ''}>Standard</option>
                    <option value="Deluxe" ${room.type === 'Deluxe' ? 'selected' : ''}>Deluxe</option>
                    <option value="Suite" ${room.type === 'Suite' ? 'selected' : ''}>Suite</option>
                    <option value="Presidential" ${room.type === 'Presidential' ? 'selected' : ''}>Presidential</option>
                </select>
            </div>
            <div class="space-y-2">
                <label class="label">Floor</label>
                <input type="number" name="floor" class="input" value="${room.floor}" required>
            </div>
            <div class="space-y-2">
                <label class="label">Status</label>
                <select name="status" class="select" required>
                    <option value="Available" ${room.status === 'Available' ? 'selected' : ''}>Available</option>
                    <option value="Occupied" ${room.status === 'Occupied' ? 'selected' : ''}>Occupied</option>
                    <option value="Maintenance" ${room.status === 'Maintenance' ? 'selected' : ''}>Maintenance</option>
                </select>
            </div>
            <div class="space-y-2">
                <label class="label">Price per Night</label>
                <input type="number" name="price" class="input" value="${room.price}" required>
            </div>
            <div class="space-y-2">
                <label class="label">Capacity</label>
                <input type="number" name="capacity" class="input" value="${room.capacity}" required>
            </div>
            <button type="submit" class="btn btn-primary w-full">Save Changes</button>
        </form>
    `);
}

function handleEditRoom(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const roomIndex = roomsData.findIndex(r => r.id === id);
    if (roomIndex !== -1) {
        roomsData[roomIndex] = {
            ...roomsData[roomIndex],
            roomNumber: formData.get('roomNumber'),
            type: formData.get('type'),
            floor: parseInt(formData.get('floor')),
            status: formData.get('status'),
            price: parseInt(formData.get('price')),
            capacity: parseInt(formData.get('capacity'))
        };
    }
    closeModal();
    navigate('/rooms');
}

function deleteRoom(id) {
    if (confirm('Are you sure you want to delete this room?')) {
        roomsData = roomsData.filter(r => r.id !== id);
        navigate('/rooms');
    }
}

// ===== BOOKINGS PAGE =====
let bookingsData = [
    { id: 1, bookingId: 'BK-001', guest: 'John Smith', room: '201', checkIn: '2025-10-14', checkOut: '2025-10-18', status: 'Confirmed', amount: 1000 },
    { id: 2, bookingId: 'BK-002', guest: 'Sarah Johnson', room: '305', checkIn: '2025-10-15', checkOut: '2025-10-20', status: 'Pending', amount: 1800 },
    { id: 3, bookingId: 'BK-003', guest: 'Michael Brown', room: '102', checkIn: '2025-10-14', checkOut: '2025-10-16', status: 'Confirmed', amount: 600 },
    { id: 4, bookingId: 'BK-004', guest: 'Emily Davis', room: '408', checkIn: '2025-10-16', checkOut: '2025-10-22', status: 'Confirmed', amount: 3400 },
    { id: 5, bookingId: 'BK-005', guest: 'David Wilson', room: '301', checkIn: '2025-10-17', checkOut: '2025-10-19', status: 'Cancelled', amount: 900 }
];

function renderBookings() {
    return `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-[#30382F]">Bookings Management</h1>
                    <p class="text-[#5a6158]">Manage hotel bookings and reservations</p>
                </div>
                <button onclick="showAddBookingModal()" class="btn btn-primary">
                    <i data-feather="plus" class="w-4 h-4 mr-2"></i>
                    New Booking
                </button>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <div class="relative flex-1">
                            <i data-feather="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5a6158] w-4 h-4"></i>
                            <input type="text" placeholder="Search bookings..." class="input pl-10">
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Guest</th>
                                    <th>Room</th>
                                    <th>Check-in</th>
                                    <th>Check-out</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${bookingsData.map(booking => `
                                    <tr>
                                        <td>${booking.bookingId}</td>
                                        <td>${booking.guest}</td>
                                        <td>${booking.room}</td>
                                        <td>${booking.checkIn}</td>
                                        <td>${booking.checkOut}</td>
                                        <td>
                                            <span class="badge ${getBookingStatusBadgeClass(booking.status)}">${booking.status}</span>
                                        </td>
                                        <td>$${booking.amount}</td>
                                        <td>
                                            <div class="flex gap-2">
                                                <button class="btn btn-ghost btn-icon">
                                                    <i data-feather="eye" class="w-4 h-4"></i>
                                                </button>
                                                <button class="btn btn-ghost btn-icon">
                                                    <i data-feather="edit" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getBookingStatusBadgeClass(status) {
    switch(status) {
        case 'Confirmed':
            return 'badge-green';
        case 'Pending':
            return 'badge-yellow';
        case 'Cancelled':
            return 'badge-red';
        case 'Completed':
            return 'badge-blue';
        default:
            return 'badge-slate';
    }
}

function initBookingsPage() {}

function showAddBookingModal() {
    showModal('New Booking', `
        <form class="space-y-4">
            <div class="space-y-2">
                <label class="label">Guest Name</label>
                <input type="text" class="input" required>
            </div>
            <div class="space-y-2">
                <label class="label">Room</label>
                <select class="select" required>
                    <option value="">Select room</option>
                    ${roomsData.filter(r => r.status === 'Available').map(r => `
                        <option value="${r.roomNumber}">${r.roomNumber} - ${r.type}</option>
                    `).join('')}
                </select>
            </div>
            <div class="space-y-2">
                <label class="label">Check-in Date</label>
                <input type="date" class="input" required>
            </div>
            <div class="space-y-2">
                <label class="label">Check-out Date</label>
                <input type="date" class="input" required>
            </div>
            <button type="submit" class="btn btn-primary w-full">Create Booking</button>
        </form>
    `);
}

// ===== GUESTS PAGE =====
let guestsData = [
    { id: 1, name: 'John Smith', email: 'john.smith@email.com', phone: '+1-234-567-8901', nationality: 'USA', visits: 3, spent: 4500 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1-234-567-8902', nationality: 'UK', visits: 1, spent: 1800 },
    { id: 3, name: 'Michael Brown', email: 'michael.b@email.com', phone: '+1-234-567-8903', nationality: 'Canada', visits: 5, spent: 7200 },
    { id: 4, name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1-234-567-8904', nationality: 'Australia', visits: 2, spent: 3900 },
    { id: 5, name: 'David Wilson', email: 'david.w@email.com', phone: '+1-234-567-8905', nationality: 'USA', visits: 1, spent: 900 }
];

function renderGuests() {
    return `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-[#30382F]">Guests Management</h1>
                    <p class="text-[#5a6158]">Manage guest information and profiles</p>
                </div>
                <button onclick="showAddGuestModal()" class="btn btn-primary">
                    <i data-feather="plus" class="w-4 h-4 mr-2"></i>
                    Add Guest
                </button>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="relative">
                        <i data-feather="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5a6158] w-4 h-4"></i>
                        <input type="text" placeholder="Search guests..." class="input pl-10">
                    </div>
                </div>
                <div class="card-content">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Nationality</th>
                                    <th>Visits</th>
                                    <th>Total Spent</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${guestsData.map(guest => `
                                    <tr>
                                        <td>${guest.name}</td>
                                        <td>${guest.email}</td>
                                        <td>${guest.phone}</td>
                                        <td>${guest.nationality}</td>
                                        <td>${guest.visits}</td>
                                        <td>$${guest.spent.toLocaleString()}</td>
                                        <td>
                                            <div class="flex gap-2">
                                                <button class="btn btn-ghost btn-icon">
                                                    <i data-feather="eye" class="w-4 h-4"></i>
                                                </button>
                                                <button class="btn btn-ghost btn-icon">
                                                    <i data-feather="edit" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initGuestsPage() {}

function showAddGuestModal() {
    showModal('Add New Guest', `
        <form class="space-y-4">
            <div class="space-y-2">
                <label class="label">Full Name</label>
                <input type="text" class="input" required>
            </div>
            <div class="space-y-2">
                <label class="label">Email</label>
                <input type="email" class="input" required>
            </div>
            <div class="space-y-2">
                <label class="label">Phone</label>
                <input type="tel" class="input" required>
            </div>
            <div class="space-y-2">
                <label class="label">Nationality</label>
                <input type="text" class="input" required>
            </div>
            <button type="submit" class="btn btn-primary w-full">Add Guest</button>
        </form>
    `);
}

// ===== EMPLOYEES PAGE =====
function renderEmployees() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-[#30382F]">Employees Management</h1>
                <p class="text-[#5a6158]">Manage hotel staff and employees</p>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="text-[#5a6158] text-center py-8">Employee management content coming soon...</p>
                </div>
            </div>
        </div>
    `;
}

// ===== OTHER PAGES (Placeholder) =====
function renderDepartments() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-[#30382F]">Departments</h1>
                <p class="text-[#5a6158]">Manage hotel departments</p>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="text-[#5a6158] text-center py-8">Departments content coming soon...</p>
                </div>
            </div>
        </div>
    `;
}

function renderInventory() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-[#30382F]">Inventory Management</h1>
                <p class="text-[#5a6158]">Manage hotel inventory and supplies</p>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="text-[#5a6158] text-center py-8">Inventory content coming soon...</p>
                </div>
            </div>
        </div>
    `;
}

function renderRoomService() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-[#30382F]">Room Service</h1>
                <p class="text-[#5a6158]">Manage room service orders</p>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="text-[#5a6158] text-center py-8">Room service content coming soon...</p>
                </div>
            </div>
        </div>
    `;
}

function renderFacilities() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-[#30382F]">Facilities</h1>
                <p class="text-[#5a6158]">Manage hotel facilities</p>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="text-[#5a6158] text-center py-8">Facilities content coming soon...</p>
                </div>
            </div>
        </div>
    `;
}

function renderMaintenance() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-[#30382F]">Maintenance</h1>
                <p class="text-[#5a6158]">Manage maintenance requests</p>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="text-[#5a6158] text-center py-8">Maintenance content coming soon...</p>
                </div>
            </div>
        </div>
    `;
}

function renderReviews() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-[#30382F]">Reviews</h1>
                <p class="text-[#5a6158]">Manage guest reviews and ratings</p>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="text-[#5a6158] text-center py-8">Reviews content coming soon...</p>
                </div>
            </div>
        </div>
    `;
}

function renderPayments() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-[#30382F]">Payments</h1>
                <p class="text-[#5a6158]">Manage payments and transactions</p>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="text-[#5a6158] text-center py-8">Payments content coming soon...</p>
                </div>
            </div>
        </div>
    `;
}

function renderUsers() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-[#30382F]">Users</h1>
                <p class="text-[#5a6158]">Manage system users and permissions</p>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="text-[#5a6158] text-center py-8">Users content coming soon...</p>
                </div>
            </div>
        </div>
    `;
}

function renderReports() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-[#30382F]">Reports</h1>
                <p class="text-[#5a6158]">View and generate reports</p>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="text-[#5a6158] text-center py-8">Reports content coming soon...</p>
                </div>
            </div>
        </div>
    `;
}

// ===== MODAL UTILITIES =====
function showModal(title, content) {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                    <h2 class="modal-title">${title}</h2>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
    feather.replace();
}

function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
