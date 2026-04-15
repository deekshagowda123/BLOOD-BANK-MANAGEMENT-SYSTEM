# 🩸 Blood Bank Management System

A complete, professional blood bank management system with a modern GUI, user registration, donor management, blood inventory tracking, and blood request handling.

## Features

✅ **User Management**
- User registration with different roles (admin, donor, hospital, user)
- Secure login system
- Role-based access control

✅ **Donor Management**
- Register new donors with complete information
- Track donation history
- Search donors by blood group or location
- View donor statistics

✅ **Blood Inventory**
- Real-time blood inventory tracking
- Blood group availability display
- Low stock and critical level alerts
- Location-based inventory management

✅ **Blood Request Management**
- Submit blood requests from hospitals
- Track request status (pending, fulfilled, rejected)
- Request approval workflow
- Hospital management

✅ **Dashboard & Analytics**
- Real-time statistics and KPIs
- Blood group availability visualization
- Donor statistics
- Request fulfillment tracking
- Inventory value calculation

✅ **Professional UI**
- Responsive design (works on desktop, tablet, mobile)
- Modern gradient interface
- Easy-to-use navigation
- Data tables with search and filter
- Modal dialogs for forms

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request body parsing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (modern gradients, flexbox, grid)
- **JavaScript (Vanilla)** - Interactivity

## Project Structure

```
blood-System/
├── server.js                 # Main server file
├── package.json             # Dependencies
├── config/
│   └── db.js               # MongoDB connection
├── models/
│   ├── User.js             # User schema
│   ├── Donor.js            # Donor schema
│   ├── BloodInventory.js   # Inventory schema
│   ├── BloodRequest.js     # Request schema
│   ├── DonationHistory.js  # History schema
│   └── public/
│       └── index.html      # Main GUI
└── routes/
    ├── userRoutes.js       # User endpoints
    ├── donorRoutes.js      # Donor endpoints
    ├── inventoryRoutes.js  # Inventory endpoints
    └── requestRoutes.js    # Request endpoints
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Step 1: Clone/Extract Project
```bash
cd blood-System
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- express@5.2.1
- mongoose@9.4.1
- cors@2.8.6
- body-parser@2.2.2
- bcryptjs@2.4.3
- nodemon@3.0.1

### Step 3: Start MongoDB
Make sure MongoDB is running on `mongodb://127.0.0.1:27017`

**Windows:**
```bash
# If MongoDB is installed locally
mongod
```

**Or use MongoDB Atlas (Cloud):**
Update the connection string in `server.js`

### Step 4: Start the Server
```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

Output:
```
✅ MongoDB Connected
🩸 Blood Bank System running on http://localhost:5000
📊 Dashboard: http://localhost:5000
📡 API Base: http://localhost:5000
```

### Step 5: Open in Browser
Navigate to: `http://localhost:5000`

## API Endpoints

### Users
```
POST   /users/register          - Register new user
POST   /users/login             - User login
GET    /users                   - Get all users
GET    /users/:id              - Get user by ID
PUT    /users/:id              - Update user
DELETE /users/:id              - Delete user
```

### Donors
```
POST   /donors/add              - Register donor
GET    /donors                  - Get all donors
GET    /donors/search/:group    - Search by blood group
GET    /donors/location/:loc    - Search by location
GET    /donors/:id             - Get donor by ID
PUT    /donors/:id             - Update donor
DELETE /donors/:id             - Delete donor
```

### Blood Inventory
```
POST   /inventory/add           - Add blood units
GET    /inventory               - Get all inventory
GET    /inventory/group/:bg     - Get by blood group
GET    /inventory/status/critical - Get critical levels
PUT    /inventory/:id          - Update inventory
PUT    /inventory/:id/decrease - Decrease units
```

