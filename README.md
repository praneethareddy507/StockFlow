

<div align="center">

# 🌿 StockFlow

### Less chaos. More control.

*A modern, minimal and intelligent inventory management system.*

![React](https://img.shields.io/badge/React-Frontend-A8C3A0?style=for-the-badge&logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-38664D?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-728F80?style=for-the-badge&logo=postgresql&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.x-E4D8C4?style=for-the-badge&logo=python&logoColor=black)

[🌱 Live Application](https://stock-flow-two-orpin.vercel.app) •
[📖 API Documentation](https://stockflow-8ppd.onrender.com/docs)

---

*Simplifying inventory, one product at a time.*

</div>

## 🌷 About StockFlow

StockFlow is a full-stack, multi-tenant inventory management application designed to help businesses organize products, monitor stock levels and manage their inventory efficiently.

Each organization has its own independent workspace, with authenticated access and organization-specific inventory data.

The application combines a minimal, responsive user interface with a structured REST API and a cloud-hosted PostgreSQL database.

---

## ✨ Features

### 🔐 Authentication & Security

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected API endpoints
- Organization-based data isolation

### 📦 Inventory Management

- Add new products
- View inventory
- Edit product details
- Delete products
- Search by product name or SKU
- Filter products by stock status
- Organization-specific unique SKUs

### 📊 Dashboard

- Total number of products
- Total available stock units
- Low-stock product count
- Low-stock product list
- Configurable product stock thresholds

### 🎨 User Experience

- Minimal sage-green and cream theme
- Responsive dashboard
- Interactive product forms
- Delete confirmation dialogs
- Loading indicators
- Success and error notifications
- Color-coded inventory status

---

## 🟢 Stock Status

| Status | Description |
|--------|-------------|
| 🟢 In Stock | Quantity is above the stock threshold |
| 🟠 Low Stock | Quantity is at or below the threshold |
| 🔴 Out of Stock | Available quantity is zero |

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Vite |
| Styling | CSS3, Lucide React |
| API Integration | Axios |
| Routing | React Router |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Migrations | Alembic |
| Validation | Pydantic |
| Authentication | JWT, bcrypt |
| API Documentation | Swagger UI |
| Version Control | Git, GitHub |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Database Hosting | Neon |

---

## 🧩 System Architecture

```mermaid
flowchart TD
    A[User] --> B[React Frontend]
    B --> C[Axios HTTP Client]
    C --> D[FastAPI Backend]
    D --> E[JWT Authentication]
    E --> F[Organization Scoped Routes]
    F --> G[SQLAlchemy ORM]
    G --> H[(Neon PostgreSQL)]

    style B fill:#DCE9D5,color:#233C32
    style D fill:#38664D,color:#FFFFFF
    style H fill:#E4D8C4,color:#233C32
```

The frontend communicates with the backend through REST APIs. FastAPI validates requests, authenticates users and restricts inventory operations to their respective organizations.

---

## 📂 Project Structure

```text
StockFlow/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── security.py
│   │   │   └── dependencies.py
│   │   │
│   │   ├── database/
│   │   │   └── database.py
│   │   │
│   │   ├── models/
│   │   │   ├── organization.py
│   │   │   ├── user.py
│   │   │   └── product.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── auth.py
│   │   │   └── product.py
│   │   │
│   │   ├── repositories/
│   │   │   ├── auth_repository.py
│   │   │   └── product_repository.py
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── product.py
│   │   │   └── dashboard.py
│   │   │
│   │   └── main.py
│   │
│   ├── alembic/
│   │   ├── versions/
│   │   └── env.py
│   │
│   ├── alembic.ini
│   ├── requirements.txt
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductTable.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Products.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   └── dashboardService.js
│   │   │
│   │   ├── styles/
│   │   │   └── global.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── .gitignore
│
└── README.md
```

---

## 🗃️ Database Design

```mermaid
erDiagram
    ORGANIZATIONS ||--o{ USERS : contains
    ORGANIZATIONS ||--o{ PRODUCTS : owns

    ORGANIZATIONS {
        int id PK
        string name
    }

    USERS {
        int id PK
        string name
        string email UK
        string hashed_password
        int organization_id FK
    }

    PRODUCTS {
        int id PK
        string name
        string sku
        int quantity
        float price
        int low_stock_threshold
        int organization_id FK
    }
```

### 🌱 Multi-Tenant Architecture

Every user belongs to an organization. Every product is associated with an organization through a foreign key.

Product operations are scoped to the authenticated user's organization.

A composite unique constraint on `organization_id` and `sku` prevents duplicate SKUs within the same organization while allowing different organizations to use identical SKUs.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a user and organization |
| POST | `/auth/login` | Authenticate and receive JWT |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/products/` | Create a product |
| GET | `/products/` | Retrieve all organization products |
| GET | `/products/{product_id}` | Retrieve a specific product |
| PUT | `/products/{product_id}` | Update product details |
| DELETE | `/products/{product_id}` | Delete a product |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/` | Retrieve inventory statistics |

Product and dashboard endpoints require a valid Bearer token.

---

## 🚀 Getting Started

### Prerequisites

- Python
- Node.js and npm
- PostgreSQL database
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/praneethareddy507/StockFlow.git
cd StockFlow
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=postgresql+psycopg://username:password@host/database
SECRET_KEY=your_secure_random_secret_key
```

Use your actual PostgreSQL connection URL and a securely generated JWT secret.

Never commit the `.env` file to GitHub.

### 4. Database Migrations

```bash
alembic upgrade head
```

### 5. Start the Backend

```bash
uvicorn app.main:app --reload
```

Backend:

http://127.0.0.1:8000

Swagger Documentation:

http://127.0.0.1:8000/docs

### 6. Frontend Setup

Open a new terminal from the project root.

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend directory.

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the frontend:

```bash
npm run dev
```

Open:

http://localhost:5173

---

## ☁️ Deployment

StockFlow is deployed using cloud-based hosting services.

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| PostgreSQL Database | Neon |

### 🌐 Live Links

- [StockFlow Application](https://stock-flow-two-orpin.vercel.app)
- [Backend API](https://stockflow-8ppd.onrender.com)
- [Swagger Documentation](https://stockflow-8ppd.onrender.com/docs)

> The backend uses a free Render instance. The first request after inactivity may take longer because the service needs to wake up.

---

## 🧪 Testing

| Test Case | Status |
|-----------|--------|
| User Registration | ✅ Tested |
| User Login | ✅ Tested |
| Dashboard Loading | ✅ Tested |
| Product Creation | ✅ Tested |
| Product Update | ✅ Tested |
| Low Stock Detection | ✅ Tested |
| Duplicate SKU Validation | ✅ Tested |
| Product Deletion | ⏳ Final verification pending |
| Cross-Organization Access | ⏳ Final verification pending |

Testing is performed manually using Swagger UI and the deployed frontend.

---

## 🔒 Security Practices

- Passwords are hashed using bcrypt.
- JWT tokens authenticate protected requests.
- Product queries are scoped by organization.
- Request data is validated using Pydantic.
- Sensitive credentials are stored in environment variables.
- CORS is configured for the frontend application.
- Database constraints prevent duplicate organization-specific SKUs.

---

## 🌸 Future Enhancements

- Role-based access control
- Stock movement history
- Supplier management
- Purchase order management
- CSV and Excel export
- Email notifications for low stock
- Advanced inventory analytics
- Refresh token support
- Automated API testing
- Inventory activity logs

---

## 💚 Author

**J. Praneetha**

Computer Science & Artificial Intelligence

Aspiring Software Developer | Python | FastAPI | Full-Stack Development

[GitHub Profile](https://github.com/praneethareddy507)

---

<div align="center">

### 🌿 StockFlow

*Small details. Smarter inventory. Better business.*

Made with 💚, Python and a little bit of creativity.

⭐ Star this repository if you find it interesting!

</div>
