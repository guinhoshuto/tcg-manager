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

export default function Selection({ cards, onSave }: SelectionProps) {
    return (
      <div className="fixed w-full flex flex-col bottom-0 h-[200px] bg-white drop-shadow-md">
        <div className="flex gap-2">
            <button>Clear</button>
            <button>Export</button>
            <button onClick={onSave}>Save</button>
        </div>
        <div className="overflow-x-scroll w-full flex justify-start">
            {cards.length > 0 ? cards.map((card) => (
              <img
                key={card.code_variant}
                src={card.image} 
                width="250" 
                height="350" 
                alt={card.name}
                />
            )) : (<div>Não há cartas selecionadas</div>)}
        </div>
      </div>
    )
}