import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface ColorFilterProps {
    setColors: (colors: string[]) => void
}

export default function ColorFilter({ setColors }: ColorFilterProps) {
    function handleChangeColors(values: string[]){
        setColors(values)
    }

    return (
        <div>
            <h2>Colors</h2>
            <ToggleGroup type="multiple" onValueChange={handleChangeColors}>
                <ToggleGroupItem defaultChecked className="bg-blue-200 data-[state=on]:bg-blue-400 data-[state=on]:ring-1" value="Blue"></ToggleGroupItem>
                <ToggleGroupItem defaultChecked className="bg-red-200 data-[state=on]:bg-red-400 data-[state=on]:ring-1" value="Red"></ToggleGroupItem>
                <ToggleGroupItem defaultChecked className="bg-yellow-200 data-[state=on]:bg-yellow-400 data-[state-on]:ring-1" value="Yellow"></ToggleGroupItem>
                <ToggleGroupItem defaultChecked className="bg-green-200 data-[state=on]:bg-green-400 data-[state-on]:ring-1" value="Green"></ToggleGroupItem>
                <ToggleGroupItem defaultChecked className="bg-slate-200 data-[state=on]:bg-black data-[state-on]:ring-1" value="Black"></ToggleGroupItem>
                <ToggleGroupItem defaultChecked className="bg-purple-200 data-[state=on]:bg-purple-400 data-[state-on]:ring-1" value="Purple"></ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}