import { Caesar_Dressing } from "next/font/google"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


interface Card {
  name: string
  image: string
  code: string
  code_variant: string
}

interface CardProps {
    card: Card
    handleClick: (card: Card) => void
}

export default function Card({ card, handleClick } : CardProps){
    return(
        <div className="flex flex-col w-full justify-center text-center cursor-pointer" onClick={() => handleClick(card)}>
            <Dialog>
                <DialogTrigger>
                    <Image
                        src={card.image} 
                        width="250" 
                        height="350" 
                        alt={card.name}
                        />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle><h1>{card.name}</h1></DialogTitle>
                    <DialogDescription>
                        <div>
                            <Image
                                src={card.image} 
                                width="250" 
                                height="350" 
                                alt={card.name}
                                />
                            <div>
                            </div>
                        </div>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
                </Dialog>

            <b>{card.name}</b> ({card.code})
        </div>
    )

}