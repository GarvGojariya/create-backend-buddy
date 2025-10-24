# Template Contribution Guide

This guide explains how to create and contribute templates to `create-backend-buddy`.

## Understanding Templates

Templates are the foundation of `create-backend-buddy`. They define what files and configurations are created when a user scaffolds a new project.

## Template Structure

```
templates/
├── base/              # Base application templates
│   ├── js/           # JavaScript base
│   └── ts/           # TypeScript base
├── db/               # Database configurations
│   ├── postgres/
│   ├── mysql/
│   ├── mongo/
│   └── sqlite/
├── features/         # Optional features
│   ├── swagger/
│   ├── docker/
│   └── git/
└── orm/              # ORM/ODM integrations
    ├── prisma/
    ├── sequelize/
    └── mongoose/
```

## Template Types

### 1. Base Templates

Base templates provide the core application structure.

**Location**: `templates/base/{js|ts}/`

**Required files**:
- `package.json` - Package configuration
- `src/index.{js|ts}` - Main entry point
- `src/routes/` - Route definitions
- `src/controllers/` - Controller logic
- `src/utils/` - Utility functions

**Placeholders**:
- `// ##DB_IMPORT##` - Database import
- `// ##DB_INIT##` - Database initialization
- `// ##SWAGGER##` - Swagger integration

### 2. Database Templates

Provide database-specific configuration.

**Location**: `templates/db/{database-name}/`

**Files**:
- `.env.example` - Environment variables template

**Content example**:
```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

### 3. ORM Templates

Provide ORM-specific integrations.

**Location**: `templates/orm/{orm-name}/{js|ts}/`

**Structure**:
- `src/lib/` - ORM connection files
- `src/models/` - Model definitions
- `prisma/` - Prisma schema (if applicable)

### 4. Feature Templates

Optional features that can be added.

**Location**: `templates/features/{feature-name}/`

**Examples**:
- Swagger documentation
- Docker configuration
- Authentication setup

## Creating a New Template

### Step 1: Plan Your Template

Ask yourself:
- What is the purpose of this template?
- Which files does it need?
- What dependencies are required?
- Should it support both JS and TS?

### Step 2: Create Template Directory

```bash
mkdir -p templates/{type}/{name}/{js|ts}
```

Example:
```bash
mkdir -p templates/orm/typeorm/ts
```

### Step 3: Create Files

Add all necessary files with placeholders where needed.

**Example**: `src/lib/typeormConnect.ts`

```typescript
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'mydb',
  entities: [__dirname + '/../models/*.entity.ts'],
  synchronize: process.env.NODE_ENV !== 'production',
});

export default dataSource;
```

### Step 4: Add Template Integration

Update `src/copyTemplate.js` to handle your template:

```javascript
// Add copy logic
if (orm === "TypeORM") {
  await copy(`orm/typeorm/${languageCode}`);
}
```

### Step 5: Add Dependencies

Update `src/installDeps.js` to install required packages:

```javascript
if (orm === "TypeORM") {
  deps.push("typeorm", "reflect-metadata");
  if (database === "Postgres") deps.push("pg");
  if (database === "MySQL") deps.push("mysql2");
}
```

### Step 6: Test Locally

```bash
# Link the package
npm link

# Test in a new directory
mkdir test-temp
cd test-temp
create-backend-buddy
# Select your new template and verify
```

## Template Best Practices

### 1. Use Placeholders

Use placeholders for dynamic content:

```javascript
// ##DB_IMPORT##
import database from './lib/database';

// ##DB_INIT##
database.connect();
```

### 2. Environment Variables

Always use environment variables for configuration:

```javascript
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
```

### 3. Error Handling

Include proper error handling:

```javascript
try {
  await connect();
} catch (error) {
  console.error('Database connection failed:', error);
  process.exit(1);
}
```

### 4. Documentation

Add comments explaining what the code does:

```javascript
/**
 * Connect to MongoDB using Mongoose
 * Uses DATABASE_URL from environment variables
 */
