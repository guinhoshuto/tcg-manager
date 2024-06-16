import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <form className='flex flex-col'>
            <label htmlFor="email">Email:</label>
            <input className='ring-1' id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input className='ring-1' id="password" name="password" type="password" required />
            <button className='bg-black text-white' formAction={login}>Log in</button>
            <button formAction={signup}>Sign up</button>
        </form>
    </div>
  )
}