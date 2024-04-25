import type { TypedFormData, TypedFormDataValue } from "./typed-form-data";

const form = typedActionForm("name", "age");
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="flex flex-col gap-2"
        action={form.$action(async (formData) => {
          "use server";

          const name = formData.get("name");
          const age = formData.get("age");
          console.log("Name:", name);
          console.log("Age:", age);

          const invalid = formData.get("age1");
        })}
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

function typedActionForm<
  TFields extends string,
  TInputsProps extends InputProps<TFields>,
  TFormData extends InferFormData<TFields>,
>(...args: TFields[]) {
  const inputsProps = Object.fromEntries(
    args.map((name) => [name, { name }]),
  ) as TInputsProps;

  function $inferFormData(formData: FormData) {
    return formData as unknown as TFormData;
  }

  function $action(action: (formData: TFormData) => void) {
    return async (formData: FormData) => {
      "use server";

      return action(formData as unknown as TFormData);
    };
  }

  return { ...inputsProps, $inferFormData, $action };
}

type InputProps<TFields extends string> = {
  [K in TFields]: { name: K };
};

type InferFormData<T extends string> = TypedFormData<
  Record<T, TypedFormDataValue>
>;
