'use client'

import Card from "@/components/Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Selection from "@/components/Selection";
import Cards from "@/components/Cards";
import { Checkbox } from "@/components/ui/checkbox"

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
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [collection, setCollection] = useState<Collection[]>([])
  const [selectionMode, setSelectionMode] = useState<boolean>(false)
  const [selection, setSelection] = useState<Cards[]>([])

  function toggleFilter(){
    setShowFilter(!showFilter)
  }

  async function getQueryResults(query: string){
    const res = await fetch(query)
    console.log(res)
    const cards = await res.json()
    setResult(cards)
  }

  async function handleSearch(e: React.FormEvent<HTMLInputElement>) {
    setQuery({
      ...query,
      name: e.currentTarget.value,
    })
  }

  async function handleHaveTrigger(value: string){
    setQuery({
      ...query,
      trigger: value
    })
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

  async function getUserCollection(userId: string){
    if(!user) return []
    const res = await fetch(`/api/user/${user.id}/collection`)
    const collection = await res.json()
    setCollection(collection)
  }

  useEffect(() => {
    setIsLoading(true)
    supabase.auth.getUser().then(res => {
      const { data } = res
      setUser({
        email: data.user?.email || "",
        id: data.user?.id || "" 
      })
    })
    getQueryResults(searchQuery)
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
        <div className="flex items-center w-full gap-4">
          <div className="flex gap-4 bg-slate-300 rounded-md p-4 w-full">
            <label className="pr-3 border-r-[3px] border-slate-400"><Search /></label>
            <input 
              className="w-full round-md bg-transparent ring-0 focus:outline-none"
              type="text" 
              onChange={handleSearch}
              placeholder="Search by name ..."
              />
          </div>
          <Filter 
            className="cursor-pointer"
            onClick={toggleFilter}
            fill="#000" 
            />
        </div>
        <div className="flex gap-2 justify-start items-center w-full">
          <Checkbox 
            id="selection-mode"
            checked={selectionMode} 
            onCheckedChange={() => setSelectionMode(!selectionMode)}
            />
            <label htmlFor="selection-mode">Selection Mode</label>
        </div>
        <div className={`bg-black h-10 w-full ${showFilter ? 'block ease-in-out' : 'hidden'}`}>

        </div>
      </div>

      {isLoading ? ('loading') : (<Cards cards={result} handleClick={handleClick} collection={collection} updateCollection={setCollection}/>)}

      {selection.length > 0 && (<Selection cards={selection} onSave={handleOnSaveSelection}/>)}
    </div>
  );
};
