# 🚀 create-backend-buddy

<div align="center">

![Version](https://img.shields.io/npm/v/create-backend-buddy?style=for-the-badge&color=00d4ff)
![Downloads](https://img.shields.io/npm/dm/create-backend-buddy?style=for-the-badge&color=00d4ff)
![License](https://img.shields.io/npm/l/create-backend-buddy?style=for-the-badge&color=00d4ff)
![Node](https://img.shields.io/node/v/create-backend-buddy?style=for-the-badge&color=00d4ff)

**🏗️ Scaffold a modern Node.js + Express backend in seconds**

*Your complete backend starter with ORM, database, security, logging, Swagger docs, and more*

[Quick Start](#-quick-start) • [Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🛡️ **Security First**
- **Helmet.js** - HTTP security headers
- **CORS** - Configurable cross-origin requests
- **Rate Limiting** - Prevent API abuse
- **Input Validation** - Built-in sanitization

### 🗄️ **Database Flexibility**
- **PostgreSQL** - Production-ready relational DB
- **MySQL** - Popular relational database
- **MongoDB** - NoSQL document database
- **SQLite** - Lightweight development DB

</td>
<td width="50%">

### 🧰 **Developer Experience**
- **TypeScript** - Full type safety support
- **Hot Reload** - Instant development feedback
- **Swagger UI** - Interactive API documentation
- **Structured Logging** - Pino-powered logging

### 🚢 **Production Ready**
- **Docker** - Containerized deployment
- **Environment Config** - Secure configuration
- **Error Handling** - Centralized error management
- **Git Integration** - Automatic repository setup

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Option 1: Global Installation
```bash
npm install -g create-backend-buddy
create-backend-buddy
```

### Option 2: NPX (Recommended)
```bash
npx create-backend-buddy
```

### 🎯 Interactive Setup
```bash
┌─────────────────────────────────────────┐
│                                         │
│   🚀 Welcome to Backend Buddy!         │
│                                         │
└─────────────────────────────────────────┘

✔ Project name: › my-awesome-api
✔ Language: › TypeScript
✔ ORM/ODM: › Prisma
✔ Database: › PostgreSQL
✔ Include Swagger docs? › Yes
✔ Include Docker support? › Yes
✔ Initialize Git repo? › Yes

🎉 Creating your backend...
```

### 🏃‍♂️ Launch Your Project
```bash
cd my-awesome-api
npm install
npm run dev
```

> 🎉 **That's it!** Your backend is running at `http://localhost:3000`

---

## 📦 Installation Options

<details>
<summary><b>🌍 Global Installation</b></summary>

```bash
# Install globally
npm install -g create-backend-buddy

# Use anywhere
create-backend-buddy my-project
```
</details>

<details>
<summary><b>⚡ NPX (No Installation)</b></summary>

```bash
# Use directly without installing
npx create-backend-buddy my-project

# Or run interactively
npx create-backend-buddy
```
</details>

<details>
<summary><b>🎛️ CLI Arguments</b></summary>

```bash
npx create-backend-buddy \
  --name my-api \
  --lang typescript \
  --orm prisma \
  --db postgres \
  --swagger \
  --docker \
  --git
```
</details>

---

## 🏗️ Project Structure

```
my-awesome-api/
├── 📁 src/
│   ├── 📁 controllers/          # Request handlers
│   │   └── 📁 prisma/          # ORM-specific controllers
│   ├── 📁 lib/                 # Database connections
│   ├── 📁 routes/              # API route definitions
│   │   └── user.route.js
│   ├── 📁 utils/               # Utility functions
│   │   ├── logger.js           # Pino logger setup
│   │   ├── ApiError.js         # Custom error class
│   │   └── responder.js        # Response formatter
│   ├── swagger.js              # Swagger configuration
│   └── index.js                # Application entry point
├── 📁 prisma/                  # Database schema (if Prisma)
│   └── schema.prisma
├── 📁 generated/               # Auto-generated files
├── 📁 logs/                    # Application logs
├── 🐳 docker-compose.yml       # Docker services
├── 🐳 Dockerfile              # Container definition
├── 📋 swagger.yaml            # API documentation
├── ⚙️ .env.example            # Environment template
├── 📦 package.json
└── 🙈 .gitignore
```

---

## 🛠️ Technology Stack

### **Core Framework**
| Technology | Purpose | Version |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | Runtime | 16+ |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | Web Framework | Latest |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) | Type Safety | Latest |

### **Database & ORM Options**
| ORM/ODM | Databases | Features |
|---------|-----------|----------|
| **Prisma** | PostgreSQL, MySQL, SQLite | Type-safe, Auto-migration |
| **Sequelize** | PostgreSQL, MySQL, SQLite | Feature-rich, Mature |
| **Mongoose** | MongoDB | Schema-based, ODM |

### **Security & Middleware**
- 🛡️ **Helmet** - Security headers
- 🌐 **CORS** - Cross-origin resource sharing
- ⏱️ **Rate Limiting** - API abuse prevention
- 📝 **Morgan** - HTTP request logging

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🔥 Start development server with hot reload |
| `npm run build` | 🏗️ Build TypeScript project |
| `npm start` | 🚀 Start production server |
| `npm run generate` | ⚙️ Generate Prisma client |
| `docker-compose up` | 🐳 Run with Docker containers |

---

## 📚 What's Included

### 🔐 **Security Middleware**
```javascript
// Automatic security setup
app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
```

### 📊 **Structured Logging**
```javascript
// Pino logger with file rotation
logger.info('Server started on port 3000');
logger.error('Database connection failed', { error });
```

### 🎯 **Error Handling**
```javascript
// Centralized error management
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

### 📖 **API Documentation**
- **Swagger UI** available at `/api/docs`
- **Interactive API explorer**
- **Automatic schema generation**

---

## 🚀 Quick Examples

### Creating a New Route
```javascript
// src/routes/posts.route.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(ApiResponse.success(posts));
  } catch (error) {
    res.status(500).json(ApiResponse.error(error.message));
  }
});

module.exports = router;
```

### Database Model (Prisma)
```prisma
// prisma/schema.prisma
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  name     String?
  posts    Post[]
  createdAt DateTime @default(now())
}
```

---

## 🌍 Environment Configuration

```bash
# .env.example
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"

# Security
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

---

## 🐳 Docker Support

### Quick Start with Docker
```bash
# Build and run
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

### Docker Configuration
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapi
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
```

---

## 🛣️ Roadmap

- [ ] 🔐 **Authentication Templates** - JWT, OAuth, Passport.js
- [ ] 🧪 **Testing Setup** - Jest, Supertest configurations
- [ ] 📊 **Monitoring** - Health checks, metrics endpoints
- [ ] 🔄 **CI/CD Templates** - GitHub Actions, GitLab CI
- [ ] 📦 **More ORMs** - TypeORM, Objection.js support
- [ ] ☁️ **Cloud Configs** - AWS, GCP, Azure deployment templates

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌟 **Star this project if it helped you!**

**Made with ❤️ by the Backend Buddy team**

[Report Bug](https://github.com/GarvGojariya/create-backend-buddy/issues) • [Request Feature](https://github.com/GarvGojariya/create-backend-buddy/issues) • [Documentation](https://docs.backend-buddy.dev)

</div>