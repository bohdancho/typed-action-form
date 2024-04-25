# typedActionForm PoC

typedActionForm is a proof of concept that adresses the pain point of lacking typesafety for FormData in React Server Actions.

## Reasoning

The default FormData type in Server Actions doesn't offer type-safe `get()` operations, which make it more error-prone. Normally you would have to reach for Client Components to achieve type-safe Server Actions by storing inputs' values in state and utilizing [closures](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#closures-and-encryption).

The proposed helpers enforce typesafety for input `name` attribute values and the corresponding `formData` fields.

## [Example](https://github.com/bohdancho/typed-action-form/blob/ca16e6a75e829d310e2a4eb5196ba1c0d4ffcac8/src/app/page.tsx#L3-L27)

Detailed explanation:

First, create a helper-object. Whether it's declared inside of a component or not doesn't matter since it doesn't hold any state.

```tsx
const form = typedActionForm('name', 'age')
```

Now you can populate the name prop:

```tsx
<input {...form.age} />
```

Which is equivalent to this:

```tsx
<input name={form.age.name} />
```

Finally, use the `form.$action` wrapper to access a typed formData object:

```ts
<form action={form.$action(async (formData) => {
  'use server'

  const name = formData.get('name')
  const age = formData.get('age')
```

Now accessing a nonexistent field will error:

```tsx
formData.get('age1') // Argument of type '"age1"' is not assignable to parameter of type '"name" | "age"'. [2345]
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
- Spreading in tsx props was inspired by [react-hook-form](https://github.com/react-hook-form/react-hook-form)'s `register` method.
