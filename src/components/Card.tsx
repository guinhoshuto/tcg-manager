import { Caesar_Dressing } from "next/font/google"
import Image from "next/image"

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
            <Image
                src={card.image} 
                width="250" 
                height="350" 
                alt={card.name}
                />
            <b>{card.name}</b> ({card.code})
        </div>
    )

}