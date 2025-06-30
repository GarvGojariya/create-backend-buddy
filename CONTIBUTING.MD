# Contributing to create-backend-buddy

Thank you for your interest in contributing! 🎉  
This project aims to be a simple and powerful CLI to scaffold backend APIs with best practices baked in.

---

## 🛠 What You Can Contribute

- Add support for more ORMs or databases
- Improve Swagger scaffolding or auto-documentation
- Enhance error handling or logging utilities
- Add generators (e.g., `generate:model`, `generate:route`)
- Improve CLI UX, prompts, or validations
- Create advanced templates (e.g., multi-tenant, auth roles, etc.)

---

## 📦 Project Structure

The project is structured as follows:

```bash
create-backend-buddy/
├─ bin/
│  └─ index.js
├─ templates/
│  ├─ base/
│  │  ├─ js/
│  │  └─ ts/
│  └─ orm/
│     ├─ js/
│     └─ ts/
├─ lib/
│  └─ [orm connection files]
├─ routes/
│  └─ [orm-specific]/
├─ utils/
│  ├─ logger.js
│  ├─ ApiError.js
│  └─ responder.js
├─ swagger.js
└─ index.js
```

---