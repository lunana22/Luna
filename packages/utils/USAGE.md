# Utils Usage Guide

This package (`@learninboard/utils`) provides shared utilities, constants, and helpers.
It has multiple entry points to optimize bundle size and separate server/client logic.

## Entry Points

### 1. Default Import (`@learninboard/utils`)

Common utilities usable in both client and server environments (mostly).

```ts
import { cn, bp, toManWonPrecise } from "@learninboard/utils";

// Class merging (clsx + tailwind-merge)
const className = cn("text-red-500", condition && "bg-blue-500");

// Breakpoint helper
const responsiveClass = bp({ sm: "w-full", md: "w-1/2" });

// Number formatting
const price = toManWonPrecise(15000); // "1.5만"
```

### 2. Server Utilities (`@learninboard/utils/server`)

Utilities specifically for Next.js server components or API routes.

```ts
import { getSession, generateMetadata } from "@learninboard/utils/server";

// Get session in Server Component
const session = await getSession();

// Generate Metadata for Layout/Page
export const metadata = generateMetadata({ title: "My Page" });
```

### 3. Client Utilities (`@learninboard/utils/client`)

Utilities specifically for client-side usage.

```ts
import { getFcmToken } from "@learninboard/utils/client";

// Get Firebase Cloud Messaging Token
const token = await getFcmToken();
```

### 4. Constants (`@learninboard/utils/constants`)

Shared constants used across the application.

```ts
import {
  ENDPOINTS,
  QUERY_KEY,
  COOKIES_KEY,
} from "@learninboard/utils/constants";

// API Endpoints
fetch(ENDPOINTS.AUTH.LOGIN);

// React Query Keys
useQuery({ queryKey: [QUERY_KEY.USER] });

// Cookie Keys
cookies().get(COOKIES_KEY.ACCESS_TOKEN);
```

### 5. Auth Guard (`@learninboard/utils/auth-guard`)

Middleware logic for authentication and routing.

```ts
import { resolveAuthRedirect } from "@learninboard/utils/auth-guard";

// Used in middleware.ts
export function middleware(req: NextRequest) {
  const redirect = resolveAuthRedirect(req);
  if (redirect) return redirect;
}
```

### 6. Plugins (`@learninboard/utils/plugins`)

Helpers for date formatting and other library configurations.

```ts
import { utcToDateFormat, DateFnsFormat } from "@learninboard/utils/plugins";

// Date Formatting
const dateStr = utcToDateFormat(new Date(), DateFnsFormat.YYYYMMDD); // "2024.05.28"
```

## Summary Table

| Entry Point   | Import Path                      | Description                         |
| :------------ | :------------------------------- | :---------------------------------- |
| **Main**      | `@learninboard/utils`            | Styling (`cn`), Formatting, Storage |
| **Server**    | `@learninboard/utils/server`     | Metadata, Session, Base URL         |
| **Client**    | `@learninboard/utils/client`     | Firebase                            |
| **Constants** | `@learninboard/utils/constants`  | API, Keys, Config                   |
| **Auth**      | `@learninboard/utils/auth-guard` | Middleware Auth Logic               |
| **Plugins**   | `@learninboard/utils/plugins`    | Date formatting helpers             |
