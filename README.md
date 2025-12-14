# E-commerce REST API

A complete e-commerce backend API built with Node.js, Express, Sequelize, and MySQL.

## 🚀 Features

- **User Authentication**: JWT-based authentication with roles (admin/customer)
- **Product Management**: Full CRUD operations for products with image upload
- **Category System**: Hierarchical product categories
- **Shopping Cart**: Session-based cart functionality
- **Order Processing**: Complete order lifecycle management
- **Payment Integration**: Support for multiple payment methods
- **Soft Delete**: All models support soft deletion
- **RESTful API**: Clean, consistent REST endpoints
- **File Upload**: Product image upload with Multer
- **Security**: Helmet, CORS, input validation, rate limiting

## 📋 Prerequisites

- Node.js v14 or higher
- MySQL v5.7 or higher
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommerce-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Configure `.env` file**
```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ecommerce_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_DIALECT=mysql

# JWT
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5MB
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif

# Payment (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
```

5. **Create database**
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS ecommerce_db;"
```

6. **Run database migrations**
```bash
npm run db:sync
```

7. **Start the server**
```bash
# Development
npm run dev

# Production
npm start
```

## 📁 Project Structure

```
ecommerce-api/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.js   # Sequelize configuration
│   │   └── multer.js     # File upload configuration
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares
│   │   ├── auth.js       # Authentication middleware
│   │   ├── error.js      # Error handling middleware
│   │   └── validation.js # Request validation
│   ├── models/           # Sequelize models
│   │   ├── User.js       # User model
│   │   ├── Category.js   # Category model
│   │   ├── Product.js    # Product model
│   │   ├── ProductImage.js # Product image model
│   │   ├── Order.js      # Order model
│   │   ├── OrderItem.js  # Order item model
│   │   ├── Payment.js    # Payment model
│   │   └── index.js      # Models index
│   ├── routes/           # API routes
│   │   ├── auth.routes.js    # Authentication routes
│   │   ├── user.routes.js    # User routes
│   │   ├── category.routes.js # Category routes
│   │   ├── product.routes.js  # Product routes
│   │   ├── order.routes.js    # Order routes
│   │   ├── payment.routes.js  # Payment routes
│   │   ├── cart.routes.js     # Cart routes
│   │   └── index.js           # Routes index
│   ├── uploads/          # Uploaded files
│   ├── utils/            # Utility functions
│   │   ├── jwt.js        # JWT helper functions
│   │   └── validators.js # Validation schemas
│   └── server.js         # Application entry point
├── .env                  # Environment variables
├── .env.example          # Environment variables example
├── .gitignore           # Git ignore file
├── package.json         # Dependencies
└── README.md            # This file
```

## 🗄️ Database Schema

### User Model
```javascript
{
  id: UUID,               // Primary key
  first_name: STRING,     // User's first name
  last_name: STRING,      // User's last name
  email: STRING,          // Unique email address
  password: STRING,       // Hashed password
  role: ENUM,             // 'admin' or 'customer'
  phone_number: STRING,   // Contact number
  is_deleted: BOOLEAN,    // Soft delete flag
  deleted_at: DATE,       // Deletion timestamp
  created_at: DATE,       // Creation timestamp
  updated_at: DATE        // Update timestamp
}
```

### Category Model
```javascript
{
  id: UUID,
  name: STRING,           // Category name (unique)
  description: TEXT,      // Category description
  is_deleted: BOOLEAN,
  deleted_at: DATE,
  created_at: DATE,
  updated_at: DATE
}
```

### Product Model
```javascript
{
  id: UUID,
  name: STRING,           // Product name
  description: TEXT,      // Product description
  price: DECIMAL(10,2),   // Product price
  category_id: UUID,      // Foreign key to Category
  stock_quantity: INTEGER,// Available stock
  is_deleted: BOOLEAN,
  deleted_at: DATE,
  created_at: DATE,
  updated_at: DATE
}
```

### ProductImage Model
```javascript
{
  id: UUID,
  product_id: UUID,       // Foreign key to Product
  image_url: STRING,      // Image URL/path
  is_primary: BOOLEAN,    // Primary image flag
  is_deleted: BOOLEAN,
  deleted_at: DATE,
  created_at: DATE,
  updated_at: DATE
}
```

### Order Model
```javascript
{
  id: UUID,
  user_id: UUID,          // Foreign key to User
  total_price: DECIMAL(12,2), // Order total
  status: ENUM,           // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  is_deleted: BOOLEAN,
  deleted_at: DATE,
  created_at: DATE,
  updated_at: DATE
}
```

### OrderItem Model
```javascript
{
  id: UUID,
  order_id: UUID,         // Foreign key to Order
  product_id: UUID,       // Foreign key to Product
  quantity: INTEGER,      // Item quantity
  unit_price: DECIMAL(10,2), // Price at time of purchase
  subtotal_price: DECIMAL(10,2), // quantity * unit_price
  is_deleted: BOOLEAN,
  deleted_at: DATE,
  created_at: DATE,
  updated_at: DATE
}
```

### Payment Model
```javascript
{
  id: UUID,
  order_id: UUID,         // Foreign key to Order (unique)
  method: ENUM,           // 'credit_card', 'debit_card', 'paypal', 'bank_transfer'
  status: ENUM,           // 'pending', 'completed', 'cancelled'
  amount: DECIMAL(12,2),  // Payment amount
  transaction_id: STRING, // Payment gateway transaction ID
  receipt_url: STRING,    // Payment receipt URL
  is_deleted: BOOLEAN,
  deleted_at: DATE,
  created_at: DATE,
  updated_at: DATE
}
```

## 🔗 Relationships

```
User 1───┐ Order 1───┐ Payment
        │           │
        1───┐ OrderItem ───1 Product
            │           │
            1───┐ Category
                │
                1───┐ ProductImage
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| POST | `/api/auth/refresh` | Refresh token | Yes |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Get all users (admin) | Admin |
| GET | `/api/users/profile` | Get current user | Yes |
| GET | `/api/users/:id` | Get user by ID | Admin/Self |
| PUT | `/api/users/profile` | Update current user | Yes |

