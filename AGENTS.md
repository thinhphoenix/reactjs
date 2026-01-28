# Project Guidelines for Agentic Coding

## Build & Commands

```bash
# Development
bun dev                    # Start dev server with hot reload
bun build                  # Production build
bun preview                # Preview production build

# Code Quality
bun check                  # Run Biome linter (auto-fixes with --write)
bun pretty                 # Run Prettier formatter (auto-fixes)
bun format                 # Custom format script

# Utilities
bun i18n:gen               # Generate i18n translations
bun assets:gen             # Generate assets
```

No test framework is currently configured in this project.

## Code Style

### Imports

- Use `@/*` path alias for internal imports (configured in tsconfig.json)
- External imports first, then internal imports
- Use `import type` for type-only imports

```typescript
import { useState } from 'react';
import { useListTodos } from '@/services/hooks/todo/use-list-todos';
import type { TodoDto } from '@/types/dto/todo.dto';
```

### Formatting

- Spaces for indentation (Biome configured)
- Single quotes for strings and imports
- Biome organizes imports automatically (`bun check`)
- Prettier for additional formatting (`bun pretty`)

### TypeScript

- Strict mode enabled
- Use `interface` for DTOs and object shapes
- Use `enum` for fixed constants
- Define types before implementation

```typescript
// ✅ Good
export interface TodoDto {
  id: number;
  title: string;
  completed: boolean;
}

// ❌ Avoid
export const todoDto = { ... };
```

### Naming Conventions

- **Components**: PascalCase (e.g., `RouteComponent`, `ToastProvider`)
- **Files**: kebab-case (e.g., `use-list-todos.ts`, `todo.dto.ts`)
- **Functions/Variables**: camelCase (e.g., `formatTime`, `isEnabled`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `TOKEN_STORAGE_TYPE`)
- **Custom Hooks**: `use` prefix (e.g., `useToast`, `useListTodos`)
- **Types/Interfaces**: PascalCase, descriptive names (e.g., `TodoDto`, `ToastContextType`)

### File Structure

```
src/
├── helpers/          # Utilities (axios, i18n, utils, constants)
├── services/
│   ├── hooks/        # Custom React hooks (grouped by feature)
│   └── endpoints.ts  # API endpoint definitions
├── types/
│   ├── dto/          # Data Transfer Objects
│   └── enums/        # Enum definitions
├── providers/        # React context providers
├── routes/           # TanStack router routes
└── locales/          # i18n translation files
```

### Error Handling

- Use i18n for user-facing messages: `i18n.t('errorKey', { ns: 'exception' })`
- Global error handling via axios interceptors (see `axios-instance.ts`)
- Throw descriptive errors in hooks:

```typescript
if (!context) {
  throw new Error('useToast must be used within a ToastProvider');
}
```

### React Patterns

- Use TanStack Router for routing with file-based routes
- Use TanStack Query for data fetching with custom hooks
- Store feature hooks in `src/services/hooks/{feature}/`
- Export `Route` component from route files:

```typescript
export const Route = createFileRoute('/')({
  component: RouteComponent,
});
```

### Routing Configuration

- TanStack Router plugin configured in `rsbuild.config.ts` for file-based routing
- Route tree auto-generated to `src/route-tree.gen.ts`
- Route files with `___` prefix are ignored (e.g., `__root.tsx`)
- Auto code splitting enabled for performance
- Server base path configured via `envConfig.base`
- All routes defined in `src/routes/` with pattern `*.tsx`
- **Route generation happens automatically** when running `bun dev` or `bun build` - no separate command needed

#### Layouts

- Layouts use `_route.tsx` suffix (e.g., `/home/_route.tsx` for home layout)
- Layout components export an `<Outlet />` to render child routes (similar to Next.js `_layout.tsx`):

```typescript
// src/routes/home/_route.tsx (layout)
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/home/_route')({
  component: HomeLayout,
});

function HomeLayout() {
  return (
    <div>
      <header>Home Layout</header>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

```typescript
// src/routes/home/index.tsx (child route)
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/home/')({
  component: HomeComponent,
});
```

### Environment & Config

- Environment vars in `.env` (see `.env.example`)
- Config object via `envConfig` from `@/helpers/constants/env-config`
- Never commit secrets or actual `.env` files

### Committing Changes

1. Run `bun check` to fix linting issues
2. Run `bun pretty` to format code
3. Verify build with `bun build`
4. Commits only when explicitly requested

### Key Dependencies

- **Build**: Rsbuild, Bun, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: @tanstack/react-router
- **Data**: @tanstack/react-query, axios
- **UI**: Ant Design (antd)
- **Internationalization**: react-i18next
- **Linting**: Biome, Prettier
