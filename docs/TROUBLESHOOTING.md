# Troubleshooting Guide

Common issues and solutions when using `create-backend-buddy`.

## Installation Issues

### Issue: "Command not found: create-backend-buddy"

**Solution**: Install globally or use npx

```bash
# Option 1: Install globally
npm install -g create-backend-buddy

# Option 2: Use npx (recommended)
npx create-backend-buddy
```

### Issue: "Permission denied" errors

**Solution**: Use npx or fix npm permissions

```bash
# Option 1: Use npx (no installation needed)
npx create-backend-buddy

# Option 2: Fix npm permissions
sudo npm install -g create-backend-buddy
```

## Project Creation Issues

### Issue: "Directory already exists"

**Solution**: Choose a different name or remove the existing directory

```bash
# Remove existing directory
rm -rf existing-project-name

# Or choose a different name
npx create-backend-buddy
# Enter a different project name
```

### Issue: Invalid project name

**Error**: "Project name can only contain letters, numbers, hyphens, and underscores"

**Solution**: Use valid characters only

```bash
# Valid names
✅ my-backend-project
✅ backend_api_v2
✅ myproject123

# Invalid names
❌ my backend (spaces)
❌ my@backend (special chars)
❌ 123project (starts with number)
```

### Issue: Project creation fails silently

**Solution**: Enable verbose logging

```bash
# Add debug flag if implemented
npx create-backend-buddy --debug

# Or check the console output for error messages
```

## Dependency Installation Issues

### Issue: npm install fails

**Possible causes**:
1. Network issues
2. Registry authentication
3. Corrupted cache

**Solutions**:

```bash
# Clear npm cache
npm cache clean --force

# Try again
npx create-backend-buddy

# Or use yarn
yarn create backend-buddy
```

### Issue: "peer dependency" warnings

**Solution**: These are usually harmless warnings. The project should still work.

```bash
# To fix peer dependencies manually after project creation
cd your-project
npm install --force
```

### Issue: Prisma generate fails

**Solution**: Check Prisma schema

```bash
cd your-project
npx prisma generate
# If it fails, check prisma/schema.prisma for syntax errors
```

## Template Issues

### Issue: Missing template files

**Error**: "Missing template folder: ..."

**Solution**: This indicates a package issue. Report it on GitHub.

```bash
# Clear npm cache and reinstall
npm cache clean --force
npm uninstall -g create-backend-buddy
npm install -g create-backend-buddy@latest
```

### Issue: Docker files not copying

**Error**: Docker support selected but no Docker files created

**Solution**: Check if Docker option was selected correctly

```bash
# Recreate project with Docker enabled
# Make sure to select "Yes" for "Include Docker support?"
```

## Database Connection Issues

### Issue: Database connection fails

**Solution**: Configure `.env` file

```bash
cd your-project
cp .env.example .env
# Edit .env with your database credentials
nano .env
```

### Issue: PostgreSQL connection refused

**Solutions**:

```bash
# 1. Check if PostgreSQL is running
pg_isready

# 2. Install PostgreSQL if using Docker
docker-compose up -d db

# 3. Update DATABASE_URL in .env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

### Issue: MongoDB connection timeout

**Solutions**:

```bash
# 1. Check if MongoDB is running
mongosh

# 2. Install MongoDB if using Docker
docker-compose up -d db

# 3. Update DATABASE_URL in .env
DATABASE_URL="mongodb://localhost:27017/mydb"
```

## Git Issues

### Issue: Git initialization fails

**Solutions**:

```bash
# 1. Check if git is installed
git --version

# 2. Configure git if not configured
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 3. Initialize manually
cd your-project
git init
git add .
git commit -m "Initial commit"
```

### Issue: Cannot initialize git in git repository

**Error**: "Cannot create project inside a git repository"

**Solution**: Run in a non-git directory

```bash
# Navigate to a directory that's not a git repository
cd ~/projects
npx create-backend-buddy
```

## Environment Issues

### Issue: Node version incompatible

**Error**: "Requires Node.js version >= 18"

**Solution**: Update Node.js

```bash
# Check current version
node --version

# Update Node.js
# Using nvm (recommended)
nvm install 18
nvm use 18

# Or download from nodejs.org
```

### Issue: Wrong npm version

**Solution**: Update npm

```bash
npm install -g npm@latest
```

## Performance Issues

### Issue: Project creation is slow

**Causes**:
- npm install is downloading many packages
- Slow network connection

**Solutions**:

```bash
# Use npm cache
npm config set cache /path/to/cache

# Or use a faster registry
npm config set registry https://registry.npmjs.org/

# Or use yarn
yarn create backend-buddy
```

## Still Having Issues?

### Get Help

1. **Check existing issues**: [GitHub Issues](https://github.com/GarvGojariya/create-backend-buddy/issues)
2. **Search closed issues**: Your issue might already be solved
3. **Create new issue**: Include:
   - Your Node.js version
   - npm version
   - Operating system
   - Complete error message
   - Steps to reproduce

### Debug Information

Run with verbose output:

```bash
# Create project
npx create-backend-buddy

# If it fails, provide:
# 1. Full console output
# 2. Error stack trace
# 3. Your selections (project name, language, etc.)
```

### Common Error Codes

- `VALIDATION_ERROR`: Invalid input provided
- `TEMPLATE_NOT_FOUND`: Missing template file
- `DIRECTORY_CREATION_ERROR`: Cannot create project directory
- `PACKAGE_INIT_ERROR`: Failed to initialize package.json
- `DEPENDENCY_INSTALL_ERROR`: npm install failed
- `GIT_INIT_ERROR`: Git initialization failed

## Quick Fixes Summary

| Issue | Quick Fix |
|-------|-----------|
| Command not found | Use `npx create-backend-buddy` |
| Permission denied | Use `npx` or `sudo npm install -g` |
| Directory exists | Choose different name or remove directory |
| Invalid name | Use only letters, numbers, hyphens, underscores |
| npm install fails | Clear cache: `npm cache clean --force` |
| Git init fails | Check git is installed and configured |
| Wrong Node version | Update to Node.js 18+ |
| Slow creation | Use npm cache or faster registry |

## Prevention Tips

1. **Use latest Node.js**: Always use Node.js 18 or higher
2. **Use npx**: Avoid global installation issues
3. **Check disk space**: Ensure enough space for node_modules
4. **Stable network**: Use reliable internet connection for npm install
5. **Read errors**: Error messages usually contain helpful information

