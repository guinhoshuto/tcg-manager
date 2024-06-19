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
        <div className="flex flex-col w-full justify-start text-center cursor-pointer" onClick={() => handleClick(card)}>
            <Dialog>
                <DialogTrigger>
                    <div className="flex flex-col gap-2 flex-grow">
                        <Image
                            // src={card.image} 
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
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>{card.name}</DialogTitle>
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

        </div>
    )

}