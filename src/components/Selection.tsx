import { access } from "fs"
import { useState, useEffect } from "react"

interface Cards {
  name: string
  image: string
  code: string
  code_variant: string
  description: string
}

interface SelectionProps{
    cards: Cards[]
    onSave: () => void
}

interface CardSelection{
  card: Cards
  qtd: number
}

export default function Selection({ cards, onSave }: SelectionProps) {
  const [cardSelection, setCardSelection] = useState<CardSelection[]>([])
  const countVariants = (array: Cards[]) => {
    const countMap: { [key: string]: CardSelection } = {};

    array.forEach(item => {
      const variant = item.code_variant;
      if (countMap[variant]) {
        countMap[variant].qtd += 1;
      } else {
        countMap[variant] = { card: { ...item, code_variant: variant }, qtd: 1 };
      }
    });

    return Object.values(countMap);
  };

  useEffect(() => {
    setCardSelection(countVariants(cards))
    console.log(cardSelection)
  }, [cards])

  return (
    <div className="fixed w-full flex py-4 px-8 flex-col bottom-0 h-[300px] bg-white gap-2 drop-shadow-md">
      <div className="flex justify-end gap-2">
          <button>Clear</button>
          <button>Export</button>
          <button onClick={onSave}>Save</button>
      </div>
      <div className="overflow-x-scroll w-full flex justify-start">
          {cardSelection.length > 0 ? cardSelection.map((selectedCard, i) => (
            <div key={selectedCard.card.code_valriant} >
              <img
                className="w-auto h-[200px]"
                src={selectedCard.card.image} 
                alt={selectedCard.card.name}
                />
                {selectedCard.qtd}
            </div>
          )) : (<div>Não há cartas selecionadas</div>)}
      </div>
    </div>
  )
}