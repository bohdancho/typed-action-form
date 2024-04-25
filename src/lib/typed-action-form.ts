import { TypedFormData, TypedFormDataValue } from './typed-form-data'

export function typedActionForm<
  TFields extends string,
  TInputsProps extends InputProps<TFields>,
  TFormData extends InferFormData<TFields>,
>(...args: TFields[]) {
  const inputsProps = Object.fromEntries(args.map((name) => [name, { name }])) as TInputsProps

  function $inferFormData(formData: FormData) {
    return formData as unknown as TFormData
  }

  function $action(action: (formData: TFormData) => void) {
    return async (formData: FormData) => {
      'use server'

      return action(formData as unknown as TFormData)
    }
  }

  return { ...inputsProps, $inferFormData, $action }
}

type InputProps<TFields extends string> = {
  [K in TFields]: { name: K }
}

type InferFormData<T extends string> = TypedFormData<Record<T, TypedFormDataValue>>
