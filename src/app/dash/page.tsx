import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className='w-full flex justify-center items-center'>
        <div>
            <p>Hello {data.user.email}</p>
            <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
        <div className='w-full rounded-md ring-1'>
            <h2>Cards</h2>
            <div>
                <p>Not implemented yet</p>
            </div>
        </div>        
        <div className='w-full rounded-md ring-1'>
            <h2>Decks</h2>
            <div>
                <p>Not implemented yet</p>
            </div>
        </div>        
        <div className='w-full rounded-md ring-1'>
            <h2>Boxes</h2>
            <div>
                <p>Not implemented yet</p>
            </div>
        </div>        
    </div>
  )
}