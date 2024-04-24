# typedFormAction PoC

typedFormAction is a proof of concept that adresses the pain point of lacking typesafety for FormData in React Server Actions.

## Reasoning

The default FormData type in Server Actions doesn't offer type-safe `get()` operations, which make it more error-prone. Normally you would have to reach for Client Components to achieve type-safe Server Actions by storing inputs' values in state and utilizing [closures](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#closures-and-encryption).

The proposed helpers enforce typesafety for input `name` attribute values and the corresponding `formData` fields.

## [Example](https://github.com/bohdancho/typed-form-action/blob/751bebb2182669ca69228aea2a60863848fc006c/src/app/page.tsx#L3-L33)

Detailed explanation:

First, create a helper-object. Whether it's declared inside of a component or not doesn't matter since it doesn't hold any state.
```tsx
const form = typedActionForm("name", "age");
```

Now you can populate the name attribute:
```tsx
<input {...form.age} />
```
Which is equivalent to this:
```tsx
<input name={form.age.name} />
```

Finally, use `form.$infer` to assert a strict custom version of FormData.
```ts
const formData = f as typeof form.$infer;
const age = formData.get("age");
```

Now accessing a nonexistent field will error:
```ts
const invalid = formData.get("age1"); // Argument of type '"age1"' is not assignable to parameter of type '"name" | "age"'. [2345]
```

## Run the example
```bash
npm install && npm run dev
# or
yarn install && yarn dev
# or
pnpm install && pnpm dev
# or
bun install && bun dev
```

## Under the hood

- My solution utilizes [a solution for a generic strongly typed FormData from a community member](https://github.com/microsoft/TypeScript/issues/43797#issuecomment-1311633838).
- Spreading in tsx attributes was inspired by [react-hook-form](https://github.com/react-hook-form/react-hook-form)'s `register` method.
- The `$infer` helper was inspired by a similar helper from (Drizzle)[https://github.com/drizzle-team/drizzle-orm].
