# AgroConnect - Multi-Page Application

## 📁 Project Structure

This project has been restructured from a single-page application (SPA) to a traditional multi-page website for better organization and maintainability.

### File Organization

```
agro - Copy/
│
├── index.html              # Home/Landing page
├── farmer-dashboard.html   # Farmer dashboard page
├── buyer-dashboard.html    # Buyer dashboard page  
├── tracking.html          # Order tracking page
│
├── styles.css             # Global styles
├── script.js              # Interactive functionality
│
└── hero_farmer.png        # Hero section image
```

## 🗂️ Page Structure

### 1. **index.html** - Home Page
- Hero section with call-to-action buttons
- Features showcase
- How it works section
- Trust indicators/statistics
- Complete navigation and footer

### 2. **farmer-dashboard.html** - Farmer Portal
- Dashboard overview with stats
- Current market prices table
- Crop listings management
- Sidebar navigation
- Earnings tracking

### 3. **buyer-dashboard.html** - Buyer Portal
- Purchase statistics
- Browse fresh produce (card-based layout)
- Recent orders table
- Saved farmers list
- Sidebar navigation

### 4. **tracking.html** - Order Tracking
- Real-time order status
- Visual timeline of delivery progress
- Order details
- Contact driver functionality

## 🔗 Navigation

All pages now use **standard HTML hyperlinks** instead of JavaScript-based page switching:

```html
<!-- Example navigation -->
<a href="index.html">Home</a>
<a href="farmer-dashboard.html">Farmer Dashboard</a>
<a href="buyer-dashboard.html">Buyer Dashboard</a>
<a href="tracking.html">Track Orders</a>
```

## 🎨 Shared Components

Each page includes:
- **Navigation bar** - Consistent header across all pages
- **Footer** - Common footer with links and language selector
- **Same CSS** - All pages share `styles.css`
- **Same Scripts** - All pages use `script.js` for interactivity

## 🚀 Running the Application

Simply open any HTML file in a web browser:

1. **Development**: Open `index.html` in your browser
2. **Production**: Deploy all HTML, CSS, JS, and image files to a web server

## 💡 Key Benefits of Multi-Page Structure

✅ **Better Organization** - Each page has its own file  
✅ **Easier Maintenance** - Changes to one page don't affect others  
✅ **SEO Friendly** - Each page has unique meta tags and URLs  
✅ **Standard Navigation** - Browser back/forward buttons work naturally  
✅ **Scalability** - Easy to add new pages  
✅ **Team Collaboration** - Multiple developers can work on different pages  

## 🛠️ Development Notes

- The old `showPage()` function has been removed from `script.js`
- Navigation is now handled by the browser
- Each page independently includes navigation and footer HTML
- Active navigation states are set per page using the `active` class

## 📝 Future Improvements

Consider creating:
- **Shared components** using PHP includes or server-side templates
- **Component-based architecture** using frameworks like React/Vue
- **API integration** for dynamic data loading
- **Authentication system** for user login/logout
