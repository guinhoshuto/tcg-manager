import { Filter } from "lucide-react"
import SearchInput from "./SearchInput"
import { useEffect, useState } from "react"
import ColorFilter from "./ColorFilter"

interface Query {
  name?: string
  color?: string
  power?: number
  cost?: number
  counter?: number
  life?: number
  trigger?: string
}

interface SearchProps {
    query: Query
    setQuery: (query: Query) => void
}

export default function Search({ query, setQuery }: SearchProps) {
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [colors, setColors] = useState<string[]>([])
    function toggleFilter(){
        setShowFilter(!showFilter)
    }
    function handleSearch(e: React.FormEvent<HTMLInputElement>) {
        setQuery({
            ...query,
            name: e.currentTarget.value,
        })
    }

    useEffect(() => {
        setQuery({
            ...query,
            color: colors.join(', ')
        })
    }, [colors])

    async function handleHaveTrigger(value: string){
        setQuery({
            ...query,
            trigger: value
        })
    }
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center w-full gap-4">
                <SearchInput handleSearch={handleSearch} />
                <Filter 
                    className="cursor-pointer"
                    onClick={toggleFilter}
                    fill="#000" 
                    />
            </div>
            <div className={`bg-white p-4 h-20 justify-start shadow-md h-10 w-full ${showFilter ? 'block ease-in-out' : 'hidden'}`}>
                <div>
                    <ColorFilter setColors={setColors}/>
                </div>
            </div>
        </div>
    )
}