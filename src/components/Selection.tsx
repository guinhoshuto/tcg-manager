import Card from "./Card"

interface Cards {
  name: string
  image: string
  code: string
  code_variant: string
}

interface SelectionProps{
    cards: Cards[]
}

export default function Selection({ cards }: SelectionProps) {
    return (
      <div className="absolute w-full flex bottom-0 h-[200px] bg-white drop-shadow-md">
        <div>
            <button>Limpar</button>
            <button>Salvar</button>
        </div>
        <div className="overflow-x-scroll">
            {cards.map((card) => (
            <Card key={card.code} card={card} handleClick={() => console.log(card)} />
            ))}
        </div>
      </div>
    )
}