StockFlow — Inventory Management System
StockFlow is a full-stack, multi-tenant inventory management application designed to help organizations manage products, track stock levels and identify low-stock items through a centralized dashboard. Each organization has its own inventory workspace, with authenticated API access scoped to that organization.
  
Live Demo
Resource	Link
Web application	StockFlow
Backend API	Render
API documentation	Swagger UI
Repository	GitHub


Create your own account to explore the application. The free backend instance may take additional time to respond after inactivity.
Features
- User registration with automatic organization creation.
- Secure password hashing using bcrypt and JWT-based authentication.
- Organization-scoped product creation, retrieval, updating and deletion.
- Unique SKU constraint within each organization.
- Inventory search by product name or SKU and stock-status filtering.
- Dashboard displaying total products, total stock units and low-stock products.
- Configurable low-stock threshold for each product (default: 5).
- Non-negative quantity, price and threshold validation.
- Responsive React interface, protected routes and logout.
- Interactive REST API documentation with Swagger UI.
Technology Stack
Layer	Technologies
Frontend	React, Vite, JavaScript, CSS, Axios, React Router, Lucide React
Backend	Python, FastAPI, Uvicorn, Pydantic
Database	PostgreSQL, Neon, psycopg
ORM and migrations	SQLAlchemy, Alembic
Authentication	JWT, python-jose, Passlib, bcrypt
Deployment	Vercel (frontend), Render (backend), Neon (database)
Version control	Git, GitHub


System Architecture
```mermaid
flowchart TD
    U[User / Browser] --> F[React frontend - Vercel]
    F -->|HTTPS REST API + Bearer token| B[FastAPI backend - Render]
    B --> A[Authentication and organization authorization]
    A --> R[Product and dashboard logic]
    R -->|SQLAlchemy / psycopg| D[(PostgreSQL - Neon)]
```
The frontend communicates with FastAPI through Axios. The backend validates JWTs, identifies the authenticated user and scopes inventory operations to the user's organization. CORS permits the configured frontend origins.
Project Structure
StockFlow/
├── backend/
│   ├── alembic/
│   │   ├── versions/
│   │   └── env.py
│   ├── app/
│   │   ├── core/
│   │   │   ├── security.py
│   │   │   └── dependencies.py
│   │   ├── database/
│   │   │   └── database.py
│   │   ├── models/
│   │   │   ├── organization.py
│   │   │   ├── user.py
│   │   │   └── product.py
│   │   ├── repositories/
│   │   │   ├── auth_repository.py
│   │   │   └── product_repository.py
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── product.py
│   │   │   └── dashboard.py
│   │   ├── schemas/
│   │   │   ├── auth.py
│   │   │   └── product.py
│   │   └── main.py
│   ├── alembic.ini
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductTable.jsx
│   │   ├── context/AuthContext.jsx
│   │   ├── layouts/DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Products.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   └── dashboardService.js
│   │   ├── styles/global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
└── README.md
Key files shown; generated files and package caches omitted.
Database Design
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
The composite unique constraint on (organization_id, sku) prevents duplicate SKUs in one workspace while allowing the same SKU in different organizations. Low stock is defined as quantity <= low_stock_threshold.
REST API Endpoints
Method	Endpoint	Authentication	Description
GET	/	No	API welcome endpoint
POST	/auth/signup	No	Create user and organization
POST	/auth/login	No	Obtain JWT access token
GET	/products/	Yes	List organization products
POST	/products/	Yes	Create product
GET	/products/{product_id}	Yes	Retrieve product
PUT	/products/{product_id}	Yes	Update product
DELETE	/products/{product_id}	Yes	Delete product
GET	/dashboard/	Yes	Retrieve inventory summary and low-stock list


Protected endpoints require Authorization: Bearer <access_token>.
Example product request
{
  "name": "Wireless Mouse",
  "sku": "WM-001",
  "quantity": 25,
  "price": 599,
  "low_stock_threshold": 5
}
Example dashboard response
{
  "total_products": 1,
  "total_quantity": 25,
  "low_stock_count": 0,
  "low_stock_products": []
}
Local Installation
Prerequisites
- Python 3.10 or newer (compatible with installed dependencies)
- Node.js 22.12+ on the Node 22 release line, or a newer supported LTS release
- Git and a PostgreSQL database (local or Neon)
1. Clone the repository
git clone https://github.com/praneethareddy507/StockFlow.git
cd StockFlow
2. Set up the backend
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
On Linux/macOS, activate with source .venv/bin/activate instead.

Create backend/.env with your own values:
DATABASE_URL=postgresql+psycopg://USERNAME:PASSWORD@HOST:5432/DATABASE
SECRET_KEY=REPLACE_WITH_A_RANDOM_SECRET
For Neon, use its connection string with the postgresql+psycopg:// scheme and required SSL parameters. Generate a secret using python -c "import secrets; print(secrets.token_urlsafe(48))". Never commit actual secrets.
python -m alembic upgrade head
python -m uvicorn app.main:app --reload
Local Swagger UI: http://127.0.0.1:8000/docs
3. Set up the frontend
Open a separate terminal in the repository root:
cd frontend
npm ci
Create frontend/.env:
VITE_API_URL=http://127.0.0.1:8000
npm run dev
Open http://localhost:5173. To verify the production build, run npm run build.
Deployment Configuration
Backend — Render
- Root directory: backend
- Build command: pip install -r requirements.txt
- Start command: alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT
- Environment variables: DATABASE_URL, SECRET_KEY
Frontend — Vercel
- Root directory: frontend
- Framework preset: Vite
- Build command: npm run build
- Output directory: dist
- Environment variable: VITE_API_URL=https://stockflow-8ppd.onrender.com
The frontend's vercel.json configures SPA routing. The backend CORS allowlist must include https://stock-flow-two-orpin.vercel.app without a trailing slash or page path. Redeploy after changing environment variables or backend configuration.
Testing and Validation
Test case	Current status
Production frontend build	Passed
Live signup, login and dashboard	Passed in manual testing
Product creation and update	Passed in manual testing
Low-stock dashboard alert	Passed in manual testing
Duplicate SKU rejection	Passed in manual testing
Product deletion, search and filtering	Pending confirmation
Negative quantity and price rejection	Pending confirmation
Cross-organization API access rejection	Pending confirmation
Logout, protected routes and direct page refresh	Pending confirmation
Fresh database migration and automated tests	Pending verification


To test tenant isolation, create two separate accounts, add a product in the first workspace, and confirm it is absent from the second workspace. Using the second account's token, direct GET, PUT and DELETE requests for the first workspace's product should return 404. The same SKU should be permitted in both organizations.
Security and Current Limitations
- Passwords are hashed; JWT access tokens expire after 60 minutes.
- Inventory queries are scoped to the authenticated user's organization.
- Database credentials and signing keys must be stored in server-side environment variables.
- The MVP stores access tokens in browser local storage; stronger session handling and token refresh are future improvements.
- Free hosting can introduce cold-start latency.
- Advanced roles, warehouse management, purchase orders, suppliers, billing and external integrations are outside the MVP scope.
Future Enhancements
- Automated API and integration tests.
- Improved session expiry handling and refresh-token flow.
- Organization-level default stock threshold and user invitations.
- Inventory movement history and reporting.
Author
J. Praneetha — GitHub

Built as a full-stack software development assessment project.
