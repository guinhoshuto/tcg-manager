import { Checkbox } from "@/components/ui/checkbox"

export default function OwnedFilter(){
    return (
        <div className="flex items-center gap-2">
            <Checkbox id="owned"/>
            <label htmlFor="owned">Owned</label>
        </div>
    )
}