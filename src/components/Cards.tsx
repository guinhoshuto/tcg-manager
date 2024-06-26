import { useEffect, useState } from "react"
import Card from "./Card"

interface Card {
  name: string
  image: string
  code: string
  code_variant: string
  description: string
}

interface CardList{
  name: string
  image: string
  code: string
  code_variant: string
  description: string
  qtd: number
}

interface Collection {
  code_variant: string
  qtd: number
}

interface CardsProps {
    cards: Card[]
    handleClick: (card: Card) => void
    collection: Collection[] 
    updateCollection: (code_variant: string, qtd: number) => void
    selectionMode: boolean
}
export default function Cards({cards, handleClick, updateCollection, collection, selectionMode }: CardsProps){
  const [cardList, setCardList] = useState<CardList[]>([])
  function getQtd(code: string){
    const card = collection.find(c => c.code_variant === code)
    if(card) return card.qtd
    return 0
  }

  useEffect(() => {
    const tmp: CardList[] = []
    cards.forEach(c => {
      const owned = collection.find(col => col.code_variant === c.code_variant)
      console.log(collection)
      if(owned) console.log(owned.qtd)
      if(owned) tmp.push({...c, qtd: owned.qtd})
    })
    setCardList(tmp)
    console.log(cardList)
  }, [collection])

  return (
    <div className="grid gap-4 lg:gap-8 grid-col-4 lg:grid-cols-8 w-full justify-center">
      {cards ? cards.map(card => (
        <Card 
          key={card.code_variant} 
          card={card}
          handleClick={handleClick}
          quantity={getQtd(card.code_variant)}
          // quantity={card.qtd}
          updateQuantity={updateCollection}
          selectionMode={selectionMode}
          />
        )) : (<div>Não há cartas disponíveis</div>)}
    </div>
  )
}