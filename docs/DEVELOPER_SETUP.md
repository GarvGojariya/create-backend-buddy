# Developer Setup Guide

This guide will help you set up the `create-backend-buddy` project for local development and contribution.

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Git**: Latest version

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/GarvGojariya/create-backend-buddy.git
cd create-backend-buddy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Link for Local Development

To test the CLI locally without publishing to npm:

```bash
npm link
```

This creates a global symlink that allows you to use `create-backend-buddy` command from anywhere.

### 4. Test the CLI

```bash
# Create a test project
mkdir test-project
cd test-project
create-backend-buddy
```

### 5. Development Workflow

1. **Make changes** to the source code in `src/` directory
2. **Test locally** using `npm link`
3. **Run linting** (if configured): `npm run lint`
4. **Commit changes** with descriptive messages
5. **Push to your fork** and create a pull request

## Project Structure

```
create-backend-buddy/
├── bin/                  # CLI entry point
├── src/                  # Source code
│   ├── cli.js           # Main CLI orchestrator
│   ├── prompts.js       # User prompts handling
│   ├── copyTemplate.js  # Template copying logic
│   ├── installDeps.js   # Dependency installation
│   ├── setupGit.js      # Git initialization
│   ├── updatePackage.js # Package.json updates
│   └── utils/           # Utility functions
│       ├── log.js       # Logging utility
│       ├── validation.js # Input validation
│       └── errorHandler.js # Error handling
├── templates/           # Project templates
│   ├── base/           # Base templates (JS/TS)
│   ├── db/             # Database configurations
│   ├── features/       # Optional features
│   └── orm/            # ORM/ODM templates
└── docs/               # Documentation
```

## Key Files to Understand

### `src/cli.js`
Main entry point that orchestrates the entire project creation process.

### `src/prompts.js`
Handles all user input via Inquirer.js prompts. Validates responses.

### `src/copyTemplate.js`
Copies and modifies templates based on user selections. Handles:
- Base template selection
- ORM/ODM integration
- Database configuration
- Feature additions (Swagger, Docker, etc.)

### `src/installDeps.js`
Manages npm dependency installation. Handles:
- Dependency detection based on selections
- Production vs dev dependencies
- ORM-specific packages

## Testing Your Changes

### Manual Testing

1. Create a test directory
2. Run `create-backend-buddy` with various configurations
3. Verify the output matches expectations

### Testing Checklist

- [ ] Project name validation works
- [ ] Templates copy correctly
- [ ] Package.json updates properly
- [ ] Dependencies install successfully
- [ ] Git initialization works
- [ ] All language/ORM combinations work
- [ ] Optional features (Swagger, Docker) work

## Version Management

When making changes:

1. **Patch version** (`npm version patch`): Bug fixes
2. **Minor version** (`npm version minor`): New features
3. **Major version** (`npm version major`): Breaking changes

## Publishing

After making changes and testing:

```bash
# Commit changes
git add .
git commit -m "your message"

# Bump version
npm version patch|minor|major

# Publish to npm
npm publish
```

## Common Development Tasks

### Adding a New Template

1. Create template files in `templates/` directory
2. Update `src/copyTemplate.js` to handle the new template
3. Update `src/installDeps.js` if new dependencies are needed
4. Test thoroughly

### Adding a New Feature

1. Create feature directory in `templates/features/`
2. Add prompt in `src/prompts.js`
3. Add copy logic in `src/copyTemplate.js`
4. Add dependency logic in `src/installDeps.js`
5. Update documentation

### Debugging

Enable verbose logging by modifying `src/utils/log.js` or add console.log statements where needed.

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed contribution guidelines.

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/GarvGojariya/create-backend-buddy/issues)
- **Discussions**: [GitHub Discussions](https://github.com/GarvGojariya/create-backend-buddy/discussions)

## Next Steps

- Read the [Template Contribution Guide](./TEMPLATE_CONTRIBUTION.md)
- Check the [Troubleshooting Guide](./TROUBLESHOOTING.md)
- Review existing templates for examples

