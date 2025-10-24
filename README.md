# Hotel Management Dashboard

A complete hotel management dashboard built with pure HTML, CSS, and JavaScript. No build tools or frameworks required!

## Features

- ✅ **Dashboard Overview** - View key metrics, revenue charts, and recent activity
- ✅ **Rooms Management** - Manage hotel rooms, availability, and pricing
- ✅ **Bookings** - Handle reservations and bookings
- ✅ **Guests** - Manage guest information and profiles
- ✅ **Employees** - Staff management (placeholder)
- ✅ **Departments** - Department organization (placeholder)
- ✅ **Inventory** - Track supplies and inventory (placeholder)
- ✅ **Room Service** - Manage room service orders (placeholder)
- ✅ **Facilities** - Facility management (placeholder)
- ✅ **Maintenance** - Maintenance requests (placeholder)
- ✅ **Reviews** - Guest reviews and ratings (placeholder)
- ✅ **Payments** - Payment processing (placeholder)
- ✅ **Users** - User management (placeholder)
- ✅ **Reports** - Generate reports (placeholder)

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Tailwind CSS (pre-compiled) + custom styles
- **Vanilla JavaScript** - No frameworks, just pure JS
- **Chart.js** - Data visualization
- **Feather Icons** - Beautiful icon set

## Getting Started

### Method 1: Python HTTP Server (Recommended)

```bash
# Run the development server
python3 -m http.server 8000

# Or use npm script
npm run dev
```

Then open your browser to: `http://localhost:8000`

### Method 2: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Method 3: Direct File Access

Simply open `index.html` in your web browser. Note: Some features may not work due to CORS restrictions.

## Project Structure

```
/
├── index.html          # Main HTML file with app structure
├── app.js             # Application logic and page rendering
├── styles.css         # Custom CSS styles
├── src/
│   ├── index.css      # Tailwind CSS (pre-compiled)
│   ├── guidelines/    # Design guidelines
│   └── Attributions.md
├── package.json       # Project configuration
└── README.md          # This file
```

## Key Features

### Routing
- Hash-based routing (no page reloads)
- Navigate between pages smoothly

### Rooms Management
- Search and filter rooms
- Add/edit/delete rooms
- View room status (Available, Occupied, Maintenance)

### Dashboard
- Real-time statistics
- Revenue charts (Bar chart)
- Occupancy charts (Doughnut chart)
- Recent bookings and maintenance requests

### Responsive Design
- Mobile-friendly sidebar
- Responsive tables and cards
- Works on all screen sizes

## Customization

### Colors
The color scheme can be customized in `src/index.css` by modifying CSS variables:

```css
:root {
  --primary: #6ec6cb;      /* Primary teal color */
  --background: #e8f5f6;   /* Light background */
  --foreground: #30382f;   /* Dark text */
  /* ... */
}
```

### Adding New Pages

1. Add a new menu item in `app.js`:
```javascript
const menuItems = [
  // ...
  { icon: 'your-icon', label: 'Your Page', path: '/your-page' }
];
```

2. Create a render function:
```javascript
function renderYourPage() {
  return `<div>Your page content</div>`;
}
```

3. Add a case to the navigate() switch statement:
```javascript
case '/your-page':
  mainContent.innerHTML = renderYourPage();
  break;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this project for any purpose.

## Credits

- **Icons**: Feather Icons
- **Charts**: Chart.js
- **CSS Framework**: Tailwind CSS
