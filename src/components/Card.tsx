import { debounce, isNull } from 'lodash'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { useUser } from '@/context/userContext'


interface Card {
  name: string
  image: string
  code: string
  code_variant: string
  description: string
}

interface CardProps {
    card: Card
    // quantity: number
    handleClick: (card: Card) => void
    // updateQuantity: (code_variant:string, n: number) => void
    selectionMode: boolean
}

export default function Card({ card, handleClick, selectionMode } : CardProps){
    const [qtd, setQtd] = useState<number | null>(null)
    const [open, setOpen] = useState<boolean>(false)

    const { collection, handleUpdateCollection } = useUser()

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log('chamado aqui')
        e.preventDefault()
        setQtd(+e.target.value)
    }

    useEffect(() => {
        const ownedCard = collection.find(c => c.code_variant === card.code_variant)
        if(ownedCard && ownedCard.qtd > 0) setQtd(ownedCard.qtd)
    }, [collection])

    useEffect(() => {
        if(!isNull(qtd)){ 
            if(qtd < 0) setQtd(0)
            handleUpdateCollection(card.code_variant, qtd)
        }
    }, [qtd])

    function handleOpenModal(o: boolean){
        if(selectionMode){
            setOpen(false)
            return
        }
        setOpen(o)
    }

    return(
        <div className="flex flex-col w-full justify-start text-center cursor-pointer" onClick={() => handleClick(card)}>
            <Dialog open={open} onOpenChange={handleOpenModal}>
                <div onClick={() => handleOpenModal(true)}>
                    <div className="flex flex-col gap-2 flex-grow relative">
                        <img
                            src={`https://pub-46b306762cd845f6b6e0eb123db13ef4.r2.dev/${card.code_variant}`}
                            width="250" 
                            height="350" 
                            alt={card.name}
                            className="transition hover:shadow-md ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200"
                            />
                        <div className="flex flex-col">
                            <b>{card.name}</b>
                            <span className="text-sm">
                                ({card.code}) 
                            </span>
                        </div>
                        {qtd && <div className='absolute right-[-16px] top-[-16px] bg-red-400 rounded-full w-8 h-8 flex justify-center items-center text-white'>{qtd}</div> }
                    </div>
                </div>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle className="flex gap-2 h-8">
                        <span>
                            {card.name}
                        </span>
                        <span className="text-sm font-thin">({card.code})</span>
                    </DialogTitle>
                    <DialogDescription>
                        <div className="flex gap-4">
                            <img
                                src={card.image} 
                                width="250" 
                                height="350" 
                                alt={card.name}
                                />
                            <div className="flex flex-col justify-between">
                                <div>
                                    {card.description}
                                </div>
                                <div className="flex gap-2 items-center">
                                      <button 
                                        disabled={!qtd} 
                                        className="flex justify-center items-end disabled:bg-slate-400 bg-green-400 text-white rounded-full p-3" 
                                        onClick={() => setQtd(qtd ? qtd - 1 : 0)}>-</button>
                                      <input 
                                        className="text-center h-full w-10 ring-1 rounded-lg"
                                        min={0}
                                        type="number" 
                                        value={isNull(qtd) ? 0 : qtd} 
                                        onChange={handleInputChange} />
                                      <button 
                                        className="flex justify-center items-end bg-green-400 text-white rounded-full p-3"
                                        onClick={() => setQtd(qtd ? qtd + 1 : 1)}>+</button>
                                      <div className="hover:animate-ping duration-300">❤️</div>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
                </Dialog>

        </div>
    )

}