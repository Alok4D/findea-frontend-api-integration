# API Integration Guide (Findea Frontend)

This guide documents how API integration is implemented in this project. It is based on the setup in `lib/redux/api/`.

## 1. Core Tooling
The project uses **Redux Toolkit Query (RTK Query)** for data fetching, caching, and state management of API requests.

## 2. Base API Setup (`baseApi.ts`)
The foundation of all API calls is defined in `lib/redux/api/baseApi.ts`.

- **Base URL**: The API connects to `http://209.74.71.27:4000/api`.
- **Authentication**: `prepareHeaders` automatically injects the `Authorization` header with a `Bearer <token>` on every request. It tries to get the token from the Redux state (`state.auth.token`) first, and falls back to cookies (`findea_token`) if the state isn't hydrated yet.
- **Auto Re-authentication**: Requests are wrapped in a `baseQueryWithReauth` function. 
  - If a request fails with a `401 Unauthorized` status, it automatically attempts to refresh the token using `/auth/refresh`.
  - It uses the refresh token stored in the Redux state or `findea_refresh_token` cookie.
  - If successful, the new tokens are dispatched to the store via `setCredentials`, and the original request is retried.
  - If refresh fails, it dispatches `logout()` to clear the session.
- **Tag Types**: Defines global tag types (e.g., `Product`, `Category`, `Cart`, `User`, `Order`) for cache invalidation.

## 3. Creating New Endpoints (Endpoint Injection)
Instead of putting all endpoints in one massive file, the project uses code splitting via `baseApi.injectEndpoints()`. When adding a new API feature (e.g., `productApi.ts` or `orderApi.ts`), follow these patterns:

```typescript
import { baseApi } from "./baseApi";

// 1. Define Types/Interfaces for Requests and Responses
export interface MyDataResponse {
  id: string;
  name: string;
}

// 2. Inject Endpoints into baseApi
export const myFeatureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Use builder.query for GET requests
    getData: builder.query<MyDataResponse, void>({
      query: () => "/feature-path",
      providesTags: ["FeatureTag"], // For caching
    }),
    
    // Use builder.mutation for POST/PATCH/PUT/DELETE requests
    createData: builder.mutation<MyDataResponse, { name: string }>({
      query: (body) => ({
        url: "/feature-path",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FeatureTag"], // To trigger refetch of related queries
    }),
  }),
  overrideExisting: false,
});

// 3. Export generated hooks
export const {
  useGetDataQuery,
  useCreateDataMutation,
} = myFeatureApi;
```

## 4. Usage in Components
Import the auto-generated hooks into your React components to use the API:

```tsx
import { useGetDataQuery, useCreateDataMutation } from '@/lib/redux/api/myFeatureApi';

export const MyComponent = () => {
  // Query example
  const { data, isLoading, error } = useGetDataQuery();
  
  // Mutation example
  const [createData, { isLoading: isCreating }] = useCreateDataMutation();

  const handleCreate = async () => {
    try {
      await createData({ name: "New Item" }).unwrap();
      // Success
    } catch (err) {
      // Handle error
    }
  };

  // ... render
};
```

## Summary Rules for API Integration
1. **Never use `fetch` or `axios` directly.** Always use RTK Query.
2. **Never modify `baseApi.ts` to add endpoints.** Always create a separate file (e.g., `featureApi.ts`) and use `injectEndpoints`.
3. **Always type your requests and responses.** Create TypeScript interfaces for the expected payloads and return structures.
4. **Export and use the generated React hooks.** (e.g., `useGetSomethingQuery`, `useUpdateSomethingMutation`).
5. **Use tags for caching.** Ensure queries provide tags (`providesTags`) and mutations invalidate them (`invalidatesTags`) to keep UI in sync without manual refetching.
