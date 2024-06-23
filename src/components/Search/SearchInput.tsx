import { Search as SearchIcon } from "lucide-react"

interface SearchInputProps{
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({ handleSearch }: SearchInputProps){

    return(
        <div className="flex gap-4 bg-slate-300 rounded-md p-4 w-full">
            <label className="pr-3 border-r-[3px] border-slate-400"><SearchIcon /></label>
            <input 
                className="w-full round-md bg-transparent ring-0 focus:outline-none"
                type="text" 
                onChange={handleSearch}
                placeholder="Search by name ..."
            />
        </div>
    )
}