import Image from "next/image"

interface Card {
  name: string
  image: string
}

interface CardProps {
    card: Card
}

export default function Card({ card } : CardProps){
    return(
        <div className="flex flex-col w-full">
            <a href={card.image}>
                <Image
                    src={card.image} 
                    width="200" 
                    height="400" 
                    alt={card.name}
                    />
            </a>
            {card.name}
        </div>
    )

}