export async function connect() {
  // Connection logic
}
```

### 5. Consistent Structure

Follow the same structure as existing templates:

```
project/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   └── lib/
├── .env.example
├── package.json
└── README.md
```

## Contributing a Template

### 1. Fork the Repository

```bash
git fork https://github.com/GarvGojariya/create-backend-buddy.git
cd create-backend-buddy
```

### 2. Create Feature Branch

```bash
git checkout -b feature/add-typeorm-template
```

### 3. Add Your Template

Follow the steps above to create your template.

### 4. Update Code

Modify necessary files:
- `src/copyTemplate.js` - Add copy logic
- `src/installDeps.js` - Add dependencies
- `src/prompts.js` - Add prompt options (if needed)

### 5. Test Thoroughly

Test all combinations:
- [ ] JavaScript version works
- [ ] TypeScript version works
- [ ] Works with all supported databases
- [ ] Dependencies install correctly
- [ ] Generated code runs without errors

### 6. Update Documentation

Add documentation:
- Update README.md
- Add to DEVELOPER_SETUP.md
- Create example usage

### 7. Commit and Push

```bash
git add .
git commit -m "feat: Add TypeORM template support"
git push origin feature/add-typeorm-template
```

### 8. Create Pull Request

Open a PR on GitHub with:
- Description of the template
- What it adds
- How to use it
- Screenshots or examples

## Template Guidelines

### Must Have

- ✅ Working code that runs without errors
- ✅ Proper error handling
- ✅ Environment variable configuration
- ✅ Clear file structure
- ✅ Documentation comments

### Should Have

- ⚠️ Both JavaScript and TypeScript versions
- ⚠️ Type definitions (for TypeScript)
- ⚠️ Example usage in comments
- ⚠️ Consistent code style

### Nice to Have

- 💡 Tests or examples
- 💡 Additional documentation
- 💡 Integration with other features
- 💡 Multiple database support

## Examples

### Adding a New ORM Template

**Example**: Add Drizzle ORM support

1. **Create directory structure**:
   ```bash
   mkdir -p templates/orm/drizzle/js/src/lib
   mkdir -p templates/orm/drizzle/ts/src/lib
   ```

2. **Create connection file**:
   ```typescript
   // templates/orm/drizzle/ts/src/lib/drizzle.ts
   import { drizzle } from 'drizzle-orm/postgres-js';
   import postgres from 'postgres';
   
   const connectionString = process.env.DATABASE_URL!;
   const client = postgres(connectionString);
   export const db = drizzle(client);
   ```

3. **Update copyTemplate.js**:
   ```javascript
   if (orm === "Drizzle") {
     await copy(`orm/drizzle/${languageCode}`);
   }
   ```

4. **Update installDeps.js**:
   ```javascript
   if (orm === "Drizzle") {
     deps.push("drizzle-orm", "postgres");
   }
   ```

5. **Test**:
   ```bash
   npm link
   npx create-backend-buddy
   # Select Drizzle ORM
   ```

## Common Pitfalls

### 1. Missing Placeholders

❌ **Wrong**: Hardcoded values
```javascript
import database from './db/postgres';
```

✅ **Right**: Use placeholders
```javascript
// ##DB_IMPORT##
import database from './db'; // Replaced at runtime
```

### 2. Hardcoded Database URLs

❌ **Wrong**: Hardcoded URLs
```javascript
const dbUrl = "postgresql://localhost:5432/mydb";
```

✅ **Right**: Environment variables
```javascript
const dbUrl = process.env.DATABASE_URL;
```

### 3. Missing Error Handling

❌ **Wrong**: No error handling
```javascript
connect();
```

✅ **Right**: Proper error handling
```javascript
try {
  await connect();
} catch (error) {
  console.error('Connection failed:', error);
  process.exit(1);
}
```

## Getting Help

- **Questions**: Open a GitHub Discussion
- **Issues**: Create a GitHub Issue
- **Examples**: Check existing templates in `templates/` directory

## Review Process

When you submit a template PR:

1. **Code Review**: We'll review your code for quality and best practices
2. **Testing**: We'll test your template with various configurations
3. **Documentation**: We'll check documentation completeness
4. **Merge**: If approved, your template will be merged and included in the next release

Thank you for contributing! 🎉

