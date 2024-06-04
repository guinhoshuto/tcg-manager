'use client'

import Card from "@/components/Card";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { debounce } from 'lodash'

interface Query {
  name?: string
  color?: string
  power?: number
  cost?: number
  counter?: number
  life?: number
}

interface Cards {
  name: string
  image: string
}

export default function Home(){
  const [query, setQuery] = useState<Query>({})
  const [result, setResult] = useState<Cards[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchQuery = '/api/search'
  async function handleSearch(e: React.FormEvent<HTMLInputElement>) {
    setQuery({
      ...query,
      name: e.currentTarget.value,
    })
  }

  useEffect(() => {
    fetch(searchQuery)
      .then(res => res.json())
      .then(cards => setResult(cards))
  }, [])
  
  useEffect(() => {
    setIsLoading(true)
    let searchQueryWithParams = searchQuery + '?'
    if(query.name) searchQueryWithParams += `name=${query.name}`
    fetch(searchQueryWithParams)
      .then(res => res.json())
      .then(cards => setResult(cards))
    setIsLoading(false)
  }, [query])

  return (
    <div className="px-4 flex flex-col gap-8">
      <nav className="flex justify-end items-center p-8">
        <Link href="/scan">Scan</Link>
      </nav>

      <div className="flex gap-4">
        <label>Search</label>
        <input 
          className="w-full ring-2 round-md"
          type="text" 
          onChange={handleSearch}
          />
      </div>

      <div className="grid gap-8 grid-cols-8 w-full">
        {isLoading ? ('loading') : result.map(card => (<Card card={card}/>))}
      </div>
    </div>
  );
};