### Categories
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/categories` | Get all categories | No |
| GET | `/api/categories/:id` | Get category by ID | No |
| POST | `/api/categories` | Create category | Admin |
| PUT | `/api/categories/:id` | Update category | Admin |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/search` | Search products | No |
| GET | `/api/products/:id` | Get product by ID | No |
| POST | `/api/products` | Create product | Admin |
| POST | `/api/products/:id/images` | Upload product images | Admin |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/orders` | Get user's orders | Yes |
| GET | `/api/orders/:id` | Get order by ID | Yes |
| POST | `/api/orders` | Create order | Yes |
| PUT | `/api/orders/:id` | Update order status | Admin |

### Payments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/payments` | Create payment | Yes |
| GET | `/api/payments/:id` | Get payment by ID | Yes |
| POST | `/api/payments/webhook` | Payment webhook | No |

### Cart
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/cart` | Get cart items | Yes |
| POST | `/api/cart` | Add to cart | Yes |
| PUT | `/api/cart/:itemId` | Update cart item | Yes |
| DELETE | `/api/cart/:itemId` | Remove from cart | Yes |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

1. **Register** to get an account
2. **Login** to receive a token
3. Include token in headers for protected routes:
```
Authorization: Bearer <your-jwt-token>
```

## 📝 Request/Response Examples

### Register User
**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phone_number": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "role": "customer",
    "created_at": "2024-01-10T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Create Product (Admin)
**Request:**
```http
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones",
  "price": 129.99,
  "category_id": "550e8400-e29b-41d4-a716-446655440001",
  "stock_quantity": 50
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones",
    "price": 129.99,
    "category_id": "550e8400-e29b-41d4-a716-446655440001",
    "stock_quantity": 50,
    "created_at": "2024-01-10T10:30:00.000Z",
    "updated_at": "2024-01-10T10:30:00.000Z"
  }
}
```

## ⚙️ Configuration

### Database Sync Options
```javascript
// In config/database.js
sync: {
  force: false,    // Drops all tables and recreates (DANGEROUS!)
  alter: true,     // Alters tables to match models (safe for development)
  logging: console.log
}
```

### File Upload Configuration
```javascript
// In config/multer.js
const storage = multer.diskStorage({
  destination: './uploads/products',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});
```

## 🧪 Testing

Run tests with:
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Test with coverage
npm run test:coverage
```

## 🐛 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      "Email is required",
      "Password must be at least 8 characters"
    ]
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Request validation failed
- `AUTH_ERROR`: Authentication/authorization failed
- `NOT_FOUND`: Resource not found
- `DATABASE_ERROR`: Database operation failed
- `PAYMENT_ERROR`: Payment processing failed

## 🚀 Deployment

### 1. Prepare for Production
```bash
# Install production dependencies
npm install --production

# Set environment to production
NODE_ENV=production

# Update .env with production values
DB_HOST=production-db-host
JWT_SECRET=strong_secret_key_here
```

### 2. Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start src/server.js --name ecommerce-api

# Monitor application
pm2 monit

# Save process list
pm2 save
pm2 startup
```

### 3. Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "src/server.js"]
```

## 📊 Monitoring

### Health Check
```http
GET /api/health
```
Returns server and database status.

### Logs
- Application logs: `logs/app.log`
- Error logs: `logs/error.log`
- Access logs: `logs/access.log`

## 🔧 Available Scripts

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "db:sync": "node -e \"import('./src/config/database.js').then(db => db.syncDatabase({ alter: true }))\"",
    "db:reset": "node -e \"import('./src/config/database.js').then(db => db.syncDatabase({ force: true }))\"",
    "test": "jest",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  }
}
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🆘 Support

For support, email support@example.com or create an issue in the GitHub repository.

---

**Version**: 1.0.0  
**Last Updated**: January 2024
