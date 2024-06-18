import Card from "./Card"

interface Card {
  name: string
  image: string
  code: string
  code_variant: string
}

interface CardsProps {
    cards: Card[]
    handleClick: (card: Card) => void
}
export default function Cards({cards, handleClick}: CardsProps){
    return (
      <div className="grid gap-4 lg:gap-8 grid-col-4 lg:grid-cols-8 w-full justify-center">
        {cards.map(card => (
          <Card 
            key={card.code_variant} 
            card={card}
            handleClick={handleClick}
            />
          ))}
      </div>
    )
}