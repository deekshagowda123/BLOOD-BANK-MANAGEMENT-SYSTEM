# 🚀 QUICK START GUIDE

## 30-Second Setup

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Start MongoDB**
- Windows: Open Command Prompt and run `mongod`
- Mac: `brew services start mongodb-community`
- Or use MongoDB Atlas (Cloud)

### 3. **Start Server**
```bash
npm run dev
```

### 4. **Open Browser**
```
http://localhost:5000
```

---

## 📊 What You Get

### Features Ready to Use:

1. **🩸 Donor Management**
   - Register new donors
   - Track blood groups (O+, O-, A+, A-, B+, B-, AB+, AB-)
   - View donor details and history
   - Search donors by location or blood group

2. **🏥 Hospital Management**
   - Submit blood requests
   - Track request status
   - View available blood units

3. **📦 Blood Inventory**
   - Real-time inventory tracking
   - Low stock alerts (status: available/low/critical)
   - By blood group and location
   - Visual availability dashboard

4. **👥 User Management**
   - Admin, Donor, Hospital, User roles
   - User registration and login
   - Organization management

5. **📊 Dashboard & Analytics**
   - Key statistics and KPIs
   - Blood group availability
   - Donor statistics
   - Request fulfillment tracking

---

## 📁 Project Structure

```
blood-System/
├── server.js                 # Main app
│
├── models/                   # Database schemas
│   ├── Donor.js
│   ├── User.js
│   ├── BloodInventory.js
│   ├── BloodRequest.js
│   ├── DonationHistory.js
│   └── public/index.html     # GUI
│
├── routes/                   # API endpoints
│   ├── donorRoutes.js
│   ├── userRoutes.js
│   ├── inventoryRoutes.js
│   └── requestRoutes.js
│
├── config/                   # Configuration
│   └── db.js
│
├── package.json              # Dependencies
├── README.md                 # Full documentation
└── .env.example              # Configuration template
```

---

## 🔌 API Endpoints

### Donors
```
POST   /donors/add              - Register donor
GET    /donors                  - Get all donors
GET    /donors/search/:group    - Search by blood group
DELETE /donors/:id              - Delete donor
```

### Blood Inventory
```
POST   /inventory/add           - Add blood units
GET    /inventory               - View inventory
PUT    /inventory/:id/decrease  - Use blood
```

### Requests
```
POST   /requests/request        - Request blood
GET    /requests                - View requests
PUT    /requests/:id/approve    - Approve request
```

### Users
```
POST   /users/register          - Register user
POST   /users/login             - Login
GET    /users                   - List users
```

---

## 🎯 Getting Started

### Add First Donor
1. Go to **Register Donor**
2. Fill in:
   - Name: John Doe
   - Email: john@example.com
   - Age: 25
   - Blood Group: O+
   - Location: Mumbai
   - Contact: 9876543210
3. Click **Register Donor** ✅

### Add Blood Units
1. Go to **Blood Inventory**
2. Click **Add Blood Units**
3. Fill in:
   - Blood Group: O+
   - Units: 50
   - Location: Central Bank
   - Expiry: 2026-05-15
4. Click **Add Inventory** ✅

### Request Blood
1. Go to **Blood Requests**
2. Click **New Blood Request**
3. Fill in:
   - Patient Name: Jane Doe
   - Blood Group: O+
   - Units: 2
   - Hospital: City Hospital
4. Click **Submit Request** ✅

### View Dashboard
1. Click **Dashboard**
2. See:
   - Total Donors ✅
   - Blood Units Available ✅
   - Pending Requests ✅
   - Critical Blood Groups ⚠️
   - Blood Group Visualization 📊

---

## 🔧 System Requirements

- **Node.js**: v14+
- **MongoDB**: 4.0+
- **RAM**: 512MB+
- **Disk**: 500MB+
- **Browser**: Chrome/Firefox/Safari/Edge

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB error | Start MongoDB with `mongod` |
| Port 5000 in use | Change PORT in .env or kill the process |
| Blank page | Check browser console (F12), verify MongoDB is running |
| API errors 404 | Verify routes are imported in server.js |
| CORS errors | Check CORS middleware in server.js |

---

## 📝 Database Fields

### Donor
- Name, Email, Age (18-65), Blood Group
- Location, Contact, Gender, Weight (45+kg)
- Last Donation Date, Total Donations
- Is Active status

### User
- Name, Email, Password
- Phone, Role (admin/donor/hospital/user)
- Organization, Created Date

### Blood Inventory
- Blood Group, Units Available
- Location, Expiry Date
- Status (available/low/critical)
- Min Threshold, Last Updated

### Blood Request
- Patient Name, Blood Group, Units
- Hospital, Purpose
- Status (pending/fulfilled/rejected)
- Created Date, Fulfilled Date

---

## 🚀 Next Steps

1. ✅ Install & Start
2. ✅ Register test data
3. ✅ Test all features
4. ⏭️ Add more users
5. ⏭️ Generate reports
6. ⏭️ Deploy to production

---

## 📞 Support

Read full documentation in `README.md` for:
- Detailed setup
- All API endpoints
- Database schemas
- Security features
- Future enhancements

---

## ⚡ Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Install dependencies
npm install

# View documentation
open README.md
```

---

**🩸 Blood Bank System v1.0**
Ready to save lives! 💪