### Blood Requests
```
POST   /requests/request        - Submit blood request
GET    /requests                - Get all requests
GET    /requests/status/pending - Get pending requests
PUT    /requests/:id/approve    - Approve request
PUT    /requests/:id/reject     - Reject request
GET    /requests/:id           - Get request by ID
```

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String,
  phone: String,
  role: "admin" | "donor" | "hospital" | "user",
  organization: String,
  createdAt: Date
}
```

### Donor
```javascript
{
  name: String,
  email: String (unique),
  age: Number (18-65),
  bloodGroup: "O+" | "O-" | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-",
  location: String,
  contact: String,
  gender: "male" | "female" | "other",
  weight: Number (min 45kg),
  lastDonationDate: Date,
  totalDonations: Number,
  isActive: Boolean,
  createdAt: Date
}
```

### BloodInventory
```javascript
{
  bloodGroup: String,
  units: Number,
  location: String,
  expiryDate: Date,
  minThreshold: Number,
  status: "available" | "low" | "critical",
  lastUpdated: Date
}
```

### BloodRequest
```javascript
{
  requestedBy: ObjectId (User),
  bloodGroup: String,
  units: Number,
  hospital: String,
  patientName: String,
  purpose: String,
  status: "pending" | "fulfilled" | "rejected",
  createdAt: Date,
  fulfilledAt: Date
}
```

## Usage Guide

### Register a User
1. Go to **Users** section
2. Click **Add New User**
3. Fill in details (name, email, password, role, etc.)
4. Click **Add User**

### Register a Donor
1. Go to **Register Donor**
2. Fill in donor details:
   - Name, Email, Age, Weight
   - Blood Group, Gender
   - Location, Contact Number
3. Click **Register Donor**

### Manage Blood Inventory
1. Go to **Blood Inventory**
2. Click **Add Blood Units**
3. Select blood group, enter units, location, expiry date
4. System automatically updates status (available/low/critical)
5. View all inventory in table format
6. Visual grid shows blood group availability

### Request Blood
1. Go to **Blood Requests**
2. Click **New Blood Request**
3. Enter:
   - Patient name
   - Blood group needed
   - Number of units
   - Hospital name and purpose
4. Click **Submit Request**
5. Admin can approve or reject requests

### View Dashboard
- See key statistics:
  - Total donors
  - Total blood units
  - Pending requests
  - Critical blood groups
- Visual blood group grid showing availability
- Recent donors list

### Generate Reports
1. Go to **Reports & Analytics**
2. View key metrics:
   - Active donors
   - Total blood collected
   - Fulfilled requests
   - Inventory value
3. Click **Download Report** to export

## Security Features

⚠️ **Note:** This is a demo system. For production use:
1. Implement proper password hashing (bcryptjs is installed)
2. Add JWT authentication
3. Implement role-based access control
4. Use HTTPS/SSL
5. Add input validation & sanitization
6. Implement rate limiting
7. Add audit logging

## Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB Connection Error: connect ECONNREFUSED
```
**Solution:** Start MongoDB first or update connection string

### PORT 5000 Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000
# Kill process
taskkill /PID <PID> /F
```

### Routes Returning 404
- Ensure MongoDB is connected first
- Check API_URL in HTML matches server port
- Verify routes are imported in server.js

### CORS Errors
- Ensure CORS middleware is configured
- Check frontend URL matches allowed origins

## Future Enhancements

- [ ] Email notifications
- [ ] SMS alerts for critical blood levels
- [ ] Blood bank network integration
- [ ] Advanced analytics and reports
- [ ] Mobile app
- [ ] QR code tracking
- [ ] AI-powered blood demand prediction
- [ ] Payment integration for testing fees
- [ ] Real-time notifications
- [ ] Advanced user authentication (OAuth, 2FA)

## Support & Contact

For issues or questions:
1. Check MongoDB is running
2. Verify all dependencies are installed
3. Check browser console for errors (F12)
4. Review API endpoints documentation

## License

MIT License - Feel free to use and modify

---

**Created:** 2026
**Version:** 1.0.0

🩸 **Blood Bank Management System** - Making Blood Banking Easy
