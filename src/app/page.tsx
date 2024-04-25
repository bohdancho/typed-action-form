import { typedActionForm } from '@/lib'

const form = typedActionForm('name', 'age')
export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <form
        className='flex flex-col gap-2'
        action={form.$action(async (formData) => {
          'use server'

          const name = formData.get('name')
          const age = formData.get('age')
          console.log('Name:', name)
          console.log('Age:', age)

          const invalid = formData.get('age1')
        })}
      >
        <label>
          <p>Name:</p>
          <input {...form.name} className='text-black' />
        </label>
        <label>
          <p>Age:</p>
          <input {...form.age} className='text-black' />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}
