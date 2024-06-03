'use client'

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

  const searchQuery = '/api/search'
  async function handleSearch(e: React.FormEvent<HTMLInputElement>) {
    console.log(e.currentTarget.value) 
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
    let searchQueryWithParams = searchQuery + '?'
    if(query.name) searchQueryWithParams += `name=${query.name}`
    fetch(searchQueryWithParams)
      .then(res => res.json())
      .then(cards => setResult(cards))
  }, [query])

  return (
    <div>
      <Link href="/scan">Scan</Link>

      <input 
        type="text" 
        onChange={handleSearch}
        />

      <div className="flex">
        {result.map(card => (<div><a href={card.image}><img src={card.image} />{card.name}</a></div>))}
      </div>
    </div>
  );
};
