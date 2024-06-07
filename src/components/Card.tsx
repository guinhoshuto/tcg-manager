import { Caesar_Dressing } from "next/font/google"
import Image from "next/image"

interface Card {
  name: string
  image: string
  code: string
}

interface CardProps {
    card: Card
}

export default function Card({ card } : CardProps){
    return(
        <div className="flex flex-col w-full justify-center text-center">
            <a href={card.image} className="flex justify-center">
                <Image
                    src={card.image} 
                    width="250" 
                    height="350" 
                    alt={card.name}
                    />
            </a>
            <b>{card.name}</b> ({card.code})
        </div>
    )

}