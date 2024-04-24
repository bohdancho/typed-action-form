import type { TypedFormData, TypedFormDataValue } from "./typed-form-data";

const form = typedFormAction("name", "age");
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="flex flex-col gap-2"
        action={async (f: FormData) => {
          "use server";

          const formData = f as typeof form.$infer;
          const name = formData.get("name");
          const age = formData.get("age");
          console.log("Name:", name);
          console.log("Age:", age);

          const invalid = formData.get("age1");
        }}
      >
        <label>
          <p>Name:</p>
          <input {...form.name} className="text-black" />
        </label>
        <label>
          <p>Age:</p>
          <input {...form.age} className="text-black" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

function typedFormAction<T extends string>(...args: T[]) {
  return Object.fromEntries(args.map((name) => [name, { name }])) as {
    [K in T]: { name: K };
  } & { readonly $infer: InferFormData<{ [K in T]: K }> };
}

type InferFormData<T> =
  T extends Record<infer U, unknown>
    ? TypedFormData<Record<U, TypedFormDataValue>>
    : never;
