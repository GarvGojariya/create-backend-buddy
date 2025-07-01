# 🤝 Contributing to create-backend-buddy

<div align="center">

![Contributors](https://img.shields.io/github/contributors/yourusername/create-backend-buddy?style=for-the-badge&color=ff6b6b)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)
![License](https://img.shields.io/github/license/yourusername/create-backend-buddy?style=for-the-badge&color=blue)

**Thank you for your interest in contributing! 🎉**

*Help us build the best backend scaffolding tool for the Node.js ecosystem*

[Getting Started](#-getting-started) • [Development Setup](#-development-setup) • [Contribution Guidelines](#-contribution-guidelines) • [Code of Conduct](#-code-of-conduct)

</div>

---

## 🎯 Vision

**create-backend-buddy** aims to be the most comprehensive and user-friendly CLI tool for scaffolding production-ready Node.js backends. We want developers to go from idea to deployed API in minutes, not hours.

---

## 🚀 Ways to Contribute

<table>
<tr>
<td width="50%">

### 🔧 **Code Contributions**
- 🗄️ Add support for new ORMs/databases
- 📝 Improve Swagger scaffolding
- 🛡️ Enhance security middleware
- 🎨 Better CLI UX and prompts
- 🧪 Add testing utilities
- 📊 Implement monitoring features

</td>
<td width="50%">

### 📚 **Non-Code Contributions**
- 📖 Improve documentation
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 🎓 Create tutorials and guides
- 🌐 Translate documentation
- 💬 Help with community support

</td>
</tr>
</table>

---

## 🏗️ Project Architecture

```
create-backend-buddy/
├── 📁 bin/                     # CLI entry point
│   └── index.js
├── 📁 lib/                     # Core library functions
│   ├── generators/             # Template generators
│   ├── prompts/               # CLI prompts and validations
│   ├── utils/                 # Utility functions
│   └── validators/            # Input validation
├── 📁 templates/              # Project templates
│   ├── 📁 base/               # Base project structure
│   │   ├── 📁 javascript/     # JS-specific templates
│   │   └── 📁 typescript/     # TS-specific templates
│   ├── 📁 orm/                # ORM-specific templates
│   │   ├── 📁 prisma/         # Prisma templates
│   │   ├── 📁 sequelize/      # Sequelize templates
│   │   └── 📁 mongoose/       # Mongoose templates
│   ├── 📁 docker/             # Docker configurations
│   ├── 📁 swagger/            # API documentation
│   └── 📁 security/           # Security middleware
├── 📁 tests/                  # Test suites
├── 📁 docs/                   # Documentation
└── 📁 examples/               # Example projects
```

---

## 🛠️ Development Setup

### Prerequisites
- **Node.js** 16.0.0 or higher
- **npm** 7.0.0 or higher
- **Git** for version control

### 1. Fork & Clone
```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/create-backend-buddy.git
cd create-backend-buddy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Link CLI Locally
```bash
# Link the CLI to test your changes globally
npm link

# Now you can test the CLI anywhere
create-backend-buddy --version
```

### 4. Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### 5. Start Development
```bash
# Start development with file watching
npm run dev

# Test the CLI with your changes
create-backend-buddy
```

---

## 🎨 Development Workflow

### 📝 **Making Changes**

1. **Create a Branch**
   ```bash
   git checkout -b feature/awesome-new-feature
   ```

2. **Make Your Changes**
   - Write clean, documented code
   - Follow the existing code style
   - Add tests for new functionality

3. **Test Your Changes**
   ```bash
   # Test the CLI locally
   create-backend-buddy --help
   
   # Create a test project
   mkdir test-project && cd test-project
   create-backend-buddy
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add support for MongoDB with Mongoose"
   ```

### 🔄 **Commit Message Format**

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or modifying tests
- `chore` - Maintenance tasks

**Examples:**
```bash
feat: add TypeORM support for PostgreSQL
fix: resolve template generation issue with Windows paths
docs: update installation instructions
test: add unit tests for CLI prompts
```

---

## 🧪 Testing Guidelines

### **Unit Tests**
```bash
# Test individual functions
npm run test:unit

# Example test structure
describe('Template Generator', () => {
  it('should generate Prisma template correctly', () => {
    // Test implementation
  });
});
```

### **Integration Tests**
```bash
# Test CLI end-to-end
npm run test:integration

# Test full project generation
npm run test:scaffold
```

### **Manual Testing Checklist**
- [ ] CLI prompts work correctly
- [ ] Generated projects install dependencies
- [ ] Generated servers start without errors
- [ ] All selected features are included
- [ ] Docker setup works (if selected)
- [ ] Swagger docs are accessible

---

## 📋 Contribution Guidelines

### **🎯 Feature Requests**

Before implementing a new feature:

1. **Check existing issues** - Someone might already be working on it
2. **Open a discussion** - Describe your idea and get feedback
3. **Create an issue** - Document the feature requirements
4. **Start implementation** - After getting approval

### **🐛 Bug Reports**

When reporting bugs, please include:

- **Environment details** (OS, Node.js version, npm version)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Error messages** and stack traces
- **Generated project** (if applicable)

### **📝 Documentation**

- Keep documentation up-to-date with code changes
- Use clear, concise language
- Include code examples where helpful
- Test all documentation examples

---

## 🎨 Code Style Guidelines

### **JavaScript/TypeScript**
```javascript
// Use meaningful variable names
const databaseConnection = await createConnection();

// Use async/await over promises
async function generateTemplate(options) {
  try {
    const result = await templateGenerator.create(options);
    return result;
  } catch (error) {
    logger.error('Template generation failed', { error });
    throw error;
  }
}

// Use JSDoc for function documentation
/**
 * Generates a new backend project from template
 * @param {Object} options - Generation options
 * @param {string} options.name - Project name
 * @param {string} options.orm - ORM choice
 * @returns {Promise<void>}
 */
```

### **File Organization**
- Keep functions small and focused
- Use meaningful file and folder names
- Group related functionality together
- Separate concerns (generation, validation, prompts)

---

## 🔍 Review Process

### **Pull Request Checklist**

Before submitting your PR, ensure:

- [ ] **Code follows style guidelines**
- [ ] **All tests pass** (`npm test`)
- [ ] **Documentation is updated**
- [ ] **Commit messages follow convention**
- [ ] **No breaking changes** (or clearly documented)
- [ ] **PR description is clear and detailed**

### **PR Template**
```markdown
## 📝 Description
Brief description of changes

## 🎯 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing
- [ ] Added unit tests
- [ ] Added integration tests
- [ ] Manual testing completed

## 📋 Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

---

## 🌟 Recognition

### **Contributors Wall**
All contributors are recognized in our [Contributors](https://github.com/yourusername/create-backend-buddy/graphs/contributors) page.

### **Special Thanks**
- 🥇 **Top Contributors** - Monthly recognition
- 🎖️ **Feature Champions** - Major feature contributions
- 📚 **Documentation Heroes** - Significant doc improvements
- 🐛 **Bug Hunters** - Critical bug fixes

---

## 📞 Getting Help

### **Community Channels**
- 💬 **Discord** - [Join our community](https://discord.gg/backend-buddy)
- 🐦 **Twitter** - [@BackendBuddy](https://twitter.com/backendbuddy)
- 📧 **Email** - contribute@backend-buddy.dev

### **Maintainer Contact**
- **Lead Maintainer**: [@YourUsername](https://github.com/yourusername)
- **Response Time**: Usually within 24-48 hours

---

## 📜 Code of Conduct

### **Our Pledge**
We are committed to making participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### **Our Standards**
**Positive behaviors:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behaviors:**
- Harassment, trolling, or discriminatory comments
- Personal attacks or political arguments
- Publishing private information without permission
- Any conduct that could be considered inappropriate

### **Enforcement**
Report any unacceptable behavior to [conduct@backend-buddy.dev](mailto:conduct@backend-buddy.dev). All reports will be reviewed and investigated.

---

## 🗺️ Roadmap Priorities

### **🔥 High Priority**
- [ ] **Authentication Templates** - JWT, OAuth2, Passport.js
- [ ] **Testing Setup** - Jest, Mocha, Supertest configurations
- [ ] **TypeORM Support** - Additional ORM option
- [ ] **GraphQL Templates** - Apollo Server integration

### **📈 Medium Priority**
- [ ] **Monitoring Templates** - Health checks, metrics
- [ ] **CI/CD Templates** - GitHub Actions, GitLab CI
- [ ] **Cloud Deployment** - Heroku, Vercel, AWS configs
- [ ] **WebSocket Support** - Real-time features

### **🎯 Future Goals**
- [ ] **Plugin System** - Community plugins
- [ ] **GUI Interface** - Web-based project generator
- [ ] **Multi-service Templates** - Microservices scaffolding
- [ ] **Mobile Backend** - React Native, Flutter support

---

<div align="center">

### 🎉 **Ready to Contribute?**

**Join our amazing community of contributors!**

[Open an Issue](https://github.com/yourusername/create-backend-buddy/issues/new) • [Start a Discussion](https://github.com/yourusername/create-backend-buddy/discussions) • [Join Discord](https://discord.gg/backend-buddy)

---

**Made with ❤️ by developers, for developers**

*Thank you for helping make backend development faster and more enjoyable for everyone!*

</div>