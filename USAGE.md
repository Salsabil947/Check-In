# Hotel Management Dashboard - Usage Guide

## Quick Start

### Option 1: Python Server (Easiest)

```bash
# Make the script executable (first time only)
chmod +x start.sh

# Run the server
./start.sh
```

Or manually:
```bash
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

### Option 2: Node.js Server

```bash
# Install a simple server
npm install -g http-server

# Run it
http-server -p 8000
```

### Option 3: PHP Server

```bash
php -S localhost:8000
```

### Option 4: Using NPM Script

```bash
npm run dev
```

## Features Overview

### 1. Dashboard (/)
- **Statistics Cards**: Total Rooms, Active Bookings, Total Guests, Revenue
- **Charts**: Revenue overview (bar chart) and Room occupancy (pie chart)
- **Recent Activity**: Recent bookings and maintenance requests

### 2. Rooms Management (/rooms)
- **Search**: Filter rooms by number or type
- **Filter**: Filter by status (Available, Occupied, Maintenance)
- **CRUD Operations**:
  - Add new rooms
  - Edit room details
  - Delete rooms
  - Update room status

### 3. Bookings (/bookings)
- View all bookings
- See booking details (guest, room, dates, status, amount)
- Create new bookings (button opens modal)

### 4. Guests (/guests)
- Guest directory
- View guest information (name, email, phone, nationality)
- Track guest visits and spending

### 5. Other Pages
- Employees, Departments, Inventory, Room Service, Facilities, Maintenance, Reviews, Payments, Users, Reports
- All have placeholder content ready for implementation

## Navigation

The app uses **hash-based routing**:
- Click on menu items in the sidebar
- URLs like `#/rooms`, `#/bookings`, etc.
- Browser back/forward buttons work
- Direct URL access works (e.g., `http://localhost:8000#/rooms`)

## Mobile Support

- Hamburger menu icon appears on mobile
- Click to open sidebar
- Click outside or on a link to close
- Fully responsive layout

## Data Management

Currently, all data is stored in JavaScript arrays in `app.js`:
- `roomsData` - Room information
- `bookingsData` - Booking records
- `guestsData` - Guest profiles

**Note**: Data resets on page reload. To persist data, you would need to:
1. Use `localStorage` for client-side persistence
2. Connect to a backend API
3. Use a database

## Customization

### Change Colors

Edit `src/index.css` (around line 2360):

```css
:root {
  --primary: #6ec6cb;        /* Change this */
  --background: #e8f5f6;     /* And this */
  --foreground: #30382f;     /* And this */
  /* ... more variables ... */
}
```

### Add a New Page

1. **Add menu item** in `app.js`:
```javascript
const menuItems = [
  // ... existing items
  { icon: 'settings', label: 'Settings', path: '/settings' }
];
```

2. **Create render function**:
```javascript
function renderSettings() {
  return `
    <div class="space-y-6">
      <div>
        <h1 class="text-[#30382F]">Settings</h1>
        <p class="text-[#5a6158]">Configure your settings</p>
      </div>
      <div class="card">
        <div class="card-content">
          <!-- Your content here -->
        </div>
      </div>
    </div>
  `;
}
```

3. **Add to router** in the `navigate()` function:
```javascript
case '/settings':
  mainContent.innerHTML = renderSettings();
  break;
```

### Modify the Table

Tables are in the page render functions. Example for rooms:

```javascript
// In renderRooms() function
<table>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
      <!-- Add more columns -->
    </tr>
  </thead>
  <tbody>
    ${data.map(item => `
      <tr>
        <td>${item.field1}</td>
        <td>${item.field2}</td>
      </tr>
    `).join('')}
  </tbody>
</table>
```

## Available Icons

Using [Feather Icons](https://feathericons.com/). Common icons:
- `home`, `calendar`, `users`, `user-check`, `briefcase`
- `package`, `coffee`, `activity`, `tool`, `star`
- `credit-card`, `bar-chart-2`, `plus`, `edit`, `trash-2`
- `search`, `eye`, `x`, `menu`, `check`, `alert-circle`

Usage:
```html
<i data-feather="icon-name"></i>
```

Don't forget to call `feather.replace()` after adding new icons dynamically!

## Chart Examples

The dashboard uses Chart.js. To add a new chart:

```javascript
// In your render function
<div class="chart-container">
  <canvas id="my-chart"></canvas>
</div>

// In your init function
function initMyPage() {
  const ctx = document.getElementById('my-chart');
  new Chart(ctx, {
    type: 'bar', // or 'line', 'pie', 'doughnut', etc.
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{
        label: 'My Data',
        data: [10, 20, 30],
        backgroundColor: '#6EC6CB'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
```

## Troubleshooting

### Icons not showing
- Check console for errors
- Make sure `feather.replace()` is called
- Verify icon names at https://feathericons.com/

### Charts not rendering
- Check if Chart.js is loaded
- Verify canvas element has correct ID
- Make sure init function is called after rendering

### Styles not applying
- Check if CSS files are loaded
- Verify file paths in `index.html`
- Check browser console for 404 errors

### Modal not working
- Verify `showModal()` and `closeModal()` functions
- Check if modal container exists
- Make sure form handlers are defined

## File Structure

```
/workspace/
├── index.html          # Main entry point
├── app.js             # All application logic
├── styles.css         # Custom CSS
├── start.sh           # Quick start script
├── package.json       # Project metadata
├── README.md          # Project overview
├── USAGE.md           # This file
└── src/
    ├── index.css      # Tailwind CSS (pre-compiled)
    ├── Attributions.md
    ├── guidelines/
    │   └── Guidelines.md
    └── styles/
        └── globals.css
```

## Next Steps

1. **Add Backend**: Connect to a REST API or database
2. **Authentication**: Add login/logout functionality
3. **Data Persistence**: Use localStorage or a database
4. **Validation**: Add form validation
5. **Error Handling**: Improve error messages
6. **Loading States**: Add loading indicators
7. **Animations**: Enhance with transitions
8. **Print Styles**: Add print-friendly CSS
9. **Dark Mode**: Implement theme switching
10. **Export Data**: Add CSV/PDF export features

## Support

For more information:
- [Feather Icons Documentation](https://feathericons.com/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Happy coding! 🏨**
