import Card from "./Card"

interface Card {
  name: string
  image: string
  code: string
  code_variant: string
  description: string
}

interface Collection {
  code_variant: string
  qtd: number
}

interface CardsProps {
    cards: Card[]
    handleClick: (card: Card) => void
    collection: Collection[] 
    updateCollection: (c: Collection[]) => void
}
export default function Cards({cards, handleClick, updateCollection, collection}: CardsProps){
  function getQtd(code: string){
    const card = collection.find(c => c.code_variant === code)
    if(card) return card?.qtd
    return 0
  }

  return (
    <div className="grid gap-4 lg:gap-8 grid-col-4 lg:grid-cols-8 w-full justify-center">
      {cards ? cards.map(card => (
        <Card 
          key={card.code_variant} 
          card={card}
          handleClick={handleClick}
          quantity={getQtd(card.code_variant)}
          updateQuantity={() => {}}
          />
        )) : (<div>Não há cartas disponíveis</div>)}
    </div>
  )
}