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
                <img src={card.image} />
            </a>
            {card.name}
        </div>
    )

}