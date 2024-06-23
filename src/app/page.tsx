'use client'

import Card from "@/components/Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Selection from "@/components/Selection";
import Cards from "@/components/Cards";
import { Checkbox } from "@/components/ui/checkbox"
import Search from "@/components/Search/Search";

const searchQuery = '/api/search'
// import { debounce } from 'lodash'

interface Query {
  name?: string
  color?: string
  power?: number
  cost?: number
  counter?: number
  life?: number
  trigger?: string
}

interface Cards {
  name: string
  image: string
  code: string
  code_variant: string
  description: string
}

interface User {
  email: string
  id: string
}

interface Collection{
  code_variant: string,
  qtd: number
}

const supabase = createClient()
export default function Home(){
  const [query, setQuery] = useState<Query>({})
  const [result, setResult] = useState<Cards[]>([])
  const [user, setUser] = useState<User | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [collection, setCollection] = useState<Collection[]>([])
  const [selectionMode, setSelectionMode] = useState<boolean>(false)
  const [selection, setSelection] = useState<Cards[]>([])


  async function getQueryResults(query: string){
    const res = await fetch(query)
    const cards = await res.json()
    setResult(cards)
  }


  async function handleOnSaveSelection(){
    if(!user) return alert('Login required')
    // const { data, error } = await db.from('owned_cards').insert(selection)	
  }

  function handleClick(card: Cards){
    if(selectionMode){
      setSelection([...selection, card])
    } else {
      console.log('oi')
    }
  }

  async function handleUpdateCollection(code_variant: string, qtd: number){
    if(!user) return
    const res = await fetch(`/api/user/${user.id}/collection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code_variant,
        qtd
      })
    })
  }

  async function getUserCollection(userId: string){
    if(!user) return []
    console.log(userId, user)
    const res = await fetch(`/api/user/${userId}/collection`)
    const collection = await res.json()
    setCollection(collection)
  }

  useEffect(() => {
    setIsLoading(true)
    supabase.auth.getUser()
      .then(res => {
        const { data } = res
        setUser({
          email: data.user!.email!,
          id: data.user!.id 
        })
      }).then(() => {
        getQueryResults(searchQuery)
      })
      .then(res => setIsLoading(false))
  }, [])

  useEffect(() => {
    if(!user) return
    getUserCollection(user.id)
  }, [user])
  
  useEffect(() => {
    console.log('query', query)
    setIsLoading(true)
    let searchQueryWithParams = searchQuery + '?'
    if(query.name) searchQueryWithParams += `name=${query.name}`
    if(query.color) searchQueryWithParams += `&color=${query.color}`
    getQueryResults(searchQueryWithParams)
      .then(res => setIsLoading(false))
  }, [query])

  return (
    <div className="px-4 flex flex-col gap-8">
      <nav className="flex justify-end items-center p-8 gap-2">
        <Link href="/scan">Scan</Link>
        {user ? (<Link href="/dash">{user.email}</Link>) : (<Link href="/login">Login</Link>)}
      </nav>

      <div className="flex flex-col gap-4 p-4 items-center">
        <Search query={query} setQuery={setQuery}/>
        <div className="flex gap-2 justify-start items-center w-full">
          <Checkbox 
            id="selection-mode"
            checked={selectionMode} 
            onCheckedChange={() => setSelectionMode(!selectionMode)}
            />
            <label htmlFor="selection-mode">Selection Mode</label>
        </div>
      </div>

      {isLoading ? ('loading') : (
        <Cards 
          cards={result} 
          selectionMode={selectionMode}
          handleClick={handleClick} 
          collection={collection} 
          updateCollection={handleUpdateCollection}
          />
      )}

      {selection.length > 0 && (<Selection cards={selection} onSave={handleOnSaveSelection}/>)}
    </div>
  );
};
