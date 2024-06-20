import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from '../logout/actions'
import { headers } from 'next/headers'

interface Collection {
    code_variant: string
    qtd: number
}

export default async function PrivatePage() {
  const supabase = createClient()
//   async function logout(){
//     const { error } = await supabase.auth.signOut()
//   }

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const headersList = headers()
//   console.log(headersList.get('X-Forwarded-Proto'))
  const collectionRes = await fetch(`${headersList.get('X-Forwarded-Proto')}://${headersList.get('Host')}/api/user/${data.user.id}/collection`)
  const collection = await collectionRes.json()

  console.log(collection)

  return (
    <div className='w-full flex flex-col gap-4 justify-center items-center p-11'>
        <div className='flex'>
            <p>Hello {data.user.email}</p>
            <form action={logout}>
                <button type='submit'>Sign out</button>
            </form>
        </div>
        <div className='w-full rounded-md ring-1 p-4'>
            <h2>Cards</h2>
            <div>
                <p>Not implemented yet</p>
                {collection.map((c: Collection )=>(<div key={c.code_variant}>{c.code_variant}</div>))}
            </div>
        </div>        
        <div className='w-full rounded-md ring-1 p-4'>
            <div>
                <h2>Decks</h2><button>import</button>
            </div>
            <div>
                <p>Not implemented yet</p>
            </div>
        </div>        
        <div className='w-full rounded-md ring-1 p-4'>
            <h2>Boxes</h2>
            <div>
                <p>Not implemented yet</p>
            </div>
        </div>        
    </div>
  )
}